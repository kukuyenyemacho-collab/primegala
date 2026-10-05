"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { ArticleMeta, CategorySlug } from "@/lib/content";
import { cn } from "@/lib/cn";
import { plural, searchTerms, searchText } from "./utils";

type TopicFilter = CategorySlug | "all";

interface Indexed {
  meta: ArticleMeta;
  title: string;
  description: string;
  rest: string;
}

function indexArticles(articles: ArticleMeta[], topicNames: Map<CategorySlug, string>): Indexed[] {
  return articles.map((meta) => ({
    meta,
    title: searchText(meta.title),
    description: searchText(meta.description),
    rest: searchText(
      topicNames.get(meta.category),
      meta.keywords.join(" "),
      meta.faqs.map((f) => f.q).join(" "),
      meta.service?.replace(/-/g, " "),
    ),
  }));
}

/** 0 = no match. Every term must match the start of a word; title hits rank highest. */
function score(entry: Indexed, terms: string[]): number {
  let total = 0;
  for (const term of terms) {
    const needle = ` ${term}`;
    if (entry.title.includes(needle)) total += 3;
    else if (entry.description.includes(needle)) total += 2;
    else if (entry.rest.includes(needle)) total += 1;
    else return 0;
  }
  return total;
}

function rank(entries: Indexed[], terms: string[]): Indexed[] {
  if (terms.length === 0) return entries;
  return entries
    .map((entry) => ({ entry, s: score(entry, terms) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s) // stable: equal scores keep newest-first order
    .map((x) => x.entry);
}

/**
 * Search box and topic chips over every Health Hub guide. The cards themselves are
 * rendered on the server and passed in by slug, so this component only decides
 * which ones to show. Matching health tips appear under the guides while searching.
 */
export function GuideFinder({
  guides,
  topics,
  cards,
  tips = [],
  tipCards = {},
}: {
  guides: ArticleMeta[];
  topics: { slug: CategorySlug; name: string }[];
  cards: Record<string, ReactNode>;
  tips?: ArticleMeta[];
  tipCards?: Record<string, ReactNode>;
}) {
  const uid = useId();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicFilter>("all");

  const topicNames = useMemo(() => new Map(topics.map((t) => [t.slug, t.name])), [topics]);
  const guideIndex = useMemo(() => indexArticles(guides, topicNames), [guides, topicNames]);
  const tipIndex = useMemo(() => indexArticles(tips, topicNames), [tips, topicNames]);

  const terms = searchTerms(query);
  const matched = rank(guideIndex, terms);
  const results = topic === "all" ? matched : matched.filter((e) => e.meta.category === topic);
  const tipResults = terms.length > 0 && topic === "all" ? rank(tipIndex, terms) : [];

  const counts = new Map<TopicFilter, number>([["all", matched.length]]);
  for (const e of matched) counts.set(e.meta.category, (counts.get(e.meta.category) ?? 0) + 1);

  const topicName = topic === "all" ? null : topicNames.get(topic);
  const filtering = terms.length > 0 || topic !== "all";
  const trimmed = query.trim();

  let status: string;
  if (!filtering) status = `Showing all ${plural(results.length, "guide")}`;
  else if (terms.length === 0) status = `Showing ${plural(results.length, "guide")} in ${topicName}`;
  else {
    status = `${plural(results.length, "guide")}${tipResults.length ? ` and ${plural(tipResults.length, "health tip")}` : ""} found for “${trimmed}”`;
    if (topicName) status += ` in ${topicName}`;
  }

  const reset = () => {
    setQuery("");
    setTopic("all");
  };

  const inputId = `${uid}-q`;
  const hintId = `${uid}-hint`;
  const resultsId = `${uid}-results`;

  return (
    <div>
      <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
        <form role="search" aria-label="Health Hub guides" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor={inputId} className="block text-base font-bold text-ink">
            Search guides
          </label>
          <p id={hintId} className="mt-1 text-sm text-muted">
            Search by topic, symptom or question, for example “SHA”, “malaria” or “pregnancy”.
          </p>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) {
                  e.preventDefault();
                  setQuery("");
                }
              }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="search"
              aria-describedby={hintId}
              aria-controls={resultsId}
              placeholder="Search Health Hub guides"
              className="block h-12 w-full appearance-none rounded-lg border border-muted/70 bg-white pr-12 pl-11 text-base text-ink transition-colors placeholder:text-muted/80 hover:border-ink/60 focus:border-brand-600 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-1.5 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-ink"
              >
                <X className="size-5" aria-hidden />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
        </form>

        <div className="mt-5 border-t border-line pt-5">
          <p id={`${uid}-topics`} className="text-sm font-semibold text-ink">
            Filter by topic
          </p>
          <div role="group" aria-labelledby={`${uid}-topics`} className="mt-3 flex flex-wrap gap-2">
            {[{ slug: "all" as const, name: "All topics" }, ...topics].map((t) => {
              const active = topic === t.slug;
              const count = counts.get(t.slug) ?? 0;
              return (
                <button
                  key={t.slug}
                  type="button"
                  aria-pressed={active}
                  aria-controls={resultsId}
                  onClick={() => setTopic(t.slug)}
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
                    {count}
                    <span className="sr-only"> {count === 1 ? "guide" : "guides"}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p role="status" className="text-sm font-semibold text-ink">
          {status}
        </p>
        {filtering && (
          <button type="button" onClick={reset} className="link-brand text-sm">
            Clear search and filters
          </button>
        )}
      </div>

      <div id={resultsId} className="mt-5">
        {results.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((e) => (
              <li key={e.meta.slug}>{cards[e.meta.slug]}</li>
            ))}
          </ul>
        ) : tipResults.length > 0 ? (
          <p className="text-muted">No guides match, but the health tips below do.</p>
        ) : (
          <div className="rounded-xl border border-dashed border-line bg-white p-6 sm:p-8">
            <p className="text-lg font-bold text-ink">No guides match your search</p>
            <p className="mt-2 max-w-prose leading-relaxed text-muted">
              Check the spelling, try a shorter word or choose another topic. You can also{" "}
              <Link href="/contact" className="link-brand">
                contact us
              </Link>{" "}
              with your question.
            </p>
            <button type="button" onClick={reset} className="mt-4 link-brand text-sm">
              Show all guides
            </button>
          </div>
        )}

        {tipResults.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-bold text-ink">Matching health tips</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tipResults.map((e) => (
                <li key={e.meta.slug}>{tipCards[e.meta.slug]}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
