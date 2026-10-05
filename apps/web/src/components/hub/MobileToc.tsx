import { ChevronDown } from "lucide-react";
import type { Heading } from "@/lib/content";

/** Collapsible "On this page" for small screens. Native <details>, so it works without JavaScript. */
export function MobileToc({ headings, label = "On this page" }: { headings: Heading[]; label?: string }) {
  if (headings.length === 0) return null;
  return (
    <details className="group rounded-xl border border-line bg-white lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-base font-semibold text-ink transition-colors hover:bg-surface focus-visible:-outline-offset-2 [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown className="size-5 shrink-0 text-trust-700 transition-transform duration-150 group-open:rotate-180" aria-hidden />
      </summary>
      <nav aria-label={label} className="border-t border-line px-5 py-4">
        <ol className="space-y-1">
          {headings.map((h, i) => (
            <li key={h.id} className="flex gap-3">
              <span className="w-5 shrink-0 pt-1.5 text-right text-sm text-muted tabular-nums" aria-hidden>
                {i + 1}.
              </span>
              <a href={`#${h.id}`} className="block py-1.5 text-sm leading-snug font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-800 hover:decoration-brand-600">
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
