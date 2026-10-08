import Link from "next/link";
import type { ReactNode } from "react";
import { MapPin, Navigation } from "lucide-react";
import { MapEmbed } from "@/components/MapEmbed";
import { Photo } from "@/components/Photo";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { AREAS_SERVED } from "@/content/areas";
import { PHONES, emailHref, hasPhone, site } from "@/lib/site";

export function FindUs() {
  const a = site.address;
  const details: { term: string; value: ReactNode }[] = [
    {
      term: "Address",
      value: `${a.building}, ${a.street}, ${a.landmark.charAt(0).toLowerCase()}${a.landmark.slice(1)}`,
    },
    { term: "Area", value: `${a.ward}, ${a.subCounty}, ${a.region}` },
    { term: "Opening hours", value: "Open 24 hours, every day, including public holidays" },
    ...(hasPhone
      ? [
          {
            term: "Phone",
            value: (
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                {PHONES.map((p) => (
                  <a key={p.href} href={p.href} className="link-brand" data-track="call_click_home">
                    {p.label}
                  </a>
                ))}
              </span>
            ),
          },
        ]
      : []),
    {
      term: "Email",
      value: (
        <a href={emailHref()} className="link-brand break-all" data-track="email_click_home">
          {site.contact.email}
        </a>
      ),
    },
  ];

  return (
    <Section id="find-us" labelledBy="find-us-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <SectionHeading
            id="find-us-heading"
            eyebrow="Find us"
            title="Opposite Kiamaina Primary School, Maili Sita"
            intro="We're on the Nakuru–Nyahururu Road at Maili Sita Centre, about 10 km (six miles) from Nakuru town. Matatus heading towards Bahati, Kiamaina and Nyahururu pass the gate."
          />
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {details.map(({ term, value }) => (
              <div key={term} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-semibold text-trust-800">{term}</dt>
                <dd className="text-ink/85 sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-sm font-bold tracking-wider text-trust-800 uppercase">Areas we serve</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {AREAS_SERVED.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas-we-serve#${area.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink/85 transition-colors hover:border-brand-300 hover:text-brand-800"
                >
                  <MapPin className="size-3.5 text-trust-700" aria-hidden /> {area.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.mapsUrl} track="directions_click_home">
              <Navigation className="size-4" aria-hidden /> Get directions
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact and directions
            </ButtonLink>
          </div>
        </div>
        <div className="min-w-0 space-y-5">
          <MapEmbed query="Primegala Medical Centre, Maili Sita, Nakuru" mapsUrl={site.mapsUrl} />
          <Photo name="building" caption="Look for this building: white and blue, with 'SHA accepted here' above the gate." />
        </div>
      </div>
    </Section>
  );
}
