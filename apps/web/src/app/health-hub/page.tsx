import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui";
import { ArticleCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { CATEGORIES, getAllArticles, type CategorySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Health Hub: Health Articles & Tips for Families in Nakuru",
  description:
    "Practical, Kenyan health guides from Primegala Medical Centre: using SHA, antenatal care, pregnancy danger signs, malaria vs typhoid, family planning, immunisation, blood pressure, diabetes and daily health tips.",
  path: "/health-hub",
  keywords: ["health tips Kenya", "health articles Kenya", "SHA guide", "pregnancy tips Kenya", "malaria symptoms Kenya"],
});

export default function HealthHubPage() {
  const articles = getAllArticles();
  const featured = articles.filter((a) => a.featured && a.category !== "health-tips");
  const guides = articles.filter((a) => !a.featured && a.category !== "health-tips");
  const tips = articles.filter((a) => a.category === "health-tips");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${site.name} Health Hub`,
          url: absoluteUrl("/health-hub"),
          hasPart: articles.map((a) => ({ "@type": "Article", headline: a.title, url: absoluteUrl(`/health-hub/${a.slug}`) })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Health Hub", path: "/health-hub" }]}
        eyebrow="Health Hub"
        title="Health answers for Nakuru families"
        intro="Clear, practical guides written around the questions our patients ask most, from using SHA to knowing when a fever can't wait."
      />
      <Section>
        <nav aria-label="Health Hub categories">
          <ul className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORIES) as CategorySlug[]).map((c) => (
              <li key={c}>
                <Link
                  href={`/health-hub/category/${c}`}
                  className="inline-flex rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink/80 ring-1 ring-line hover:bg-brand-50 hover:text-brand-800"
                >
                  {CATEGORIES[c].name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/health-hub/feed.xml"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                <Rss className="size-4" aria-hidden /> RSS
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featured.map((a) => (
            <ArticleCard key={a.slug} article={a} large />
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading title="Guides" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="Quick reads" title="Health tips" intro="Short, practical habits that keep families healthy." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </>
  );
}
