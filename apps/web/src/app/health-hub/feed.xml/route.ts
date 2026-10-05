import { CATEGORIES, getAllArticles } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** Article dates are Nairobi calendar days; publish them at 08:00 EAT. */
const rfc822 = (isoDate: string) => new Date(`${isoDate}T08:00:00+03:00`).toUTCString();

export function GET() {
  // Newest first by publication date, so a newly published guide always tops the feed.
  const articles = [...getAllArticles()].sort(
    (a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title),
  );
  const lastBuild = articles.reduce(
    (latest, a) => ((a.updated ?? a.published) > latest ? (a.updated ?? a.published) : latest),
    articles[0]?.published ?? site.foundingDate,
  );

  const items = articles
    .map((a) => {
      const url = absoluteUrl(`/health-hub/${a.slug}`);
      return `    <item>
      <title>${escape(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(a.description)}</description>
      <category>${escape(CATEGORIES[a.category].name)}</category>
      <dc:creator>${escape(a.author)}</dc:creator>
      <pubDate>${rfc822(a.published)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(site.name)} Health Hub</title>
    <link>${absoluteUrl("/health-hub")}</link>
    <atom:link href="${absoluteUrl("/health-hub/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>Health guides and tips for families in Nakuru from ${escape(site.name)}.</description>
    <language>en-ke</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
