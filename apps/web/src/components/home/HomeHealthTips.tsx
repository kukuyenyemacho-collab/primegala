import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/Cards";
import { TipCard, type TipSummary } from "@/components/TipCard";
import { Section, SectionHeading } from "@/components/ui";
import type { ArticleMeta } from "@/lib/content";

/** Quick-read health tips (open in a dialog) followed by the latest Health Hub guides. */
export function HomeHealthTips({ tips, guides }: { tips: TipSummary[]; guides: ArticleMeta[] }) {
  return (
    <Section tone="surface" id="health-tips" labelledBy="tips-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="tips-heading"
          eyebrow="Health Hub"
          title="Quick health tips for your family"
          intro="Short, practical tips you can read in a minute or two. Open a tip to read it right here."
        />
        <Link href="/health-hub#tips" className="link-brand inline-flex shrink-0 items-center gap-1.5 self-start md:self-auto">
          All health tips <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      {tips.length > 0 && (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <li key={tip.slug}>
              <TipCard tip={tip} />
            </li>
          ))}
        </ul>
      )}

      {guides.length > 0 && (
        <div className="mt-14 border-t border-line pt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h3 className="text-2xl font-bold tracking-tight text-ink">Latest guides</h3>
            <Link href="/health-hub" className="link-brand inline-flex shrink-0 items-center gap-1.5">
              Visit the Health Hub <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {guides.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
