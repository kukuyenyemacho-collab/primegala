import type { Metadata } from "next";
import { FlaskConical, HeartPulse, Pill, Stethoscope, UserRound, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Care Team: Clinicians, Nurses & Midwives at Maili Sita",
  description:
    "Meet the registered clinical officers, nurses, midwives, laboratory and pharmacy professionals who care for patients 24 hours a day at Primegala Medical Centre, Maili Sita.",
  path: "/team",
  keywords: ["doctor near me Nakuru", "clinical officer Nakuru", "midwife Nakuru", "daktari karibu Maili Sita"],
});

/**
 * Roles only until staff consent to being named and photographed (KMPDC Advertising
 * Rules 2016: names, registration and qualifications may be published).
 * To add people: name, role, registration body + number, qualifications, languages, photo.
 */
const ROLES = [
  { Icon: Stethoscope, title: "Clinical officers & medical officers", body: "Assess, diagnose and treat patients around the clock, registered with their professional councils." },
  { Icon: HeartPulse, title: "Nurses & midwives", body: "Triage, maternity and newborn care, immunisation, family planning and 24-hour ward nursing." },
  { Icon: FlaskConical, title: "Laboratory technologists", body: "Run the tests that guide treatment, with most results ready the same visit." },
  { Icon: Pill, title: "Pharmaceutical technologists", body: "Dispense medicines safely and explain every dose in English or Kiswahili." },
  { Icon: Users, title: "HIV testing counsellors", body: "Confidential, judgement-free counselling and testing." },
  { Icon: UserRound, title: "Front desk & SHA desk", body: "Registration, SHA eligibility checks and help with bookings and reminders." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Our care team", path: "/team" }]}
        eyebrow="Our people"
        title="The people who keep the lights on at night"
        intro="Behind every 2 a.m. fever brought down and every baby safely delivered is a team of registered health professionals from our own community."
      />
      <Section>
        <SectionHeading eyebrow="Who you'll meet" title="A full care team, 24 hours a day" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-[var(--radius-card)] bg-surface p-7 ring-1 ring-line">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-sans text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl rounded-2xl bg-cream p-5 text-sm leading-relaxed text-ink/80 ring-1 ring-sun-200/60">
          Every clinician at Primegala is registered with their regulatory body. You&apos;re always welcome to ask for the
          name and registration of the professional caring for you.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
