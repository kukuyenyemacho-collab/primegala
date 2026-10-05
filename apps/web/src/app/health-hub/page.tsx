import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, Rss, Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { ArticleCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { TipCard } from "@/components/TipCard";
import { FeaturedGuides } from "@/components/hub/FeaturedGuides";
import { GuideFinder } from "@/components/hub/GuideFinder";
import { HubInfoPanel } from "@/components/hub/HubInfoPanel";
import { TipGrid } from "@/components/hub/TipGrid";
import { TopicGrid, type Topic } from "@/components/hub/TopicGrid";
import {
  CATEGORIES,
  getAllArticles,
  getCategoryCounts,
  toArticleMeta,
  toTip,
  type Article,
  type CategorySlug,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Health Hub: Health Articles & Tips for Families in Nakuru",
  description:
    "Practical, Kenyan health guides from Primegala Medical Centre: using SHA, antenatal care, pregnancy danger signs, malaria vs typhoid, family planning, immunisation, blood pressure, diabetes and daily health tips.",
  path: "/health-hub",
  keywords: ["health tips Kenya", "health articles Kenya", "SHA guide", "pregnancy tips Kenya", "malaria symptoms Kenya"],
});

const TIPS: CategorySlug = "health-tips";
const FEATURED_COUNT = 3;

/** Featured guides first (newest first), topped up with the latest guides so there are always three. */
function pickFeatured(guides: Article[]): Article[] {
  const featured = guides.filter((a) => a.featured).slice(0, FEATURED_COUNT);
  const fill = guides.filter((a) => !featured.includes(a)).slice(0, FEATURED_COUNT - featured.length);
  return [...featured, ...fill];
}

export default function HealthHubPage() {
  const articles = getAllArticles();
  const guides = articles.filter((a) => a.category !== TIPS);
  const tips = articles.filter((a) => a.category === TIPS);
  const featured = pickFeatured(guides);

  const counts = getCategoryCounts();
  const topics: Topic[] = (Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => ({
    slug,
    name: CATEGORIES[slug].name,
    description: CATEGORIES[slug].description,
    count: counts[slug],
  }));
  const guideTopics = topics.filter((t) => t.slug !== TIPS && t.count > 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${site.name} Health Hub`,
          description: "Practical health guides and tips for families in Nakuru from Primegala Medical Centre.",
          url: absoluteUrl("/health-hub"),
          inLanguage: "en-KE",
          isPartOf: { "@id": `${site.url}/#website` },
          hasPart: articles.map((a) => ({ "@type": "Article", headline: a.title, url: absoluteUrl(`/health-hub/${a.slug}`) })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Health Hub", path: "/health-hub" }]}
        eyebrow="Health Hub"
        title="Health answers for Nakuru families"
        intro="Practical health guides from Primegala Medical Centre, written around the questions our patients ask most: using SHA, pregnancy and baby care, fevers and testing, and living with long-term conditions."
        aside={<HubInfoPanel guides={guides.length} tips={tips.length} topics={topics.filter((t) => t.count > 0).length} />}
      >
        <ButtonLink href="#guides" size="lg">
          <Search className="size-5" aria-hidden /> Search all guides
        </ButtonLink>
        {tips.length > 0 && (
          <ButtonLink href="#tips" variant="secondary" size="lg">
            <Lightbulb className="size-5" aria-hidden /> Quick health tips
          </ButtonLink>
        )}
      </PageHero>

      {featured.length > 0 && (
        <Section labelledBy="featured-heading">
          <SectionHeading
            id="featured-heading"
            eyebrow="Start here"
            title="Featured guides"
            intro="A good place to start if you are new to Primegala or to the Health Hub."
          />
          <div className="mt-10">
            <FeaturedGuides guides={featured} />
          </div>
        </Section>
      )}

      <Section tone="surface" id="guides" labelledBy="guides-heading" bordered>
        <SectionHeading
          id="guides-heading"
          eyebrow="Find a guide"
          title="All guides"
          intro="Search every guide, or narrow the list by topic. Newest guides are shown first."
        />
        <div className="mt-10">
          <GuideFinder
            guides={guides.map(toArticleMeta)}
            topics={guideTopics.map(({ slug, name }) => ({ slug, name }))}
            cards={Object.fromEntries(guides.map((a) => [a.slug, <ArticleCard key={a.slug} article={a} />]))}
            tips={tips.map(toArticleMeta)}
            tipCards={Object.fromEntries(tips.map((a) => [a.slug, <TipCard key={a.slug} tip={toTip(a)} />]))}
          />
        </div>
      </Section>

      {tips.length > 0 && (
        <Section id="tips" labelledBy="tips-heading" bordered>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="tips-heading"
              eyebrow="Quick reads"
              title="Health tips"
              intro="Short, practical habits for healthier homes. Open a tip to read it here, or open it as a page to share it."
            />
            <Link
              href={`/health-hub/category/${TIPS}`}
              className="link-brand inline-flex shrink-0 items-center gap-1.5 self-start md:self-auto"
            >
              All health tips <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <TipGrid tips={tips.map(toTip)} className="mt-10" />
        </Section>
      )}

      <Section tone="surface" id="topics" labelledBy="topics-heading" bordered>
        <SectionHeading
          id="topics-heading"
          eyebrow="Topics"
          title="Browse by topic"
          intro="Every guide belongs to one topic. Choose a topic to see all of its guides on one page."
        />
        <TopicGrid topics={topics} className="mt-10" />
        <p className="mt-10 flex items-start gap-2 border-t border-line pt-6 text-sm text-muted">
          <Rss className="mt-0.5 size-4 shrink-0 text-trust-700" aria-hidden />
          <span>
            New guides are also published in our{" "}
            <a href="/health-hub/feed.xml" className="link-brand">
              RSS feed
            </a>
            .
          </span>
        </p>
      </Section>
    </>
  );
}
