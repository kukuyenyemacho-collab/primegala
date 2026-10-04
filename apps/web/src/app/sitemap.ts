import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/content/services";
import { CATEGORIES, getAllArticles, getAllLegalDocs } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const launch = new Date(`${site.policyVersion}T00:00:00+03:00`);
  const articles = getAllArticles();

  const core: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/book"), changeFrequency: "yearly", priority: 0.9 },
    { url: absoluteUrl("/sha"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/team"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/areas-we-serve"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/health-hub"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/legal"), changeFrequency: "yearly", priority: 0.2 },
  ].map((e) => ({ ...e, lastModified: launch }) as MetadataRoute.Sitemap[number]);

  return [
    ...core,
    ...SERVICE_PAGES.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: launch,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/health-hub/${a.slug}`),
      lastModified: new Date(`${a.updated ?? a.published}T00:00:00+03:00`),
      changeFrequency: "monthly" as const,
      priority: a.category === "health-tips" ? 0.5 : 0.7,
    })),
    ...Object.keys(CATEGORIES).map((c) => ({
      url: absoluteUrl(`/health-hub/category/${c}`),
      lastModified: launch,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
    ...getAllLegalDocs().map((d) => ({
      url: absoluteUrl(`/legal/${d.slug}`),
      lastModified: launch,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
