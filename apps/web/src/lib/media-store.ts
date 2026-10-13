import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { del, list, put } from "@vercel/blob";

/**
 * Storage for images posted from the dashboard.
 *
 * Production uses Vercel Blob (BLOB_READ_WRITE_TOKEN, added automatically when a Blob store is
 * connected to the Vercel project). For local testing, MEDIA_STORAGE=local keeps files in
 * .media-local/ and serves them from /media-local/. Each upload is two files:
 *   media/<slot>/<id>.<ext>        the image
 *   media-meta/<slot>/<id>.json    its description (never overwritten, so it caches safely)
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

type Driver = "blob" | "local" | null;

export function storageDriver(): Driver {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
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

  if (driver === "blob") {
    const metas: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "media-meta/", cursor, limit: 1000 });
      metas.push(...page.blobs.map((b) => b.url));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    items = await Promise.all(
      metas.map(async (url) => {
        // Descriptions are written once and never changed, so they cache safely.
        const res = await fetch(url, { cache: "force-cache" });
        return res.ok ? ((await res.json()) as MediaItem) : null;
      }),
    ).then((all) => all.filter((i): i is MediaItem => i !== null));
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

  if (driver === "blob") {
    const stored = await put(imagePath, image.bytes, {
      access: "public",
      contentType: image.contentType,
      addRandomSuffix: false,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    const item: MediaItem = { ...meta, url: stored.url };
    await put(metaPath(meta.slot, meta.id), JSON.stringify(item), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return item;
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
  if (driver === "blob") {
    await del([item.url, metaPath(item.slot, item.id)]);
  } else if (driver === "local") {
    const imagePath = item.url.replace(/^\/media-local\//, "");
    await Promise.all(
      [imagePath, metaPath(item.slot, item.id)].map((p) => fs.rm(localFilePath(p), { force: true })),
    );
  }
}
