import Link from "next/link";
import { CalendarCheck, Mail, Navigation, Phone, Search } from "lucide-react";
import { WhatsAppIcon } from "./Icon";
import { OpenSearchButton } from "./nav/OpenSearchButton";
import { emailHref, hasPhone, hasWhatsApp, phoneHref, site, whatsappHref } from "@/lib/site";

const item =
  "flex h-full min-h-14 w-full flex-col items-center justify-center gap-1 px-1 text-xs font-semibold text-ink transition-colors hover:bg-surface focus-visible:-outline-offset-2";
const icon = "size-5 text-trust-700";

/**
 * Thumb-reach actions on phones. Call and WhatsApp appear only when real numbers
 * are configured; otherwise the bar offers Email and Search instead.
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        <li>
          {hasPhone ? (
            <a href={phoneHref()} className={item} data-track="call_click_bar">
              <Phone className={icon} aria-hidden /> Call
            </a>
          ) : (
            <a href={emailHref()} className={item} data-track="email_click_bar">
              <Mail className={icon} aria-hidden /> Email
            </a>
          )}
        </li>
        <li>
          {hasWhatsApp ? (
            <a href={whatsappHref()} target="_blank" rel="noopener" className={item} data-track="whatsapp_click_bar">
              <WhatsAppIcon className="size-5 text-[#0f7a40]" /> WhatsApp
            </a>
          ) : (
            <OpenSearchButton className={item} track="search_open_bar">
              <Search className={icon} aria-hidden /> Search
            </OpenSearchButton>
          )}
        </li>
        <li className="p-1.5">
          <Link
            href="/book"
            data-track="book_click_bar"
            className="flex h-full min-h-11 w-full flex-col items-center justify-center gap-0.5 rounded-lg bg-brand-600 px-1 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <CalendarCheck className="size-5" aria-hidden /> Book
          </Link>
        </li>
        <li>
          <a href={site.mapsUrl} target="_blank" rel="noopener" className={item} data-track="directions_click_bar">
            <Navigation className={icon} aria-hidden /> Directions
            <span className="sr-only"> (opens Google Maps)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
