import { Plus } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { faqJsonLd } from "@/lib/seo";

/** Native <details> keeps answers in the HTML for crawlers and works without JavaScript. */
export function FaqList({ faqs, withSchema = true }: { faqs: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
      <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {faqs.map((f, i) => (
          <details key={f.q} className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface focus-visible:-outline-offset-2 sm:gap-6 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base leading-snug font-semibold text-ink sm:text-lg">{f.q}</h3>
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-line text-brand-600 group-open:border-brand-300 group-open:bg-brand-50">
                <Plus className="size-4 transition-transform duration-150 group-open:rotate-45" aria-hidden />
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-muted sm:px-6 sm:pb-6">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
