import { CalendarCheck, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Badge, ButtonLink } from "@/components/ui";
import { emailHref, hasPhone, phoneDisplay, phoneHref, site } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-trust-950" aria-labelledby="home-title">
      {/* Background photograph with a navy overlay so text stays readable */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hospital-corridor.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-trust-950/95 via-trust-950/85 to-trust-950/55" aria-hidden />
      <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="min-w-0 lg:col-span-7">
          <p className="text-sm font-bold tracking-[0.14em] text-brand-300 uppercase">{site.name}</p>
          <h1
            id="home-title"
            className="mt-3 text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            24-hour care at Maili Sita, Nakuru
          </h1>
          <p className="mt-4 text-xl font-semibold text-brand-300 sm:text-2xl">{site.tagline}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-trust-100">
            {site.name} is a KEPH Level {site.kephLevel} medical centre at <strong className="text-white">Maili Sita</strong>{" "}
            on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School, open day and night. We offer outpatient and
            urgent care, maternity and antenatal care, family planning, child health, laboratory, pharmacy and inpatient
            care{site.shaContracted ? ", and we accept SHA for eligible services" : ""}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book" size="lg" track="book_click_hero">
              <CalendarCheck className="size-5" aria-hidden /> Book a visit
            </ButtonLink>
            <ButtonLink href={site.mapsUrl} variant="inverted" size="lg" track="directions_click_hero">
              <Navigation className="size-5" aria-hidden /> Get directions
            </ButtonLink>
            {hasPhone ? (
              <ButtonLink href={phoneHref()} variant="inverted" size="lg" track="call_click_hero">
                <Phone className="size-5" aria-hidden /> Call {phoneDisplay()}
              </ButtonLink>
            ) : (
              <ButtonLink
                href={emailHref("Enquiry from the Primegala website")}
                variant="secondary"
                size="lg"
                track="email_click_hero"
              >
                <Mail className="size-5" aria-hidden /> Email us
              </ButtonLink>
            )}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="At a glance">
            <li>
              <Badge tone="brand">
                <span className="size-2 rounded-full bg-brand-500" aria-hidden /> Open 24 hours
              </Badge>
            </li>
            {site.shaContracted && (
              <li>
                <Badge tone="trust">SHA accepted</Badge>
              </li>
            )}
            <li>
              <Badge tone="neutral">KEPH Level {site.kephLevel}</Badge>
            </li>
          </ul>
        </div>

        <div className="hidden min-w-0 lg:col-span-5 lg:block">
          <figure className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/doctor-smiling.jpg" alt="Illustration of a smiling doctor" className="block h-auto w-full" />
            <figcaption className="flex items-start gap-2 px-4 py-3 text-sm text-trust-100">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
              Maili Sita Centre, Nakuru–Nyahururu Road, opposite Kiamaina Primary School
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
