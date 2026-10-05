import { ArrowRight, CalendarCheck, Clock, MapPin, ShieldCheck } from "lucide-react";
import { ServiceIcon } from "@/components/Icon";
import { ButtonLink } from "@/components/ui";
import type { ServiceContent } from "@/content/services";
import { site } from "@/lib/site";

/**
 * Trust-blue information panel linking an article to the related service at Primegala:
 * the service page and a booking request pre-filled with that service.
 */
export function ServicePanel({ service, headingId = "hub-service-heading" }: { service: ServiceContent; headingId?: string }) {
  const { locality, landmark } = site.address;
  const facts = [
    { icon: Clock, text: "Open 24 hours, every day, including public holidays" },
    { icon: MapPin, text: `${locality}, ${landmark.charAt(0).toLowerCase()}${landmark.slice(1)}` },
    ...(site.shaContracted ? [{ icon: ShieldCheck, text: "SHA accepted for eligible services" }] : []),
  ];

  return (
    <section aria-labelledby={headingId} className="rounded-xl border border-trust-200 bg-trust-50 p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-trust-200 bg-white text-trust-700">
          <ServiceIcon name={service.icon} className="size-6" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="eyebrow">At Primegala</p>
          <h2 id={headingId} className="mt-1.5 text-xl leading-snug font-bold tracking-tight text-trust-950 sm:text-2xl">
            {service.name}
          </h2>
        </div>
      </div>
      <p className="mt-4 leading-relaxed text-ink/85">{service.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-ink/85">
        {facts.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-2.5">
            <Icon className="mt-0.5 size-4 shrink-0 text-trust-700" aria-hidden />
            {text}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={`/book?service=${service.code}`} track="book_click_article">
          <CalendarCheck className="size-4" aria-hidden /> Book a visit
        </ButtonLink>
        <ButtonLink href={`/services/${service.slug}`} variant="secondary" track="service_click_article">
          About this service<span className="sr-only">: {service.name}</span>
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </section>
  );
}
