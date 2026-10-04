import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { GENERAL_FAQS, SWAHILI_SUMMARY } from "@/content/faqs";
import { SERVICE_PAGES } from "@/content/services";
import { keywordsFor } from "@/content/keywords";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "FAQs: Hours, SHA, Services & Directions",
  description:
    "Answers to common questions about Primegala Medical Centre, Maili Sita: opening hours, SHA, services, payments, directions from Nakuru town, what to bring and privacy.",
  path: "/faq",
  keywords: keywordsFor("questions", "sha", "core"),
});

export default function FaqPage() {
  const serviceFaqs = SERVICE_PAGES.flatMap((s) => s.faqs.slice(0, 1));
  return (
    <>
      <JsonLd data={faqJsonLd([...GENERAL_FAQS, ...serviceFaqs])} />
      <PageHero
        crumbs={[{ name: "FAQs", path: "/faq" }]}
        eyebrow="FAQs"
        title="Questions, answered"
        intro="Can't find what you're looking for? WhatsApp us. We're up all night anyway."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-14">
          <div>
            <h2 className="text-3xl font-semibold text-ink">Visiting Primegala</h2>
            <div className="mt-6">
              <FaqList faqs={GENERAL_FAQS} withSchema={false} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-ink">About our services</h2>
            <div className="mt-6">
              <FaqList faqs={serviceFaqs} withSchema={false} />
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] bg-brand-900 p-8 text-white" lang="sw">
            <h2 className="font-display text-3xl font-semibold">{SWAHILI_SUMMARY.heading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-brand-100">{SWAHILI_SUMMARY.body}</p>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
