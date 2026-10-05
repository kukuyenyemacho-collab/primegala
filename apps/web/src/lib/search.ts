import "server-only";
import { NAV_GROUPS } from "@/content/navigation";
import { SERVICE_PAGES, serviceKeywords } from "@/content/services";
import { GENERAL_FAQS } from "@/content/faqs";
import { AREAS } from "@/content/keywords";
import { CATEGORIES, getAllArticles, getAllLegalDocs } from "@/lib/content";

/**
 * Site search index, served as static JSON at /search-index.json and fetched by
 * the header search dialog the first time it opens. Matching runs in the browser
 * (src/components/nav/search-engine.ts), so this module only gathers the data.
 *
 * Client code may import the types below with `import type`; importing values
 * from here in a client component fails the build (server-only).
 */

export type SearchType = "service" | "article" | "page" | "faq" | "policy";

export interface SearchEntry {
  title: string;
  href: string;
  type: SearchType;
  description: string;
  keywords: string[];
}

/**
 * Search terms and descriptions for pages. Titles and descriptions come from the
 * navigation config where a page appears there; these fill the gaps and add the
 * words people actually type (including Kiswahili and the old "NHIF" name).
 */
const PAGE_DETAILS: Record<string, { title?: string; description?: string; keywords: string[] }> = {
  "/": {
    title: "Home",
    description: "Primegala Medical Centre: 24-hour care at Maili Sita on the Nakuru–Nyahururu Road.",
    keywords: ["home", "Primegala", "Maili Sita", "Nakuru", "hospital", "clinic", "medical centre"],
  },
  "/services": {
    title: "All services",
    keywords: ["services", "departments", "clinics", "treatment", "care", "huduma"],
  },
  "/book": {
    keywords: ["appointment", "booking", "book", "reserve", "call back", "visit", "miadi"],
  },
  "/sha": {
    keywords: [
      "SHA",
      "Social Health Authority",
      "NHIF",
      "insurance",
      "cover",
      "Primary Healthcare Fund",
      "PHC",
      "registration",
      "eligibility",
    ],
  },
  "/payments-and-insurance": {
    keywords: ["M-Pesa", "cash", "pay", "payment", "cost", "fees", "bill", "insurance", "SHA", "malipo"],
  },
  "/patients-and-visitors": {
    keywords: ["visitors", "visiting", "admission", "what to bring", "first visit", "patient guide", "wageni"],
  },
  "/emergency": {
    keywords: ["emergency", "urgent", "accident", "injury", "999", "112", "dharura"],
  },
  "/areas-we-serve": {
    keywords: ["areas", "directions", "near me", "location", ...AREAS],
  },
  "/faq": {
    title: "FAQs",
    description: "Answers to common questions about hours, SHA, services, payments and directions.",
    keywords: ["questions", "answers", "help", "maswali"],
  },
  "/about": {
    keywords: ["about", "history", "story", "mission", "KEPH Level 3", "registered", "2022"],
  },
  "/team": {
    keywords: ["team", "staff", "clinicians", "nurses", "doctors", "people"],
  },
  "/kiswahili": {
    keywords: ["Kiswahili", "Swahili", "taarifa", "huduma", "hospitali", "karibu"],
  },
  "/contact": {
    keywords: ["contact", "directions", "location", "map", "address", "email", "find us", "where", "Maili Sita"],
  },
  "/health-hub": {
    description: "Clear, practical health guides written for families in Nakuru.",
    keywords: ["articles", "guides", "blog", "advice", "health information"],
  },
  "/health-hub#tips": {
    title: "Health tips",
    description: CATEGORIES["health-tips"].description,
    keywords: ["tips", "advice", "prevention", "healthy home"],
  },
  "/legal": {
    title: "Policies & legal information",
    description: "Privacy, cookies, terms of use, patient rights, complaints and our editorial policy.",
    keywords: ["policies", "legal", "privacy", "terms", "data protection"],
  },
};

const unique = (list: string[]) => [...new Set(list.map((k) => k.trim()).filter(Boolean))];

function pageEntries(exclude: Set<string>): SearchEntry[] {
  const pages = new Map<string, SearchEntry>();
  const add = (href: string, title: string, description = "") => {
    if (exclude.has(href)) return;
    const existing = pages.get(href);
    if (existing) {
      if (!existing.description && description) existing.description = description;
      return;
    }
    pages.set(href, { title, href, type: "page", description, keywords: [] });
  };

  // Menu items first: their labels are more specific than the group labels ("Our story" over "About").
  for (const group of NAV_GROUPS) {
    for (const item of group.items ?? []) add(item.href, item.label, item.description);
  }
  for (const group of NAV_GROUPS) add(group.href, group.label, group.intro);
  for (const href of Object.keys(PAGE_DETAILS)) add(href, PAGE_DETAILS[href].title ?? href);

  return [...pages.values()].map((page) => {
    const details = PAGE_DETAILS[page.href];
    return {
      ...page,
      title: details?.title ?? page.title,
      description: details?.description ?? page.description,
      keywords: unique(details?.keywords ?? []),
    };
  });
}

export function buildSearchIndex(): SearchEntry[] {
  const services: SearchEntry[] = SERVICE_PAGES.map((s) => ({
    title: s.name,
    href: `/services/${s.slug}`,
    type: "service",
    description: s.summary,
    // Service code and slug words too ("emergency-24hr", "hiv-testing-and-counselling").
    keywords: unique([s.code.replace(/-/g, " "), s.slug.replace(/-/g, " "), ...serviceKeywords(s), ...s.offers]),
  }));

  const articles: SearchEntry[] = getAllArticles().map((a) => ({
    title: a.title,
    href: `/health-hub/${a.slug}`,
    type: "article",
    description: a.description,
    keywords: unique([...a.keywords, CATEGORIES[a.category].name]),
  }));

  const categories: SearchEntry[] = Object.entries(CATEGORIES).map(([slug, c]) => ({
    title: c.name,
    href: `/health-hub/category/${slug}`,
    type: "article",
    description: c.description,
    keywords: ["Health Hub", "topic", "category"],
  }));

  const policies: SearchEntry[] = getAllLegalDocs().map((d) => ({
    title: d.title,
    href: `/legal/${d.slug}`,
    type: "policy",
    description: d.description,
    keywords: unique(d.headings.map((h) => h.text)),
  }));

  const faqs: SearchEntry[] = [
    ...GENERAL_FAQS.map((f) => ({ title: f.q, href: "/faq", type: "faq" as const, description: f.a, keywords: [] })),
    ...SERVICE_PAGES.flatMap((s) =>
      s.faqs.map((f) => ({
        title: f.q,
        href: `/services/${s.slug}`,
        type: "faq" as const,
        description: f.a,
        keywords: [s.name],
      })),
    ),
  ];

  // A page that is also a service, article or policy is listed once, under its richer entry.
  const covered = new Set([...services, ...articles, ...categories, ...policies].map((e) => e.href));

  return [...services, ...articles, ...categories, ...pageEntries(covered), ...faqs, ...policies];
}
