"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CalendarCheck, ChevronDown, Lightbulb, Mail, Menu, Navigation, Phone, Siren, X } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { ServiceIcon, WhatsAppIcon } from "./Icon";
import { buttonClasses } from "./ui";
import { cn } from "@/lib/cn";
import { activeGroupHref, currentProps, panelId } from "./nav/active";
import { NavFacts } from "./nav/MegaPanels";
import type { NavContact, NavFact, NavHub, NavService } from "./nav/types";

const subLink = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-ink hover:bg-surface";
const itemLink = "block rounded-lg px-3 py-2.5 text-ink hover:bg-surface";
const allLink = "mt-1 inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-brand-600 hover:text-brand-700";

/**
 * Phone and tablet menu (below lg): a full-screen panel under the header with an
 * accordion per navigation group, quick actions and an emergency note.
 * Closes on navigation and Escape, locks page scroll and makes the page behind it
 * inert while open.
 */
export function MobileNav({
  groups,
  services,
  hub,
  facts,
  contact,
}: {
  groups: NavGroup[];
  services: NavService[];
  hub: NavHub;
  facts: NavFact[];
  contact: NavContact;
}) {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  // The panel starts at the bottom of the sticky header, measured when it opens.
  const [panelTop, setPanelTop] = useState(73);

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const header = buttonRef.current?.closest("header") ?? null;

    // Everything except the header and this panel becomes inert, so Tab and screen
    // readers stay inside the menu.
    const inerted = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && el !== panel && !el.contains(header) && !el.hasAttribute("inert"),
    );
    inerted.forEach((el) => el.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || document.querySelector("dialog[open]")) return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    // If the window grows to desktop width, the desktop menu takes over.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      inerted.forEach((el) => el.removeAttribute("inert"));
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  function toggle() {
    if (!open) {
      setPanelTop(buttonRef.current?.closest("header")?.getBoundingClientRect().bottom ?? 73);
      setExpanded(activeGroupHref(pathname, groups));
    }
    setOpen(!open);
  }

  // Following a link closes the menu, including a link to the page already open.
  const onPanelClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-line px-2.5 text-sm font-semibold text-trust-900 transition-colors hover:bg-trust-50 sm:px-3.5"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        {/* Same name open or closed; aria-expanded tells assistive tech which. */}
        <span className="sr-only sm:not-sr-only">Menu</span>
      </button>

      {/* Portalled to <body> so no ancestor (sticky, filters, transforms) can trap this fixed panel. */}
      {open &&
        createPortal(
          <div
            ref={panelRef}
            id="mobile-menu"
            style={{ top: panelTop }}
            onClick={onPanelClick}
            className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto overscroll-contain bg-white lg:hidden"
          >
            <nav aria-label="Main" className="container-page pt-2 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
              <ul className="border-b border-line">
                <li className="border-t border-line first:border-t-0">
                  <Link
                    href="/"
                    {...currentProps(pathname, "/")}
                    className="flex min-h-14 items-center py-3 text-lg font-bold text-trust-900"
                  >
                    Home
                  </Link>
                </li>
                {groups.map((group) => {
                  if (group.panel === "none") {
                    return (
                      <li key={group.href} className="border-t border-line">
                        <Link
                          href={group.href}
                          {...currentProps(pathname, group.href)}
                          className="flex min-h-14 items-center py-3 text-lg font-bold text-trust-900"
                        >
                          {group.label}
                        </Link>
                      </li>
                    );
                  }
                  const isOpen = expanded === group.href;
                  const id = panelId("mobile", group.href);
                  return (
                    <li key={group.href} className="border-t border-line">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={id}
                        onClick={() => setExpanded(isOpen ? null : group.href)}
                        className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-lg font-bold text-trust-900"
                      >
                        {group.label}
                        <ChevronDown
                          className={cn("size-5 shrink-0 text-trust-700 transition-transform duration-150", isOpen && "rotate-180")}
                          aria-hidden
                        />
                      </button>
                      <div id={id} hidden={!isOpen} className="pb-4">
                        {group.intro && <p className="mb-2 text-sm leading-relaxed text-muted">{group.intro}</p>}
                        <GroupLinks group={group} services={services} hub={hub} pathname={pathname} />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/book" className={buttonClasses("primary", "lg", "w-full")} data-track="book_click_menu">
                  <CalendarCheck className="size-5" aria-hidden /> Book a visit
                </Link>
                {contact.phone ? (
                  <a href={contact.phone.href} className={buttonClasses("secondary", "lg", "w-full")} data-track="call_click_menu">
                    <Phone className="size-5" aria-hidden /> Call {contact.phone.label}
                  </a>
                ) : (
                  <a href={contact.email.href} className={buttonClasses("secondary", "lg", "w-full")} data-track="email_click_menu">
                    <Mail className="size-5" aria-hidden /> Email us
                  </a>
                )}
                {contact.whatsappHref && (
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener"
                    className={buttonClasses("whatsapp", "lg", "w-full")}
                    data-track="whatsapp_click_menu"
                  >
                    <WhatsAppIcon className="size-5" /> WhatsApp
                  </a>
                )}
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className={buttonClasses("secondary", "lg", "w-full")}
                  data-track="directions_click_menu"
                >
                  <Navigation className="size-5" aria-hidden /> Directions
                  <span className="sr-only"> (opens Google Maps)</span>
                </a>
              </div>

              <NavFacts facts={facts} className="mt-6" />

              <div role="note" className="mt-4 rounded-lg border border-line border-l-4 border-l-alert p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold text-ink">
                  <Siren className="size-4 text-alert" aria-hidden /> In an emergency
                </p>
                <p className="mt-1 leading-relaxed text-muted">
                  Call{" "}
                  <a href="tel:999" className="font-semibold text-alert underline underline-offset-2">
                    999
                  </a>{" "}
                  or{" "}
                  <a href="tel:112" className="font-semibold text-alert underline underline-offset-2">
                    112
                  </a>
                  , or come straight to Primegala. We are open 24 hours.
                </p>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}

function GroupLinks({
  group,
  services,
  hub,
  pathname,
}: {
  group: NavGroup;
  services: NavService[];
  hub: NavHub;
  pathname: string;
}) {
  if (group.panel === "services") {
    return (
      <>
        <ul className="grid gap-0.5 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} {...currentProps(pathname, s.href)} className={subLink}>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                  <ServiceIcon name={s.icon} className="size-[1.125rem]" strokeWidth={1.75} />
                </span>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={group.href} {...currentProps(pathname, group.href)} className={allLink}>
          All services <ArrowRight className="size-4" aria-hidden />
        </Link>
      </>
    );
  }

  if (group.panel === "hub") {
    return (
      <>
        <ul className="grid gap-0.5 sm:grid-cols-2">
          {hub.categories.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} {...currentProps(pathname, c.href)} className={subLink}>
                {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href={hub.tips.href} className={subLink}>
              <Lightbulb className="size-4 text-sun-500" aria-hidden /> {hub.tips.label}
            </Link>
          </li>
        </ul>
        <Link href={group.href} {...currentProps(pathname, group.href)} className={allLink}>
          Visit the Health Hub <ArrowRight className="size-4" aria-hidden />
        </Link>
      </>
    );
  }

  return (
    <ul className="grid gap-0.5 sm:grid-cols-2">
      {(group.items ?? []).map((item) => (
        <li key={item.href}>
          <Link href={item.href} {...currentProps(pathname, item.href)} className={itemLink}>
            <span className="block text-[0.9375rem] font-semibold">{item.label}</span>
            {item.description && (
              <span className="mt-0.5 block text-sm font-normal text-muted" lang={item.href === "/kiswahili" ? "sw" : undefined}>
                {item.description}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
