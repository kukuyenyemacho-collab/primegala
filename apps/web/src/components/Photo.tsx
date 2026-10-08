import { cn } from "@/lib/cn";

/** Real photographs of the facility. Every image here was supplied by Primegala. */
export const PHOTOS = {
  reception: {
    src: "/images/reception-desk.jpg",
    alt: "The Primegala reception desk, with the triage room door beside it and a wheelchair ready for patients",
    width: 960,
    height: 1280,
  },
  pharmacyCounter: {
    src: "/images/pharmacy-counter.jpg",
    alt: "Shelves in the Primegala pharmacy, with cough syrups, children's medicines and antacids sorted by type",
    width: 960,
    height: 1280,
  },
  pharmacyShelves: {
    src: "/images/pharmacy-shelves.jpg",
    alt: "Corner of the Primegala pharmacy store, with medicines arranged on labelled shelves",
    width: 960,
    height: 1280,
  },
  pharmacyStock: {
    src: "/images/pharmacy-stock.jpg",
    alt: "Labelled pharmacy shelves at Primegala: antibiotics, antibiotic syrups, cough syrups and antacids",
    width: 960,
    height: 1280,
  },
} as const;

export type PhotoName = keyof typeof PHOTOS;

export function Photo({
  name,
  caption,
  className,
  imgClassName,
  priority = false,
}: {
  name: PhotoName;
  caption?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const p = PHOTOS[name];
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-line bg-white", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.src}
        alt={p.alt}
        width={p.width}
        height={p.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("block aspect-[4/5] h-auto w-full object-cover", imgClassName)}
      />
      {caption && (
        <figcaption className="border-t border-line px-4 py-3 text-sm leading-snug text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
