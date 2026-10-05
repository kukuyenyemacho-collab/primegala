import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted">
          {all.map((item, i) => (
            <li key={item.path} className="flex min-w-0 items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted/60" aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="font-medium break-words text-ink">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-ink/80 underline decoration-line decoration-1 underline-offset-4 hover:text-brand-700 hover:decoration-brand-600"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
