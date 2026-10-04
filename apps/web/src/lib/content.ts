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
  const pending = "_[to be confirmed]_";
  const tokens: Record<string, string> = {
    NAME: site.name,
    ADDRESS: fullAddress(),
    PHONE: site.contact.phone ? phoneDisplay() : pending,
    EMAIL: site.contact.email ?? pending,
    URL: site.url,
    UPDATED: site.policiesUpdated,
    ODPC_REG: process.env.NEXT_PUBLIC_ODPC_REGISTRATION ?? pending,
    DPO: process.env.NEXT_PUBLIC_DPO_CONTACT ?? pending,
    CREDIT: `[${site.credit.legalName}](${site.credit.url})`,
  };
  return markdown.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) => tokens[key] ?? match);
}

function render(markdown: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const id = slugify(token.text);
        if (token.depth === 2) headings.push({ id, text: token.text.replace(/\*\*/g, "") });
        return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
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
  return fs.readdirSync(full).filter((f) => f.endsWith(".md"));
}

function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

function toDateString(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function parseArticle(file: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "articles", file), "utf8");
  const { data, content } = matter(raw);
  const body = fillTokens(content);
  const { html, headings } = render(body);
  if (!(data.category in CATEGORIES)) throw new Error(`Unknown category "${data.category}" in ${file}`);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    category: data.category,
    published: toDateString(data.published)!,
    updated: toDateString(data.updated),
    author: data.author ?? "Primegala Clinical Team",
    reviewedBy: data.reviewedBy || undefined,
    lastReviewed: toDateString(data.lastReviewed),
    featured: Boolean(data.featured),
    service: data.service,
    keywords: data.keywords ?? [],
    faqs: data.faqs ?? [],
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
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score: (a.category === article.category ? 2 : 0) + (a.service && a.service === article.service ? 3 : 0),
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
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
