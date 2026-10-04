import { NextResponse } from "next/server";
import { z } from "zod";
import { buildLead, leadInputSchema } from "@primegala/contracts";
import { deliverLead, leadReference, rateLimited } from "@/lib/leads";
import { site } from "@/lib/site";

const MAX_BODY_BYTES = 10_000;

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (body && typeof body === "object" && "website" in body && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true, reference: leadReference(crypto.randomUUID()) });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please call or WhatsApp us instead." },
      { status: 429 },
    );
  }

  const parsed = leadInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const lead = buildLead(parsed.data, { id: crypto.randomUUID(), policyVersion: site.policyVersion });
  const result = await deliverLead(lead);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't send your request just now. Please call or WhatsApp us; we're open 24 hours.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, reference: leadReference(lead.id) }, { status: 201 });
}
