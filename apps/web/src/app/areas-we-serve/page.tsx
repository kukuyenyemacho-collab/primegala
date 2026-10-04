import type { Metadata } from "next";
import { MapPin, Navigation } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { AREAS_SERVED } from "@/content/areas";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Clinic Near Bahati, Kabatini, Kiamaina, Lanet & Dundori",
  description:
    "Primegala Medical Centre at Maili Sita serves families across Nakuru North: Kabatini, Kiamaina, Bahati, Lanet, Umoja, Dundori, Maili Kumi and Nakuru town. Directions from each area, open 24 hours.",
  path: "/areas-we-serve",
  keywords: keywordsFor("local", "questions"),
});

const AREA_FAQS = [
  {
    q: "Is there a 24-hour clinic near Bahati?",
    a: "Yes. Primegala Medical Centre at Maili Sita on the Nakuru–Nyahururu Road is open 24 hours and serves Bahati, Kabatini, Kiamaina and the surrounding areas.",
  },
  {
    q: "How far is Maili Sita from Nakuru town?",
    a: "About six miles (roughly 10 km) along the Nakuru–Nyahururu Road, which is where the name Maili Sita, “six miles”, comes from.",
  },
  {
    q: "Which hospital is opposite Kiamaina Primary School?",
    a: "Primegala Medical Centre is directly opposite Kiamaina Primary School at Maili Sita Centre.",
  },
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Areas we serve", path: "/areas-we-serve" }]}
        eyebrow="Nakuru North"
        title="Your nearest 24-hour care, wherever you are in Nakuru North"
        intro="Patients come to Primegala from all along the Nakuru–Nyahururu Road and the villages around it. Here's how to reach us from your area."
      >
        <ButtonLink href={site.mapsUrl} size="lg" track="directions_click_areas">
          <Navigation className="size-5" aria-hidden /> Open in Google Maps
        </ButtonLink>
      </PageHero>
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {AREAS_SERVED.map((area) => (
            <article
              key={area.slug}
              id={area.slug}
              className="rounded-[var(--radius-card)] bg-surface p-7 ring-1 ring-line target:ring-2 target:ring-brand-500"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                  <MapPin className="size-5 text-brand-600" aria-hidden /> {area.name}
                </h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
                  {area.relation}
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-muted">{area.directions}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <FaqList faqs={AREA_FAQS} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
