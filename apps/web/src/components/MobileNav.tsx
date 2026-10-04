"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { buttonClasses } from "./ui";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  // Panel starts below the sticky header, wherever it sits (the preview banner can push it down).
  const [panelTop, setPanelTop] = useState(104);
  const pathname = usePathname();

  // Close on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={(e) => {
          if (!open) setPanelTop(e.currentTarget.closest("header")?.getBoundingClientRect().bottom ?? 104);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex size-11 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
      >
        {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {/* Portalled to <body>: the header's backdrop-filter would otherwise trap this fixed panel inside the header bar. */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            style={{ top: panelTop }}
            className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-6">
              <ul className="divide-y divide-line">
                {[{ href: "/", label: "Home" }, ...items, { href: "/faq", label: "FAQs" }].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-4 font-display text-2xl text-ink"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/book" className={buttonClasses("primary", "lg", "mt-8 w-full")} data-track="book_click_menu">
                Book a visit
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
