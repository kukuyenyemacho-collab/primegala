import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard, CategoryPill } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/ui";
import { ArticleToc } from "@/components/hub/ArticleToc";
import { MedicalNote } from "@/components/hub/MedicalNote";
import { MobileToc } from "@/components/hub/MobileToc";
import { ServicePanel } from "@/components/hub/ServicePanel";
import { ShareRow } from "@/components/hub/ShareRow";
import { TipGrid } from "@/components/hub/TipGrid";
import { displayTitle } from "@/components/hub/utils";
import { SERVICE_PAGES } from "@/content/services";
import {
  CATEGORIES,
  getAllArticles,
  getArticle,
  getRelatedArticles,
  getTips,
  type Article,
  type Heading,
} from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

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

const FAQ_HEADING_ID = "article-faqs";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/health-hub/${article.slug}`;
  const isTip = article.category === "health-tips";
  const category = CATEGORIES[article.category];
  // Front matter normally uses the service code; accept the page slug too.
  const service = SERVICE_PAGES.find((s) => s.code === article.service || s.slug === article.service);
  const title = isTip ? displayTitle(article.title) : article.title;
  const noun = isTip ? "tip" : article.category === "our-stories" ? "story" : "guide";

  const toc: Heading[] = [
    ...article.headings,
    ...(article.faqs.length > 0 ? [{ id: FAQ_HEADING_ID, text: "Frequently asked questions" }] : []),
  ];
  const showToc = !isTip && toc.length >= 2;

  const related = isTip ? [] : getRelatedArticles(article, 8).filter((a) => a.category !== "health-tips").slice(0, 3);
  const moreTips = isTip ? getTips({ exclude: article.slug, limit: 6 }) : [];

  const body = (
    <div className="max-w-[70ch] text-lg">
      {showToc && (
        <div className="mb-8 text-base">
          <MobileToc headings={toc} />
        </div>
      )}

      <div className="prose-primegala" dangerouslySetInnerHTML={{ __html: article.html }} />

      <div className="text-base">
        {service && (
          <div className="mt-12">
            <ServicePanel service={service} />
          </div>
        )}

        {article.faqs.length > 0 && (
          <section className="mt-14" aria-labelledby={FAQ_HEADING_ID}>
            <h2 id={FAQ_HEADING_ID} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <FaqList faqs={article.faqs} withSchema={false} />
            </div>
          </section>
        )}

        <div className="mt-12">
          <MedicalNote />
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <ShareRow title={title} url={absoluteUrl(path)} noun={noun} />
        </div>
      </div>
    </div>
  );

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
          category: category.name,
        })}
      />
      {article.faqs.length > 0 && <JsonLd data={faqJsonLd(article.faqs)} />}

      <article>
        <ArticleHeader article={article} title={title} />

        <div className="container-page py-10 sm:py-14">
          {showToc ? (
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* First in the DOM so keyboard users reach it before the article; shown on the right. */}
              <aside className="hidden lg:order-2 lg:col-span-4 lg:row-start-1 lg:block xl:col-span-3 xl:col-start-10">
                <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6">
                  <ArticleToc headings={toc} />
                </div>
              </aside>
              <div className="min-w-0 lg:order-1 lg:col-span-8 lg:row-start-1">{body}</div>
            </div>
          ) : (
            body
          )}
        </div>
      </article>

      {related.length > 0 && (
        <Section tone="surface" labelledBy="related-heading" bordered>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="related-heading" eyebrow="Keep reading" title="Related guides" />
            <Link href="/health-hub#guides" className="link-brand inline-flex shrink-0 items-center gap-1.5 self-start md:self-auto">
              All Health Hub guides <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {moreTips.length > 0 && (
        <Section tone="surface" labelledBy="more-tips-heading" bordered>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="more-tips-heading"
              eyebrow="Quick reads"
              title="More health tips"
              intro="Open a tip to read it here in a minute or two."
            />
            <Link href="/health-hub#guides" className="link-brand inline-flex shrink-0 items-center gap-1.5 self-start md:self-auto">
              Browse all guides <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <TipGrid tips={moreTips} className="mt-10" />
        </Section>
      )}

      <CtaBand />
    </>
  );
}

function ArticleHeader({ article, title }: { article: Article; title: string }) {
  const path = `/health-hub/${article.slug}`;
  const category = CATEGORIES[article.category];
  return (
    <header className="border-b border-line bg-white">
      <div className="container-page py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { name: "Health Hub", path: "/health-hub" },
            { name: category.name, path: `/health-hub/category/${article.category}` },
            { name: title, path },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <Link href={`/health-hub/category/${article.category}`} className="inline-flex rounded-full">
            <CategoryPill category={article.category} />
            <span className="sr-only">: see all articles in this topic</span>
          </Link>
          <h1 className="mt-4 text-3xl leading-[1.15] font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{article.description}</p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5 text-sm">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <dt className="text-muted">Written by</dt>
              <dd className="font-semibold text-ink">{article.author}</dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <dt className="text-muted">Published</dt>
              <dd className="font-semibold text-ink">
                <time dateTime={article.published}>{formatDate(article.published)}</time>
              </dd>
            </div>
            {article.updated && article.updated !== article.published && (
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <dt className="text-muted">Updated</dt>
                <dd className="font-semibold text-ink">
                  <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                </dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Reading time</dt>
              <dd className="inline-flex items-center gap-1.5 font-semibold text-ink">
                <Clock className="size-4 text-trust-700" aria-hidden />
                {article.readingMinutes} min read
              </dd>
            </div>
          </dl>

          {article.reviewedBy && (
            <p className="mt-5 inline-flex items-start gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-800">
              <BadgeCheck className="mt-px size-4 shrink-0" aria-hidden />
              <span>
                Clinically reviewed by {article.reviewedBy}
                {article.lastReviewed && (
                  <>
                    {" "}
                    on <time dateTime={article.lastReviewed}>{formatDate(article.lastReviewed)}</time>
                  </>
                )}
              </span>
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
