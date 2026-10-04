import { ChevronDown } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { faqJsonLd } from "@/lib/seo";

/** Native <details> keeps answers in the HTML for crawlers and works without JavaScript. */
export function FaqList({ faqs, withSchema = true }: { faqs: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
      <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line">
        {faqs.map((f, i) => (
          <details key={f.q} className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 text-left font-semibold text-ink transition-colors hover:bg-surface [&::-webkit-details-marker]:hidden">
              <h3 className="font-sans text-base sm:text-lg">{f.q}</h3>
              <ChevronDown
                className="mt-1 size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
