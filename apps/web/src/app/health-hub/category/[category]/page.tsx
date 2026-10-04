import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { ArticleCard } from "@/components/Cards";
import { CATEGORIES, getArticlesByCategory, type CategorySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export const dynamicParams = false;

function isCategory(value: string): value is CategorySlug {
  return value in CATEGORIES;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const c = CATEGORIES[category];
  return pageMetadata({
    title: `${c.name}: Health Hub`,
    description: `${c.description} Practical guides from Primegala Medical Centre, Maili Sita, Nakuru.`,
    path: `/health-hub/category/${category}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const c = CATEGORIES[category];
  const articles = getArticlesByCategory(category);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Health Hub", path: "/health-hub" },
          { name: c.name, path: `/health-hub/category/${category}` },
        ]}
        eyebrow="Health Hub"
        title={c.name}
        intro={c.description}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </>
  );
}
