import Link from "next/link";
import { ArrowRight, Baby, BookOpen, HeartPulse, Lightbulb, ShieldCheck, Stethoscope, type LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/lib/content";
import { cn } from "@/lib/cn";
import { topicCount } from "./utils";

/** One icon per Health Hub topic, shown in a trust-blue chip. */
export const TOPIC_ICONS: Record<CategorySlug, LucideIcon> = {
  "sha-guides": ShieldCheck,
  "pregnancy-baby": Baby,
  "everyday-health": Stethoscope,
  "chronic-conditions": HeartPulse,
  "health-tips": Lightbulb,
  "our-stories": BookOpen,
};

export interface Topic {
  slug: CategorySlug;
  name: string;
  description: string;
  count: number;
}

export function topicHref(slug: CategorySlug) {
  return `/health-hub/category/${slug}`;
}

/** "Browse by topic" link cards. Empty topics are left out so no link leads to an empty page. */
export function TopicGrid({ topics, className }: { topics: Topic[]; className?: string }) {
  const visible = topics.filter((t) => t.count > 0);
  if (visible.length === 0) return null;
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {visible.map((t) => {
        const Icon = TOPIC_ICONS[t.slug];
        return (
          <li key={t.slug}>
            <Link
              href={topicHref(t.slug)}
              className="group flex h-full items-start gap-4 rounded-xl border border-line bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/30 focus-visible:border-brand-300"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-base leading-snug font-bold text-ink group-hover:text-brand-800">{t.name}</span>
                  <span className="shrink-0 text-xs font-semibold text-muted tabular-nums">
                    {topicCount(t.slug, t.count)}
                  </span>
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted">{t.description}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  Browse
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Compact topic switcher for category pages: the current topic is marked, the rest link out. */
export function TopicNav({ topics, current }: { topics: Topic[]; current?: CategorySlug }) {
  return (
    <nav aria-label="Health Hub topics">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/health-hub#guides"
            className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-brand-300 hover:text-brand-800"
          >
            All guides
          </Link>
        </li>
        {topics
          .filter((t) => t.count > 0 || t.slug === current)
          .map((t) => {
            const active = t.slug === current;
            return (
              <li key={t.slug}>
                <Link
                  href={topicHref(t.slug)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                    active
                      ? "border-trust-800 bg-trust-800 text-white"
                      : "border-line bg-white text-ink hover:border-brand-300 hover:text-brand-800",
                  )}
                >
                  {t.name}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs tabular-nums",
                      active ? "bg-white/15 text-white" : "bg-surface text-muted",
                    )}
                  >
                    {t.count}
                    <span className="sr-only"> {topicCount(t.slug, t.count).replace(/^\d+ /, "")}</span>
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
