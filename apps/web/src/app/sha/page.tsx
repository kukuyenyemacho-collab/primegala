import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck, IdCard, Smartphone, UserCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "SHA at Primegala: Hospitals That Accept SHA in Nakuru North",
  description:
    "Primegala Medical Centre at Maili Sita accepts the Social Health Authority (SHA). How to register on *147#, what the Primary Healthcare Fund covers at Level 3, what to bring and how we check eligibility.",
  path: "/sha",
  keywords: keywordsFor("sha", "local"),
});

const FUNDS = [
  {
    name: "Primary Healthcare Fund (PHCF)",
    covers: "Outpatient consultations, basic lab tests, antenatal care, family planning, child health and immunisation, HIV testing, chronic disease follow-up and other primary care.",
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
    a: "Primegala Medical Centre at Maili Sita, opposite Kiamaina Primary School, accepts SHA and is open 24 hours. Check the official SHA facility list for other contracted facilities.",
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
    a: "Yes. Book a SHA help session or ask at reception. Bring your national ID and the phone you want to register.",
  },
];

export default function ShaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "SHA at Primegala", path: "/sha" }]}
        eyebrow="Social Health Authority"
        title={site.shaContracted ? "We accept SHA, and we'll help you use it" : "Using SHA at Primegala"}
        intro="Since SHA replaced NHIF in October 2024, many families aren't sure what's covered or how it works. Here's everything you need, in plain language."
      >
        <ButtonLink href="/book?type=sha-help" size="lg" track="book_click_sha_page">
          Get SHA help
        </ButtonLink>
        <ButtonLink href="/health-hub/how-to-use-sha-at-primegala" variant="secondary" size="lg">
          Read the full guide
        </ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="At the front desk" title="Three steps to use SHA at Primegala" align="center" />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { Icon: IdCard, title: "Bring your ID", body: "Your national ID, or your child's birth certificate. Children must be registered as dependants." },
            { Icon: Smartphone, title: "Keep your phone handy", body: "You may receive a one-time verification code on the phone number registered with SHA." },
            { Icon: UserCheck, title: "We confirm cover first", body: "We check eligibility in the national system and tell you what's covered before treatment begins." },
          ].map(({ Icon, title, body }, i) => (
            <li key={title} className="rounded-[var(--radius-card)] bg-surface p-7 ring-1 ring-line">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="font-display text-4xl font-semibold text-brand-200">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-sans text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="How SHA pays"
          title="The three SHA funds, explained"
          intro="Knowing which fund applies helps you know what to expect. Benefit rules and tariffs are set by SHA and can change. We'll always confirm yours."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {FUNDS.map((f) => (
            <article key={f.name} className="flex flex-col rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line">
              <h3 className="font-display text-xl font-semibold text-ink">{f.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{f.covers}</p>
              <p className="mt-5 flex gap-2 rounded-xl bg-brand-50 p-3 text-sm font-medium text-brand-800">
                <CircleCheck className="size-5 shrink-0" aria-hidden /> {f.note}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Not registered yet?" title="Register in minutes on *147#" />
            <ol className="mt-8 space-y-4 text-lg text-ink/85">
              <li className="flex gap-3"><span className="font-bold text-brand-600">1.</span> Dial <strong>*147#</strong> on any network.</li>
              <li className="flex gap-3"><span className="font-bold text-brand-600">2.</span> Choose registration and enter your national ID number.</li>
              <li className="flex gap-3"><span className="font-bold text-brand-600">3.</span> Add your spouse and children as dependants.</li>
              <li className="flex gap-3"><span className="font-bold text-brand-600">4.</span> Complete the household means-testing questions.</li>
            </ol>
            <p className="mt-6 text-muted">
              You can also register on the official SHA portal. Stuck? We&apos;ll help at the front desk, any time.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-brand-900 p-8 text-white">
            <h3 className="font-display text-2xl font-semibold">Pregnant? Register early.</h3>
            <p className="mt-3 leading-relaxed text-brand-100">
              Under current SHA rules, normal delivery at Level 2 and 3 facilities is paid for through the Primary
              Healthcare Fund for registered members. Register on SHA early in your pregnancy and confirm your status at
              your first antenatal visit, not on the day labour starts.
            </p>
            <Link href="/services/maternity" className="mt-5 inline-flex items-center gap-2 font-semibold text-sun-300">
              Maternity at Primegala <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="SHA FAQs" title="Common SHA questions" />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={SHA_FAQS} />
          </div>
        </div>
      </Section>

      <CtaBand title="Questions about your SHA cover?" body="Walk in any time, or book a SHA help session and we'll sort out registration, dependants and eligibility with you." />
    </>
  );
}
