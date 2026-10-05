import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { fullAddress, phoneDisplay, site } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export const CATEGORIES = {
  "sha-guides": { name: "SHA Guides", description: "Using the Social Health Authority at Primegala and beyond." },
  "pregnancy-baby": { name: "Pregnancy & Baby", description: "Antenatal care, safe delivery, family planning and child health." },
  "everyday-health": { name: "Everyday Health", description: "Fevers, infections, testing and knowing when to seek care." },
  "chronic-conditions": { name: "Chronic Conditions", description: "Living well with high blood pressure, diabetes and more." },
  "health-tips": { name: "Health Tips", description: "Short, practical tips for healthier homes." },
  "our-stories": { name: "Our Stories", description: "The people and purpose behind Primegala." },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export interface Heading {
  id: string;
  text: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  published: string;
  updated?: string;
  author: string;
  reviewedBy?: string;
  lastReviewed?: string;
  featured: boolean;
  service?: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
  readingMinutes: number;
}

export interface Article extends ArticleMeta {
  html: string;
  headings: Heading[];
}

/** What a health tip needs to open as a quick-read dialog (matches TipCard's `TipSummary`). */
export type TipData = Pick<Article, "slug" | "title" | "description" | "html" | "readingMinutes">;

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  order: number;
  html: string;
  headings: Heading[];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Facility facts referenced in Markdown as {{TOKEN}} so legal text never drifts from site config. */
function fillTokens(markdown: string): string {
  const tokens: Record<string, string> = {
    NAME: site.name,
    ADDRESS: fullAddress(),
    PHONE: site.contact.phone ? phoneDisplay() : "our front desk (open 24 hours)",
    EMAIL: `[${site.contact.email}](mailto:${site.contact.email})`,
    URL: site.url,
    UPDATED: site.policiesUpdated,
    ODPC_REG: process.env.NEXT_PUBLIC_ODPC_REGISTRATION ?? "Available on request",
    DPO: process.env.NEXT_PUBLIC_DPO_CONTACT ?? `Data Protection Officer, ${site.contact.email}`,
    CREDIT: `[${site.credit.legalName}](${site.credit.url})`,
  };
  return markdown.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) => tokens[key] ?? match);
}

/** Plain text of a heading for the table of contents (no Markdown emphasis or inline HTML). */
function headingText(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function render(markdown: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const usedIds = new Map<string, number>();
  /** Unique, non-empty ids even when two headings share the same text. */
  const uniqueId = (text: string) => {
    const base = slugify(text) || "section";
    const seen = usedIds.get(base) ?? 0;
    usedIds.set(base, seen + 1);
    return seen === 0 ? base : `${base}-${seen + 1}`;
  };
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        // The page template owns the only <h1>; a "# Heading" in Markdown becomes a section heading.
        const depth = Math.max(2, token.depth);
        const id = uniqueId(token.text);
        if (depth === 2) headings.push({ id, text: headingText(token.text) });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      table(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Table) {
        const cell = (c: Tokens.TableCell, tag: "th" | "td") =>
          `<${tag}${c.align ? ` style="text-align:${c.align}"` : ""}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        const head = `<tr>${token.header.map((c) => cell(c, "th")).join("")}</tr>`;
        const body = token.rows.map((row) => `<tr>${row.map((c) => cell(c, "td")).join("")}</tr>`).join("");
        return `<div class="table-scroll"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens);
        const external = /^https?:\/\//.test(token.href) && !token.href.startsWith(site.url);
        return `<a href="${token.href}"${external ? ' rel="noopener" target="_blank"' : ""}>${text}</a>`;
      },
    },
  });
  const html = marked.parse(markdown, { async: false });
  return { html, headings };
}

function readDir(dir: string): string[] {
  const full = path.join(CONTENT_DIR, dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && !f.startsWith("."))
    .sort();
}

function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Front matter dates may arrive as a YAML date (unquoted) or a string (quoted).
 * Returns YYYY-MM-DD, or undefined when the value is missing or not a real date.
 */
function toDateString(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value.toISOString().slice(0, 10);
  const text = String(value).trim();
  const iso = /^(\d{4}-\d{2}-\d{2})/.exec(text);
  if (iso) return Number.isNaN(Date.parse(iso[1])) ? undefined : iso[1];
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

function optionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  const text = String(value).trim();
  return text ? text : undefined;
}

/** Accepts a YAML list or a comma-separated string. */
function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v ?? "").trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((v) => v.trim()).filter(Boolean);
  return [];
}

/** Keeps only complete question/answer pairs, so a half-written FAQ never reaches the page or schema. */
function toFaqs(value: unknown): { q: string; a: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const q = optionalString((item as Record<string, unknown>).q);
    const a = optionalString((item as Record<string, unknown>).a);
    return q && a ? [{ q, a }] : [];
  });
}

function toBoolean(value: unknown): boolean {
  if (typeof value === "string") return ["true", "yes", "1"].includes(value.trim().toLowerCase());
  return Boolean(value);
}

const REQUIRED_ARTICLE_FIELDS = ["title", "description", "category", "published"] as const;

function isCategory(value: unknown): value is CategorySlug {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(CATEGORIES, value);
}

function parseArticle(file: string): Article {
  const where = `src/content/articles/${file}`;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "articles", file), "utf8");

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(raw);
  } catch (error) {
    throw new Error(`[Health Hub] Could not read the front matter in ${where}: ${(error as Error).message}`);
  }
  const { data, content } = parsed;

  const missing = REQUIRED_ARTICLE_FIELDS.filter((field) => optionalString(data[field]) === undefined);
  if (missing.length > 0) {
    throw new Error(
      `[Health Hub] ${where} is missing required front matter: ${missing.map((f) => `"${f}"`).join(", ")}. ` +
        `Every article needs ${REQUIRED_ARTICLE_FIELDS.join(", ")}.`,
    );
  }

  const category = String(data.category).trim();
  if (!isCategory(category)) {
    throw new Error(
      `[Health Hub] Unknown category "${category}" in ${where}. Use one of: ${Object.keys(CATEGORIES).join(", ")}.`,
    );
  }

  const published = toDateString(data.published);
  if (!published) {
    throw new Error(`[Health Hub] "published" in ${where} is not a valid date (use YYYY-MM-DD): ${String(data.published)}`);
  }

  if (!content.trim()) throw new Error(`[Health Hub] ${where} has front matter but no article text.`);

  const { html, headings } = render(fillTokens(content));
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title).trim(),
    description: String(data.description).trim(),
    category,
    published,
    updated: toDateString(data.updated),
    author: optionalString(data.author) ?? "Primegala Clinical Team",
    reviewedBy: optionalString(data.reviewedBy),
    lastReviewed: toDateString(data.lastReviewed),
    featured: toBoolean(data.featured),
    service: optionalString(data.service),
    keywords: toStringList(data.keywords),
    faqs: toFaqs(data.faqs),
    readingMinutes: readingMinutes(content),
    html,
    headings,
  };
}

let articleCache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (!articleCache || process.env.NODE_ENV === "development") {
    articleCache = readDir("articles")
      .map(parseArticle)
      .sort((a, b) => (b.updated ?? b.published).localeCompare(a.updated ?? a.published) || a.title.localeCompare(b.title));
  }
  return articleCache;
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesBySlugs(slugs: string[]): Article[] {
  return slugs.map((s) => getArticle(s)).filter((a): a is Article => Boolean(a));
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const keywords = new Set(article.keywords.map((k) => k.toLowerCase()));
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score:
        (a.category === article.category ? 2 : 0) +
        (a.service && a.service === article.service ? 3 : 0) +
        Math.min(2, a.keywords.filter((k) => keywords.has(k.toLowerCase())).length),
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

/** Article metadata without the rendered HTML: small enough to pass to client components. */
export function toArticleMeta(article: Article): ArticleMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { html, headings, ...meta } = article;
  return meta;
}

export function toTip(article: Article): TipData {
  const { slug, title, description, html, readingMinutes: minutes } = article;
  return { slug, title, description, html, readingMinutes: minutes };
}

/** Every health tip as quick-read data for TipCard, newest first. Optionally skip one slug. */
export function getTips({ limit, exclude }: { limit?: number; exclude?: string } = {}): TipData[] {
  const tips = getArticlesByCategory("health-tips")
    .filter((a) => a.slug !== exclude)
    .map(toTip);
  return limit === undefined ? tips : tips.slice(0, limit);
}

/** Number of articles in each category, including empty ones. */
export function getCategoryCounts(): Record<CategorySlug, number> {
  const counts = Object.fromEntries(Object.keys(CATEGORIES).map((c) => [c, 0])) as Record<CategorySlug, number>;
  for (const a of getAllArticles()) counts[a.category] += 1;
  return counts;
}

let legalCache: LegalDoc[] | null = null;

export function getAllLegalDocs(): LegalDoc[] {
  if (!legalCache || process.env.NODE_ENV === "development") {
    legalCache = readDir("legal")
      .map((file) => {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, "legal", file), "utf8");
        const { data, content } = matter(raw);
        const { html, headings } = render(fillTokens(content));
        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title,
          description: data.description,
          order: data.order ?? 99,
          html,
          headings,
        };
      })
      .sort((a, b) => a.order - b.order);
  }
  return legalCache;
}

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return getAllLegalDocs().find((d) => d.slug === slug);
}

/** Plain-text version of Markdown for llms-full.txt */
export function getArticleMarkdown(slug: string): string {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "articles", `${slug}.md`), "utf8");
  return fillTokens(matter(raw).content).trim();
}
