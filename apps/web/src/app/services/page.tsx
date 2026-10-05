import type { Metadata } from "next";
import Link from "next/link";
import type { ServiceCode } from "@primegala/contracts";
import { ArrowRight, CalendarCheck, Landmark, Siren, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/Cards";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { InfoPanel } from "@/components/PageSections";
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

/** Services grouped by what people come in for, so the list scans like a directory. */
const GROUPS: { id: string; title: string; intro: string; codes: ServiceCode[] }[] = [
  {
    id: "everyday-and-urgent",
    title: "Everyday and urgent care",
    intro: "Walk in at any hour for illness, injuries and check-ups.",
    codes: ["general-outpatient", "emergency-24hr", "minor-procedures"],
  },
  {
    id: "mother-and-child",
    title: "Pregnancy, birth and family health",
    intro: "From your first antenatal visit to your child's vaccinations.",
    codes: ["antenatal-care", "maternity", "family-planning", "child-health"],
  },
  {
    id: "tests-and-medicines",
    title: "Tests, medicines and prevention",
    intro: "On-site laboratory and pharmacy, and confidential HIV testing.",
    codes: ["laboratory", "pharmacy", "hiv-testing"],
  },
  {
    id: "ongoing-care",
    title: "Ongoing and inpatient care",
    intro: "Long-term condition reviews, and admission when you need closer care.",
    codes: ["chronic-care", "inpatient"],
  },
];

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
        intro={`Primegala offers ${SERVICE_PAGES.length} services under one roof at Maili Sita, open 24 hours: outpatient and urgent care, maternity and antenatal care, family planning, child health, HIV testing, laboratory, pharmacy, inpatient admission, chronic disease care and minor procedures.${site.shaContracted ? " SHA is accepted for eligible services." : ""}`}
      >
        <ButtonLink href="/book" size="lg" track="book_click_services">
          <CalendarCheck className="size-5" aria-hidden /> Book a visit
        </ButtonLink>
        <ButtonLink href="/sha" variant="secondary" size="lg">
          How SHA works here
        </ButtonLink>
      </PageHero>

      <Section className="pb-0! sm:pb-0!">
        <nav aria-label="Service groups">
          <ul className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="inline-flex items-center rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink/85 transition-colors hover:border-brand-300 hover:text-brand-800"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {GROUPS.map((group) => {
        const services = group.codes
          .map((code) => SERVICE_PAGES.find((s) => s.code === code))
          .filter((s): s is (typeof SERVICE_PAGES)[number] => Boolean(s));
        return (
          <Section key={group.id} id={group.id} labelledBy={`${group.id}-title`} className="pb-0! sm:pb-0!">
            <SectionHeading id={`${group.id}-title`} title={group.title} intro={group.intro} />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Section>
        );
      })}

      <Section labelledBy="services-help">
        <h2 id="services-help" className="sr-only">
          Help choosing a service
        </h2>
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoPanel icon={Stethoscope} title="Not sure which service you need?">
            <p>
              Just walk in. A nurse assesses you at triage and a clinician guides you from there, including tests,
              medicines or referral. <Link href="/patients-and-visitors">Patient &amp; visitor guide</Link>.
            </p>
          </InfoPanel>
          <InfoPanel icon={Landmark} title={site.shaContracted ? "SHA accepted for eligible services" : "Using SHA"}>
            <p>
              Bring your national ID and the phone registered with SHA. We confirm what is covered, and any cost, before
              treatment. <Link href="/payments-and-insurance">Payments &amp; insurance</Link>.
            </p>
          </InfoPanel>
          <InfoPanel icon={Siren} title="An emergency?">
            <p>
              Call 999 or 112, or come straight in: we are open 24 hours.{" "}
              <Link href="/emergency" className="inline-flex items-center gap-1">
                Emergency care <ArrowRight className="size-4" aria-hidden />
              </Link>
            </p>
          </InfoPanel>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
