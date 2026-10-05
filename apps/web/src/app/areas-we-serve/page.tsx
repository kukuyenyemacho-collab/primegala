import type { Metadata } from "next";
import { MapPin, Navigation } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { MapEmbed } from "@/components/MapEmbed";
import { FaqSection, VisitFacts } from "@/components/PageSections";
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
  {
    q: "Which matatus pass Primegala?",
    a: "Matatus between Nakuru town and Bahati, Kiamaina or Nyahururu use the Nakuru–Nyahururu Road. Ask to alight at Maili Sita, by Kiamaina Primary School.",
  },
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Areas we serve", path: "/areas-we-serve" }]}
        eyebrow="Nakuru North"
        title="Your nearest 24-hour care, wherever you are in Nakuru North"
        intro="Primegala is at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School, about 10 km from Nakuru town. Patients come to us from all along the road and the villages around it. Here's how to reach us from your area."
      >
        <ButtonLink href={site.mapsUrl} size="lg" track="directions_click_areas">
          <Navigation className="size-5" aria-hidden /> Open in Google Maps
        </ButtonLink>
      </PageHero>

      <Section labelledBy="areas-list">
        <SectionHeading id="areas-list" eyebrow="Directions" title="Getting here from your area" />
        <nav aria-label="Jump to an area" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {AREAS_SERVED.map((area) => (
              <li key={area.slug}>
                <a
                  href={`#${area.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink/85 transition-colors hover:border-brand-300 hover:text-brand-800"
                >
                  <MapPin className="size-3.5 text-trust-700" aria-hidden /> {area.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {AREAS_SERVED.map((area) => (
            <article
              key={area.slug}
              id={area.slug}
              aria-labelledby={`${area.slug}-title`}
              className="rounded-xl border border-line bg-white p-6 target:border-brand-600 target:ring-1 target:ring-brand-600"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 id={`${area.slug}-title`} className="flex items-center gap-3 text-xl font-bold text-ink">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  {area.name}
                </h3>
                <span className="rounded-full border border-trust-200 bg-trust-50 px-3 py-1 text-xs font-semibold text-trust-800">
                  {area.relation}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{area.directions}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="map-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHeading
              id="map-heading"
              eyebrow="Find us"
              title="Opposite Kiamaina Primary School"
              intro="Look for Kiamaina Primary School at Maili Sita Centre on the Nakuru–Nyahururu Road (B5). Primegala is directly opposite."
            />
            <VisitFacts className="mt-8" as="h3" />
          </div>
          <div className="min-w-0">
            <MapEmbed query="Primegala Medical Centre, Maili Sita, Nakuru" mapsUrl={site.mapsUrl} />
          </div>
        </div>
      </Section>

      <FaqSection faqs={AREA_FAQS} title="Getting to Primegala" tone="white" />

      <CtaBand />
    </>
  );
}
