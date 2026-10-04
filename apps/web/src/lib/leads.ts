import { leadToFhirBundle, signWebhook, SIGNATURE_HEADER, type Lead } from "@primegala/contracts";

export type DeliveryResult =
  | { ok: true; mode: "webhook" | "log" }
  | { ok: false; reason: "not-configured" | "hmis-error" | "network-error"; status?: number };

/** Redact for logs: never write full phone numbers or messages to application logs. */
function redact(lead: Lead) {
  return {
    id: lead.id,
    type: lead.type,
    service: lead.request.service,
    phone: `${lead.contact.phone.slice(0, 7)}•••${lead.contact.phone.slice(-2)}`,
    source: lead.attribution.utmSource ?? lead.attribution.referrer ?? "direct",
  };
}

/**
 * Deliver a lead to the HMIS.
 *
 * Payload: { lead, fhir } where `fhir` is a FHIR R4 transaction Bundle
 * (Patient + proposed Appointment, or Patient + Task). Signed with HMAC-SHA256 in
 * the `x-primegala-signature` header; the HMIS verifies it with
 * `verifyWebhook()` from @primegala/contracts. The lead id doubles as an
 * idempotency key so retries never create duplicate patients.
 */
export async function deliverLead(lead: Lead, env = process.env): Promise<DeliveryResult> {
  const url = env.HMIS_LEADS_WEBHOOK_URL;
  const secret = env.HMIS_LEADS_WEBHOOK_SECRET;

  if (!url || !secret) {
    // Production refuses to drop leads silently. LEADS_LOG_ONLY=true is an explicit
    // opt-in for demos and staging before the HMIS exists.
    if (env.NODE_ENV === "production" && env.LEADS_LOG_ONLY !== "true") {
      console.error("[leads] HMIS webhook not configured; lead not delivered", redact(lead));
      return { ok: false, reason: "not-configured" };
    }
    console.info("[leads] (log-only) lead captured", redact(lead));
    return { ok: true, mode: "log" };
  }

  const body = JSON.stringify({ lead, fhir: leadToFhirBundle(lead) });
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": lead.id,
        [SIGNATURE_HEADER]: await signWebhook(secret, body),
      },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[leads] HMIS rejected lead", res.status, redact(lead));
      return { ok: false, reason: "hmis-error", status: res.status };
    }
    return { ok: true, mode: "webhook" };
  } catch (error) {
    console.error("[leads] HMIS unreachable", (error as Error).name, redact(lead));
    return { ok: false, reason: "network-error" };
  }
}

/**
 * Best-effort, per-instance rate limit. Good enough to stop casual abuse; put
 * the site behind the hosting provider's WAF / edge rate limiting for production.
 */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

export function leadReference(id: string) {
  return `PG-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}
