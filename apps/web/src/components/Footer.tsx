import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Siren } from "lucide-react";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon, XIcon, YouTubeIcon } from "./Icon";
import { SERVICE_PAGES } from "@/content/services";
import { NAV_GROUPS, type NavLink } from "@/content/navigation";
import { EMAILS, emailHref, fullAddress, hasPhone, phoneDisplay, phoneHref, site } from "@/lib/site";

const LEGAL_LINKS: NavLink[] = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-of-use", label: "Terms of Use" },
  { href: "/legal/cookie-policy", label: "Cookie Policy" },
  { href: "/legal/patient-rights", label: "Patient Rights" },
  { href: "/legal/medical-disclaimer", label: "Medical Disclaimer" },
  { href: "/legal/complaints", label: "Complaints" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/legal/editorial-policy", label: "Editorial Policy" },
  { href: "/legal/communications-consent", label: "Communications Policy" },
];

function groupItems(label: string): NavLink[] {
  return NAV_GROUPS.find((g) => g.label === label)?.items ?? [];
}

const linkClass =
  "text-trust-200 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white";

function FooterColumn({ title, links, className }: { title: string; links: NavLink[]; className?: string }) {
  const id = `footer-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <nav aria-labelledby={id} className={className}>
      <h2 id={id} className="text-sm font-bold tracking-wider text-white uppercase">
        {title}
      </h2>
      <ul className="mt-5 grid gap-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const socials = [
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
    { href: site.social.x, label: "X", Icon: XIcon },
    { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  const services = SERVICE_PAGES.map((s) => ({
    href: `/services/${s.slug}`,
    label: s.comingSoon ? `${s.name} (coming soon)` : s.name,
  }));
  const patients = groupItems("Patients & Visitors");
  const about = [...groupItems("About"), { href: "/health-hub", label: "Health Hub" }];

  return (
    <footer className="on-dark border-t border-white/10 bg-trust-950 pb-24 text-trust-100 md:pb-0">
      <div className="container-page grid gap-x-8 gap-y-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label={`${site.name}, home`} className="inline-flex rounded-lg">
            <Logo inverted />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-trust-200">
            {site.tagline} A 24-hour KEPH Level {site.kephLevel} medical centre at Maili Sita, serving families along the
            Nakuru–Nyahururu Road since March 2022.
          </p>
          <address className="mt-6 space-y-3 text-[0.95rem] not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-trust-300" aria-hidden />
              <span>{fullAddress()}</span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-trust-300" aria-hidden />
              <span>
                <strong className="font-semibold text-white">Open 24 hours, every day</strong>, including public holidays
              </span>
            </p>
            {hasPhone && (
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-trust-300" aria-hidden />
                <a href={phoneHref()} className={linkClass} data-track="call_click_footer">
                  {phoneDisplay()}
                </a>
              </p>
            )}
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-trust-300" aria-hidden />
              <span className="grid gap-1">
                {EMAILS.map((e) => (
                  <a
                    key={e.address}
                    href={emailHref(undefined, e.address)}
                    className={`${linkClass} break-all`}
                    data-track="email_click_footer"
                  >
                    {e.address}
                  </a>
                ))}
              </span>
            </p>
          </address>

          <div className="mt-8 max-w-md rounded-xl border border-white/15 bg-white/5 p-5 lg:max-w-none">
            <p className="flex items-center gap-2 font-semibold text-white">
              <Siren className="size-5 shrink-0 text-[#ff8a80]" aria-hidden /> Life-threatening emergency?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-trust-200">
              Call{" "}
              <a href="tel:999" className="font-bold text-white underline underline-offset-4">
                999
              </a>{" "}
              or{" "}
              <a href="tel:112" className="font-bold text-white underline underline-offset-4">
                112
              </a>
              , or come straight in: we&apos;re open 24 hours.{" "}
              <Link href="/emergency" className="font-semibold text-white underline underline-offset-4">
                What to do in an emergency
              </Link>
            </p>
          </div>

          {socials.length > 0 && (
            <>
              <p className="mt-7 text-sm text-trust-200">
                Follow us everywhere: <span className="font-semibold text-white">{site.socialHandle}</span>
              </p>
              <ul className="mt-3 flex gap-2" aria-label="Primegala on social media">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex size-10 items-center justify-center rounded-lg border border-white/15 text-white hover:bg-white/10"
                    >
                      <Icon className="size-5" />
                      <span className="sr-only">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <FooterColumn title="Services" links={services} className="lg:col-span-3" />
        <FooterColumn title="Patients & visitors" links={patients} className="lg:col-span-3" />
        <FooterColumn title="About" links={about} className="lg:col-span-2" />
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6">
          <nav aria-label="Legal and policies">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-5 flex flex-col gap-2 text-sm text-trust-200 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. KEPH Level {site.kephLevel} facility, Nakuru County.
            </p>
            <p className="text-base">
              Website by{" "}
              <a
                href={site.credit.url}
                target="_blank"
                rel="noopener"
                className="text-lg font-extrabold tracking-wide text-white underline decoration-brand-400 decoration-2 underline-offset-4 hover:decoration-white"
              >
                {site.credit.name}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Closing wordmark: one line, about three-quarters of the width on large screens, scaling down
          fluidly on phones. Decorative (the name is already in the logo and copyright line). */}
      <div className="container-page overflow-hidden" aria-hidden="true">
        <p className="pointer-events-none pt-2 pb-6 text-[clamp(3.25rem,16.5vw,11.75rem)] leading-[0.85] font-extrabold tracking-[-0.045em] whitespace-nowrap text-trust-800 select-none sm:pb-10">
          Primegala<span className="text-brand-500">.</span>
        </p>
      </div>
    </footer>
  );
}
