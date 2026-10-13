import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ cookies: async () => ({ get: () => undefined }) }));

const auth = await import("./admin-auth");

afterEach(() => {
  delete process.env.ADMIN_PASSWORD;
  delete process.env.ADMIN_SESSION_SECRET;
});

describe("admin sign-in", () => {
  it("is off until a password is set", () => {
    expect(auth.adminConfigured()).toBe(false);
    expect(auth.passwordMatches("")).toBe(false);
    expect(auth.sessionValueValid("123.abc")).toBe(false);
  });

  it("checks the password exactly", () => {
    process.env.ADMIN_PASSWORD = "long passphrase 42";
    expect(auth.passwordMatches("long passphrase 42")).toBe(true);
    expect(auth.passwordMatches("long passphrase 4")).toBe(false);
    expect(auth.passwordMatches("")).toBe(false);
  });

  it("accepts its own session and rejects tampered or expired ones", () => {
    process.env.ADMIN_PASSWORD = "long passphrase 42";
    const now = Date.UTC(2026, 9, 13, 8);
    const value = auth.createSessionValue(now);
    expect(auth.sessionValueValid(value, now)).toBe(true);

    const [exp, sig] = value.split(".");
    expect(auth.sessionValueValid(`${Number(exp) + 3600}.${sig}`, now)).toBe(false);
    expect(auth.sessionValueValid(`${exp}.${sig}x`, now)).toBe(false);
    expect(auth.sessionValueValid(value, now + 13 * 3600 * 1000)).toBe(false);
  });

  it("signs everyone out when the password changes", () => {
    process.env.ADMIN_PASSWORD = "first password";
    const value = auth.createSessionValue();
    process.env.ADMIN_PASSWORD = "second password";
    expect(auth.sessionValueValid(value)).toBe(false);
  });

  it("only accepts posts from the site itself", () => {
    const req = (origin?: string) =>
      new Request("https://primegalahospital.co.ke/api/admin/media", {
        method: "POST",
        headers: origin ? { origin } : {},
      });
    expect(auth.sameOrigin(req("https://primegalahospital.co.ke"))).toBe(true);
    expect(auth.sameOrigin(req("https://evil.example"))).toBe(false);
    expect(auth.sameOrigin(req())).toBe(true);
  });
});
