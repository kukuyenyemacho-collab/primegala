import { getAllArticles } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllArticles()
    .map(
      (a) => `    <item>
      <title>${escape(a.title)}</title>
      <link>${absoluteUrl(`/health-hub/${a.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/health-hub/${a.slug}`)}</guid>
      <description>${escape(a.description)}</description>
      <pubDate>${new Date(`${a.published}T08:00:00+03:00`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} Health Hub</title>
    <link>${absoluteUrl("/health-hub")}</link>
    <atom:link href="${absoluteUrl("/health-hub/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>Health guides and tips for families in Nakuru from ${escape(site.name)}.</description>
    <language>en-ke</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
