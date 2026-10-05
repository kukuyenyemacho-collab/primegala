import { ArrowRight, CircleCheck, Smartphone } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

const FUNDS = [
  {
    name: "Primary Healthcare Fund",
    body: "Outpatient visits, antenatal care, family planning, child health and basic tests at Level 2 and 3 facilities like ours.",
  },
  {
    name: "Social Health Insurance Fund (SHIF)",
    body: "Inpatient care and admissions for members whose contributions are up to date.",
  },
  {
    name: "Emergency, Chronic and Critical Illness Fund",
    body: "Emergency stabilisation, and care for chronic and critical illness beyond SHIF limits.",
  },
];

/** SHA information panel in trust blue: what each fund covers and how to get help registering. */
export function ShaPanel() {
  return (
    <Section tone="trustLight" labelledBy="sha-heading" className="border-y border-trust-100">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading
            id="sha-heading"
            eyebrow="Social Health Authority (SHA)"
            title={
              site.shaContracted ? (
                <span className="text-trust-950">We accept SHA for eligible services</span>
              ) : (
                <span className="text-trust-950">Using SHA? We&apos;ll guide you</span>
              )
            }
            intro="Most everyday visits at Level 3 facilities like ours are funded through SHA's Primary Healthcare Fund. Bring your national ID and our front desk confirms what's covered before treatment."
          />
          <div className="mt-8 flex gap-4 rounded-xl border border-trust-100 bg-white p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
              <Smartphone className="size-5" aria-hidden />
            </span>
            <p className="leading-relaxed text-ink/85">
              <strong className="text-trust-950">Not registered yet?</strong> Dial{" "}
              <strong className="font-bold whitespace-nowrap text-trust-950">*147#</strong> on any phone to register with
              SHA, or ask our front desk to help you when you visit.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/sha" variant="trust" size="lg">
              How SHA works at Primegala <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/book?type=sha-help" variant="secondary" size="lg" track="book_click_sha">
              Get help with SHA
            </ButtonLink>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider text-trust-800 uppercase">The three SHA funds</h3>
          <ul className="mt-4 grid gap-3">
            {FUNDS.map((fund) => (
              <li key={fund.name} className="flex gap-4 rounded-xl border border-trust-100 bg-white p-5">
                <CircleCheck className="mt-0.5 size-6 shrink-0 text-trust-700" aria-hidden />
                <div className="min-w-0">
                  <h4 className="font-bold text-trust-950">{fund.name}</h4>
                  <p className="mt-1 leading-relaxed text-muted">{fund.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Cover depends on your registration and contribution status. Our front desk checks your eligibility with your ID
            number before treatment.
          </p>
        </div>
      </div>
    </Section>
  );
}
