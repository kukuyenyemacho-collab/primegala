import type { Metadata } from "next";
import { HandHeart, Leaf, ShieldCheck, Sun } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Story: A 24-Hour Medical Centre at Maili Sita Since 2022",
  description:
    "Why Primegala Medical Centre opened at Maili Sita on the Nakuru–Nyahururu Road in 2022, our mission, our values and the care we promise every family in Nakuru North.",
  path: "/about",
  keywords: ["Primegala Medical Centre", "hospital Maili Sita", "is there a hospital at Maili Sita", "medical centre Nakuru North"],
});

const TIMELINE = [
  { when: "Before 2022", what: "Families around Maili Sita travel about six miles to Nakuru town for many health needs, especially at night." },
  { when: "1 March 2022", what: "Primegala Medical Centre opens at Maili Sita Centre, opposite Kiamaina Primary School, as a 24-hour KEPH Level 3 facility." },
  { when: "2024", what: "SHA replaces NHIF. Primegala helps patients register and understand their new cover." },
  { when: "2026", what: "Primegala goes digital: a new website, WhatsApp booking and a modern patient system connected to Kenya's health information exchange." },
];

const VALUES = [
  { Icon: Sun, title: "Always here", body: "Open every hour of every day, because illness never waits for morning." },
  { Icon: HandHeart, title: "Dignity for all", body: "Every patient is treated with the same respect, whatever their means." },
  { Icon: ShieldCheck, title: "Honest care", body: "We test before we treat, explain clearly, and tell you costs up front." },
  { Icon: Leaf, title: "Rooted here", body: "We're part of Maili Sita. Our neighbours are our patients, and our team." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/about"),
          name: `About ${site.name}`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
      <PageHero
        crumbs={[{ name: "Our story", path: "/about" }]}
        eyebrow="Our story"
        title="Six miles from town. Right next door."
        intro="Primegala Medical Centre opened at Maili Sita in March 2022 with one simple promise: prime care, close to home, at any hour."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="prose-primegala">
            <p className="lead text-xl">
              In Swahili, <em>Maili Sita</em> means “six miles”: the distance along the old Nyahururu road from
              Nakuru town. For a long time, those six miles were the gap between many families and the care they
              needed.
            </p>
            <p>
              In daylight, six miles is a short matatu ride. At night it&apos;s something else. Matatus stop. A boda costs
              money that has to be found. A child&apos;s fever climbs, or labour begins, and town suddenly feels very far
              away.
            </p>
            <p>
              Primegala was opened to close that gap. Since <strong>1 March 2022</strong>, our doors on the
              Nakuru–Nyahururu Road, directly opposite <strong>Kiamaina Primary School</strong>, have stayed open{" "}
              <strong>24 hours a day</strong>. We&apos;re a registered <strong>KEPH Level 3</strong> medical centre,
              offering outpatient care, antenatal and maternity care, family planning, HIV testing and counselling,
              laboratory tests, pharmacy and inpatient admission.
            </p>
            <h2>Our mission</h2>
            <p>
              To give every family in Nakuru North dependable, respectful, affordable care, close to home and at any hour,
              and to help them make the most of SHA and Kenya&apos;s growing digital health system.
            </p>
            <h2>What “prime care” means to us</h2>
            <p>
              Prime care isn&apos;t about being the biggest. It&apos;s about doing the essentials exceptionally well: listening
              properly, testing before treating, explaining clearly in English or Kiswahili, being upfront about costs,
              and treating everyone with dignity, whether they walk in at noon or at 3 a.m.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="Our values" title="What guides us" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line">
              <Icon className="size-8 text-brand-600" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-4 font-sans text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our journey" title="From a gap on the map to a light that's always on" />
        <ol className="relative mt-12 ml-3 border-l-2 border-brand-100">
          {TIMELINE.map((t) => (
            <li key={t.when} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute top-1 -left-[9px] size-4 rounded-full bg-brand-600 ring-4 ring-white" aria-hidden />
              <p className="font-display text-xl font-semibold text-brand-700">{t.when}</p>
              <p className="mt-1 max-w-2xl leading-relaxed text-ink/80">{t.what}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/team">Meet our care team</ButtonLink>
          <ButtonLink href="/health-hub/six-miles-from-town" variant="secondary">
            Read: Six miles from town
          </ButtonLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
