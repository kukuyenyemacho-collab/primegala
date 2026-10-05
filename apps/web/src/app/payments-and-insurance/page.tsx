import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  FileText,
  Landmark,
  MessageSquareText,
  Receipt,
  Scale,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { CheckList, FaqSection, IconCard, InfoPanel, StepList } from "@/components/PageSections";
import { PAYMENT_FAQS } from "@/content/faqs";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { emailHref, hasPhone, phoneDisplay, site } from "@/lib/site";

const PATH = "/payments-and-insurance";

export const metadata: Metadata = pageMetadata({
  title: "Payments & Insurance: SHA, M-Pesa and Cash at Primegala, Nakuru",
  description:
    "How to pay at Primegala Medical Centre, Maili Sita: SHA for eligible services, M-Pesa and cash. We explain what is covered and any cost before treatment. Emergency treatment is a right under Article 43(2).",
  path: PATH,
  keywords: [
    ...keywordsFor("sha"),
    "affordable hospital Nakuru",
    "hospital that accepts M-Pesa Nakuru",
    "SHA cover Level 3 facility",
    "hospital costs Nakuru",
  ],
});

const FUNDS = [
  {
    name: "Primary Healthcare Fund (PHCF)",
    body: "Outpatient consultations, basic tests, antenatal care, family planning, child health and other primary care at Level 2 and 3 facilities like ours.",
  },
  {
    name: "Social Health Insurance Fund (SHIF)",
    body: "Inpatient care and admissions, for members whose contributions are up to date.",
  },
  {
    name: "Emergency, Chronic and Critical Illness Fund (ECCIF)",
    body: "Emergency care and stabilisation, and chronic or critical illness beyond SHIF limits.",
  },
];


export default function PaymentsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Payments & insurance", path: PATH }]}
        eyebrow="Payments & insurance"
        title="Payments & insurance"
        intro="Primegala accepts SHA for eligible services, M-Pesa and cash. Before treatment, our front desk checks your SHA eligibility with your national ID and explains what is covered and any cost to you."
      >
        <ButtonLink href="/sha" variant="trust" size="lg">
          How SHA works here <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/book?type=sha-help" variant="secondary" size="lg" track="book_click_payments">
          Get help with SHA
        </ButtonLink>
      </PageHero>

      <Section labelledBy="ways-to-pay">
        <SectionHeading id="ways-to-pay" eyebrow="Ways to pay" title="How you can pay at Primegala" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <IconCard icon={Landmark} title="SHA">
            {site.shaContracted
              ? "Accepted for eligible services. We confirm your cover with your ID before treatment."
              : "Our front desk explains how SHA applies to your visit."}
          </IconCard>
          <IconCard icon={Smartphone} title="M-Pesa">
            Pay at the front desk. Ask our team for the payment details and keep your confirmation message.
          </IconCard>
          <IconCard icon={Banknote} title="Cash">
            Pay at the front desk in Kenya shillings and ask for a receipt.
          </IconCard>
          <IconCard icon={ShieldCheck} title="Private insurance">
            Ask our front desk which insurance schemes we currently accept. Bring your insurance card and ID.
          </IconCard>
        </div>
      </Section>

      <Section tone="surface" labelledBy="clear-costs">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="clear-costs"
              eyebrow="Clear costs"
              title="We explain costs before treatment"
              intro="No one should be surprised by a bill. Before any treatment, we tell you what SHA or your insurer covers and what, if anything, you will need to pay."
            />
            <p className="mt-5 leading-relaxed text-muted">
              If your care plan changes, for example if you need a test or admission, we explain the cover and cost again
              before going ahead. You can always ask questions about any charge.
            </p>
          </div>
          <div className="lg:col-span-7">
            <StepList
              steps={[
                {
                  title: "Registration and eligibility check",
                  body: "Show your national ID (or your child's birth certificate). We check your SHA status in the national system.",
                },
                {
                  title: "We explain your cover",
                  body: "What SHA or your insurer pays for this visit, and any part that is not covered.",
                },
                {
                  title: "You decide",
                  body: "You agree to the plan and any cost before treatment begins, unless it is an emergency.",
                },
                {
                  title: "Pay and keep your receipt",
                  body: "Pay any balance by M-Pesa or cash and ask for a receipt.",
                },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="trustLight" labelledBy="sha-cover" className="border-y border-trust-100">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              id="sha-cover"
              eyebrow="Social Health Authority (SHA)"
              title={<span className="text-trust-950">Using SHA at Primegala</span>}
              intro="SHA replaced NHIF in October 2024. It pays for care through three funds. Benefit rules and tariffs are set by SHA and can change, so we always confirm yours."
            />
            <h3 className="mt-8 text-sm font-bold tracking-wider text-trust-800 uppercase">At the front desk</h3>
            <CheckList
              className="mt-4"
              items={[
                <>
                  <strong className="text-trust-950">Bring your national ID.</strong> We use it to check your
                  eligibility in the national system.
                </>,
                <>
                  <strong className="text-trust-950">Keep the phone registered with SHA with you.</strong> A one-time
                  code (OTP) may be sent to it to verify your visit.
                </>,
                <>
                  <strong className="text-trust-950">Not registered yet?</strong> Dial{" "}
                  <strong className="whitespace-nowrap text-trust-950">*147#</strong> on any phone, or ask our front
                  desk to help you.
                </>,
                <>
                  <strong className="text-trust-950">Children must be registered as dependants</strong> of a parent or
                  guardian to be covered.
                </>,
              ]}
            />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-trust-800 uppercase">The three SHA funds</h3>
            <ul className="mt-4 grid gap-3">
              {FUNDS.map((fund) => (
                <li key={fund.name} className="rounded-xl border border-trust-100 bg-white p-5">
                  <h4 className="font-bold text-trust-950">{fund.name}</h4>
                  <p className="mt-1 leading-relaxed text-muted">{fund.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/sha" variant="trust">
                SHA at Primegala <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/health-hub/how-to-use-sha-at-primegala" variant="secondary">
                Step-by-step SHA guide
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="pay-details">
        <SectionHeading id="pay-details" eyebrow="Good to know" title="M-Pesa, cash, insurance and receipts" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <IconCard icon={Smartphone} title="Paying by M-Pesa">
            <p>
              Pay at the front desk and our team will give you the payment details. Only pay to the details given to you
              at our front desk, and keep the M-Pesa confirmation message until you have your receipt.
            </p>
          </IconCard>
          <IconCard icon={FileText} title="Private insurance">
            <p>
              Ask our front desk which private insurance schemes we currently accept before your visit or on arrival.
              Bring your insurance card and ID. Some insurers need approval (pre-authorisation) before certain services,
              so tell us about your cover early.
            </p>
          </IconCard>
          <IconCard icon={Receipt} title="Receipts">
            <p>
              Ask for a receipt for every payment. Keep receipts with your M-Pesa messages: you may need them for an
              insurance claim, an employer, or if you have a question about a bill.
            </p>
          </IconCard>
          <IconCard icon={MessageSquareText} title="Questions about a bill">
            <p>
              Speak to the front desk at any time, or email{" "}
              <a href={emailHref("Question about a bill")} className="link-brand break-all">
                {site.contact.email}
              </a>
              {hasPhone && <> or call {phoneDisplay()}</>}. If you are not satisfied, use our{" "}
              <Link href="/legal/complaints" className="link-brand">
                complaints procedure
              </Link>
              .
            </p>
          </IconCard>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-4xl">
          <InfoPanel icon={Scale} as="h2" id="emergency-right" title="Emergency treatment is your right">
            <p>
              Under <strong>Article 43(2) of the Constitution of Kenya</strong>, no one may be denied emergency medical
              treatment. In an emergency we assess and stabilise first, and deal with SHA or payment afterwards. SHA&apos;s
              Emergency, Chronic and Critical Illness Fund (ECCIF) supports emergency care for registered members.
            </p>
            <p className="mt-3">
              <Link href="/emergency">What to do in an emergency</Link> ·{" "}
              <Link href="/legal/patient-rights">Your rights as a patient</Link>
            </p>
          </InfoPanel>
        </div>
      </Section>

      <FaqSection faqs={PAYMENT_FAQS} title="Payment questions" tone="white" />

      <CtaBand
        title="Questions about cost or cover?"
        body="Ask us before your visit or when you arrive. Our front desk is open 24 hours and will explain what SHA covers and any cost to you, before treatment."
      />
    </>
  );
}
