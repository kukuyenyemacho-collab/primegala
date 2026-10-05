import Link from "next/link";
import { Info } from "lucide-react";

/** The medical disclaimer shown at the end of every Health Hub article and tip. */
export function MedicalNote() {
  return (
    <aside aria-label="Medical disclaimer" className="flex gap-3 rounded-xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
      <Info className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
      <p>
        This article is general information, not a diagnosis. Always consult a qualified health professional about your
        health. In an emergency call{" "}
        <a href="tel:999" className="font-semibold text-ink underline decoration-line underline-offset-4">
          999
        </a>{" "}
        or{" "}
        <a href="tel:112" className="font-semibold text-ink underline decoration-line underline-offset-4">
          112
        </a>
        . See our{" "}
        <Link href="/legal/medical-disclaimer" className="link-brand">
          medical disclaimer
        </Link>{" "}
        and{" "}
        <Link href="/legal/editorial-policy" className="link-brand">
          editorial policy
        </Link>
        .
      </p>
    </aside>
  );
}
