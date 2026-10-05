import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { Section, SectionHeading } from "@/components/ui";
import { SWAHILI_SUMMARY, type Faq } from "@/content/faqs";

export function HomeFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <Section tone="surface" labelledBy="faq-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-heading" eyebrow="FAQs" title="Questions people ask before visiting" />
          <Link href="/faq" className="link-brand mt-6 inline-flex items-center gap-1.5">
            See all FAQs <ArrowRight className="size-4" aria-hidden />
          </Link>

          <div lang="sw" className="mt-8 rounded-xl border border-trust-100 bg-trust-50 p-6">
            <p className="eyebrow">Kiswahili</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-trust-950">{SWAHILI_SUMMARY.heading}</h3>
            <p className="mt-3 leading-relaxed text-ink/85">{SWAHILI_SUMMARY.body}</p>
            <Link href="/kiswahili" className="link-brand mt-4 inline-flex items-center gap-1.5">
              Soma zaidi kwa Kiswahili <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </Section>
  );
}
