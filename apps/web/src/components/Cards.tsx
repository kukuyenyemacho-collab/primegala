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

/**
 * Service card. On phones it is a compact row (icon beside the text) so a long list stays easy
 * to scan; from tablet up it is the full card. Coming-soon services get a soft pink accent on
 * hover and a "Coming soon" pill.
 */
const SERVICE_CARD =
  "group relative flex h-full gap-4 rounded-xl border border-line bg-white p-4 transition-colors duration-150 sm:flex-col sm:gap-0 sm:p-6";

export function ComingSoonPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-pink-800 uppercase",
        className,
      )}
    >
      Coming soon
    </span>
  );
}

export function ServiceCard({ service }: { service: ServiceContent }) {
  const soon = Boolean(service.comingSoon);
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        SERVICE_CARD,
        soon
          ? "hover:border-pink-200 hover:bg-pink-50 focus-visible:border-pink-200"
          : "hover:border-brand-300 hover:bg-brand-50/30 focus-visible:border-brand-300",
      )}
    >
      <span className="flex shrink-0 items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-lg sm:size-11",
            soon ? "bg-pink-50 text-pink-700 group-hover:bg-white" : "bg-trust-50 text-trust-700",
          )}
        >
          <ServiceIcon name={service.icon} className="size-5 sm:size-6" strokeWidth={1.75} />
        </span>
        {soon && (
          <span className="hidden sm:block">
            <ComingSoonPill />
          </span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        {soon && (
          <span className="mb-1.5 sm:hidden">
            <ComingSoonPill />
          </span>
        )}
        <h3 className="text-base leading-snug font-bold text-ink sm:mt-5 sm:text-lg">{service.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted sm:mt-2 sm:text-[0.95rem]">{service.summary}</p>
        <span
          className={cn(
            "mt-5 hidden items-center gap-1.5 text-sm font-semibold sm:inline-flex",
            soon ? "text-pink-700 group-hover:text-pink-800" : "text-brand-600 group-hover:text-brand-700",
          )}
        >
          {soon ? "Get notified" : "Learn more"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </span>
      <ArrowRight
        className={cn("mt-0.5 size-5 shrink-0 sm:hidden", soon ? "text-pink-700" : "text-brand-600")}
        aria-hidden
      />
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
