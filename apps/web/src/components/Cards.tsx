import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ServiceIcon } from "./Icon";
import type { ServiceContent } from "@/content/services";
import { CATEGORIES, type ArticleMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Bordered card, flat at rest; the border turns green on hover and focus. */
const CARD =
  "group relative flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors duration-150 hover:border-brand-300 hover:bg-brand-50/30";

export function ServiceCard({ service }: { service: ServiceContent }) {
  return (
    <Link href={`/services/${service.slug}`} className={cn(CARD, "focus-visible:border-brand-300")}>
      <span className="flex size-11 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
        <ServiceIcon name={service.icon} className="size-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-lg leading-snug font-bold text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

const CATEGORY_TONES: Record<keyof typeof CATEGORIES, string> = {
  "sha-guides": "border-trust-200 bg-trust-50 text-trust-800",
  "pregnancy-baby": "border-brand-200 bg-brand-50 text-brand-800",
  "everyday-health": "border-line bg-surface text-ink",
  "chronic-conditions": "border-trust-200 bg-trust-50 text-trust-800",
  "health-tips": "border-sun-300 bg-sun-100 text-trust-950",
  "our-stories": "border-line bg-cream text-ink",
};

export function CategoryPill({ category }: { category: keyof typeof CATEGORIES }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide uppercase",
        CATEGORY_TONES[category],
      )}
    >
      {CATEGORIES[category].name}
    </span>
  );
}

export function ArticleCard({ article, large = false }: { article: ArticleMeta; large?: boolean }) {
  return (
    <article className={cn(CARD, "has-[a:focus-visible]:border-brand-300")}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <CategoryPill category={article.category} />
        <span className="inline-flex items-center gap-1 text-xs text-muted">
          <Clock className="size-3.5" aria-hidden /> {article.readingMinutes} min read
        </span>
      </div>
      <h3 className={cn("mt-4 leading-snug font-bold text-ink", large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl")}>
        <Link href={`/health-hub/${article.slug}`} className="after:absolute after:inset-0 after:rounded-xl">
          {article.title}
        </Link>
      </h3>
      {/* line-clamp on a flex-grown element leaks extra lines, so the wrapper grows instead. */}
      <div className="mt-3 flex-1">
        <p className="line-clamp-3 leading-relaxed text-muted">{article.description}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <time dateTime={article.updated ?? article.published} className="text-xs text-muted">
          {article.updated ? "Updated" : "Published"} {formatDate(article.updated ?? article.published)}
        </time>
        <span className="inline-flex items-center gap-1 font-semibold text-brand-600 group-hover:text-brand-700" aria-hidden>
          Read guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
