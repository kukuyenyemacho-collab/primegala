import { afterEach, describe, expect, it, vi } from "vitest";

async function meta(env: string) {
  vi.stubEnv("NEXT_PUBLIC_SITE_ENV", env);
  vi.resetModules();
  const { pageMetadata } = await import("./seo");
  return pageMetadata({ title: "Test", description: "Test page", path: "/test" });
}

afterEach(() => vi.unstubAllEnvs());

describe("pageMetadata robots", () => {
  it("marks every page noindex on preview copies", async () => {
    expect((await meta("")).robots).toEqual({ index: false, follow: false });
  });

  it("leaves robots to the layout on production (key omitted, not undefined)", async () => {
    expect("robots" in (await meta("production"))).toBe(false);
  });
});
