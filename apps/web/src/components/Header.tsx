import Link from "next/link";
import { Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ButtonLink } from "./ui";
import { phoneDisplay, phoneHref, site } from "@/lib/site";

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/sha", label: "SHA" },
  { href: "/about", label: "Our Story" },
  { href: "/health-hub", label: "Health Hub" },
  { href: "/contact", label: "Find Us" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brand-950 text-brand-100">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-xs sm:text-[0.8rem]">
          <p className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-semibold text-sun-300">
              <Clock className="size-3.5" aria-hidden /> Open 24 hours, every day
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <MapPin className="size-3.5" aria-hidden /> Maili Sita, opposite Kiamaina Primary School
            </span>
            {site.shaContracted && (
              <span className="hidden items-center gap-1.5 lg:inline-flex">
                <ShieldCheck className="size-3.5" aria-hidden /> SHA accepted
              </span>
            )}
          </p>
          <a
            href={phoneHref()}
            data-track="call_click"
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-sun-300"
          >
            <Phone className="size-3.5" aria-hidden />
            <span className="sr-only sm:not-sr-only">{phoneDisplay()}</span>
          </a>
        </div>
      </div>
      <div className="border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name}, home`} className="rounded-lg">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink/80 transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ButtonLink href="/book" track="book_click_header">
              Book a visit
            </ButtonLink>
            <MobileNav items={NAV} />
          </div>
        </div>
      </div>
    </header>
  );
}
