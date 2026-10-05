import { TipCard, type TipSummary } from "@/components/TipCard";
import { cn } from "@/lib/cn";

/** Health tips as quick-read cards; each opens in a dialog with a link to its full page. */
export function TipGrid({ tips, className }: { tips: TipSummary[]; className?: string }) {
  if (tips.length === 0) return null;
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {tips.map((tip) => (
        <li key={tip.slug}>
          <TipCard tip={tip} />
        </li>
      ))}
    </ul>
  );
}
