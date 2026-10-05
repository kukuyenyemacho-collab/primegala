import Link from "next/link";
import type { ReactNode } from "react";
import { CalendarCheck, Check, Clock, Mail, MapPin, Navigation, Phone, Siren, type LucideIcon } from "lucide-react";
import { FaqList } from "./FaqList";
import { WhatsAppIcon } from "./Icon";
import { ButtonLink, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/cn";
import { emailHref, hasPhone, hasWhatsApp, phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

/**
 * Shared building blocks for the content pages (patient guide, payments, emergency,
 * Kiswahili, contact, SHA and the service pages). Server components only: every
 * block renders to plain HTML and works without JavaScript.
 */

export interface TocItem {
  id: string;
  label: string;
}

/** "On this page" list. Sticky beside the content on desktop, a plain list above it on phones. */
export function OnThisPage({ items, title = "On this page", className }: { items: TocItem[]; title?: string; className?: string }) {
  return (
    <nav aria-labelledby="on-this-page-title" className={cn("rounded-xl border border-line bg-white p-5", className)}>
      <h2 id="on-this-page-title" className="text-xs font-semibold tracking-[0.14em] text-trust-700 uppercase">
        {title}
      </h2>
      <ol className="mt-3 grid gap-0.5 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-ink/80 transition-colors hover:border-brand-600 hover:text-brand-700"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Two-column reading layout: sticky table of contents on the left (desktop), content on the right. */
export function ContentWithToc({ toc, children, tocTitle }: { toc: TocItem[]; children: ReactNode; tocTitle?: string }) {
  return (
    <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="lg:sticky lg:top-28">
          <OnThisPage items={toc} title={tocTitle} />
        </div>
      </aside>
      <div className="min-w-0 lg:col-span-8 xl:col-span-9">
        <div className="max-w-3xl divide-y divide-line">{children}</div>
      </div>
    </div>
  );
}

/** One titled block inside ContentWithToc. */
export function ContentBlock({
  id,
  title,
  eyebrow,
  intro,
  children,
}: {
  id: string;
  title: ReactNode;
  eyebrow?: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-10 first:pt-0 last:pb-0">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={`${id}-title`} className={cn("text-2xl leading-tight font-bold tracking-tight text-ink sm:text-3xl", eyebrow && "mt-2")}>
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
      {children && <div className="mt-6 space-y-6">{children}</div>}
    </section>
  );
}

/** Body copy with comfortable measure and spacing. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-4 leading-relaxed text-ink/85", className)}>{children}</div>;
}

/** Trust-blue information panel (SHA notes, hours, how-to boxes). */
export function InfoPanel({
  title,
  children,
  icon: Icon,
  className,
  as: Heading = "h3",
  id,
}: {
  title?: ReactNode;
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
  as?: "h2" | "h3";
  id?: string;
}) {
  return (
    <div id={id} className={cn("rounded-xl border border-trust-100 bg-trust-50 p-5 sm:p-6", className)}>
      <div className="flex gap-4">
        {Icon && (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-trust-100 bg-white text-trust-700">
            <Icon className="size-5" aria-hidden />
          </span>
        )}
        <div className="min-w-0 flex-1">
          {title && <Heading className="text-lg leading-snug font-bold text-trust-950">{title}</Heading>}
          <div className={cn("leading-relaxed text-ink/85", Boolean(title) && "mt-2", "[&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_a]:decoration-brand-300 [&_a]:underline-offset-4 [&_a:hover]:decoration-brand-600")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Bordered card with a trust-blue icon chip. Flat at rest. */
export function IconCard({
  icon: Icon,
  title,
  children,
  className,
  as: Heading = "h3",
}: {
  icon?: LucideIcon;
  title: ReactNode;
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={cn("flex h-full flex-col rounded-xl border border-line bg-white p-6", className)}>
      {Icon && (
        <span className="flex size-11 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden />
        </span>
      )}
      <Heading className={cn("text-lg leading-snug font-bold text-ink", Icon && "mt-5")}>{title}</Heading>
      <div className="mt-2 flex-1 leading-relaxed text-muted">{children}</div>
    </div>
  );
}

/** Ticked list. Green ticks for "what you get", navy for neutral information. */
export function CheckList({
  items,
  tone = "trust",
  columns = 1,
  className,
}: {
  items: ReactNode[];
  tone?: "trust" | "brand";
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-ink/85">
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "brand" ? "bg-brand-50 text-brand-700" : "bg-trust-50 text-trust-700",
            )}
          >
            <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps with a thin rule between them. */
export function StepList({ steps, className }: { steps: { title: ReactNode; body: ReactNode }[]; className?: string }) {
  return (
    <ol className={cn("grid gap-0 divide-y divide-line rounded-xl border border-line bg-white", className)}>
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4 p-5 sm:p-6">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-trust-200 bg-trust-50 text-sm font-bold text-trust-800">
            {i + 1}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-ink">{step.title}</h3>
            <div className="mt-1 leading-relaxed text-muted">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Definition rows (term / value), used for facility facts. */
export function FactList({
  items,
  className,
  tone = "default",
}: {
  items: { term: ReactNode; value: ReactNode }[];
  className?: string;
  /** "trust" for use inside a trust-blue panel. */
  tone?: "default" | "trust";
}) {
  return (
    <dl
      className={cn(
        "divide-y border-y",
        tone === "trust" ? "divide-trust-100 border-trust-100" : "divide-line border-line",
        className,
      )}
    >
      {items.map((item, i) => (
        <div key={i} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-semibold text-trust-800">{item.term}</dt>
          <dd className="min-w-0 text-ink/85 sm:col-span-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Address, hours and contact details in a trust-blue card. Phone only appears when configured. */
export function VisitFacts({ className, title = "Visit us", as: Heading = "h2" }: { className?: string; title?: string; as?: "h2" | "h3" }) {
  const a = site.address;
  return (
    <div className={cn("rounded-xl border border-trust-100 bg-trust-50 p-6", className)}>
      <Heading className="text-lg font-bold text-trust-950">{title}</Heading>
      <ul className="mt-4 space-y-4 text-ink/85">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
          <span>
            <strong className="block font-semibold text-trust-950">Maili Sita Centre, Nakuru–Nyahururu Road</strong>
            {a.landmark}. {a.ward}, {a.subCounty}, {a.region}.
          </span>
        </li>
        <li className="flex gap-3">
          <Clock className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
          <span>
            <strong className="block font-semibold text-trust-950">Open 24 hours</strong>
            Every day, including weekends and public holidays.
          </span>
        </li>
        {hasPhone && (
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
            <a href={phoneHref()} className="link-brand" data-track="call_click_visit_facts">
              {phoneDisplay()}
            </a>
          </li>
        )}
        <li className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
          <a href={emailHref()} className="link-brand break-all" data-track="email_click_visit_facts">
            {site.contact.email}
          </a>
        </li>
      </ul>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-trust-100 pt-4 text-sm">
        <a href={site.mapsUrl} target="_blank" rel="noopener" className="link-brand inline-flex items-center gap-1.5" data-track="directions_click_visit_facts">
          <Navigation className="size-4" aria-hidden /> Get directions
        </a>
        <Link href="/contact" className="link-brand">
          Contact page
        </Link>
      </div>
    </div>
  );
}

/**
 * The page's contact actions. Book is always offered; Call and WhatsApp only when
 * those numbers are configured; otherwise email is the remote channel.
 */
export function ContactActions({
  size = "lg",
  emailSubject = "Enquiry from the Primegala website",
  whatsappMessage,
  track = "page",
  showBook = true,
  showDirections = true,
  alwaysEmail = false,
  className,
}: {
  size?: "md" | "lg";
  emailSubject?: string;
  whatsappMessage?: string;
  /** Suffix for analytics event names, e.g. "contact" → "book_click_contact". */
  track?: string;
  showBook?: boolean;
  showDirections?: boolean;
  /** Show the email action even when phone or WhatsApp exist. */
  alwaysEmail?: boolean;
  className?: string;
}) {
  const icon = size === "lg" ? "size-5" : "size-4";
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {showBook && (
        <ButtonLink href="/book" size={size} track={`book_click_${track}`}>
          <CalendarCheck className={icon} aria-hidden /> Book a visit
        </ButtonLink>
      )}
      {hasPhone && (
        <ButtonLink href={phoneHref()} variant="secondary" size={size} track={`call_click_${track}`}>
          <Phone className={icon} aria-hidden /> Call {phoneDisplay()}
        </ButtonLink>
      )}
      {hasWhatsApp && (
        <ButtonLink href={whatsappHref(whatsappMessage)} variant="whatsapp" size={size} track={`whatsapp_click_${track}`}>
          <WhatsAppIcon className={icon} /> WhatsApp us
        </ButtonLink>
      )}
      {(alwaysEmail || (!hasPhone && !hasWhatsApp)) && (
        <ButtonLink href={emailHref(emailSubject)} variant="secondary" size={size} track={`email_click_${track}`}>
          <Mail className={icon} aria-hidden /> Email us
        </ButtonLink>
      )}
      {showDirections && (
        <ButtonLink href={site.mapsUrl} variant="secondary" size={size} track={`directions_click_${track}`}>
          <Navigation className={icon} aria-hidden /> Get directions
        </ButtonLink>
      )}
    </div>
  );
}

/** Red alert panel. Reserved for emergencies (999 / 112). */
export function EmergencyNotice({
  title = "Life-threatening emergency? Call 999 or 112.",
  children,
  className,
  as: Heading = "h2",
}: {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "p";
}) {
  return (
    <div role="note" className={cn("rounded-xl border-2 border-alert bg-[#fdf0ef] p-5 sm:p-6", className)}>
      <div className="flex gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-alert text-white">
          <Siren className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <Heading className="text-lg leading-snug font-bold text-alert">{title}</Heading>
          <div className="mt-2 leading-relaxed text-ink">
            {children ?? (
              <p>
                For unconsciousness, severe bleeding, chest pain, a seizure or a serious accident, call{" "}
                <a href="tel:999" className="font-bold text-alert underline underline-offset-4">
                  999
                </a>{" "}
                or{" "}
                <a href="tel:112" className="font-bold text-alert underline underline-offset-4">
                  112
                </a>
                , or come straight in. Primegala is open 24 hours.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Standard FAQ block: heading on the left, accordion on the right (stacked on phones). */
export function FaqSection({
  faqs,
  title = "Common questions",
  eyebrow = "FAQs",
  intro,
  tone = "surface",
  id = "faqs",
  withSchema = true,
}: {
  faqs: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
  intro?: ReactNode;
  tone?: "white" | "surface";
  id?: string;
  withSchema?: boolean;
}) {
  return (
    <Section tone={tone} id={id} labelledBy={`${id}-heading`} bordered={tone === "white"}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id={`${id}-heading`} eyebrow={eyebrow} title={title} intro={intro} />
        </div>
        <div className="min-w-0 lg:col-span-8">
          <FaqList faqs={faqs} withSchema={withSchema} />
        </div>
      </div>
    </Section>
  );
}
