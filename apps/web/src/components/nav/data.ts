import "server-only";
import { NAV_GROUPS } from "@/content/navigation";
import { SERVICE_PAGES, serviceOptions } from "@/content/services";
import { CATEGORIES, getAllArticles, type CategorySlug } from "@/lib/content";
import { emailHref, hasPhone, hasWhatsApp, phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";
import type { NavData, NavFact } from "./types";

const TIPS: CategorySlug = "health-tips";

/** Everything the header menus need, read on the server and reduced to plain props. */
export function getNavData(): NavData {
  const articles = getAllArticles().filter((a) => a.category !== TIPS);
  // Featured guides first, then the most recent (getAllArticles is newest first; sort is stable).
  const featured = [...articles].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

  const { locality, landmark } = site.address;
  const facts: NavFact[] = [
    { icon: "clock", text: "Open 24 hours, every day, including public holidays" },
    // "Maili Sita, opposite Kiamaina Primary School"
    { icon: "map", text: `${locality}, ${landmark.charAt(0).toLowerCase()}${landmark.slice(1)}` },
  ];
  if (site.shaContracted) facts.push({ icon: "shield", text: "SHA accepted for eligible services" });

  return {
    groups: NAV_GROUPS,
    services: SERVICE_PAGES.map((s) => ({
      slug: s.slug,
      name: s.name,
      summary: s.summary,
      icon: s.icon,
      href: `/services/${s.slug}`,
      comingSoon: s.comingSoon,
    })),
    hub: {
      categories: (Object.keys(CATEGORIES) as CategorySlug[])
        .filter((slug) => slug !== TIPS)
        .map((slug) => ({
          slug,
          name: CATEGORIES[slug].name,
          description: CATEGORIES[slug].description,
          href: `/health-hub/category/${slug}`,
        })),
      featured: featured.map((a) => ({
        slug: a.slug,
        title: a.title,
        href: `/health-hub/${a.slug}`,
        category: CATEGORIES[a.category].name,
        readingMinutes: a.readingMinutes,
      })),
      tips: { href: "/health-hub#tips", label: "Health tips", description: CATEGORIES[TIPS].description },
    },
    facts,
    contact: {
      phone: hasPhone ? { href: phoneHref(), label: phoneDisplay() } : null,
      whatsappHref: hasWhatsApp ? whatsappHref() : null,
      email: { href: emailHref(), label: site.contact.email },
      mapsUrl: site.mapsUrl,
    },
    bookingServices: serviceOptions(),
  };
}
