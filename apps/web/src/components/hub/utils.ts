/**
 * Small helpers shared by the Health Hub's server and client components.
 * No "server-only" or "use client" here: both sides import these.
 */

/** Strip the "Health Tip: " prefix used in page titles; it repeats what the tips UI already says. */
export function displayTitle(title: string): string {
  return title.replace(/^Health Tip:\s*/i, "");
}

/**
 * Lower-case, accent-free text with punctuation turned into spaces and a leading
 * space, so `haystack.includes(" " + term)` matches the start of any word.
 */
export function searchText(...parts: (string | undefined)[]): string {
  return ` ${parts
    .filter(Boolean)
    .join(" ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()}`;
}

/** Split what someone typed into normalised search terms. */
export function searchTerms(query: string): string[] {
  return searchText(query).trim().split(" ").filter(Boolean);
}

export function plural(count: number, one: string, many = `${one}s`): string {
  return `${count} ${count === 1 ? one : many}`;
}

/** "3 guides", "1 tip", "2 stories": the right noun for a Health Hub topic. */
export function topicCount(slug: string, count: number): string {
  if (slug === "health-tips") return plural(count, "tip");
  if (slug === "our-stories") return plural(count, "story", "stories");
  return plural(count, "guide");
}
