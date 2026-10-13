"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, ImagePlus, Megaphone, Trash2, UploadCloud } from "lucide-react";
import { buttonClasses } from "@/components/ui";
import type { MediaSlot } from "@/content/media-slots";
import type { MediaItem } from "@/lib/media-store";

const MAX_SIDE = 2000;

/**
 * Phone photos are often 5-10 MB. Shrink them in the browser before uploading so posts are
 * quick on mobile data and pages stay light (and the upload fits the 4.5 MB server limit).
 */
async function prepareImage(file: File): Promise<Blob> {
  const small = file.size < 1_500_000 && (file.type === "image/jpeg" || file.type === "image/webp");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && small) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not process the image."))), "image/jpeg", 0.85),
  );
}

const field =
  "mt-1.5 block w-full rounded-lg border border-line px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-2 focus:outline-brand-500/30";

export function SlotCard({ slot, items, ready }: { slot: MediaSlot; items: MediaItem[]; ready: boolean }) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const promo = slot.kind === "promotions";
  const full = items.length >= slot.max;
  const idBase = `slot-${slot.id}`;

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setStatus({ tone: "error", text: "Choose an image first." });
      return;
    }
    setBusy(true);
    setStatus({ tone: "ok", text: "Uploading…" });
    try {
      const image = await prepareImage(file);
      data.set("file", image, file.name.replace(/\.\w+$/, "") + (image === file ? "" : ".jpg"));
      data.set("slot", slot.id);
      const res = await fetch("/api/admin/media", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({ ok: false }))) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "The upload failed.");
      form.current?.reset();
      setPreview(null);
      setStatus({ tone: "ok", text: "Posted. It is live on the page (refresh the page once if you have it open)." });
      router.refresh();
    } catch (err) {
      setStatus({ tone: "error", text: err instanceof Error ? err.message : "The upload failed." });
    } finally {
      setBusy(false);
    }
  }

  async function remove(item: MediaItem) {
    if (!window.confirm("Remove this image from the website?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/media?id=${encodeURIComponent(item.id)}`, { method: "DELETE" });
      const json = (await res.json().catch(() => ({ ok: false }))) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "Could not remove the image.");
      setStatus({ tone: "ok", text: "Removed from the website." });
      router.refresh();
    } catch (err) {
      setStatus({ tone: "error", text: err instanceof Error ? err.message : "Could not remove the image." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <article
      className={`flex h-full flex-col rounded-xl border bg-white p-5 ${promo ? "border-pink-200" : "border-line"}`}
      aria-labelledby={`${idBase}-title`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${promo ? "bg-pink-50 text-pink-700" : "bg-trust-50 text-trust-700"}`}
        >
          {promo ? <Megaphone className="size-5" aria-hidden /> : <ImagePlus className="size-5" aria-hidden />}
        </span>
        <div className="min-w-0 flex-1">
          <h3 id={`${idBase}-title`} className="leading-snug font-bold text-ink">
            {slot.title}
          </h3>
          <a
            href={slot.page.href}
            target="_blank"
            rel="noopener"
            className="mt-0.5 inline-flex items-center gap-1 text-sm text-brand-700 underline-offset-2 hover:underline"
          >
            {slot.page.label} <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </div>
        <span className="shrink-0 rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-muted">
          {items.length}/{slot.max}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{slot.where}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        <strong className="font-semibold text-ink">Best size:</strong> {slot.size}
      </p>

      {items.length > 0 ? (
        <ul className="mt-4 grid grid-cols-3 gap-2">
          {items.map((item) => (
            <li key={item.id} className="group relative overflow-hidden rounded-lg border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.alt} className="aspect-square w-full object-cover" loading="lazy" />
              <button
                type="button"
                onClick={() => remove(item)}
                disabled={busy}
                className="absolute top-1 right-1 flex size-8 items-center justify-center rounded-md bg-white/90 text-alert shadow-sm hover:bg-white"
              >
                <Trash2 className="size-4" aria-hidden />
                <span className="sr-only">Remove “{item.title ?? item.alt}”</span>
              </button>
              {item.endsOn && (
                <span className="absolute bottom-1 left-1 rounded bg-white/90 px-1.5 text-[0.65rem] font-semibold text-ink">
                  until {item.endsOn}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex aspect-[3/1] items-center justify-center rounded-lg border border-dashed border-line bg-surface text-sm text-muted">
          Nothing posted yet
        </div>
      )}

      <form ref={form} onSubmit={upload} className="mt-5 flex flex-1 flex-col border-t border-line pt-4">
        <fieldset disabled={!ready || full || busy} className="space-y-3 disabled:opacity-60">
          <legend className="sr-only">Post an image to {slot.title}</legend>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-brand-300 bg-brand-50/40 px-3 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="size-12 rounded object-cover" />
            ) : (
              <UploadCloud className="size-6 shrink-0" aria-hidden />
            )}
            <span>{preview ? "Change image" : "Choose an image"}</span>
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setPreview(f ? URL.createObjectURL(f) : null);
                setStatus(null);
              }}
            />
          </label>
          {promo && (
            <label className="block text-sm font-semibold text-ink">
              Headline <span className="font-normal text-muted">(optional)</span>
              <input name="title" maxLength={120} className={field} placeholder="e.g. Free blood pressure checks this Saturday" />
            </label>
          )}
          <label className="block text-sm font-semibold text-ink">
            Description
            <textarea
              name="alt"
              required
              minLength={3}
              maxLength={300}
              rows={2}
              className={field}
              placeholder="What the image shows, e.g. Our nurses at the October health day"
            />
          </label>
          {promo && (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink">
                Link <span className="font-normal text-muted">(optional)</span>
                <input name="link" maxLength={300} className={field} placeholder="/book or https://…" />
              </label>
              <label className="block text-sm font-semibold text-ink">
                Show until <span className="font-normal text-muted">(optional)</span>
                <input name="endsOn" type="date" className={field} />
              </label>
            </div>
          )}
          <button type="submit" className={buttonClasses(promo ? "trust" : "primary", "md", "w-full gap-2")}>
            <UploadCloud className="size-4" aria-hidden /> {busy ? "Working…" : "Upload & post"}
          </button>
        </fieldset>
        {full && <p className="mt-2 text-xs text-muted">Full. Remove an image to post a new one.</p>}
        {status && (
          <p role="status" className={`mt-2 text-sm font-medium ${status.tone === "error" ? "text-alert" : "text-brand-700"}`}>
            {status.text}
          </p>
        )}
      </form>
    </article>
  );
}
