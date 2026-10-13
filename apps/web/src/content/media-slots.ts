import { SERVICE_PAGES } from "./services";

/**
 * Every place on the site where the facility can post its own images from the dashboard
 * (/admin). Each slot is one card on the dashboard; whatever is posted to it appears on the
 * page named here. Slot ids are stored with every upload, so never rename one.
 */
export type SlotKind = "promotions" | "photos";

export interface MediaSlot {
  id: string;
  /** Dashboard section the card sits in */
  group: "Homepage" | "Gallery" | "About" | "Services";
  title: string;
  page: { href: string; label: string };
  /** Where exactly the images show up, in plain words */
  where: string;
  /** Recommended image shape and size */
  size: string;
  kind: SlotKind;
  /** Most images the slot shows at once */
  max: number;
}

export const MEDIA_SLOTS: MediaSlot[] = [
  {
    id: "promotions",
    group: "Homepage",
    title: "Promotions slider",
    page: { href: "/", label: "Homepage" },
    where:
      "Slides in the homepage hero, beside the main heading on computers and at the top on phones. Use it for offers, health days, campaigns and announcements.",
    size: "Portrait 1080 × 1350 px (4:5) or square 1080 × 1080 px. Keep text large and away from the edges.",
    kind: "promotions",
    max: 8,
  },
  {
    id: "home-inside",
    group: "Homepage",
    title: "“Inside PRIMEGALA” photos",
    page: { href: "/#inside-heading", label: "Homepage" },
    where: "Added to the photo grid in “See where you'll be cared for” on the homepage.",
    size: "Portrait 1080 × 1350 px works best.",
    kind: "photos",
    max: 6,
  },
  {
    id: "gallery",
    group: "Gallery",
    title: "Photo gallery",
    page: { href: "/gallery", label: "Gallery" },
    where: "The Gallery page: the facility, the team at work, health days and community events.",
    size: "Any shape, at least 1200 px on the longest side.",
    kind: "photos",
    max: 60,
  },
  {
    id: "about",
    group: "About",
    title: "Our story photos",
    page: { href: "/about", label: "Our story" },
    where: "Next to the building and reception photos on the Our story page.",
    size: "Portrait 1080 × 1350 px works best.",
    kind: "photos",
    max: 4,
  },
  {
    id: "team",
    group: "About",
    title: "Care team photos",
    page: { href: "/team", label: "Our care team" },
    where: "At the top of the Our care team page. Only post staff photos with their written consent.",
    size: "Landscape 1600 × 1000 px for group photos; portrait for individuals.",
    kind: "photos",
    max: 6,
  },
  ...SERVICE_PAGES.map(
    (s): MediaSlot => ({
      id: `service-${s.slug}`,
      group: "Services",
      title: s.name,
      page: { href: `/services/${s.slug}`, label: s.name },
      where: `In “A look inside” on the ${s.name} page.`,
      size: "Portrait 1080 × 1350 px works best.",
      kind: "photos",
      max: 6,
    }),
  ),
];

export const SLOT_GROUPS = ["Homepage", "Gallery", "About", "Services"] as const;

export function getSlot(id: string) {
  return MEDIA_SLOTS.find((s) => s.id === id);
}
