"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { Dialog } from "@/components/Dialog";
import type { ServiceOption } from "@/components/LeadForm";

// The form is only downloaded when someone opens the booking dialog.
const LeadForm = dynamic(() => import("@/components/LeadForm").then((m) => m.LeadForm), {
  ssr: false,
  loading: () => (
    <p className="flex items-center gap-2 py-10 text-sm text-muted">
      <LoaderCircle className="size-4 animate-spin" aria-hidden /> Loading the booking form…
    </p>
  ),
});

/**
 * "Book a visit" that opens the booking form in a dialog. It is a real link to
 * /book, so it still works without JavaScript, opens in a new tab on
 * Ctrl/Cmd-click, and simply navigates when the visitor is already on /book.
 */
export function BookVisitButton({
  services,
  whatsappHref,
  className,
  track = "book_click_header",
  children,
}: {
  services: ServiceOption[];
  whatsappHref: string;
  className?: string;
  /** data-track event name for analytics. */
  track?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close if the visitor follows a link inside the form (e.g. the Privacy Policy).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <Link
        href="/book"
        data-track={track}
        aria-haspopup="dialog"
        className={className}
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          if (pathname === "/book") return;
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </Link>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Book a visit"
        description="Tell us what you need and when suits you. Our team will contact you to confirm. Walk-ins are welcome 24 hours a day."
        size="lg"
      >
        <LeadForm
          services={services}
          whatsappHref={whatsappHref}
          className="rounded-none border-0! bg-transparent! p-0! ring-0! sm:p-0!"
        />
        <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
          Prefer a full page?{" "}
          <Link
            href="/book"
            data-track="book_page_click_dialog"
            className="inline-flex items-center gap-1 font-semibold text-brand-600 underline decoration-brand-300 underline-offset-4 hover:text-brand-700"
          >
            Open the booking page <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </p>
      </Dialog>
    </>
  );
}
