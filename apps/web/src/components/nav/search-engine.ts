import type { SearchEntry, SearchType } from "@/lib/search";

/**
 * Small, dependency-free site search that runs in the browser over the static
 * index from /search-index.json (about a hundred entries).
 *
 * - Text is normalised: lowercase, accents and punctuation removed; hyphenated
 *   words are indexed both split and joined ("M-Pesa" matches "m pesa" and "mpesa").
 * - Every meaningful query word must match the title, keywords or description,
 *   either as a whole word, a simple plural/singular ("tests" ~ "test",
 *   "babies" ~ "baby"), the start of a word (so results appear while typing) or a
 *   close word form ("pregnant" ~ "pregnancy", "children" ~ "child").
 * - Title matches score above keyword matches, which score above description
 *   matches; entries matching several keyword phrases rank a little higher.
 */

export const SEARCH_GROUPS: { type: SearchType; label: string; limit: number }[] = [
  { type: "service", label: "Services", limit: 6 },
  { type: "article", label: "Health Hub", limit: 5 },
  { type: "page", label: "Pages", limit: 5 },
  { type: "faq", label: "FAQs", limit: 4 },
  { type: "policy", label: "Policies", limit: 3 },
];

/** Filler words that should not have to match ("how do I book" still finds booking). */
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "at", "be", "by", "can", "do", "does", "for", "from", "get", "how", "i",
  "if", "in", "is", "it", "me", "my", "near", "of", "on", "or", "the", "to", "what", "when", "where",
  "which", "who", "why", "will", "with", "you", "your",
  // Kiswahili
  "kwa", "na", "ya", "wa", "la", "za", "cha", "ni", "je",
]);

export interface QueryToken {
  text: string;
  stem: string;
  /** Stop words only add to the score; every other word must match. */
  required: boolean;
  /** Whether the token may match the start of a longer word. */
  prefix: boolean;
}

export interface ParsedQuery {
  normalized: string;
  tokens: QueryToken[];
}

type Word = readonly [word: string, stem: string];

interface PreparedEntry {
  entry: SearchEntry;
  title: Word[];
  /** One word list per keyword phrase. */
  keywords: Word[][];
  description: Word[];
  titleText: string;
}

export type PreparedIndex = PreparedEntry[];

function fold(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/['’`]/g, "");
}

export function normalize(text: string): string {
  return fold(text).replace(/[^a-z0-9]+/g, " ").trim();
}

/** Simple English plural folding: "tests" → "test", "babies" → "baby", "clinics" → "clinic". */
export function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && /(?:sses|shes|ches|xes|zes)$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !/(?:ss|us|is)$/.test(word)) return word.slice(0, -1);
  return word;
}

function toWords(text: string): Word[] {
  const folded = fold(text);
  const list = folded.split(/[^a-z0-9]+/).filter(Boolean);
  for (const compound of folded.match(/[a-z0-9]+(?:[-–/.][a-z0-9]+)+/g) ?? []) {
    list.push(compound.replace(/[^a-z0-9]/g, ""));
  }
  return [...new Set(list)].map((w) => [w, stem(w)] as const);
}

export function prepareIndex(entries: SearchEntry[]): PreparedIndex {
  return entries.map((entry) => ({
    entry,
    title: toWords(entry.title),
    keywords: entry.keywords.map(toWords),
    description: toWords(entry.description),
    titleText: normalize(entry.title),
  }));
}

export function parseQuery(query: string): ParsedQuery {
  const normalized = normalize(query);
  const raw = normalized ? normalized.split(" ") : [];
  const hasMeaningful = raw.some((t) => !STOP_WORDS.has(t));
  const stillTyping = !/\s$/.test(query);
  return {
    normalized,
    tokens: raw.map((text, i) => ({
      text,
      stem: stem(text),
      required: hasMeaningful ? !STOP_WORDS.has(text) : true,
      // A single letter only matches a whole word, unless it is the word being typed.
      prefix: text.length > 1 || (stillTyping && i === raw.length - 1),
    })),
  };
}

function commonPrefix(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

/** How well one query word matches one indexed word (0 = no match). */
function quality(token: QueryToken, [word, wordStem]: Word): number {
  if (word === token.text) return 1;
  if (wordStem === token.stem) return 0.95;
  if (!token.prefix) return 0;
  if (word.startsWith(token.text)) return 0.75;
  if (token.stem !== token.text && word.startsWith(token.stem)) return 0.6;
  // Close word forms share a long start: "pregnant"/"pregnancy", "diabetic"/"diabetes".
  if (token.text.length >= 6) {
    const common = commonPrefix(token.text, word);
    if (common >= 5 && token.text.length - common <= 3) return 0.5;
  }
  return 0;
}

function best(token: QueryToken, words: Word[]): number {
  let top = 0;
  for (const w of words) {
    const q = quality(token, w);
    if (q > top) top = q;
    if (top === 1) break;
  }
  return top;
}

const WEIGHT = { title: 10, keywords: 6, description: 2 };

/** Matching entries, best first. */
export function searchIndex(index: PreparedIndex, query: ParsedQuery): SearchEntry[] {
  if (!query.tokens.length) return [];
  const hits: { entry: SearchEntry; score: number }[] = [];

  for (const item of index) {
    let score = 0;
    let matched = true;
    for (const token of query.tokens) {
      let keyword = 0;
      let phrases = 0;
      for (const phrase of item.keywords) {
        const q = best(token, phrase);
        if (q > 0) phrases++;
        if (q > keyword) keyword = q;
      }
      const description = best(token, item.description);
      let s = Math.max(best(token, item.title) * WEIGHT.title, keyword * WEIGHT.keywords, description * WEIGHT.description);
      if (!s && token.required) {
        matched = false;
        break;
      }
      // Small tie-breakers: a topic that runs through many keyword phrases and the description.
      if (s) s += Math.min(phrases, 4) * 0.5 + (description ? 0.5 : 0);
      score += token.required ? s : s * 0.25;
    }
    if (!matched || score === 0) continue;

    // Whole-phrase bonuses keep "family planning" above pages that merely mention both words.
    if (item.titleText === query.normalized) score += 20;
    else if (item.titleText.startsWith(query.normalized)) score += 12;
    else if (` ${item.titleText}`.includes(` ${query.normalized}`)) score += 8;

    hits.push({ entry: item.entry, score });
  }

  return hits
    .sort((a, b) => b.score - a.score || a.entry.title.length - b.entry.title.length)
    .map((h) => h.entry);
}

export interface SearchGroup {
  type: SearchType;
  label: string;
  items: SearchEntry[];
}

/** Results grouped in a fixed order (Services, Health Hub, Pages, FAQs, Policies), capped per group. */
export function groupResults(results: SearchEntry[]): SearchGroup[] {
  return SEARCH_GROUPS.map(({ type, label, limit }) => ({
    type,
    label,
    items: results.filter((r) => r.type === type).slice(0, limit),
  })).filter((g) => g.items.length > 0);
}

/** Splits text into plain and matched parts for <mark> highlighting. */
export function highlightParts(text: string, query: ParsedQuery): { text: string; hit: boolean }[] {
  const tokens = query.tokens.filter((t) => t.required);
  if (!tokens.length) return [{ text, hit: false }];

  const parts: { text: string; hit: boolean }[] = [];
  let last = 0;
  for (const match of text.matchAll(/[\p{L}\p{N}]+/gu)) {
    const word = match[0];
    const start = match.index ?? 0;
    const folded = fold(word);
    const folds: Word = [folded, stem(folded)];
    let length = 0;
    for (const token of tokens) {
      const q = quality(token, folds);
      if (q >= 0.95) {
        length = word.length;
        break;
      }
      if (q === 0.75) length = Math.max(length, Math.min(word.length, token.text.length));
      else if (q === 0.6) length = Math.max(length, Math.min(word.length, token.stem.length));
      else if (q === 0.5) length = Math.max(length, Math.min(word.length, commonPrefix(token.text, folded)));
    }
    if (!length) continue;
    if (start > last) parts.push({ text: text.slice(last, start), hit: false });
    parts.push({ text: text.slice(start, start + length), hit: true });
    last = start + length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), hit: false });
  return parts;
}
