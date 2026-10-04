import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

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
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 to-white">
      <svg
        className="pointer-events-none absolute right-0 bottom-0 h-32 w-full text-brand-100/70"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 90c180-40 360-50 600-20s420 10 600-30v80H0Z" fill="currentColor" />
      </svg>
      <div className="container-page relative py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <div className={aside ? "mt-8 grid gap-10 lg:grid-cols-12 lg:items-end" : "mt-8"}>
          <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
            {eyebrow && (
              <p className="eyebrow">
                <span className="h-px w-6 bg-brand-400" aria-hidden />
                {eyebrow}
              </p>
            )}
            <h1 className="mt-3 text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl lg:text-[3.4rem]">{title}</h1>
            {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
