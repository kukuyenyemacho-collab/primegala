import { SERVICE_PAGES } from "@/content/services";
import { getAllArticles, getArticleMarkdown } from "@/lib/content";
import { absoluteUrl, fullAddress, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const services = SERVICE_PAGES.map(
    (s) => `## ${s.name}
URL: ${absoluteUrl(`/services/${s.slug}`)}

${s.intro}

What we offer:
${s.offers.map((o) => `- ${o}`).join("\n")}

SHA: ${s.sha}

${s.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`,
  ).join("\n\n---\n\n");

  const articles = getAllArticles()
    .map((a) => `## ${a.title}\nURL: ${absoluteUrl(`/health-hub/${a.slug}`)}\nPublished: ${a.published}\n\n${getArticleMarkdown(a.slug)}`)
    .join("\n\n---\n\n");

  const body = `# ${site.name}: full site content

${site.description}

Address: ${fullAddress()}. Open 24 hours.

# Services

${services}

# Health Hub

${articles}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
