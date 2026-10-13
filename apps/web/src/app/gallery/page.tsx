import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryGrid";
import { PHOTOS, type PhotoName } from "@/components/Photo";
import { ButtonLink, Section } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { getSlotItems } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";

/** Re-render at most every minute so photos posted from the staff dashboard show up. */
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Gallery: Inside PRIMEGALA HOSPITAL",
  description:
    "Photos of PRIMEGALA HOSPITAL at Maili Sita, Nakuru: the building, reception, laboratory, pharmacy, our team at work and community health days.",
  path: "/gallery",
  keywords: ["PRIMEGALA HOSPITAL photos", "hospital Maili Sita photos", "Primegala gallery"],
});

/** Built-in facility photos, shown after anything posted from the staff dashboard. */
const FACILITY: { name: PhotoName; caption: string }[] = [
  { name: "building", caption: "PRIMEGALA HOSPITAL, Esther Memorial Building, opposite Kiamaina Primary School" },
  { name: "reception", caption: "Reception and triage" },
  { name: "labBench", caption: "Our laboratory bench" },
  { name: "labAnalyser", caption: "Automated blood-count analyser" },
  { name: "labAnalysers", caption: "Blood chemistry and rapid-test analysers" },
  { name: "labMicroscope", caption: "Microscopy in our laboratory" },
  { name: "pharmacyStock", caption: "Our pharmacy, medicines sorted by type" },
  { name: "pharmacyShelves", caption: "Pharmacy store" },
  { name: "mchDoor", caption: "Antenatal, child health and family planning room" },
];

export default async function GalleryPage() {
  const uploads = await getSlotItems("gallery");
  const images: GalleryImage[] = [
    ...uploads.map((i) => ({ key: i.id, src: i.url, alt: i.alt, caption: i.caption ?? i.alt })),
    ...FACILITY.map(({ name, caption }) => ({ key: name, src: PHOTOS[name].src, alt: PHOTOS[name].alt, caption })),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        eyebrow="Gallery"
        title="Inside PRIMEGALA HOSPITAL"
        intro="A look at our facility at Maili Sita, our team at work and the health days we run for the community. Tap any photo to see it full size."
      >
        <ButtonLink href="/book" size="lg" track="book_click_gallery">
          <CalendarCheck className="size-5" aria-hidden /> Book a visit
        </ButtonLink>
      </PageHero>
      <Section labelledBy="gallery-photos">
        <h2 id="gallery-photos" className="sr-only">
          Photos
        </h2>
        <GalleryGrid images={images} />
      </Section>
      <CtaBand />
    </>
  );
}
