import Link from "next/link";
import { CalendarCheck, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "./Icon";
import { phoneHref, site, whatsappHref } from "@/lib/site";

/** Thumb-reach actions on phones, where most Nakuru patients will find us. */
export function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.7rem] font-semibold";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(16_34_26/0.25)] backdrop-blur md:hidden"
    >
      <div className="flex">
        <a href={phoneHref()} className={`${item} text-brand-800`} data-track="call_click_bar">
          <Phone className="size-5" aria-hidden /> Call
        </a>
        <a
          href={whatsappHref()}
          className={`${item} text-[#128C4A]`}
          data-track="whatsapp_click_bar"
          {...(site.contact.whatsapp ? { target: "_blank", rel: "noopener" } : {})}
        >
          <WhatsAppIcon className="size-5" /> WhatsApp
        </a>
        <Link href="/book" className={`${item} text-brand-800`} data-track="book_click_bar">
          <span className="-mt-5 flex size-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lift ring-4 ring-white">
            <CalendarCheck className="size-5" aria-hidden />
          </span>
          Book
        </Link>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener"
          className={`${item} text-brand-800`}
          data-track="directions_click_bar"
        >
          <Navigation className="size-5" aria-hidden /> Directions
        </a>
      </div>
    </nav>
  );
}
