import type { NavGroup } from "@/content/navigation";
import type { IconName } from "@/content/services";

/**
 * Plain, serialisable data the server Header passes to the interactive menus.
 * Content modules (services, Health Hub) stay on the server; client bundles only
 * receive the few fields the menus show.
 */

export interface NavService {
  slug: string;
  name: string;
  summary: string;
  icon: IconName;
  href: string;
}

export interface NavHubCategory {
  slug: string;
  name: string;
  description: string;
  href: string;
}

export interface NavHubArticle {
  slug: string;
  title: string;
  href: string;
  /** Category display name, e.g. "Pregnancy & Baby". */
  category: string;
  readingMinutes: number;
}

export interface NavHub {
  categories: NavHubCategory[];
  featured: NavHubArticle[];
  tips: { href: string; label: string; description: string };
}

export type NavFactIcon = "clock" | "map" | "shield";

export interface NavFact {
  icon: NavFactIcon;
  text: string;
}

export interface NavContact {
  /** Only set when a real phone number is configured. */
  phone: { href: string; label: string } | null;
  /** Only set when a real WhatsApp number is configured. */
  whatsappHref: string | null;
  email: { href: string; label: string };
  mapsUrl: string;
}

export interface NavData {
  groups: NavGroup[];
  services: NavService[];
  hub: NavHub;
  facts: NavFact[];
  contact: NavContact;
  /** Options for the booking form's service select. */
  bookingServices: { code: string; name: string }[];
}
