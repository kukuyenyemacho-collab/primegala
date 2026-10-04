import { afterEach, describe, expect, it, vi } from "vitest";

async function loadRobots() {
  vi.resetModules();
  return (await import("./robots")).default();
}

afterEach(() => vi.unstubAllEnvs());

describe("robots.txt", () => {
  it("blocks all crawling on preview copies", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "");
    expect(await loadRobots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("allows search and AI crawlers on the production site", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "production");
    const robots = await loadRobots();
    expect(robots.sitemap).toBe("https://primegala.co.ke/sitemap.xml");
    expect(JSON.stringify(robots.rules)).toContain("GPTBot");
  });
});
