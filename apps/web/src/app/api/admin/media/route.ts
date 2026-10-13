import { after, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import { deleteMediaItem, listMediaItems, newMediaId, saveMediaItem, storageDriver } from "@/lib/media-store";
import { getSlot } from "@/content/media-slots";

/** Vercel functions accept request bodies up to 4.5 MB; the dashboard shrinks photos well below this. */
const MAX_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

async function guard(req: Request) {
  if (!sameOrigin(req)) return fail("Not allowed", 403);
  if (!(await isAdmin())) return fail("Please sign in again.", 401);
  if (!storageDriver()) return fail("Image storage has not been connected yet.", 503);
  return null;
}

/**
 * Rebuild the page this slot appears on, then load it once after replying: Next.js rebuilds
 * on that request, so the next visitor (usually the staff member checking) sees the change.
 * Pages also re-render every 60 s, which covers a race when several posts land at once.
 */
function refreshSlot(req: Request, href: string) {
  const path = href.split("#")[0] || "/";
  revalidatePath(path);
  after(async () => {
    try {
      await fetch(new URL(path, req.url), { cache: "no-store" });
    } catch {
      // Best effort: the page still refreshes on its next visit.
    }
  });
}

const text = (form: FormData, key: string, max: number) => {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("The upload could not be read. Try a smaller image.");
  }

  const slot = getSlot(text(form, "slot", 80));
  if (!slot) return fail("Unknown place on the site.");

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return fail("Choose an image to upload.");
  const ext = TYPES[file.type];
  if (!ext) return fail("Use a JPG, PNG or WebP image.");
  if (file.size > MAX_BYTES) return fail("That image is too large. Use one under 4 MB.");

  const alt = text(form, "alt", 300);
  if (alt.length < 3) return fail("Add a short description of the image.");

  const title = text(form, "title", 120);
  const link = text(form, "link", 300);
  if (link && !/^(\/(?!\/)|https:\/\/)/.test(link)) return fail("Links must start with / or https://");
  const endsOn = text(form, "endsOn", 10);
  if (endsOn && !/^\d{4}-\d{2}-\d{2}$/.test(endsOn)) return fail("Use a valid end date.");

  const existing = (await listMediaItems()).filter((i) => i.slot === slot.id);
  if (existing.length >= slot.max) {
    return fail(`This place holds up to ${slot.max} images. Remove one first.`, 409);
  }

  try {
    const item = await saveMediaItem(
      {
        id: newMediaId(),
        slot: slot.id,
        alt,
        ...(slot.kind === "promotions"
          ? { ...(title && { title }), ...(link && { link }), ...(endsOn && { endsOn }) }
          : {}),
        createdAt: new Date().toISOString(),
      },
      { bytes: Buffer.from(await file.arrayBuffer()), contentType: file.type, ext },
    );
    refreshSlot(req, slot.page.href);
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error("[media] upload failed", error);
    return fail("The upload failed. Please try again.", 500);
  }
}

export async function DELETE(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  const id = new URL(req.url).searchParams.get("id") ?? "";
  const item = (await listMediaItems()).find((i) => i.id === id);
  if (!item) return fail("That image was not found. It may already be removed.", 404);

  try {
    await deleteMediaItem(item);
    refreshSlot(req, getSlot(item.slot)?.page.href ?? "/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[media] delete failed", error);
    return fail("The image could not be removed. Please try again.", 500);
  }
}
