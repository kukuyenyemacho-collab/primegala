import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Dashboard sign-in. One shared password (ADMIN_PASSWORD, set in Vercel) gives a signed,
 * httpOnly session cookie for 12 hours. ADMIN_SESSION_SECRET can be set to sign cookies with a
 * separate key; otherwise one is derived from the password, so changing the password signs
 * everyone out.
 */

export const ADMIN_COOKIE = "pg_admin";
const SESSION_SECONDS = 12 * 60 * 60;

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

function secret() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return process.env.ADMIN_SESSION_SECRET || createHash("sha256").update(`primegala-admin:${pw}`).digest("hex");
}

const sign = (key: string, value: string) => createHmac("sha256", key).update(value).digest("base64url");

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordMatches(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  return Boolean(pw) && safeEqual(input, pw!);
}

export function createSessionValue(now = Date.now()) {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD is not set");
  const exp = String(Math.floor(now / 1000) + SESSION_SECONDS);
  return `${exp}.${sign(key, exp)}`;
}

export function sessionValueValid(value: string | undefined, now = Date.now()) {
  const key = secret();
  if (!key || !value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp)) return false;
  if (Number(exp) * 1000 < now) return false;
  return safeEqual(sig, sign(key, exp));
}

export async function isAdmin() {
  return sessionValueValid((await cookies()).get(ADMIN_COOKIE)?.value);
}

export const sessionCookie = (value: string) => ({
  name: ADMIN_COOKIE,
  value,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" && process.env.MEDIA_STORAGE !== "local",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_SECONDS,
});

/** Rejects cross-site form posts: the request must come from this site's own pages. */
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    return [new URL(request.url).host, request.headers.get("x-forwarded-host"), request.headers.get("host")].includes(host);
  } catch {
    return false;
  }
}
