import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Everything public is crawlable, including by AI assistants (GEO): when someone
 * asks ChatGPT, Gemini, Claude or Perplexity for a 24-hour clinic near Bahati, we
 * want Primegala's own pages to be the source they cite.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Google-Extended",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
