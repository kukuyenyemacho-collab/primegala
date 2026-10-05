import Link from "next/link";
import { ArrowRight, Clock, Lightbulb, MapPin, ShieldCheck } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { ServiceIcon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { currentProps } from "./active";
import type { NavFact, NavFactIcon, NavHub, NavService } from "./types";

export const FACT_ICONS: Record<NavFactIcon, typeof Clock> = { clock: Clock, map: MapPin, shield: ShieldCheck };

/** Key facts in a quiet trust-blue box (left column of the mega menu, foot of the mobile menu). */
export function NavFacts({ facts, className }: { facts: NavFact[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5 rounded-lg border border-trust-100 bg-trust-50 p-4 text-sm text-trust-900", className)}>
      {facts.map((fact) => {
        const Icon = FACT_ICONS[fact.icon];
        return (
          <li key={fact.text} className="flex gap-2.5 leading-snug">
            <Icon className="mt-0.5 size-4 shrink-0 text-trust-700" aria-hidden />
            {fact.text}
          </li>
        );
      })}
    </ul>
  );
}

const linkTitle = "block text-sm font-semibold text-ink group-hover:text-brand-700 group-hover:underline underline-offset-2";
const linkText = "mt-0.5 block text-[0.8125rem] leading-snug text-muted";
const linkBox = "group block h-full rounded-lg px-3 py-2.5 transition-colors hover:bg-surface";

function ServicesPanel({ services, pathname }: { services: NavService[]; pathname: string }) {
  return (
    <ul className="grid grid-cols-3 gap-1">
      {services.map((s) => (
        <li key={s.slug}>
          <Link href={s.href} {...currentProps(pathname, s.href)} className={cn(linkBox, "flex gap-3")}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
              <ServiceIcon name={s.icon} className="size-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className={linkTitle}>{s.name}</span>
              <span className={cn(linkText, "line-clamp-2")}>{s.summary}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function HubPanel({ hub, pathname }: { hub: NavHub; pathname: string }) {
  return (
    <div className="grid grid-cols-9 gap-8">
      <div className="col-span-4">
        <p className="eyebrow px-3">Topics</p>
        <ul className="mt-2 space-y-0.5">
          {hub.categories.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} {...currentProps(pathname, c.href)} className={linkBox}>
                <span className={linkTitle}>{c.name}</span>
                <span className={cn(linkText, "line-clamp-1")}>{c.description}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href={hub.tips.href} className={cn(linkBox, "flex gap-2.5")}>
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-sun-500" aria-hidden />
              <span>
                <span className={linkTitle}>{hub.tips.label}</span>
                <span className={linkText}>{hub.tips.description}</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-5">
        <p className="eyebrow">Featured guides</p>
        <ul className="mt-3 space-y-3">
          {hub.featured.map((a) => (
            <li key={a.slug}>
              <Link
                href={a.href}
                {...currentProps(pathname, a.href)}
                className="group block rounded-xl border border-line p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
              >
                <span className="text-xs font-semibold text-trust-700">
                  {a.category} · {a.readingMinutes} min read
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-snug font-semibold text-ink group-hover:text-brand-700">
                  {a.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LinksPanel({ group, pathname }: { group: NavGroup; pathname: string }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-1 xl:grid-cols-3">
      {(group.items ?? []).map((item) => (
        <li key={item.href}>
          <Link href={item.href} {...currentProps(pathname, item.href)} className={linkBox}>
            <span className={linkTitle}>{item.label}</span>
            {item.description && (
              <span className={linkText} lang={item.href === "/kiswahili" ? "sw" : undefined}>
                {item.description}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Where the "overview" link in a panel's left column goes, if the panel has one. */
function overviewLink(group: NavGroup): { href: string; label: string } | null {
  if (group.panel === "services") return { href: group.href, label: "All services" };
  if (group.panel === "hub") return { href: group.href, label: "Visit the Health Hub" };
  if (group.items?.some((item) => item.href === group.href)) return null;
  return { href: group.href, label: `${group.label}: overview` };
}

/** Body of one mega menu panel: intro on the left, links on the right. */
export function MegaPanel({
  group,
  services,
  hub,
  facts,
  pathname,
}: {
  group: NavGroup;
  services: NavService[];
  hub: NavHub;
  facts: NavFact[];
  pathname: string;
}) {
  const overview = overviewLink(group);
  return (
    <div className="container-page grid max-h-[calc(100dvh-5.5rem)] grid-cols-12 gap-8 overflow-y-auto py-8">
      <div className="col-span-3 border-r border-line pr-8">
        <p className="text-xl font-bold tracking-tight text-trust-900">{group.label}</p>
        {group.intro && <p className="mt-2 text-sm leading-relaxed text-muted">{group.intro}</p>}
        {overview && (
          <Link
            href={overview.href}
            {...currentProps(pathname, overview.href)}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            {overview.label} <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
        <NavFacts facts={facts} className="mt-6" />
      </div>
      <div className="col-span-9">
        {group.panel === "services" && <ServicesPanel services={services} pathname={pathname} />}
        {group.panel === "hub" && <HubPanel hub={hub} pathname={pathname} />}
        {group.panel === "links" && <LinksPanel group={group} pathname={pathname} />}
      </div>
    </div>
  );
}
