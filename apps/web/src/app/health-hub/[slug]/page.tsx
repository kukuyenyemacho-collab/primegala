import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Calendar, Clock, TriangleAlert, UserPen } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard, CategoryPill } from "@/components/Cards";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { SERVICE_PAGES } from "@/content/services";
import { CATEGORIES, getAllArticles, getArticle, getRelatedArticles } from "@/lib/content";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/health-hub/${article.slug}`,
    keywords: article.keywords,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated ?? article.published,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/health-hub/${article.slug}`;
  const service = SERVICE_PAGES.find((s) => s.code === article.service);
  const related = getRelatedArticles(article);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          path,
          published: article.published,
          updated: article.updated,
          author: article.author,
          reviewedBy: article.reviewedBy,
          lastReviewed: article.lastReviewed,
          category: CATEGORIES[article.category].name,
        })}
      />
      {article.faqs.length > 0 && <FaqSchemaOnly faqs={article.faqs} />}

      <article>
        <header className="border-b border-line bg-gradient-to-b from-brand-50 to-white">
          <div className="container-page py-10 sm:py-14">
            <Breadcrumbs
              items={[
                { name: "Health Hub", path: "/health-hub" },
                { name: CATEGORIES[article.category].name, path: `/health-hub/category/${article.category}` },
                { name: article.title, path },
              ]}
            />
            <div className="mt-8 max-w-3xl">
              <CategoryPill category={article.category} />
              <h1 className="mt-4 text-4xl leading-[1.1] font-semibold text-ink sm:text-5xl">{article.title}</h1>
              <p className="mt-5 text-xl leading-relaxed text-muted">{article.description}</p>
              <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Author</dt>
                  <UserPen className="size-4 text-brand-600" aria-hidden />
                  <dd>{article.author}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Published</dt>
                  <Calendar className="size-4 text-brand-600" aria-hidden />
                  <dd>
                    <time dateTime={article.published}>{formatDate(article.published)}</time>
                    {article.updated && (
                      <>
                        {" "}
                        · Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                      </>
                    )}
                  </dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Reading time</dt>
                  <Clock className="size-4 text-brand-600" aria-hidden />
                  <dd>{article.readingMinutes} min read</dd>
                </div>
              </dl>
              {article.category !== "our-stories" && (
                <p
                  className={`mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ${
                    article.reviewedBy
                      ? "bg-brand-50 text-brand-800 ring-brand-100"
                      : "bg-sun-100 text-brand-950 ring-sun-200"
                  }`}
                >
                  <BadgeCheck className="size-4" aria-hidden />
                  {article.reviewedBy
                    ? `Clinically reviewed by ${article.reviewedBy}${article.lastReviewed ? ` on ${formatDate(article.lastReviewed)}` : ""}`
                    : "Clinical review pending"}
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="space-y-6 lg:sticky lg:top-32">
              {article.headings.length > 2 && (
                <nav aria-label="On this page" className="hidden lg:block">
                  <p className="text-xs font-bold tracking-widest text-ink uppercase">On this page</p>
                  <ul className="mt-4 space-y-2.5 border-l border-line">
                    {article.headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted hover:border-brand-500 hover:text-brand-700">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              {service && (
                <div className="rounded-[var(--radius-card)] bg-brand-900 p-6 text-white">
                  <p className="text-xs font-bold tracking-widest text-sun-300 uppercase">At Primegala</p>
                  <p className="mt-2 font-display text-xl font-semibold">{service.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-100">{service.summary}</p>
                  <ButtonLink href={`/book?service=${service.code}`} variant="sun" className="mt-4 w-full" track="book_click_article">
                    Book a visit
                  </ButtonLink>
                </div>
              )}
            </div>
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-8 lg:col-start-4">
            <div className="prose-primegala [&_.table-scroll]:overflow-x-auto" dangerouslySetInnerHTML={{ __html: article.html }} />

            {article.faqs.length > 0 && (
              <section className="mt-14" aria-labelledby="article-faqs">
                <h2 id="article-faqs" className="text-3xl font-semibold text-ink">
                  Frequently asked questions
                </h2>
                <div className="mt-6">
                  <FaqList faqs={article.faqs} withSchema={false} />
                </div>
              </section>
            )}

            <aside className="mt-12 flex gap-3 rounded-2xl bg-surface p-5 text-sm leading-relaxed text-muted ring-1 ring-line">
              <TriangleAlert className="size-5 shrink-0 text-sun-500" aria-hidden />
              <p>
                This article is general information, not a diagnosis. Always consult a qualified health professional
                about your health. In an emergency call <a href="tel:999" className="font-semibold text-ink">999</a> or{" "}
                <a href="tel:112" className="font-semibold text-ink">112</a>. See our{" "}
                <Link href="/legal/medical-disclaimer" className="font-semibold text-brand-700 underline underline-offset-2">
                  medical disclaimer
                </Link>{" "}
                and{" "}
                <Link href="/legal/editorial-policy" className="font-semibold text-brand-700 underline underline-offset-2">
                  editorial policy
                </Link>
                .
              </p>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section tone="surface">
          <SectionHeading eyebrow="Keep reading" title="Related articles" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}

function FaqSchemaOnly({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );
}
