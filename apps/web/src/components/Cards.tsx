import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ServiceIcon } from "./Icon";
import type { ServiceContent } from "@/content/services";
import { CATEGORIES, type ArticleMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function ServiceCard({ service }: { service: ServiceContent }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift hover:ring-brand-200"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <ServiceIcon name={service.icon} className="size-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 font-sans text-lg font-bold text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

const CATEGORY_TONES: Record<string, string> = {
  "sha-guides": "bg-sun-100 text-brand-900",
  "pregnancy-baby": "bg-[#fde8e4] text-[#7a2b1f]",
  "everyday-health": "bg-brand-50 text-brand-800",
  "chronic-conditions": "bg-[#e6eefb] text-[#1f3f7a]",
  "health-tips": "bg-[#f1ecfb] text-[#4b2f86]",
  "our-stories": "bg-cream text-brand-900",
};

export function CategoryPill({ category }: { category: keyof typeof CATEGORIES }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-bold tracking-wide uppercase ${CATEGORY_TONES[category]}`}
    >
      {CATEGORIES[category].name}
    </span>
  );
}

export function ArticleCard({ article, large = false }: { article: ArticleMeta; large?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line transition-all duration-200 hover:shadow-lift hover:ring-brand-200">
      <div className="flex items-center gap-3">
        <CategoryPill category={article.category} />
        <span className="inline-flex items-center gap-1 text-xs text-muted">
          <Clock className="size-3.5" aria-hidden /> {article.readingMinutes} min read
        </span>
      </div>
      <h3 className={`mt-4 font-display font-semibold text-ink ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
        <Link href={`/health-hub/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-muted">{article.description}</p>
      <p className="mt-5 text-xs text-muted">
        <time dateTime={article.updated ?? article.published}>{formatDate(article.updated ?? article.published)}</time>
      </p>
    </article>
  );
}
