"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { Heading } from "@/lib/content";

/** Distance from the top of the viewport (below the 72px sticky header) where a section counts as "current". */
const ACTIVE_LINE = 128;

/**
 * Desktop "On this page" list. An IntersectionObserver watches the section headings
 * and highlights the section being read: the last heading that has scrolled past
 * the line just under the sticky header.
 */
export function ArticleToc({ headings, label = "On this page" }: { headings: Heading[]; label?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;

    const update = () => {
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= ACTIVE_LINE) current = el.id;
        else break;
      }
      setActive(current);
    };

    // Fires whenever a heading crosses the active line (in either direction), and once on observe.
    const observer = new IntersectionObserver(update, {
      rootMargin: `-${ACTIVE_LINE}px 0px 0px 0px`,
      threshold: [0, 1],
    });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-labelledby="toc-heading">
      <h2 id="toc-heading" className="text-xs font-semibold tracking-[0.14em] text-trust-700 uppercase">
        {label}
      </h2>
      <ol className="mt-4 space-y-1 border-l border-line">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActive(h.id)}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
                  isActive
                    ? "border-brand-600 font-semibold text-brand-800"
                    : "border-transparent text-muted hover:border-line hover:text-ink",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
