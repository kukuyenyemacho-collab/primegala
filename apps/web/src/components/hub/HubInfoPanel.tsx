import Link from "next/link";
import { CalendarCheck, Info, PenLine } from "lucide-react";
import { cn } from "@/lib/cn";

/** "About our health information": what the guides are, who writes them and their limits. */
export function HubInfoPanel({ guides, tips, topics }: { guides: number; tips: number; topics: number }) {
  const stats = [
    { value: guides, label: guides === 1 ? "guide" : "guides" },
    { value: tips, label: tips === 1 ? "health tip" : "health tips" },
    { value: topics, label: topics === 1 ? "topic" : "topics" },
  ].filter((s) => s.value > 0);

  return (
    <aside aria-labelledby="hub-info-heading" className="overflow-hidden rounded-xl border border-trust-200 bg-white">
      {stats.length > 0 && (
        <dl
          className={cn(
            "grid divide-x divide-trust-100 border-b border-trust-200 bg-trust-50 text-center",
            ["grid-cols-1", "grid-cols-2", "grid-cols-3"][stats.length - 1],
          )}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col px-2 py-4">
              <dt className="order-2 mt-0.5 text-xs font-semibold text-trust-700">{s.label}</dt>
              <dd className="order-1 text-2xl font-bold tracking-tight text-trust-800 tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="p-5 sm:p-6">
        <h2 id="hub-info-heading" className="text-base font-bold text-ink">
          About our health information
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/85">
          <li className="flex gap-3">
            <PenLine className="mt-0.5 size-4 shrink-0 text-trust-700" aria-hidden />
            Written by Primegala Medical Centre in plain language for families in Nakuru North.
          </li>
          <li className="flex gap-3">
            <CalendarCheck className="mt-0.5 size-4 shrink-0 text-trust-700" aria-hidden />
            Every guide shows the date it was published or last updated.
          </li>
          <li className="flex gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-trust-700" aria-hidden />
            <span>
              General information, not a diagnosis. In an emergency call{" "}
              <a href="tel:999" className="font-semibold text-ink underline decoration-line underline-offset-4">
                999
              </a>{" "}
              or{" "}
              <a href="tel:112" className="font-semibold text-ink underline decoration-line underline-offset-4">
                112
              </a>
              .
            </span>
          </li>
        </ul>
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4 text-sm">
          <Link href="/legal/editorial-policy" className="link-brand">
            Editorial policy
          </Link>
          <Link href="/legal/medical-disclaimer" className="link-brand">
            Medical disclaimer
          </Link>
        </p>
      </div>
    </aside>
  );
}
