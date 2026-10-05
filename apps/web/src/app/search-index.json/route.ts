import { buildSearchIndex } from "@/lib/search";

export const dynamic = "force-static";

/**
 * Static search index for the header search dialog: [{ title, href, type, description, keywords }].
 * Built once at build time; the dialog fetches it the first time a visitor opens search.
 */
export function GET() {
  return Response.json(buildSearchIndex(), {
    // Data for the site's own search box, not a page for search engines.
    headers: { "X-Robots-Tag": "noindex" },
  });
}
