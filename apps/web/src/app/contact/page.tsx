import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Bus, Car, Clock, Landmark, Mail, MapPin, MessageSquareText, Navigation, Phone, Siren, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { MapEmbed } from "@/components/MapEmbed";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppIcon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CheckList, FaqSection } from "@/components/PageSections";
import { serviceOptions } from "@/content/services";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import {
  EMAILS,
  absoluteUrl,
  emailHref,
  fullAddress,
  hasPhone,
  hasWhatsApp,
  phoneDisplay,
  phoneHref,
  site,
  whatsappHref,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Directions: Maili Sita, Opp. Kiamaina Primary School",
  description: `Contact Primegala Medical Centre by email at ${site.contact.email}, or visit us at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School, about 10 km from Nakuru town. Open 24 hours.`,
  path: "/contact",
  keywords: [...keywordsFor("local", "questions"), "Primegala Medical Centre contact", "Primegala email"],
});

const CONTACT_FAQS = [
  {
    q: "Where is Primegala Medical Centre?",
    a: "At Maili Sita Centre on the Nakuru–Nyahururu Road, directly opposite Kiamaina Primary School, in Kiamaina Ward, Nakuru North (Bahati) Sub-County, Nakuru County.",
  },
  {
    q: "How far is Maili Sita from Nakuru town?",
    a: "About six miles (roughly 10 km) along the Nakuru–Nyahururu Road, which is where the name Maili Sita, “six miles”, comes from.",
  },
  {
    q: "How do I contact Primegala Medical Centre?",
    a: `${hasPhone ? `Call ${phoneDisplay()}, email` : "Email"} ${site.contact.email}, request an appointment online, or come to our front desk at any hour. For a life-threatening emergency, call 999 or 112.`,
  },
  {
    q: "Is Primegala open on weekends and public holidays?",
    a: "Yes. Primegala is open 24 hours a day, every day, including weekends and public holidays.",
  },
];

function ContactCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line bg-white p-6 ${className ?? ""}`}>
      <dt className="flex items-center gap-3 font-bold text-ink">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
          <Icon className="size-5" aria-hidden />
        </span>
        {title}
      </dt>
      <dd className="mt-3 leading-relaxed text-ink/85">{children}</dd>
    </div>
  );
}

export default function ContactPage() {
  const formServices = serviceOptions();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          name: `Contact ${site.name}`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
      <PageHero
        crumbs={[{ name: "Contact & directions", path: "/contact" }]}
        eyebrow="Contact & directions"
        title="Opposite Kiamaina Primary School, Maili Sita"
        intro="Email us, or come to our front desk at Maili Sita Centre on the Nakuru–Nyahururu Road, about six miles (10 km) from Nakuru town. We are open 24 hours, every day of the year."
        aside={
          <div className="rounded-xl border border-trust-100 bg-trust-50 p-6 sm:p-7">
            <h2 className="text-sm font-bold tracking-wider text-trust-800 uppercase">Email us</h2>
            <a
              href={emailHref("Enquiry from the Primegala website")}
              className="mt-2 block text-xl font-bold break-all text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-800 hover:decoration-brand-600 sm:text-2xl"
              data-track="email_click_contact_hero"
            >
              {site.contact.email}
            </a>
            <ul className="mt-4 space-y-2 text-sm">
              {EMAILS.slice(1).map((e) => (
                <li key={e.address}>
                  <span className="font-semibold text-ink">{e.label}:</span>{" "}
                  <a href={emailHref(undefined, e.address)} className="link-brand break-all">
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Please don&apos;t send detailed medical information by email.
            </p>
            {hasPhone && (
              <p className="mt-5 border-t border-trust-100 pt-4">
                <span className="text-sm font-bold tracking-wider text-trust-800 uppercase">Phone</span>
                <a href={phoneHref()} className="link-brand mt-1 block text-lg" data-track="call_click_contact_hero">
                  {phoneDisplay()}
                </a>
              </p>
            )}
            <p className="mt-5 flex gap-2 border-t border-trust-100 pt-4 text-sm leading-relaxed text-ink">
              <Siren className="mt-0.5 size-4 shrink-0 text-alert" aria-hidden />
              <span>
                <strong>Emergency?</strong> Call{" "}
                <a href="tel:999" className="font-bold text-alert underline underline-offset-2">
                  999
                </a>{" "}
                or{" "}
                <a href="tel:112" className="font-bold text-alert underline underline-offset-2">
                  112
                </a>
                , or come straight in.
              </span>
            </p>
          </div>
        }
      >
        <ButtonLink href={emailHref("Enquiry from the Primegala website")} size="lg" track="email_click_contact">
          <Mail className="size-5" aria-hidden /> Email us
        </ButtonLink>
        <ButtonLink href={site.mapsUrl} variant="secondary" size="lg" track="directions_click_contact">
          <Navigation className="size-5" aria-hidden /> Get directions
        </ButtonLink>
        {hasWhatsApp && (
          <ButtonLink href={whatsappHref()} variant="whatsapp" size="lg" track="whatsapp_click_contact">
            <WhatsAppIcon className="size-5" /> WhatsApp us
          </ButtonLink>
        )}
        {hasPhone && (
          <ButtonLink href={phoneHref()} variant="secondary" size="lg" track="call_click_contact">
            <Phone className="size-5" aria-hidden /> Call {phoneDisplay()}
          </ButtonLink>
        )}
      </PageHero>

      <Section labelledBy="contact-details">
        <SectionHeading id="contact-details" eyebrow="Contact details" title="How to reach us" />
        <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard icon={Mail} title="Email">
            <ul className="space-y-3">
              {EMAILS.map((e) => (
                <li key={e.address}>
                  <span className="block text-sm text-muted">
                    {e.label}: {e.purpose.charAt(0).toLowerCase() + e.purpose.slice(1)}
                  </span>
                  <a href={emailHref(undefined, e.address)} className="link-brand break-all" data-track="email_click_contact_card">
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>
          </ContactCard>
          <ContactCard icon={MapPin} title="Address">
            {fullAddress()}
          </ContactCard>
          <ContactCard icon={Clock} title="Opening hours">
            Open 24 hours, 7 days a week, including public holidays. Walk-ins welcome at any hour.
          </ContactCard>
          {hasPhone && (
            <ContactCard icon={Phone} title="Phone">
              <a href={phoneHref()} className="link-brand" data-track="call_click_contact_card">
                {phoneDisplay()}
              </a>
            </ContactCard>
          )}
          {hasWhatsApp && (
            <ContactCard icon={MessageSquareText} title="WhatsApp">
              <a href={whatsappHref()} className="link-brand" data-track="whatsapp_click_contact_card" target="_blank" rel="noopener">
                Send us a WhatsApp message
              </a>
            </ContactCard>
          )}
          <ContactCard icon={Landmark} title="In person">
            At the front desk, any time, day or night. Ask for the nurse in charge for anything urgent.
          </ContactCard>
          <ContactCard icon={Siren} title="Emergencies">
            Call{" "}
            <a href="tel:999" className="font-semibold text-alert underline underline-offset-2">
              999
            </a>{" "}
            or{" "}
            <a href="tel:112" className="font-semibold text-alert underline underline-offset-2">
              112
            </a>
            , or come straight in. <Link href="/emergency" className="link-brand">Emergency care</Link>
          </ContactCard>
        </dl>
      </Section>

      <Section tone="surface" labelledBy="directions">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHeading
              id="directions"
              eyebrow="Directions"
              title="How to get here"
              intro="We are at Maili Sita Centre on the Nakuru–Nyahururu Road (B5), directly opposite Kiamaina Primary School."
            />
            <div className="mt-8 space-y-4">
              <div className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                  <Car className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">By car or boda</h3>
                  <p className="mt-1 leading-relaxed text-muted">
                    From Nakuru town, take the Nakuru–Nyahururu Road (B5) north towards Bahati. At Maili Sita Centre,
                    about 10 km from town, look for Kiamaina Primary School. Primegala is directly opposite.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                  <Bus className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">By matatu</h3>
                  <p className="mt-1 leading-relaxed text-muted">
                    Board any matatu heading towards Bahati, Kiamaina or Nyahururu and ask to alight at Maili Sita, by
                    Kiamaina Primary School.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.mapsUrl} track="directions_click_contact_section">
                <Navigation className="size-4" aria-hidden /> Open in Google Maps
              </ButtonLink>
              <ButtonLink href="/areas-we-serve" variant="secondary">
                Directions from your area
              </ButtonLink>
            </div>
          </div>
          <div className="min-w-0">
            <MapEmbed query="Primegala Medical Centre, Maili Sita, Nakuru" mapsUrl={site.mapsUrl} />
          </div>
        </div>
      </Section>

      <Section labelledBy="message">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              id="message"
              eyebrow="Online"
              title="Send us a message"
              intro="Ask a question, request a call back or book a visit. Our team will reply using the channel you choose."
            />
            <h3 className="mt-8 text-sm font-bold tracking-wider text-trust-800 uppercase">Before you write</h3>
            <CheckList
              className="mt-4"
              items={[
                "Please don't include detailed medical history. Share it with your clinician during your visit.",
                <>
                  Requesting records? See{" "}
                  <Link href="/patients-and-visitors#records-and-privacy" className="link-brand">
                    how to request your records
                  </Link>
                  .
                </>,
                <>
                  Feedback or a complaint? Read our{" "}
                  <Link href="/legal/complaints" className="link-brand">
                    complaints procedure
                  </Link>
                  .
                </>,
                "Never use this form for an emergency.",
              ]}
            />
          </div>
          <div className="min-w-0 lg:col-span-8">
            <LeadForm services={formServices} defaultType="enquiry" whatsappHref={whatsappHref()} />
          </div>
        </div>
      </Section>

      <FaqSection faqs={CONTACT_FAQS} title="Finding and contacting us" />
    </>
  );
}
