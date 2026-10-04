import { CalendarCheck, Navigation } from "lucide-react";
import { WhatsAppIcon } from "./Icon";
import { ButtonLink } from "./ui";
import { site, whatsappHref } from "@/lib/site";

export function CtaBand({
  title = "Care is six miles closer than you think.",
  body = "Walk in any time, day or night, or book ahead and we'll be ready for you. We're on the Nakuru–Nyahururu Road at Maili Sita, opposite Kiamaina Primary School.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-800 px-6 py-12 sm:px-12 sm:py-16">
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-brand-700/70"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0 110C200 60 380 70 600 95s420 20 600-35v100H0Z" fill="currentColor" />
            <path d="M0 140c220-35 420-30 640-10s380 10 560-20v50H0Z" fill="#0b3f23" opacity=".6" />
          </svg>
          <div className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-sun-400/25 blur-2xl" aria-hidden />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book" variant="sun" size="lg" track="book_click_cta">
                <CalendarCheck className="size-5" aria-hidden /> Book a visit
              </ButtonLink>
              <ButtonLink href={whatsappHref()} variant="inverted" size="lg" track="whatsapp_click_cta">
                <WhatsAppIcon className="size-5" /> WhatsApp us
              </ButtonLink>
              <ButtonLink href={site.mapsUrl} variant="inverted" size="lg" track="directions_click_cta">
                <Navigation className="size-5" aria-hidden /> Directions
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
