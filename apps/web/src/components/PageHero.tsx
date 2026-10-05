import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

/** Flat page header: breadcrumbs, label, one H1, a short answer-first intro and the page's main actions. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-page py-8 sm:py-12">
        <Breadcrumbs items={crumbs} />
        <div className={aside ? "mt-8 grid gap-10 lg:grid-cols-12 lg:items-start" : "mt-8"}>
          <div className={aside ? "min-w-0 lg:col-span-7" : "max-w-3xl"}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={`${eyebrow ? "mt-3 " : ""}text-4xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl`}>
              {title}
            </h1>
            {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {aside && <div className="min-w-0 lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
