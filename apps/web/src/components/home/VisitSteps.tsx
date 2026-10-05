import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";

const STEPS = [
  { title: "Book or walk in", body: "Book online or simply come in. Walk-ins are welcome at any hour, day or night." },
  {
    title: "Triage and registration",
    body: "A nurse checks your vital signs. Bring your national ID so we can confirm your SHA status.",
  },
  {
    title: "See a clinician",
    body: "We listen, examine and explain what's going on in plain English or Kiswahili.",
  },
  {
    title: "Tests and medicine on site",
    body: "The laboratory and pharmacy are a few steps away, so there's no running around town.",
  },
  {
    title: "Your plan for going home",
    body: "You leave with a clear treatment plan. If you need follow-up, admission or a referral, we arrange it with you.",
  },
];

const BRING = [
  "National ID, or a birth certificate for children",
  "Your SHA details",
  "Previous medical records or prescriptions",
  "Mother & Child Health booklet for pregnancy and child visits",
];

export function VisitSteps() {
  return (
    <Section labelledBy="visit-heading">
      <SectionHeading
        id="visit-heading"
        eyebrow="Your visit"
        title="How a visit works"
        intro="No guesswork. Here's what happens from the gate to going home."
      />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col rounded-xl border border-line bg-white p-5">
            <span
              className="flex size-9 items-center justify-center rounded-full bg-trust-800 text-sm font-bold text-white"
              aria-hidden
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-base leading-snug font-bold text-ink">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-trust-100 bg-trust-50 p-5 sm:flex-row sm:p-6">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-trust-700">
          <Info className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-trust-950">What to bring</h3>
          <ul className="mt-2 grid gap-x-8 gap-y-1.5 text-[0.95rem] text-ink/85 sm:grid-cols-2">
            {BRING.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-trust-700" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/patients-and-visitors" className="link-brand mt-4 inline-flex items-center gap-1.5 text-sm">
            Read the patient and visitor guide <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}
