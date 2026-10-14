import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { MEDIA_BUCKET, supabaseAdmin } from "./supabase";

/**
 * Storage for images posted from the dashboard.
 *
 * Production uses Supabase (see lib/supabase.ts): the image goes to the public `media` storage
 * bucket at <slot>/<id>.<ext>, and its description to the `media_items` table
 * (supabase/migrations). For local testing, MEDIA_STORAGE=local keeps files in .media-local/
 * and serves them from /media-local/:
 *   media/<slot>/<id>.<ext>        the image
 *   media-meta/<slot>/<id>.json    its description
 */

export interface MediaItem {
  id: string;
  slot: string;
  url: string;
  /** Describes the image for screen readers and search engines; also the default caption */
  alt: string;
  caption?: string;
  /** Promotions only */
  title?: string;
  link?: string;
  /** Promotions only: last day to show it (YYYY-MM-DD, Nairobi time) */
  endsOn?: string;
  createdAt: string;
}

type Driver = "supabase" | "local" | null;

export function storageDriver(): Driver {
  if (supabaseAdmin()) return "supabase";
  if (process.env.MEDIA_STORAGE === "local") return "local";
  return null;
}

// Local test storage only; the ignore comments keep the production bundle from tracing these paths.
const LOCAL_DIR = () =>
  process.env.MEDIA_LOCAL_DIR ?? path.join(/*turbopackIgnore: true*/ process.cwd(), ".media-local");
const metaPath = (slot: string, id: string) => `media-meta/${slot}/${id}.json`;

export function localFilePath(pathname: string) {
  const root = path.resolve(/*turbopackIgnore: true*/ LOCAL_DIR());
  const full = path.resolve(/*turbopackIgnore: true*/ root, pathname);
  if (!full.startsWith(root + path.sep)) throw new Error("Invalid path");
  return full;
}

export function newMediaId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Every stored item, oldest first. Uncached: callers cache it (see lib/media.ts). */
export async function listMediaItems(): Promise<MediaItem[]> {
  const driver = storageDriver();
  let items: MediaItem[] = [];

  if (driver === "supabase") {
    const { data, error } = await supabaseAdmin()!
      .from("media_items")
      .select("id, slot, url, alt, caption, title, link, ends_on, created_at")
      .order("created_at", { ascending: true })
      .limit(1000);
    if (error) throw new Error(`media_items: ${error.message}`);
    items = (data ?? []).map((r) => ({
      id: r.id,
      slot: r.slot,
      url: r.url,
      alt: r.alt,
      ...(r.caption && { caption: r.caption }),
      ...(r.title && { title: r.title }),
      ...(r.link && { link: r.link }),
      ...(r.ends_on && { endsOn: r.ends_on }),
      createdAt: r.created_at,
    }));
  } else if (driver === "local") {
    const root = path.join(/*turbopackIgnore: true*/ LOCAL_DIR(), "media-meta");
    const slots = await fs.readdir(root).catch(() => [] as string[]);
    for (const slot of slots) {
      for (const file of await fs.readdir(path.join(root, slot)).catch(() => [] as string[])) {
        items.push(JSON.parse(await fs.readFile(path.join(root, slot, file), "utf8")) as MediaItem);
      }
    }
  }

  return items.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
}

export async function saveMediaItem(
  meta: Omit<MediaItem, "url">,
  image: { bytes: Buffer; contentType: string; ext: string },
): Promise<MediaItem> {
  const driver = storageDriver();
  const imagePath = `media/${meta.slot}/${meta.id}.${image.ext}`;

  if (driver === "supabase") {
    const db = supabaseAdmin()!;
    const objectPath = `${meta.slot}/${meta.id}.${image.ext}`;
    const up = await db.storage.from(MEDIA_BUCKET).upload(objectPath, image.bytes, {
      contentType: image.contentType,
      cacheControl: "31536000",
      upsert: false,
    });
    if (up.error) throw new Error(`storage upload: ${up.error.message}`);
    const url = db.storage.from(MEDIA_BUCKET).getPublicUrl(objectPath).data.publicUrl;
    const row = {
      id: meta.id,
      slot: meta.slot,
      path: objectPath,
      url,
      alt: meta.alt,
      caption: meta.caption ?? null,
      title: meta.title ?? null,
      link: meta.link ?? null,
      ends_on: meta.endsOn ?? null,
      created_at: meta.createdAt,
    };
    const ins = await db.from("media_items").insert(row);
    if (ins.error) {
      await db.storage.from(MEDIA_BUCKET).remove([objectPath]);
      throw new Error(`media_items insert: ${ins.error.message}`);
    }
    return { ...meta, url };
  }

  if (driver === "local") {
    const item: MediaItem = { ...meta, url: `/media-local/${imagePath}` };
    for (const [p, data] of [
      [imagePath, image.bytes],
      [metaPath(meta.slot, meta.id), JSON.stringify(item)],
    ] as const) {
      const file = localFilePath(p);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, data);
    }
    return item;
  }

  throw new Error("Image storage is not set up");
}

export async function deleteMediaItem(item: MediaItem) {
  const driver = storageDriver();
  if (driver === "supabase") {
    const db = supabaseAdmin()!;
    const { data } = await db.from("media_items").select("path").eq("id", item.id).maybeSingle();
    if (data?.path) {
      const rm = await db.storage.from(MEDIA_BUCKET).remove([data.path]);
      if (rm.error) throw new Error(`storage remove: ${rm.error.message}`);
    }
    const del = await db.from("media_items").delete().eq("id", item.id);
    if (del.error) throw new Error(`media_items delete: ${del.error.message}`);
  } else if (driver === "local") {
    const imagePath = item.url.replace(/^\/media-local\//, "");
    await Promise.all(
      [imagePath, metaPath(item.slot, item.id)].map((p) => fs.rm(localFilePath(p), { force: true })),
    );
  }
}
