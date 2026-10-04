"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { Dialog } from "./Dialog";

export interface TipSummary {
  slug: string;
  title: string;
  description: string;
  html: string;
  readingMinutes: number;
}

/** Strip the "Health Tip: " prefix used in page titles; it is redundant inside the tips UI. */
export function tipTitle(title: string) {
  return title.replace(/^Health Tip:\s*/i, "");
}

/** A health tip that opens as a quick-read modal, with a link to its full page for sharing. */
export function TipCard({ tip }: { tip: TipSummary }) {
  const [open, setOpen] = useState(false);
  const title = tipTitle(tip.title);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex h-full w-full flex-col rounded-xl border border-line bg-white p-5 text-left transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand-700 uppercase">
          <Lightbulb className="size-4" aria-hidden /> Health tip · {tip.readingMinutes} min
        </span>
        <span className="mt-3 text-base font-bold text-ink">{title}</span>
        <span className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{tip.description}</span>
        <span className="mt-4 text-sm font-semibold text-brand-700 group-hover:underline">Read tip</span>
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title={title} description={tip.description} size="lg">
        <div className="prose-primegala prose-base" dangerouslySetInnerHTML={{ __html: tip.html }} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-xs text-muted">General information only, not a diagnosis.</p>
          <Link
            href={`/health-hub/${tip.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
          >
            Open as a page <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Dialog>
    </>
  );
}
