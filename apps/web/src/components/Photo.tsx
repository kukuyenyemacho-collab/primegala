import { cn } from "@/lib/cn";

/** Real photographs of the facility. Every image here was supplied by Primegala. */
export const PHOTOS = {
  building: {
    src: "/images/building-exterior.jpg",
    alt: "The PRIMEGALA HOSPITAL building at Maili Sita: a white and blue building with the sign 'SHA accepted here' and '24 hr service'",
    width: 1280,
    height: 960,
  },
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
  labDoor: {
    src: "/images/lab-door.jpg",
    alt: "The laboratory door at Primegala, marked with a green 'Laboratory' sign",
    width: 960,
    height: 1280,
  },
  labBench: {
    src: "/images/lab-bench.jpg",
    alt: "The Primegala laboratory bench, with a microscope, sample shaker, centrifuge and incubator",
    width: 1280,
    height: 960,
  },
  labAnalyser: {
    src: "/images/lab-analyser.jpg",
    alt: "The automated blood-count analyser in the Primegala laboratory",
    width: 960,
    height: 1280,
  },
  labMicroscope: {
    src: "/images/lab-microscope.jpg",
    alt: "A microscope and sample racks in the Primegala laboratory",
    width: 960,
    height: 1280,
  },
  labAnalysers: {
    src: "/images/lab-analysers.jpg",
    alt: "Blood chemistry and rapid test analysers on the Primegala laboratory bench",
    width: 960,
    height: 1280,
  },
  pharmacyDoor: {
    src: "/images/pharmacy-door.jpg",
    alt: "The Primegala pharmacy door, marked with a green 'Pharmacy' sign",
    width: 960,
    height: 1280,
  },
  mchDoor: {
    src: "/images/mch-door.jpg",
    alt: "The door to the antenatal, child health and family planning room at Primegala, marked 'ANC/MCH/F.P'",
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
  aspect,
  priority = false,
}: {
  name: PhotoName;
  caption?: string;
  className?: string;
  imgClassName?: string;
  /** Base aspect-ratio class; defaults to 4:3 for landscape photos and 4:5 for portrait ones. */
  aspect?: string;
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
        className={cn(
          "block h-auto w-full object-cover",
          aspect ?? (p.width > p.height ? "aspect-[4/3]" : "aspect-[4/5]"),
          imgClassName,
        )}
      />
      {caption && (
        <figcaption className="border-t border-line px-3 py-2 text-xs leading-snug text-muted sm:px-4 sm:py-3 sm:text-sm">{caption}</figcaption>
      )}
    </figure>
  );
}

/** An image posted from the staff dashboard, framed like the built-in photos. */
export function UploadedPhoto({
  item,
  className,
  imgClassName,
  aspect = "aspect-[4/5]",
}: {
  item: { url: string; alt: string; caption?: string };
  className?: string;
  imgClassName?: string;
  aspect?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-line bg-white", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.url}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className={cn("block h-auto w-full object-cover", aspect, imgClassName)}
      />
      <figcaption className="border-t border-line px-3 py-2 text-xs leading-snug text-muted sm:px-4 sm:py-3 sm:text-sm">
        {item.caption ?? item.alt}
      </figcaption>
    </figure>
  );
}
