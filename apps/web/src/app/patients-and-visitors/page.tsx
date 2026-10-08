import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, CalendarCheck, Clock, IdCard, Languages, Siren } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { ButtonLink } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import {
  CheckList,
  ContentBlock,
  ContentWithToc,
  FaqSection,
  InfoPanel,
  Prose,
  StepList,
  VisitFacts,
  type TocItem,
} from "@/components/PageSections";
import { VISITOR_FAQS } from "@/content/faqs";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, emailHref, hasPhone, phoneDisplay, site } from "@/lib/site";

const PATH = "/patients-and-visitors";

export const metadata: Metadata = pageMetadata({
  title: "Patient & Visitor Guide: Your Visit to Primegala, Maili Sita",
  description:
    "What to bring, what happens at the front desk and triage, tests and pharmacy on site, admission, visiting, discharge, your records and feedback at Primegala Medical Centre, Maili Sita, Nakuru. Open 24 hours.",
  path: PATH,
  keywords: [
    ...keywordsFor("local", "inpatient"),
    "what to bring to hospital Kenya",
    "hospital visiting guidelines Nakuru",
    "how to request medical records Kenya",
  ],
});

const TOC: TocItem[] = [
  { id: "before-your-visit", label: "Before your visit" },
  { id: "arriving", label: "Arriving and the front desk" },
  { id: "triage", label: "Triage and waiting" },
  { id: "consultation", label: "Your consultation" },
  { id: "tests-and-pharmacy", label: "Tests and pharmacy" },
  { id: "admission", label: "If you are admitted" },
  { id: "visiting", label: "Visiting a patient" },
  { id: "discharge", label: "Discharge and follow-up" },
  { id: "records-and-privacy", label: "Your records and privacy" },
  { id: "support", label: "Language and access support" },
  { id: "feedback", label: "Feedback and complaints" },
];

export default function PatientsAndVisitorsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          url: absoluteUrl(PATH),
          name: `Patient & visitor guide | ${site.name}`,
          inLanguage: "en-KE",
          audience: { "@type": "Patient" },
          about: { "@id": `${site.url}/#organization` },
          isPartOf: { "@id": `${site.url}/#website` },
        }}
      />
      <PageHero
        crumbs={[{ name: "Patient & visitor guide", path: PATH }]}
        eyebrow="Patients & visitors"
        title="Patient & visitor guide"
        intro="Walk in at any hour or book ahead. Bring your national ID, the phone registered with SHA and any previous records. At the front desk we check your SHA eligibility, a nurse sees you for triage, and the sickest patients are always seen first."
        aside={<VisitFacts />}
      >
        <ButtonLink href="/book" size="lg" track="book_click_patient_guide">
          <CalendarCheck className="size-5" aria-hidden /> Book a visit
        </ButtonLink>
        <ButtonLink href="/emergency" variant="secondary" size="lg">
          <Siren className="size-5" aria-hidden /> Emergency care
        </ButtonLink>
      </PageHero>

      <ContentWithToc toc={TOC}>
        <ContentBlock
          id="before-your-visit"
          eyebrow="Step 1"
          title="Before your visit"
          intro="You don't need an appointment, but a few documents make registration and SHA checks much quicker."
        >
          <h3 className="text-lg font-bold text-ink">What to bring</h3>
          <CheckList
            items={[
              <>
                <strong className="text-ink">National ID</strong>, or your child&apos;s birth certificate or birth
                notification.
              </>,
              <>
                <strong className="text-ink">Your SHA details and the phone registered with SHA.</strong> A one-time
                verification code may be sent to it.
              </>,
              <>
                <strong className="text-ink">Previous records:</strong> prescriptions, test results, referral letters or
                discharge notes.
              </>,
              <>
                <strong className="text-ink">A list of the medicines you take</strong>, or the packets themselves,
                including herbal remedies.
              </>,
              <>
                <strong className="text-ink">Your Mother &amp; Child Health booklet</strong> for pregnancy, postnatal
                and child visits.
              </>,
              <>
                <strong className="text-ink">M-Pesa or cash</strong> for anything that is not covered. We tell you about
                any cost before treatment.
              </>,
            ]}
          />
          <InfoPanel icon={IdCard} title="Check your SHA status before you come">
            <p>
              Dial <strong className="whitespace-nowrap">*147#</strong> on any phone to check or complete your SHA
              registration, and add your spouse and children as dependants. It is easier to fix a registration problem
              before you need care. <Link href="/sha">How SHA works at Primegala</Link>.
            </p>
          </InfoPanel>
          <Prose>
            <p>
              Booking is optional. If you&apos;d like us to expect you,{" "}
              <Link href="/book" className="link-brand">
                request a visit online
              </Link>{" "}
              and our team will contact you to confirm.
            </p>
          </Prose>
        </ContentBlock>

        <ContentBlock id="arriving" eyebrow="Step 2" title="Arriving and the front desk">
          <Prose>
            <p>
              We are at Maili Sita Centre on the Nakuru–Nyahururu Road, directly opposite Kiamaina Primary School, about
              10 km from Nakuru town. Matatus heading towards Bahati, Kiamaina and Nyahururu can drop you at Maili Sita.{" "}
              <Link href="/contact" className="link-brand">
                Directions and map
              </Link>
              .
            </p>
            <p>At the front desk, our team will:</p>
          </Prose>
          <Photo name="reception" caption="Our reception desk. The triage room is the door just beside it." className="max-w-md" />
          <StepList
            steps={[
              { title: "Open or find your patient file", body: "Using your ID, or your child's details." },
              {
                title: "Check your SHA eligibility",
                body: "We look you up in the national system. You may receive a one-time code on the phone registered with SHA.",
              },
              {
                title: "Explain what is covered",
                body: "We tell you what SHA or your insurer covers and any cost to you, before treatment begins.",
              },
            ]}
          />
          <Prose>
            <p>
              Read more about{" "}
              <Link href="/payments-and-insurance" className="link-brand">
                payments and insurance
              </Link>
              .
            </p>
          </Prose>
        </ContentBlock>

        <ContentBlock id="triage" eyebrow="Step 3" title="Triage and waiting">
          <Prose>
            <p>
              A nurse checks your temperature, blood pressure, pulse and weight and asks what brought you in. This is
              called <strong>triage</strong>. It decides the order in which patients are seen:{" "}
              <strong>the sickest patients are always seen first</strong>, whatever time they arrived.
            </p>
            <p>
              Waiting times depend on how busy we are and how urgent other patients&apos; needs are. If you or your
              child feel worse while waiting, tell the nurse straight away.
            </p>
          </Prose>
          <InfoPanel icon={Siren} title="Danger signs: tell the nurse immediately">
            <p>
              Difficulty breathing, chest pain, heavy bleeding, a seizure, confusion, a child who cannot drink or is
              very sleepy, or bleeding in pregnancy. See <Link href="/emergency">emergency care</Link> for the full
              list.
            </p>
          </InfoPanel>
        </ContentBlock>

        <ContentBlock id="consultation" eyebrow="Step 4" title="Your consultation">
          <Prose>
            <p>
              A registered clinician listens to your concerns, examines you and explains what they find, in English or
              Kiswahili. They will discuss the treatment options and ask for your consent before any examination,
              procedure or treatment.
            </p>
          </Prose>
          <CheckList
            items={[
              "Write down your questions beforehand so nothing is forgotten.",
              "You are welcome to bring a family member or friend into the consultation.",
              "Ask the clinician to repeat or explain anything that is unclear.",
              <>
                You may ask for the name and registration of the professional caring for you.{" "}
                <Link href="/team" className="link-brand">
                  About our care team
                </Link>
                .
              </>,
            ]}
          />
        </ContentBlock>

        <ContentBlock id="tests-and-pharmacy" eyebrow="Step 5" title="Tests and pharmacy on site">
          <Prose>
            <p>
              If you need a test, our{" "}
              <Link href="/services/laboratory" className="link-brand">
                on-site laboratory
              </Link>{" "}
              takes the sample, and most routine results are ready during the same visit. Your clinician explains the
              results and the next steps.
            </p>
            <p>
              Prescriptions are filled at our{" "}
              <Link href="/services/pharmacy" className="link-brand">
                pharmacy
              </Link>
              . The pharmacy team checks your dose, allergies and other medicines, and shows you how and when to take
              each one. Ask what to do if you miss a dose.
            </p>
          </Prose>
          <Photo name="pharmacyCounter" caption="The Primegala pharmacy, with medicines sorted by type." className="max-w-md" />
        </ContentBlock>

        <ContentBlock
          id="admission"
          title="If you are admitted"
          intro="When someone needs closer observation, IV treatment or round-the-clock nursing, the clinician will recommend admission and explain why."
        >
          <Prose>
            <p>
              Before admission we explain the care plan, the expected length of stay, and what SHA covers or what it
              will cost. For SHA members, inpatient care is covered under the Social Health Insurance Fund (SHIF) when
              contributions are up to date.{" "}
              <Link href="/services/inpatient-care" className="link-brand">
                More about inpatient care
              </Link>
              .
            </p>
          </Prose>
          <h3 className="text-lg font-bold text-ink">What to bring for a stay</h3>
          <CheckList
            columns={2}
            items={[
              "National ID, SHA details and the phone registered with SHA",
              "All current medicines, in their packets",
              "Recent test results and any referral notes",
              "Nightwear and a change of clothes",
              "Toiletries, a towel and slippers",
              "A phone and charger",
              "The number of one family contact we can update",
              "For maternity: your Mother & Child Health booklet and baby clothes",
            ]}
          />
          <p className="text-sm leading-relaxed text-muted">
            Please leave jewellery and large amounts of cash at home. Planning a birth? See the{" "}
            <Link href="/health-hub/hospital-bag-checklist" className="link-brand">
              maternity bag checklist
            </Link>
            .
          </p>
        </ContentBlock>

        <ContentBlock
          id="visiting"
          title="Visiting a patient"
          intro="Visits from family and friends help people recover. Please ask the front desk for current visiting hours, and follow these guidelines to keep every patient safe."
        >
          <CheckList
            items={[
              "Clean your hands with soap and water or hand sanitiser before and after your visit.",
              "Please stay away if you have a fever, cough, diarrhoea, vomiting or a rash. Send a message instead.",
              "Keep visits short and small so patients can rest.",
              "Sit on a chair, not on the patient's bed.",
              "Check with the nurse before bringing food or drink: some patients are on special diets or fasting.",
              "Ask before bringing young children, and keep them with you at all times.",
              "Keep your phone on silent and don't take photos of other patients.",
              "Follow the instructions of the nurses and midwives, especially on the maternity ward.",
            ]}
          />
        </ContentBlock>

        <ContentBlock id="discharge" title="Discharge and follow-up">
          <Prose>
            <p>Before you go home, after a visit or a stay, we make sure you have:</p>
          </Prose>
          <CheckList
            items={[
              "Your medicines, with clear instructions on how to take them",
              "Written advice on caring for yourself or your child at home",
              "The warning signs that mean you should come back straight away",
              "A follow-up date, if you need one",
              "A referral letter and notes, if you are being referred to another facility",
            ]}
          />
          <Prose>
            <p>
              With your consent, we can send appointment, refill and immunisation reminders using the contact method you
              choose. We never send diagnoses or test results by message, and you can opt out at any time.{" "}
              <Link href="/legal/communications-consent" className="link-brand">
                Communications policy
              </Link>
              .
            </p>
          </Prose>
        </ContentBlock>

        <ContentBlock id="records-and-privacy" title="Your records and privacy">
          <Prose>
            <p>
              Your health information is confidential. We handle it in line with the Health Act, 2017, the Data
              Protection Act, 2019 and the Digital Health Act, 2023, and share it only as the law allows: for example,
              with SHA to check eligibility and claims, or with a hospital you are referred to.
            </p>
          </Prose>
          <InfoPanel title="How to request your medical records">
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>
                Ask at the front desk, or email{" "}
                <a href={emailHref("Request for medical records")} className="break-all">
                  {site.contact.email}
                </a>{" "}
                with your full name, date of birth and approximate visit dates.
              </li>
              <li>Bring your national ID. We confirm your identity before sharing any records.</li>
              <li>
                A parent or guardian can request a child&apos;s records. To have someone else collect yours, give them
                your written authorisation and a copy of your ID.
              </li>
            </ol>
          </InfoPanel>
          <Prose>
            <p>
              Read our{" "}
              <Link href="/legal/privacy-policy" className="link-brand">
                Privacy Policy
              </Link>{" "}
              and your{" "}
              <Link href="/legal/patient-rights" className="link-brand">
                rights and responsibilities as a patient
              </Link>
              .
            </p>
          </Prose>
        </ContentBlock>

        <ContentBlock id="support" title="Language and access support">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoPanel icon={Languages} title="English and Kiswahili">
              <p>
                Our team explains care in English or Kiswahili. Read key information on our{" "}
                <Link href="/kiswahili" hrefLang="sw">
                  Kiswahili page
                </Link>
                .
              </p>
            </InfoPanel>
            <InfoPanel icon={Accessibility} title="Help getting around">
              <p>
                Tell us on arrival if you need help moving around, a seat while you wait, or a family member or
                interpreter with you. <Link href="/legal/accessibility">Accessibility</Link>.
              </p>
            </InfoPanel>
          </div>
        </ContentBlock>

        <ContentBlock id="feedback" title="Feedback and complaints">
          <Prose>
            <p>
              Tell us how we did. Compliments, suggestions and complaints all help us improve, and raising a concern
              never affects the care you receive.
            </p>
          </Prose>
          <CheckList
            items={[
              "In person: speak to the nurse in charge at any time, day or night.",
              <>
                By email:{" "}
                <a href={emailHref("Feedback")} className="link-brand break-all">
                  {site.contact.email}
                </a>
                {hasPhone && <>, or call {phoneDisplay()}</>}
              </>,
              "In writing: use the suggestion box at reception.",
            ]}
          />
          <Prose>
            <p>
              We acknowledge complaints within 2 working days. Read the full{" "}
              <Link href="/legal/complaints" className="link-brand">
                feedback and complaints procedure
              </Link>
              .
            </p>
          </Prose>
          <InfoPanel icon={Clock} title="Open 24 hours, every day">
            <p>
              Our front desk is staffed day and night, including weekends and public holidays. If something is urgent,
              come straight in.
            </p>
          </InfoPanel>
        </ContentBlock>
      </ContentWithToc>

      <FaqSection faqs={VISITOR_FAQS} title="Questions about your visit" />

      <CtaBand
        title="Ready when you are, day or night."
        body="Walk in at any hour or book ahead and we'll be ready for you. We're at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School."
      />
    </>
  );
}
