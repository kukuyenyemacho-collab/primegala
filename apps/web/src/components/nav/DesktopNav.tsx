"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { activeGroupHref, currentProps, panelId } from "./active";
import { MegaPanel } from "./MegaPanels";
import type { NavFact, NavHub, NavService } from "./types";

const trigger =
  "relative inline-flex h-full items-center gap-1 whitespace-nowrap px-2.5 text-sm font-semibold transition-colors focus-visible:-outline-offset-2 xl:px-3.5 xl:text-[0.9375rem]";
const underline = "after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-t-sm after:bg-brand-600 xl:after:inset-x-3.5";

/**
 * Desktop (lg+) navigation with government-style mega menus. Clicking a group
 * opens a full-width panel under the header; one panel at a time. Escape closes
 * it and returns focus to its button; clicking outside, moving focus away or
 * navigating also closes it.
 */
export function DesktopNav({
  groups,
  services,
  hub,
  facts,
}: {
  groups: NavGroup[];
  services: NavService[];
  hub: NavHub;
  facts: NavFact[];
}) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const [openHref, setOpenHref] = useState<string | null>(null);

  // Close on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenHref(null);
  }

  useEffect(() => {
    if (!openHref) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || document.querySelector("dialog[open]")) return;
      setOpenHref(null);
      rootRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="${panelId("mega", openHref)}"]`)?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenHref(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openHref]);

  const active = activeGroupHref(pathname, groups);

  // Tabbing out of the menu (or into a dialog) closes the open panel.
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && !e.currentTarget.contains(next)) setOpenHref(null);
  };

  // Following any link in a panel closes it, including a link to the current page.
  const onPanelClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setOpenHref(null);
  };

  return (
    <div ref={rootRef} onBlur={onBlur} className="hidden self-stretch lg:ml-2 lg:flex xl:ml-6">
      <nav aria-label="Main" className="flex">
        <ul className="flex items-stretch gap-0.5">
          {groups.map((group) => {
            const isActive = active === group.href;
            if (group.panel === "none") {
              return (
                <li key={group.href} className="flex">
                  <Link
                    href={group.href}
                    {...currentProps(pathname, group.href)}
                    className={cn(trigger, "text-trust-900 hover:text-brand-700", isActive && underline)}
                  >
                    {group.label}
                  </Link>
                </li>
              );
            }
            const isOpen = openHref === group.href;
            const id = panelId("mega", group.href);
            return (
              <li key={group.href} className="flex">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpenHref(isOpen ? null : group.href)}
                  className={cn(
                    trigger,
                    isOpen ? "text-brand-700" : "text-trust-900 hover:text-brand-700",
                    (isActive || isOpen) && underline,
                  )}
                >
                  {group.label}
                  <ChevronDown
                    className={cn("size-4 transition-transform duration-150", isOpen && "rotate-180")}
                    aria-hidden
                  />
                  {isActive && <span className="sr-only"> (current section)</span>}
                </button>
                {/* Positioned against the sticky header, so it spans the full page width. */}
                <div
                  id={id}
                  hidden={!isOpen}
                  onClick={onPanelClick}
                  className="absolute inset-x-0 top-full border-y border-line bg-white shadow-lift"
                >
                  <MegaPanel group={group} services={services} hub={hub} facts={facts} pathname={pathname} />
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
