import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon, XIcon, YouTubeIcon } from "./Icon";
import { SERVICE_PAGES } from "@/content/services";
import { fullAddress, phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

const LEGAL_LINKS = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-of-use", label: "Terms of Use" },
  { href: "/legal/cookie-policy", label: "Cookie Policy" },
  { href: "/legal/patient-rights", label: "Patient Rights" },
  { href: "/legal/medical-disclaimer", label: "Medical Disclaimer" },
  { href: "/legal/complaints", label: "Complaints" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/legal/editorial-policy", label: "Editorial Policy" },
  { href: "/legal/communications-consent", label: "Communications" },
];

export function Footer() {
  const socials = [
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
    { href: site.social.x, label: "X", Icon: XIcon },
    { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer className="bg-brand-950 pb-24 text-brand-100 md:pb-0">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-5 max-w-sm leading-relaxed text-brand-200">
            {site.tagline} A 24-hour KEPH Level 3 medical centre serving families along the Nakuru–Nyahururu Road
            since 2022.
          </p>
          <address className="mt-6 space-y-3 not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-sun-300" aria-hidden />
              <span>{fullAddress()}</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-sun-300" aria-hidden />
              <span>Open 24 hours, 7 days a week, including public holidays</span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-sun-300" aria-hidden />
              <a href={phoneHref()} className="hover:text-white" data-track="call_click">
                {phoneDisplay()}
              </a>
            </p>
            {site.contact.email && (
              <p className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-sun-300" aria-hidden />
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </p>
            )}
          </address>
        </div>

        <nav aria-label="Services" className="lg:col-span-3">
          <h2 className="font-sans text-sm font-bold tracking-widest text-white uppercase">Services</h2>
          <ul className="mt-5 grid gap-2.5">
            {SERVICE_PAGES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-brand-200 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Patients" className="lg:col-span-2">
          <h2 className="font-sans text-sm font-bold tracking-widest text-white uppercase">Patients</h2>
          <ul className="mt-5 grid gap-2.5">
            {[
              ["/book", "Book a visit"],
              ["/sha", "SHA at Primegala"],
              ["/areas-we-serve", "Areas we serve"],
              ["/team", "Our care team"],
              ["/health-hub", "Health Hub"],
              ["/faq", "FAQs"],
              ["/about", "Our story"],
              ["/contact", "Contact & directions"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-brand-200 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-bold tracking-widest text-white uppercase">Talk to us</h2>
          <p className="mt-5 text-brand-200">Questions, bookings or SHA help: we reply on WhatsApp.</p>
          <a
            href={whatsappHref()}
            data-track="whatsapp_click_footer"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#128C4A] px-5 text-sm font-semibold text-white hover:bg-[#0f7a40]"
            {...(site.contact.whatsapp ? { target: "_blank", rel: "noopener" } : {})}
          >
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </a>
          <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-white">Life-threatening emergency?</p>
            <p className="mt-1 text-sm text-brand-200">
              Call <a href="tel:999" className="font-bold text-sun-300">999</a> or{" "}
              <a href="tel:112" className="font-bold text-sun-300">112</a>, or come straight in.
            </p>
          </div>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <Icon className="size-5" />
                    <span className="sr-only">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6">
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-300">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-5 flex flex-col gap-2 text-sm text-brand-300 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. Registered KEPH Level {site.kephLevel} facility
              {site.mflCode ? ` · MFL code ${site.mflCode}` : ""}.
            </p>
            <p>
              Website by{" "}
              <a
                href={site.credit.url}
                target="_blank"
                rel="noopener"
                className="font-semibold text-white underline decoration-sun-400/60 underline-offset-4 hover:decoration-sun-300"
              >
                {site.credit.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
