import type { Metadata } from "next";
import Link from "next/link";
import { Baby, HeartPulse, Mail, Navigation, Phone, Scale, Siren, UserRound } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { MapEmbed } from "@/components/MapEmbed";
import { CheckList, FaqSection, InfoPanel, StepList, VisitFacts } from "@/components/PageSections";
import { EMERGENCY_FAQS } from "@/content/faqs";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { emailHref, hasPhone, phoneDisplay, phoneHref, site } from "@/lib/site";

const PATH = "/emergency";

export const metadata: Metadata = pageMetadata({
  title: "Emergency Care at Maili Sita, Nakuru North | Open 24 Hours",
  description:
    "Life-threatening emergency? Call 999 or 112. Primegala Medical Centre at Maili Sita is open 24 hours: warning signs for adults, children and pregnancy, what happens when you arrive, what to bring, and your right to emergency treatment.",
  path: PATH,
  keywords: [...keywordsFor("emergency", "core"), "what to do in a medical emergency Kenya", "999 112 Kenya ambulance"],
});

const CALL_NOW = [
  "Unconsciousness or unresponsiveness",
  "Severe chest pain or pressure, especially spreading to the arm or jaw",
  "Sudden weakness or numbness on one side of the body, a drooping face or slurred speech (possible stroke)",
  "Severe bleeding that won't stop with pressure",
  "Serious road accident injuries",
];

const WARNING_SIGNS = [
  {
    title: "Adults",
    Icon: UserRound,
    items: [
      "High fever with confusion, a stiff neck or a rash that doesn't fade when pressed",
      "Difficulty breathing, or an asthma attack not relieved by the inhaler",
      "Persistent vomiting or diarrhoea with very little urine",
      "Severe abdominal pain",
      "Deep cuts, burns or animal bites",
      "Very high blood pressure with a severe headache or blurred vision",
    ],
  },
  {
    title: "Children",
    Icon: Baby,
    items: [
      "Fast or difficult breathing, or the chest pulling in with each breath",
      "Unable to drink or breastfeed, or vomiting everything",
      "Convulsions (fits)",
      "Unusually sleepy or difficult to wake",
      "Sunken eyes, no tears or a dry mouth (dehydration)",
      "Babies under 2 months with any fever",
    ],
  },
  {
    title: "Pregnancy",
    Icon: HeartPulse,
    items: [
      "Vaginal bleeding",
      "Severe headache, blurred vision or swelling of the face and hands",
      "Baby moving less than usual",
      "Waters breaking before labour",
      "Fever or severe abdominal pain",
    ],
  },
];


/** Large tap target for the national emergency numbers. Red is reserved for this page's emergency actions. */
function CallButton({ number }: { number: string }) {
  return (
    <a
      href={`tel:${number}`}
      data-track={`emergency_call_${number}`}
      className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-alert bg-alert px-6 py-2 text-base font-semibold text-white transition-colors hover:border-[#9e1f17] hover:bg-[#9e1f17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alert"
    >
      <Phone className="size-5" aria-hidden /> Call {number}
    </a>
  );
}

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Emergency care", path: PATH }]}
        eyebrow="Emergency care"
        title="Emergency care"
        intro="If someone's life is in danger, call 999 or 112 now. Primegala is open 24 hours: for urgent problems, come straight in, day or night, with no appointment. We assess, treat and stabilise, and arrange referral to a higher-level hospital when it is needed."
        aside={
          <section
            aria-labelledby="call-now-title"
            className="rounded-xl border-2 border-alert bg-[#fdf0ef] p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-alert text-white">
                <Siren className="size-6" aria-hidden />
              </span>
              <h2 id="call-now-title" className="text-xl leading-snug font-bold text-alert sm:text-2xl">
                Life-threatening emergency? Call 999 or 112.
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-ink">
              Unconscious, severe chest pain, heavy bleeding, a seizure or a serious accident: call for an ambulance, or
              come straight to the nearest health facility. Primegala is open now.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CallButton number="999" />
              <CallButton number="112" />
              {hasPhone && (
                <ButtonLink href={phoneHref()} variant="secondary" size="lg" track="call_click_emergency">
                  <Phone className="size-5" aria-hidden /> Call Primegala
                </ButtonLink>
              )}
            </div>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              data-track="directions_click_emergency"
              className="link-brand mt-5 inline-flex items-center gap-1.5"
            >
              <Navigation className="size-4" aria-hidden /> Directions to Primegala, Maili Sita
            </a>
          </section>
        }
      />

      <Section labelledBy="warning-signs">
        <SectionHeading
          id="warning-signs"
          eyebrow="Warning signs"
          title="When to get help straight away"
          intro="Don't wait for morning. If you see any of these signs, get help now. If you're unsure, it's always reasonable to come in: we would rather see you early."
        />

        <div className="mt-10 rounded-xl border-2 border-alert bg-white p-6 sm:p-7">
          <h3 className="flex items-center gap-2 text-lg font-bold text-alert">
            <Siren className="size-5 shrink-0" aria-hidden /> Call 999 or 112 immediately for
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {CALL_NOW.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-ink">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-alert" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mt-12 text-xl font-bold text-ink">Come to a 24-hour facility now if</h3>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {WARNING_SIGNS.map(({ title, Icon, items }) => (
            <div key={title} className="rounded-xl border border-line bg-white p-6">
              <h4 className="flex items-center gap-3 text-lg font-bold text-ink">
                <span className="flex size-10 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                {title}
              </h4>
              <CheckList className="mt-5" items={items} />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-surface p-6">
          <h3 className="font-bold text-ink">It can usually wait for a day visit if</h3>
          <p className="mt-2 leading-relaxed text-muted">
            A mild cold or cough without breathing difficulty, a mild rash without fever, a routine medication refill, or
            minor aches that improve with rest. We are open 24 hours, so you can still come at any time.
          </p>
          <p className="mt-3 text-sm">
            <Link href="/health-hub/when-to-seek-urgent-care" className="link-brand">
              Read the full guide: when to go to a 24-hour clinic
            </Link>
          </p>
        </div>
      </Section>

      <Section tone="surface" labelledBy="on-arrival">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="on-arrival"
              eyebrow="When you arrive"
              title="What a Level 3 facility does in an emergency"
              intro="Primegala is a KEPH Level 3 medical centre. We assess and treat urgent problems quickly, and when someone needs surgery, intensive care or specialist care, we stabilise them first and arrange the referral."
            />
            <p className="mt-5 leading-relaxed text-muted">
              Read about our{" "}
              <Link href="/services/24-hour-urgent-care" className="link-brand">
                24-hour urgent care
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-7">
            <StepList
              steps={[
                { title: "Come straight in", body: "No appointment needed. Tell the first staff member you see what is happening." },
                { title: "Rapid assessment (triage)", body: "The most urgent cases are seen first, whatever time they arrive." },
                { title: "Treat and stabilise", body: "We treat what can be treated here and stabilise anything more serious." },
                {
                  title: "Refer with notes",
                  body: "If you need a higher-level hospital, we explain why, help arrange transfer and send a referral note with you.",
                },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section labelledBy="what-to-bring">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading id="what-to-bring" eyebrow="If you can" title="What to bring" />
            <p className="mt-4 leading-relaxed text-muted">
              Never delay to gather documents. If there is time, bring:
            </p>
            <CheckList
              className="mt-5"
              items={[
                "The patient's national ID, or a child's birth certificate or Mother & Child Health booklet",
                "SHA details and the phone registered with SHA",
                "The medicines the patient takes, or their packets",
                "For a suspected poisoning or overdose, the container or packet",
                "Someone who knows what happened and can stay with the patient",
              ]}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">While you get help</h2>
            <p className="mt-4 leading-relaxed text-muted">Simple steps that are safe for anyone to take:</p>
            <CheckList
              className="mt-5"
              items={[
                "Stay with the person and keep them calm.",
                "For heavy bleeding, press firmly on the wound with a clean cloth and keep pressing.",
                "For a burn, cool it under cool running water for 20 minutes. Don't apply butter, toothpaste or oil.",
                "Don't give food or drink to someone who is very drowsy or unconscious.",
                "After a fall or accident, don't move the person unless they are in danger where they are.",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="trustLight" className="border-y border-trust-100">
        <div className="mx-auto max-w-4xl">
          <InfoPanel icon={Scale} as="h2" title="Your right to emergency treatment" className="bg-white">
            <p>
              Under <strong>Article 43(2) of the Constitution of Kenya</strong>, a person shall not be denied emergency
              medical treatment. In an emergency we treat and stabilise first; SHA eligibility and payment are dealt with
              afterwards. SHA&apos;s Emergency, Chronic and Critical Illness Fund (ECCIF) supports emergency care for
              registered members.
            </p>
            <p className="mt-3">
              <Link href="/payments-and-insurance">Payments and insurance</Link> ·{" "}
              <Link href="/legal/patient-rights">Your rights as a patient</Link>
            </p>
          </InfoPanel>
        </div>
      </Section>

      <Section labelledBy="directions">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHeading
              id="directions"
              eyebrow="Directions"
              title="Opposite Kiamaina Primary School, Maili Sita"
              intro="Take the Nakuru–Nyahururu Road (B5) north from Nakuru town towards Bahati. At Maili Sita Centre, about 10 km from town, Primegala is directly opposite Kiamaina Primary School."
            />
            <VisitFacts className="mt-8" as="h3" title="Open 24 hours, every day" />
            <div className="mt-6 flex gap-3 rounded-xl border border-line bg-white p-5">
              <Mail className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                <strong className="text-ink">Non-urgent questions only:</strong> email{" "}
                <a href={emailHref("Non-urgent question")} className="link-brand break-all">
                  {site.contact.email}
                </a>
                {hasPhone && <> or call {phoneDisplay()}</>}. Never use email or the booking form in an emergency.
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <MapEmbed query="Primegala Medical Centre, Maili Sita, Nakuru" mapsUrl={site.mapsUrl} />
          </div>
        </div>
      </Section>

      <FaqSection faqs={EMERGENCY_FAQS} title="Emergency questions" />

      <CtaBand
        title="Open now, and every hour of every day."
        body="For urgent care, come straight in: no appointment needed. We're on the Nakuru–Nyahururu Road at Maili Sita, opposite Kiamaina Primary School."
      />
    </>
  );
}
