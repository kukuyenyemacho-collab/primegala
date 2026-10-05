import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";

const FACTS = [
  { value: "8", label: "antenatal contacts during pregnancy, as Kenya's national guidelines recommend" },
  { value: "24/7", label: "midwife-led labour and delivery care, day and night" },
  { value: "Day 1", label: "newborn care, breastfeeding support and first vaccines" },
  { value: "SHA", label: "delivery cover for registered members" },
];

export function MaternitySpotlight({ guides }: { guides: { slug: string; title: string }[] }) {
  return (
    <Section labelledBy="maternity-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            id="maternity-heading"
            eyebrow="Maternity & antenatal care"
            title="Bring your baby into the world close to home"
            intro="A calm birth starts months before labour. At every antenatal visit we plan it with you: where you'll deliver, how you'll get here at night, who will be with you, and how SHA applies."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/services/maternity">Maternity & delivery</ButtonLink>
            <ButtonLink href="/services/antenatal-care" variant="secondary">
              Antenatal care
            </ButtonLink>
            <ButtonLink href="/book?type=maternity-tour" variant="ghost" track="book_click_maternity">
              Book a maternity visit <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          {guides.length > 0 && (
            <div className="mt-8 border-t border-line pt-6">
              <h3 className="text-sm font-bold tracking-wider text-trust-800 uppercase">Guides for expectant mothers</h3>
              <ul className="mt-3 grid gap-2">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/health-hub/${g.slug}`} className="link-brand inline-flex items-start gap-2">
                      <BookOpen className="mt-1 size-4 shrink-0" aria-hidden />
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <dl className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
          {FACTS.map(({ value, label }) => (
            <div key={value} className="flex flex-col rounded-xl border border-line bg-white p-6">
              {/* Term (label) first in the markup; the figure is shown above it. */}
              <dt className="mt-2 text-sm leading-relaxed text-muted">{label}</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-trust-700 sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
