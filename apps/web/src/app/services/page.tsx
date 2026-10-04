import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/Cards";
import { ButtonLink, Section } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SERVICE_PAGES } from "@/content/services";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Medical Services at Maili Sita, Nakuru",
  description:
    "All services at Primegala Medical Centre, Maili Sita: 24-hour outpatient and urgent care, maternity, antenatal, family planning, child health, HIV testing, laboratory, pharmacy, inpatient and chronic care.",
  path: "/services",
  keywords: keywordsFor("core", "maternity", "familyPlanning", "lab", "hiv", "child", "chronic"),
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Services at ${site.name}`,
          itemListElement: SERVICE_PAGES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: absoluteUrl(`/services/${s.slug}`),
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Our services"
        title="Care for every stage of life, six miles closer"
        intro="Twelve services under one roof at Maili Sita, open 24 hours. Most everyday visits are covered for registered SHA members."
      >
        <ButtonLink href="/book" size="lg" track="book_click_services">
          <CalendarCheck className="size-5" aria-hidden /> Book a visit
        </ButtonLink>
        <ButtonLink href="/sha" variant="secondary" size="lg">
          How SHA works here
        </ButtonLink>
      </PageHero>
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
