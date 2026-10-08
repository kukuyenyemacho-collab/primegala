import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, HandHeart, HeartHandshake, Sun, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { FactList, IconCard } from "@/components/PageSections";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Story: A 24-Hour Medical Centre at Maili Sita Since 2022",
  description:
    "Why Primegala Medical Centre opened at Maili Sita on the Nakuru–Nyahururu Road in 2022, our mission, our values and the care we offer every family in Nakuru North. KEPH Level 3, open 24 hours.",
  path: "/about",
  keywords: ["Primegala Medical Centre", "hospital Maili Sita", "is there a hospital at Maili Sita", "medical centre Nakuru North", "level 3 hospital Nakuru"],
});

const TIMELINE = [
  {
    when: "Before 2022",
    what: "Families around Maili Sita travel about six miles to Nakuru town for many health needs, which is hardest at night.",
  },
  {
    when: "1 March 2022",
    what: "Primegala Medical Centre opens at Maili Sita Centre, opposite Kiamaina Primary School, as a 24-hour KEPH Level 3 facility.",
  },
  {
    when: "October 2024",
    what: "The Social Health Authority (SHA) replaces NHIF. Our front desk helps patients register, add dependants and understand their cover.",
  },
  {
    when: "Today",
    what: "Open every hour of every day, with outpatient, maternity, laboratory, pharmacy and inpatient care under one roof.",
  },
];

/** Our core values, as displayed on the board at the Primegala reception desk. */
const VALUES = [
  {
    Icon: Users,
    title: "Collaboration",
    body: "We foster teamwork within the organisation and work with partners to deliver the best possible value to our patients.",
  },
  {
    Icon: BadgeCheck,
    title: "Professionalism",
    body: "We hold ourselves to high standards of professional conduct and accountability, in line with legal, regulatory and best-practice requirements.",
  },
  { Icon: HandHeart, title: "Care", body: "Our service helps each individual person, and improves the health of the whole community." },
  { Icon: HeartHandshake, title: "Compassion", body: "Our care is given through relationships based on empathy, respect and dignity." },
  { Icon: Sun, title: "Commitment", body: "Our patients are our cornerstone, every hour of every day." },
];

const AIMS = ["Quality and standards", "Accessibility and equity", "Professionalism", "Community well-being", "Continuous improvement"];

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
        intro="Primegala Medical Centre is a 24-hour, KEPH Level 3 medical centre at Maili Sita on the Nakuru–Nyahururu Road. We opened on 1 March 2022 with one simple aim: prime care, close to home, at any hour."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              <p className="text-xl text-ink">
                In Swahili, <em>Maili Sita</em> means “six miles”: the distance along the old Nyahururu road from Nakuru
                town. For a long time, those six miles were the gap between many families and the care they needed.
              </p>
              <p>
                In daylight, six miles is a short matatu ride. At night it&apos;s something else. Matatus stop. A boda costs
                money that has to be found. A child&apos;s fever climbs, or labour begins, and town suddenly feels very far
                away.
              </p>
              <p>
                Primegala was opened to close that gap. Since <strong className="text-ink">1 March 2022</strong>, our doors
                on the Nakuru–Nyahururu Road, directly opposite <strong className="text-ink">Kiamaina Primary School</strong>,
                have stayed open <strong className="text-ink">24 hours a day</strong>. We offer outpatient care, antenatal
                and maternity care, family planning, HIV testing and counselling, laboratory tests, pharmacy and inpatient
                admission.
              </p>
            </div>

            <Photo
              name="reception"
              priority
              className="mt-10 max-w-md"
              caption="Our reception at Maili Sita, with our quality policy and values on the desk. Triage is the door beside it."
            />

            <h2 className="mt-14 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Our mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              To give every family in Nakuru North dependable, respectful, affordable care, close to home and at any hour,
              and to help them make the most of SHA and Kenya&apos;s growing digital health system.
            </p>

            <h2 className="mt-14 text-2xl font-bold tracking-tight text-ink sm:text-3xl">What “prime care” means to us</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              Prime care is about doing the essentials well: listening properly, testing before treating, explaining
              clearly in English or Kiswahili, being upfront about costs, and treating everyone with dignity, whether they
              walk in at noon or at 3 a.m. When someone needs more than a Level 3 facility can offer, we stabilise them and
              arrange referral to a higher-level hospital.
            </p>
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <div className="rounded-xl border border-trust-100 bg-trust-50 p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-bold text-trust-950">Facility facts</h2>
              <FactList
                className="mt-4"
                tone="trust"
                items={[
                  { term: "Registered name", value: site.name },
                  { term: "Facility level", value: "KEPH Level 3 medical centre, registered on the Kenya Master Health Facility Registry" },
                  { term: "Opened", value: "1 March 2022" },
                  { term: "Hours", value: "Open 24 hours, every day, including public holidays" },
                  { term: "Location", value: "Maili Sita Centre, Nakuru–Nyahururu Road, opposite Kiamaina Primary School" },
                  { term: "Area", value: `${site.address.ward}, ${site.address.subCounty}, ${site.address.region}` },
                  { term: "SHA", value: site.shaContracted ? "Accepted for eligible services" : "Ask our front desk" },
                  { term: "Languages", value: "English and Kiswahili" },
                ]}
              />
              <p className="mt-5 text-sm">
                <Link href="/contact" className="link-brand inline-flex items-center gap-1">
                  Contact and directions <ArrowRight className="size-4" aria-hidden />
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface" labelledBy="values">
        <SectionHeading
          id="values"
          eyebrow="Our values"
          title="What guides us"
          intro="The same five values you'll see on the board at our reception desk."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ Icon, title, body }) => (
            <IconCard key={title} icon={Icon} title={title}>
              {body}
            </IconCard>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-line bg-white p-6">
          <h3 className="font-bold text-ink">Our aims</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {AIMS.map((a) => (
              <li key={a} className="rounded-full border border-trust-100 bg-trust-50 px-3.5 py-1.5 text-sm font-semibold text-trust-800">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="journey">
        <SectionHeading id="journey" eyebrow="Our journey" title="From a gap on the map to a light that's always on" />
        <ol className="mt-10 max-w-3xl border-l-2 border-trust-100">
          {TIMELINE.map((t) => (
            <li key={t.when} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute top-1.5 -left-[9px] size-4 rounded-full border-4 border-white bg-trust-700" aria-hidden />
              <p className="text-lg font-bold text-trust-800">{t.when}</p>
              <p className="mt-1 leading-relaxed text-ink/85">{t.what}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/team">Meet our care team</ButtonLink>
          <ButtonLink href="/health-hub/six-miles-from-town" variant="secondary">
            Read: Six miles from town
          </ButtonLink>
          <ButtonLink href="/patients-and-visitors" variant="secondary">
            Patient & visitor guide
          </ButtonLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
