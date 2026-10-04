import type { Metadata } from "next";
import { Bus, Car, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { MapEmbed } from "@/components/MapEmbed";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppIcon } from "@/components/Icon";
import { SERVICE_PAGES } from "@/content/services";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Directions: Maili Sita, Opp. Kiamaina Primary School",
  description:
    "Find Primegala Medical Centre at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School, about 10 km from Nakuru town. Open 24 hours. Call, WhatsApp or get directions.",
  path: "/contact",
  keywords: keywordsFor("local", "questions"),
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact & directions", path: "/contact" }]}
        eyebrow="Find us"
        title="Opposite Kiamaina Primary School, Maili Sita"
        intro="On the Nakuru–Nyahururu Road, about six miles (10 km) from Nakuru town. Open 24 hours, every day of the year."
      >
        <ButtonLink href={site.mapsUrl} size="lg" track="directions_click_contact">
          <Navigation className="size-5" aria-hidden /> Get directions
        </ButtonLink>
        <ButtonLink href={whatsappHref()} variant="whatsapp" size="lg" track="whatsapp_click_contact">
          <WhatsAppIcon className="size-5" /> WhatsApp
        </ButtonLink>
        <ButtonLink href={phoneHref()} variant="secondary" size="lg" track="call_click_contact">
          <Phone className="size-5" aria-hidden /> {phoneDisplay()}
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <dl className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line sm:col-span-2">
                <dt className="flex items-center gap-2 font-bold text-ink">
                  <MapPin className="size-5 text-brand-600" aria-hidden /> Address
                </dt>
                <dd className="mt-2 leading-relaxed text-muted">{fullAddress()}</dd>
              </div>
              <div className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
                <dt className="flex items-center gap-2 font-bold text-ink">
                  <Clock className="size-5 text-brand-600" aria-hidden /> Hours
                </dt>
                <dd className="mt-2 text-muted">Open 24 hours, 7 days a week, including public holidays</dd>
              </div>
              <div className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
                <dt className="flex items-center gap-2 font-bold text-ink">
                  <Phone className="size-5 text-brand-600" aria-hidden /> Phone & WhatsApp
                </dt>
                <dd className="mt-2">
                  <a href={phoneHref()} className="font-semibold text-brand-700" data-track="call_click_contact_card">
                    {phoneDisplay()}
                  </a>
                </dd>
              </div>
              {site.contact.email && (
                <div className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line sm:col-span-2">
                  <dt className="flex items-center gap-2 font-bold text-ink">
                    <Mail className="size-5 text-brand-600" aria-hidden /> Email
                  </dt>
                  <dd className="mt-2">
                    <a href={`mailto:${site.contact.email}`} className="font-semibold text-brand-700">
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <h2 className="mt-12 text-3xl font-semibold text-ink">How to get here</h2>
            <div className="mt-6 space-y-5">
              <div className="flex gap-4">
                <Car className="mt-1 size-6 shrink-0 text-brand-600" aria-hidden />
                <div>
                  <h3 className="font-sans font-bold text-ink">By car or boda</h3>
                  <p className="mt-1 leading-relaxed text-muted">
                    From Nakuru town, take the Nakuru–Nyahururu Road (B5) north towards Bahati. At Maili Sita Centre,
                    about 10 km from town, look for Kiamaina Primary School. Primegala is directly opposite.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Bus className="mt-1 size-6 shrink-0 text-brand-600" aria-hidden />
                <div>
                  <h3 className="font-sans font-bold text-ink">By matatu</h3>
                  <p className="mt-1 leading-relaxed text-muted">
                    Board any matatu heading towards Bahati, Kiamaina or Nyahururu and ask to alight at Maili Sita, by
                    Kiamaina Primary School.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <MapEmbed query="Primegala Medical Centre, Maili Sita, Nakuru" mapsUrl={site.mapsUrl} />
            <div>
              <SectionHeading title="Send us a message" />
              <LeadForm
                className="mt-6"
                services={SERVICE_PAGES.map((s) => ({ code: s.code, name: s.name }))}
                defaultType="enquiry"
                whatsappHref={whatsappHref()}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
