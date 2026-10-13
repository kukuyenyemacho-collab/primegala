"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Promotion {
  id: string;
  url: string;
  alt: string;
  title?: string;
  link?: string;
}

const INTERVAL_MS = 6000;

/**
 * Promotions posted from the staff dashboard, sliding in the homepage hero. Pauses on hover
 * and keyboard focus, and does not auto-advance for visitors who prefer reduced motion.
 * Images are contained, not cropped, so text on posters stays readable.
 */
export function HeroPromotions({ items }: { items: Promotion[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, count, go]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-trust-900/60"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((p, i) => {
          const body = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.alt}
                loading="eager"
                decoding="async"
                className="block aspect-[4/3] w-full object-contain sm:aspect-[4/5]"
              />
              {p.title && (
                <span className="block border-t border-white/15 px-4 py-3 text-sm font-semibold text-white">{p.title}</span>
              )}
            </>
          );
          return (
            <div
              key={p.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="w-full shrink-0"
            >
              {p.link ? (
                <a
                  href={p.link}
                  tabIndex={i === index ? 0 : -1}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                  {...(p.link.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {body}
                </a>
              ) : (
                body
              )}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-trust-950 shadow hover:bg-white"
          >
            <ChevronLeft className="size-5" aria-hidden />
            <span className="sr-only">Previous promotion</span>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-trust-950 shadow hover:bg-white"
          >
            <ChevronRight className="size-5" aria-hidden />
            <span className="sr-only">Next promotion</span>
          </button>
          <div className="absolute inset-x-0 top-3 flex justify-center gap-1.5">
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80")}
              >
                <span className="sr-only">Show promotion {i + 1}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
