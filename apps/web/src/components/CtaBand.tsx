import { CalendarCheck, Mail, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "./Icon";
import { ButtonLink } from "./ui";
import { emailHref, hasPhone, hasWhatsApp, phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

/**
 * Closing call to action: flat navy band with a thin green rule. Call and WhatsApp
 * only appear when those numbers are configured; otherwise visitors can email us.
 */
export function CtaBand({
  title = "Care is six miles closer than you think.",
  body = "Walk in any time, day or night, or book ahead and we'll be ready for you. We're on the Nakuru–Nyahururu Road at Maili Sita, opposite Kiamaina Primary School.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark border-t-4 border-brand-500 bg-trust-950 text-white" aria-labelledby="cta-band-title">
      <div className="container-page grid gap-8 py-14 sm:py-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 id="cta-band-title" className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-trust-100">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
          <ButtonLink href="/book" size="lg" track="book_click_cta">
            <CalendarCheck className="size-5" aria-hidden /> Book a visit
          </ButtonLink>
          <ButtonLink href={site.mapsUrl} variant="inverted" size="lg" track="directions_click_cta">
            <Navigation className="size-5" aria-hidden /> Get directions
          </ButtonLink>
          {hasPhone && (
            <ButtonLink href={phoneHref()} variant="inverted" size="lg" track="call_click_cta">
              <Phone className="size-5" aria-hidden /> Call {phoneDisplay()}
            </ButtonLink>
          )}
          {hasWhatsApp && (
            <ButtonLink href={whatsappHref()} variant="inverted" size="lg" track="whatsapp_click_cta">
              <WhatsAppIcon className="size-5" /> WhatsApp us
            </ButtonLink>
          )}
          {!hasPhone && !hasWhatsApp && (
            <ButtonLink href={emailHref("Enquiry from the Primegala website")} variant="inverted" size="lg" track="email_click_cta">
              <Mail className="size-5" aria-hidden /> Email us
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
