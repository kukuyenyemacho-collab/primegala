import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { buttonClasses } from "./ui";
import { BookVisitButton } from "./nav/BookVisitButton";
import { DesktopNav } from "./nav/DesktopNav";
import { SiteSearch } from "./nav/SiteSearch";
import { getNavData } from "./nav/data";
import { site, whatsappHref } from "@/lib/site";

/**
 * The single site header: white, 72px, sticky, one hairline border. Nothing sits
 * above it. Content is read here on the server; only the interactive parts
 * (mega menus, search, booking dialog, mobile menu) are client components.
 */
export function Header() {
  const nav = getNavData();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-page flex h-[4.5rem] items-center gap-3">
        <Link href="/" aria-label={`${site.name}, home`} className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <DesktopNav groups={nav.groups} services={nav.services} hub={nav.hub} facts={nav.facts} />

        <div className="ml-auto flex items-center gap-2">
          <SiteSearch />
          <div className="hidden md:block">
            <BookVisitButton
              services={nav.bookingServices}
              whatsappHref={whatsappHref()}
              track="book_click_header"
              className={buttonClasses("primary", "md", "whitespace-nowrap")}
            >
              Book a visit
            </BookVisitButton>
          </div>
          <MobileNav
            groups={nav.groups}
            services={nav.services}
            hub={nav.hub}
            facts={nav.facts}
            contact={nav.contact}
          />
        </div>
      </div>
    </header>
  );
}
