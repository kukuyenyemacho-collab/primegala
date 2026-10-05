import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui";
import { ArticleCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { TipGrid } from "@/components/hub/TipGrid";
import { TopicGrid, TopicNav, type Topic } from "@/components/hub/TopicGrid";
import { topicCount } from "@/components/hub/utils";
import { CATEGORIES, getArticlesByCategory, getCategoryCounts, toTip, type CategorySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export const dynamicParams = false;

function isCategory(value: string): value is CategorySlug {
  return Object.prototype.hasOwnProperty.call(CATEGORIES, value);
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const c = CATEGORIES[category];
  const keywords = [...new Set(getArticlesByCategory(category).flatMap((a) => a.keywords))].slice(0, 12);
  return pageMetadata({
    title: `${c.name}: Health Hub`,
    description: `${c.description} Practical guides from Primegala Medical Centre, Maili Sita, Nakuru.`,
    path: `/health-hub/category/${category}`,
    keywords: keywords.length > 0 ? keywords : undefined,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const c = CATEGORIES[category];
  const articles = getArticlesByCategory(category);
  const isTips = category === "health-tips";
  const path = `/health-hub/category/${category}`;

  const counts = getCategoryCounts();
  const topics: Topic[] = (Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => ({
    slug,
    name: CATEGORIES[slug].name,
    description: CATEGORIES[slug].description,
    count: counts[slug],
  }));
  const otherTopics = topics.filter((t) => t.slug !== category);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${c.name}: ${site.name} Health Hub`,
          description: c.description,
          url: absoluteUrl(path),
          inLanguage: "en-KE",
          isPartOf: { "@type": "CollectionPage", name: `${site.name} Health Hub`, url: absoluteUrl("/health-hub") },
          hasPart: articles.map((a) => ({ "@type": "Article", headline: a.title, url: absoluteUrl(`/health-hub/${a.slug}`) })),
        }}
      />
      <PageHero
        crumbs={[
          { name: "Health Hub", path: "/health-hub" },
          { name: c.name, path },
        ]}
        eyebrow="Health Hub topic"
        title={c.name}
        intro={
          isTips
            ? `${c.description} Each tip takes a minute or two to read. Open one to read it here, or open it as a page to share it.`
            : `${c.description} Practical guides from Primegala Medical Centre at Maili Sita, Nakuru.`
        }
      />

      <Section labelledBy="topic-list-heading">
        <TopicNav topics={topics} current={category} />

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
          <h2 id="topic-list-heading" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {isTips ? "All health tips" : `Articles in ${c.name}`}
          </h2>
          <p className="text-sm font-semibold text-muted">{topicCount(category, articles.length)}</p>
        </div>

        {articles.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-line p-6 sm:p-8">
            <p className="text-lg font-bold text-ink">There are no articles in this topic at the moment.</p>
            <Link href="/health-hub" className="mt-3 inline-flex items-center gap-1.5 link-brand">
              Browse all Health Hub guides <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : isTips ? (
          <TipGrid tips={articles.map(toTip)} className="mt-8" />
        ) : (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      {otherTopics.some((t) => t.count > 0) && (
        <Section tone="surface" labelledBy="other-topics-heading" bordered>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="other-topics-heading" eyebrow="Keep exploring" title="Other topics" />
            <Link href="/health-hub#guides" className="link-brand inline-flex shrink-0 items-center gap-1.5 self-start md:self-auto">
              Search all guides <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <TopicGrid topics={otherTopics} className="mt-10" />
        </Section>
      )}
    </>
  );
}
