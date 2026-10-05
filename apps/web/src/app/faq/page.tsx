import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Languages } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ContactActions, ContentBlock, ContentWithToc, type TocItem } from "@/components/PageSections";
import { GENERAL_FAQS, SWAHILI_SUMMARY } from "@/content/faqs";
import { SERVICE_PAGES } from "@/content/services";
import { keywordsFor } from "@/content/keywords";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "FAQs: Hours, SHA, Services & Directions",
  description:
    "Answers to common questions about Primegala Medical Centre, Maili Sita: opening hours, SHA, services, payments, directions from Nakuru town, what to bring and privacy.",
  path: "/faq",
  keywords: keywordsFor("questions", "sha", "core"),
});

const TOC: TocItem[] = [
  { id: "visiting", label: "Visiting Primegala" },
  { id: "services", label: "About our services" },
  { id: "kiswahili", label: "Kwa Kiswahili" },
];

export default function FaqPage() {
  const serviceFaqs = SERVICE_PAGES.flatMap((s) => s.faqs.slice(0, 1));
  return (
    <>
      <JsonLd data={faqJsonLd([...GENERAL_FAQS, ...serviceFaqs])} />
      <PageHero
        crumbs={[{ name: "FAQs", path: "/faq" }]}
        eyebrow="FAQs"
        title="Questions, answered"
        intro={`Answers to the questions we're asked most about hours, SHA, services, payments and directions. Can't find yours? Email ${site.contact.email} or ask at our front desk, any time.`}
      >
        <ContactActions track="faq" showDirections={false} alwaysEmail emailSubject="Question from the Primegala website" />
      </PageHero>

      <ContentWithToc toc={TOC} tocTitle="Sections">
        <ContentBlock id="visiting" title="Visiting Primegala">
          <FaqList faqs={GENERAL_FAQS} withSchema={false} />
          <p className="text-sm text-muted">
            More detail in the{" "}
            <Link href="/patients-and-visitors" className="link-brand">
              patient &amp; visitor guide
            </Link>{" "}
            and on{" "}
            <Link href="/payments-and-insurance" className="link-brand">
              payments &amp; insurance
            </Link>
            .
          </p>
        </ContentBlock>
        <ContentBlock id="services" title="About our services">
          <FaqList faqs={serviceFaqs} withSchema={false} />
          <p className="text-sm text-muted">
            Each{" "}
            <Link href="/services" className="link-brand">
              service page
            </Link>{" "}
            has its own questions, what to expect and how to prepare.
          </p>
        </ContentBlock>
        <ContentBlock id="kiswahili" title="Kwa Kiswahili">
          <div lang="sw" className="rounded-xl border border-trust-100 bg-trust-50 p-6 sm:p-8">
            <div className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-trust-100 bg-white text-trust-700">
                <Languages className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-trust-950">{SWAHILI_SUMMARY.heading}</h3>
                <p className="mt-2 leading-relaxed text-ink/85">{SWAHILI_SUMMARY.body}</p>
                <Link href="/kiswahili" className="link-brand mt-4 inline-flex items-center gap-1.5">
                  Soma zaidi kwa Kiswahili <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </ContentBlock>
      </ContentWithToc>

      <CtaBand />
    </>
  );
}
