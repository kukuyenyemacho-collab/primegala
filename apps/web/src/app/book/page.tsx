import type { Metadata } from "next";
import { Clock, MapPin, Phone, Siren } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppIcon } from "@/components/Icon";
import { SERVICE_PAGES } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment | Maili Sita, Nakuru",
  description:
    "Book a visit, request a callback, get SHA help or arrange a maternity visit at Primegala Medical Centre, Maili Sita. We confirm by WhatsApp or phone. Walk-ins welcome 24 hours.",
  path: "/book",
  keywords: ["book hospital appointment Nakuru", "book doctor Nakuru", "clinic appointment Maili Sita"],
});

export default function BookPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Book a visit", path: "/book" }]}
        eyebrow="Appointments"
        title="Book a visit"
        intro="Tell us what you need and when. We'll confirm by WhatsApp or phone. Prefer to just come? Walk-ins are welcome at any hour."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <LeadForm services={SERVICE_PAGES.map((s) => ({ code: s.code, name: s.name }))} whatsappHref={whatsappHref()} />
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-[var(--radius-card)] bg-alert/5 p-6 ring-1 ring-alert/20">
              <h2 className="flex items-center gap-2 font-sans text-lg font-bold text-alert">
                <Siren className="size-5" aria-hidden /> Emergency?
              </h2>
              <p className="mt-2 leading-relaxed text-ink/85">
                Don&apos;t book. Call <a href="tel:999" className="font-bold">999</a> or{" "}
                <a href="tel:112" className="font-bold">112</a>, or come straight to Primegala. We&apos;re open now.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
              <h2 className="font-sans text-lg font-bold text-ink">Faster on WhatsApp</h2>
              <p className="mt-2 text-muted">Send us a message and we&apos;ll book you in.</p>
              <a
                href={whatsappHref()}
                data-track="whatsapp_click_book"
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#128C4A] px-5 text-sm font-semibold text-white hover:bg-[#0f7a40]"
                {...(site.contact.whatsapp ? { target: "_blank", rel: "noopener" } : {})}
              >
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp
              </a>
            </div>
            <ul className="space-y-4 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
              <li className="flex gap-3">
                <Clock className="size-5 shrink-0 text-brand-600" aria-hidden /> Open 24 hours, 7 days a week
              </li>
              <li className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-brand-600" aria-hidden /> Maili Sita, Nakuru–Nyahururu Road,
                opposite Kiamaina Primary School
              </li>
              <li className="flex gap-3">
                <Phone className="size-5 shrink-0 text-brand-600" aria-hidden />
                <a href={phoneHref()} className="font-semibold text-brand-700" data-track="call_click_book">
                  {phoneDisplay()}
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
