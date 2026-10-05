import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Baby, IdCard, Scale, Smartphone, UserCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { FaqSection, IconCard, InfoPanel, StepList } from "@/components/PageSections";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "SHA at Primegala: Hospitals That Accept SHA in Nakuru North",
  description:
    "Primegala Medical Centre at Maili Sita accepts the Social Health Authority (SHA) for eligible services. How to register on *147#, what the Primary Healthcare Fund covers at Level 3, what to bring and how we check eligibility.",
  path: "/sha",
  keywords: keywordsFor("sha", "local"),
});

const FUNDS = [
  {
    name: "Primary Healthcare Fund (PHCF)",
    covers:
      "Outpatient consultations, basic lab tests, antenatal care, family planning, child health and immunisation, HIV testing, chronic disease follow-up and other primary care.",
    note: "Funded by government for registered members at Level 2 and 3 facilities.",
  },
  {
    name: "Social Health Insurance Fund (SHIF)",
    covers: "Inpatient admission, surgical care, specialist and other services above primary level.",
    note: "Requires active contributions.",
  },
  {
    name: "Emergency, Chronic & Critical Illness Fund (ECCIF)",
    covers: "Emergency stabilisation and care, critical illness and chronic conditions beyond SHIF limits.",
    note: "Supports emergency care at every level.",
  },
];

const SHA_FAQS = [
  {
    q: "Does Primegala Medical Centre accept SHA?",
    a: site.shaContracted
      ? "Yes. Primegala accepts SHA for eligible services. Our front desk checks your eligibility with your national ID before treatment."
      : "Our front desk will explain how SHA applies to your visit.",
  },
  {
    q: "Which hospitals accept SHA along the Nakuru–Nyahururu Road?",
    a: "Primegala Medical Centre at Maili Sita, opposite Kiamaina Primary School, accepts SHA for eligible services and is open 24 hours. Check the official SHA facility list for other contracted facilities.",
  },
  {
    q: "How do I check if I'm registered with SHA?",
    a: "Dial *147# and follow the prompts to check your status, or ask our front desk to look you up using your national ID.",
  },
  {
    q: "Is outpatient care free under SHA at a Level 3 facility?",
    a: "Primary healthcare services at Level 2 and 3 facilities are funded through the Primary Healthcare Fund for registered members. We'll tell you before treatment if any part of your care isn't covered.",
  },
  {
    q: "What happened to NHIF?",
    a: "NHIF was replaced by the Social Health Authority (SHA) in October 2024. If you were an NHIF member, make sure your registration has been carried over to SHA by dialling *147#.",
  },
  {
    q: "Can you help me register for SHA?",
    a: "Yes. Ask at our front desk at any hour, or request a SHA help session online. Bring your national ID and the phone you want to register.",
  },
];

export default function ShaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "SHA at Primegala", path: "/sha" }]}
        eyebrow="Social Health Authority (SHA)"
        title={site.shaContracted ? "We accept SHA, and we'll help you use it" : "Using SHA at Primegala"}
        intro={
          site.shaContracted
            ? "Primegala accepts SHA for eligible services. Bring your national ID and the phone registered with SHA: our front desk checks your eligibility and explains what is covered before treatment."
            : "Bring your national ID and the phone registered with SHA: our front desk will explain how SHA applies to your visit before treatment."
        }
      >
        <ButtonLink href="/book?type=sha-help" size="lg" track="book_click_sha_page">
          Get SHA help
        </ButtonLink>
        <ButtonLink href="/health-hub/how-to-use-sha-at-primegala" variant="secondary" size="lg">
          Read the full guide
        </ButtonLink>
      </PageHero>

      <Section labelledBy="three-steps">
        <SectionHeading
          id="three-steps"
          eyebrow="At the front desk"
          title="Three steps to use SHA at Primegala"
          intro="Since SHA replaced NHIF in October 2024, many families aren't sure how it works. At our front desk it comes down to three steps."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: IdCard,
              title: "Bring your ID",
              body: "Your national ID, or your child's birth certificate. Children must be registered as dependants.",
            },
            {
              Icon: Smartphone,
              title: "Keep your phone handy",
              body: "You may receive a one-time verification code on the phone number registered with SHA.",
            },
            {
              Icon: UserCheck,
              title: "We confirm cover first",
              body: "We check eligibility in the national system and tell you what's covered before treatment begins.",
            },
          ].map(({ Icon, title, body }, i) => (
            <li key={title} className="flex flex-col rounded-xl border border-line bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-sm font-bold text-trust-700">Step {i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="trustLight" labelledBy="funds" className="border-y border-trust-100">
        <SectionHeading
          id="funds"
          eyebrow="How SHA pays"
          title={<span className="text-trust-950">The three SHA funds, explained</span>}
          intro="Knowing which fund applies helps you know what to expect. Benefit rules and tariffs are set by SHA and can change. We'll always confirm yours."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {FUNDS.map((f) => (
            <article key={f.name} className="flex flex-col rounded-xl border border-trust-100 bg-white p-6">
              <h3 className="text-lg font-bold text-trust-950">{f.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{f.covers}</p>
              <p className="mt-5 border-t border-trust-100 pt-4 text-sm font-semibold text-trust-800">{f.note}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="register">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading id="register" eyebrow="Not registered yet?" title="Register in minutes on *147#" />
            <StepList
              className="mt-8"
              steps={[
                { title: "Dial *147#", body: "On any phone and any network." },
                { title: "Choose registration", body: "Enter your national ID number." },
                { title: "Add your dependants", body: "Register your spouse and children so they are covered too." },
                { title: "Complete the household questions", body: "Answer the means-testing questions about your household." },
              ]}
            />
            <p className="mt-5 leading-relaxed text-muted">
              You can also register on the official SHA portal. Stuck? We&apos;ll help at the front desk, any time.
            </p>
          </div>
          <div className="space-y-5">
            <IconCard icon={Baby} title="Pregnant? Register early." as="h3">
              <p>
                Under current SHA rules, normal delivery at Level 2 and 3 facilities is paid for through the Primary
                Healthcare Fund for registered members. Register on SHA early in your pregnancy and confirm your status at
                your first antenatal visit, not on the day labour starts.
              </p>
              <Link href="/services/maternity" className="link-brand mt-4 inline-flex items-center gap-1.5">
                Maternity at Primegala <ArrowRight className="size-4" aria-hidden />
              </Link>
            </IconCard>
            <InfoPanel icon={Scale} title="Emergency care is a right">
              <p>
                Under Article 43(2) of the Constitution of Kenya, no one may be denied emergency medical treatment. In an
                emergency we treat and stabilise first, and check SHA afterwards.{" "}
                <Link href="/emergency">Emergency care</Link>.
              </p>
            </InfoPanel>
            <InfoPanel title="Paying for anything not covered">
              <p>
                We accept M-Pesa and cash, and explain any cost before treatment.{" "}
                <Link href="/payments-and-insurance">Payments and insurance</Link>.
              </p>
            </InfoPanel>
          </div>
        </div>
      </Section>

      <FaqSection faqs={SHA_FAQS} eyebrow="SHA FAQs" title="Common SHA questions" />

      <CtaBand
        title="Questions about your SHA cover?"
        body="Walk in any time, or book a SHA help session and we'll sort out registration, dependants and eligibility with you."
      />
    </>
  );
}
