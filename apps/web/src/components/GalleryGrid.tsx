"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog } from "./Dialog";

export interface GalleryImage {
  key: string;
  src: string;
  alt: string;
  caption: string;
}

/** Photo grid; tapping a photo opens it full size in a dialog (Esc or tap outside to close). */
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<GalleryImage | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((img) => (
          <li key={img.key}>
            <button
              type="button"
              onClick={() => setOpen(img)}
              className="group block w-full overflow-hidden rounded-xl border border-line bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <span className="relative block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:aspect-[4/3]"
                />
                <span className="absolute top-2 right-2 hidden size-8 items-center justify-center rounded-md bg-white/90 text-ink group-hover:flex">
                  <Expand className="size-4" aria-hidden />
                </span>
              </span>
              <span className="block border-t border-line px-3 py-2 text-xs leading-snug text-muted sm:px-4 sm:py-3 sm:text-sm">
                {img.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onClose={() => setOpen(null)} title={open?.caption ?? ""} size="xl">
        {open && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={open.src} alt={open.alt} className="mx-auto block max-h-[75vh] w-auto rounded-lg" />
        )}
      </Dialog>
    </>
  );
}
