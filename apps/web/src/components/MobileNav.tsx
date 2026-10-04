"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonClasses } from "./ui";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
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
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex size-11 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
      >
        {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[6.5rem] bottom-0 z-50 overflow-y-auto bg-white">
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
        </div>
      )}
    </div>
  );
}
