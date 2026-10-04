/**
 * HMAC-SHA256 signing for site -> HMIS webhooks.
 *
 * Header format (Stripe-style, replay-resistant):
 *   X-Primegala-Signature: t=<unix seconds>,v1=<hex hmac of "<t>.<body>">
 *
 * Uses Web Crypto so the same code runs in Node, edge runtimes and the HMIS.
 */

export const SIGNATURE_HEADER = "x-primegala-signature";
const DEFAULT_TOLERANCE_SECONDS = 5 * 60;

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signWebhook(secret: string, body: string, timestamp = Math.floor(Date.now() / 1000)) {
  const v1 = await hmacHex(secret, `${timestamp}.${body}`);
  return `t=${timestamp},v1=${v1}`;
}

export async function verifyWebhook(
  secret: string,
  body: string,
  header: string | null | undefined,
  { now = Math.floor(Date.now() / 1000), toleranceSeconds = DEFAULT_TOLERANCE_SECONDS } = {},
): Promise<boolean> {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((part) => {
      const i = part.indexOf("=");
      return [part.slice(0, i).trim(), part.slice(i + 1).trim()];
    }),
  );
  const t = Number(parts.t);
  if (!Number.isFinite(t) || !parts.v1) return false;
  if (Math.abs(now - t) > toleranceSeconds) return false;
  const expected = await hmacHex(secret, `${t}.${body}`);
  return timingSafeEqual(expected, parts.v1);
}
