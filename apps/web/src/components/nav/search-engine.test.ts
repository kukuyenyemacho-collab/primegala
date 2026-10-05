import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { buildSearchIndex } = await import("@/lib/search");
const { groupResults, highlightParts, normalize, parseQuery, prepareIndex, searchIndex, stem } = await import(
  "./search-engine"
);

const entries = buildSearchIndex();
const index = prepareIndex(entries);
const search = (q: string) => searchIndex(index, parseQuery(q));
const titles = (q: string) => search(q).map((e) => e.title);

describe("search index", () => {
  it("has the expected shape and no duplicate pages", () => {
    for (const e of entries) {
      expect(Object.keys(e)).toEqual(["title", "href", "type", "description", "keywords"]);
      expect(e.href.startsWith("/")).toBe(true);
      expect(e.title.length).toBeGreaterThan(0);
    }
    const nonFaq = entries.filter((e) => e.type !== "faq").map((e) => e.href);
    expect(new Set(nonFaq).size).toBe(nonFaq.length);
  });

  it("covers every content type", () => {
    const types = new Set(entries.map((e) => e.type));
    expect([...types].sort()).toEqual(["article", "faq", "page", "policy", "service"]);
    expect(entries.filter((e) => e.type === "service")).toHaveLength(12);
  });

  it("never contains placeholder text", () => {
    const text = JSON.stringify(entries).toLowerCase();
    for (const banned of ["07xx", "lorem", "to be confirmed", "coming soon"]) expect(text).not.toContain(banned);
  });
});

describe("normalising", () => {
  it("lowercases and strips accents and punctuation", () => {
    expect(normalize("  Café, M-Pesa & SHA! ")).toBe("cafe m pesa sha");
  });

  it("folds simple plurals", () => {
    expect(stem("tests")).toBe("test");
    expect(stem("babies")).toBe("baby");
    expect(stem("clinics")).toBe("clinic");
    expect(stem("classes")).toBe("class");
    expect(stem("sha")).toBe("sha");
    expect(stem("status")).toBe("status");
  });
});

describe("matching", () => {
  it("ranks the service whose title matches first", () => {
    expect(search("maternity")[0]).toMatchObject({ type: "service", href: "/services/maternity" });
    expect(search("family planning")[0]).toMatchObject({ href: "/services/family-planning" });
    expect(search("pharmacy")[0]).toMatchObject({ href: "/services/pharmacy" });
  });

  it("matches while typing (word prefixes)", () => {
    expect(titles("matern")).toContain("Maternity & Delivery");
    expect(titles("lab")).toContain("Laboratory Services");
  });

  it("tolerates plurals and accents", () => {
    expect(titles("laboratory tests")).toContain("Laboratory Services");
    expect(titles("immunisations")).toContain("Child Health & Immunisation");
    expect(titles("matérnity")).toContain("Maternity & Delivery");
  });

  it("matches close word forms", () => {
    expect(search("pregnant").some((e) => e.href === "/services/antenatal-care")).toBe(true);
    expect(titles("children")).toContain("Child Health & Immunisation");
  });

  it("prefers services built around a topic over passing mentions", () => {
    const services = search("emergency").filter((e) => e.type === "service");
    expect(services[0].href).toBe("/services/24-hour-urgent-care");
  });

  it("requires every meaningful word but ignores filler words", () => {
    expect(search("maternity zzzz")).toHaveLength(0);
    expect(titles("how do I book an appointment")).toContain("How do I book an appointment at Primegala?");
  });

  it("finds pages and policies by their keywords", () => {
    expect(search("mpesa").some((e) => e.href === "/payments-and-insurance")).toBe(true);
    expect(search("nhif").some((e) => e.href === "/sha")).toBe(true);
    expect(search("cookies").some((e) => e.type === "policy")).toBe(true);
  });

  it("scores title matches above description matches", () => {
    const results = search("sha");
    const firstTitleHit = results.findIndex((e) => /\bsha\b/i.test(e.title));
    const firstDescriptionOnly = results.findIndex(
      (e) => !/\bsha\b/i.test(e.title) && !e.keywords.some((k) => /\bsha\b/i.test(k)),
    );
    expect(firstTitleHit).toBeGreaterThanOrEqual(0);
    if (firstDescriptionOnly >= 0) expect(firstTitleHit).toBeLessThan(firstDescriptionOnly);
  });

  it("groups results in a fixed order with per-group caps", () => {
    const groups = groupResults(search("sha"));
    const order = ["service", "article", "page", "faq", "policy"];
    const seen = groups.map((g) => order.indexOf(g.type));
    expect(seen).toEqual([...seen].sort((a, b) => a - b));
    for (const g of groups) expect(g.items.length).toBeLessThanOrEqual(6);
  });
});

describe("highlighting", () => {
  it("marks the matched part of each word", () => {
    const parts = highlightParts("Antenatal Care (ANC)", parseQuery("antenat"));
    expect(parts).toEqual([
      { text: "Antenat", hit: true },
      { text: "al Care (ANC)", hit: false },
    ]);
  });

  it("marks whole words for plural matches and skips filler words", () => {
    const parts = highlightParts("Babies and children", parseQuery("baby and"));
    expect(parts.filter((p) => p.hit).map((p) => p.text)).toEqual(["Babies"]);
  });
});
