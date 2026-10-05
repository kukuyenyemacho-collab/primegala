import { ArticleCard } from "@/components/Cards";
import type { ArticleMeta } from "@/lib/content";

/** One large featured guide beside two smaller ones (stacked on desktop, side by side on tablets). */
export function FeaturedGuides({ guides }: { guides: ArticleMeta[] }) {
  const [lead, ...rest] = guides;
  if (!lead) return null;
  const secondary = rest.slice(0, 2);
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className={secondary.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
        <ArticleCard article={lead} large />
      </div>
      {secondary.length > 0 && (
        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {secondary.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
