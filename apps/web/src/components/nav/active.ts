import type { NavGroup } from "@/content/navigation";

const within = (pathname: string, href: string) =>
  href !== "/" && (pathname === href || pathname.startsWith(`${href}/`));

/**
 * The one navigation group the current page belongs to: the group whose own
 * section contains the page (/services/maternity → Services), otherwise the first
 * group that lists the page as an item (/team → About). Returns the group's href.
 */
export function activeGroupHref(pathname: string, groups: NavGroup[]): string | null {
  const own = groups.find((g) => within(pathname, g.href));
  if (own) return own.href;
  const listed = groups.find((g) => g.items?.some((item) => within(pathname, item.href.split("#")[0])));
  return listed?.href ?? null;
}

/** DOM id of a group's menu panel. */
export function panelId(prefix: string, href: string) {
  return `${prefix}-${href.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}`;
}

/** aria-current for a link: "page" on the exact page, nothing elsewhere. */
export function currentProps(pathname: string, href: string) {
  return pathname === href ? ({ "aria-current": "page" } as const) : {};
}
