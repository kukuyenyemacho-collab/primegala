import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, FlaskConical, HeartPulse, Pill, Stethoscope, UserRound, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { IconCard, InfoPanel } from "@/components/PageSections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Care Team: Clinicians, Nurses & Midwives at Maili Sita",
  description:
    "The registered clinicians, nurses, midwives, laboratory, pharmacy and front-desk teams who care for patients 24 hours a day at Primegala Medical Centre, Maili Sita, and how to check a health professional's registration.",
  path: "/team",
  keywords: ["doctor near me Nakuru", "clinical officer Nakuru", "midwife Nakuru", "daktari karibu Maili Sita"],
});

/**
 * Roles only until staff consent to being named and photographed (KMPDC Advertising
 * Rules 2016: names, registration and qualifications may be published).
 * To add people: name, role, registration body + number, qualifications, languages, photo.
 */
const ROLES = [
  {
    Icon: Stethoscope,
    title: "Clinicians",
    body: "Assess, diagnose and treat patients around the clock, and decide when someone needs tests, admission or referral.",
  },
  {
    Icon: HeartPulse,
    title: "Nurses & midwives",
    body: "Triage, maternity and newborn care, immunisation, family planning and 24-hour ward nursing.",
  },
  {
    Icon: FlaskConical,
    title: "Laboratory team",
    body: "Collect samples and run the tests that guide treatment, with most routine results ready during the same visit.",
  },
  {
    Icon: Pill,
    title: "Pharmacy team",
    body: "Dispense medicines safely, check for interactions and explain every dose in English or Kiswahili.",
  },
  {
    Icon: Users,
    title: "HIV testing counsellors",
    body: "Confidential, judgement-free counselling before and after testing, with linkage to prevention or treatment.",
  },
  {
    Icon: UserRound,
    title: "Front desk",
    body: "Registration, SHA eligibility checks, payments and help with bookings, records requests and feedback.",
  },
];

const REGULATORS = [
  { profession: "Doctors and dentists", body: "Kenya Medical Practitioners and Dentists Council (KMPDC)" },
  { profession: "Clinical officers", body: "Clinical Officers Council" },
  { profession: "Nurses and midwives", body: "Nursing Council of Kenya" },
  { profession: "Pharmacists and pharmaceutical technologists", body: "Pharmacy and Poisons Board" },
  { profession: "Laboratory professionals", body: "Kenya Medical Laboratory Technicians and Technologists Board" },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Our care team", path: "/team" }]}
        eyebrow="Our people"
        title="The people who keep the lights on at night"
        intro="Primegala is staffed 24 hours a day by registered health professionals: clinicians, nurses and midwives, laboratory and pharmacy teams, HIV testing counsellors and a front-desk team who help with registration and SHA."
      />

      <Section labelledBy="roles">
        <SectionHeading
          id="roles"
          eyebrow="Who you'll meet"
          title="A full care team, 24 hours a day"
          intro="From the front desk to the ward, each person has a part in your visit."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map(({ Icon, title, body }) => (
            <IconCard key={title} icon={Icon} title={title}>
              {body}
            </IconCard>
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="registration">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="registration"
              eyebrow="Registration"
              title="Every clinician is registered"
              intro="Every clinician at Primegala is registered with their professional regulatory body. You are always welcome to ask for the name and registration of the professional caring for you."
            />
            <InfoPanel icon={BadgeCheck} className="mt-8" title="Your right to know">
              <p>
                Knowing who is treating you is part of your right to information. Read your{" "}
                <Link href="/legal/patient-rights">patient rights and responsibilities</Link>.
              </p>
            </InfoPanel>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <h3 className="text-sm font-bold tracking-wider text-trust-800 uppercase">Who registers health professionals in Kenya</h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-white">
              <table className="w-full text-left text-sm sm:text-base">
                <caption className="sr-only">Regulatory bodies for health professionals in Kenya</caption>
                <thead className="bg-surface text-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Profession</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Regulated by</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {REGULATORS.map((r) => (
                    <tr key={r.profession}>
                      <td className="px-4 py-3 align-top text-ink">{r.profession}</td>
                      <td className="px-4 py-3 align-top text-muted">{r.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Concerned about a professional&apos;s conduct? See our{" "}
              <Link href="/legal/complaints" className="link-brand">
                feedback and complaints procedure
              </Link>
              , which lists where you can escalate a concern.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
