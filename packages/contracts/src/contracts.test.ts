import { describe, expect, it } from "vitest";
import {
  buildLead,
  formatKenyanPhone,
  kenyaToday,
  leadInputSchema,
  leadToFhirBundle,
  normalizeKenyanPhone,
  signWebhook,
  toWhatsAppNumber,
  verifyWebhook,
} from "./index";

describe("normalizeKenyanPhone", () => {
  it.each([
    ["0712345678", "+254712345678"],
    ["0712 345 678", "+254712345678"],
    ["+254 712-345-678", "+254712345678"],
    ["254712345678", "+254712345678"],
    ["712345678", "+254712345678"],
    ["0110123456", "+254110123456"],
  ])("normalises %s", (input, expected) => {
    expect(normalizeKenyanPhone(input)).toBe(expected);
  });

  it.each(["", "12345", "0212345678", "+255712345678", "07123456789", "07+12345678"])("rejects %s", (input) => {
    expect(normalizeKenyanPhone(input)).toBeNull();
  });

  it("formats and converts for WhatsApp", () => {
    expect(formatKenyanPhone("+254712345678")).toBe("0712 345 678");
    expect(toWhatsAppNumber("0712345678")).toBe("254712345678");
  });
});

describe("kenyaToday", () => {
  it("uses East Africa Time", () => {
    // 22:30 UTC on 4 Oct is 01:30 EAT on 5 Oct
    expect(kenyaToday(new Date("2026-10-04T22:30:00Z"))).toBe("2026-10-05");
  });
});

const validInput = {
  type: "appointment",
  fullName: "  Wanjiku Kamau ",
  phone: "0712 345 678",
  email: "",
  service: "antenatal-care",
  preferredDate: "2999-01-15",
  preferredTime: "morning",
  consent: true,
} as const;

describe("leadInputSchema", () => {
  it("parses and normalises a valid appointment request", () => {
    const parsed = leadInputSchema.parse(validInput);
    expect(parsed.fullName).toBe("Wanjiku Kamau");
    expect(parsed.phone).toBe("+254712345678");
    expect(parsed.email).toBeUndefined();
    expect(parsed.preferredChannel).toBe("whatsapp");
    expect(parsed.marketingOptIn).toBe(false);
  });

  it("requires explicit consent", () => {
    const result = leadInputSchema.safeParse({ ...validInput, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone numbers with a helpful message", () => {
    const result = leadInputSchema.safeParse({ ...validInput, phone: "12345678901" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/Kenyan mobile/);
  });

  it("rejects past dates", () => {
    const result = leadInputSchema.safeParse({ ...validInput, preferredDate: "2020-01-01" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const result = leadInputSchema.safeParse({ ...validInput, website: "http://spam" });
    expect(result.success).toBe(false);
  });
});

describe("leadToFhirBundle", () => {
  const now = new Date("2026-10-04T09:00:00Z");

  it("maps an appointment request to Patient + proposed Appointment", () => {
    const lead = buildLead(leadInputSchema.parse(validInput), { id: "lead-1", now, policyVersion: "v1" });
    const bundle = leadToFhirBundle(lead);

    expect(bundle.type).toBe("transaction");
    expect(bundle.identifier.value).toBe("lead-1");
    expect(bundle.entry).toHaveLength(2);

    const [patient, appointment] = bundle.entry.map((e) => e.resource);
    expect(patient.resourceType).toBe("Patient");
    expect(appointment).toMatchObject({
      resourceType: "Appointment",
      status: "proposed",
      requestedPeriod: [{ start: "2999-01-15T08:00:00+03:00", end: "2999-01-15T12:00:00+03:00" }],
    });
    expect(appointment.resourceType === "Appointment" && appointment.serviceType?.[0].coding?.[0].code).toBe(
      "antenatal-care",
    );
  });

  it("maps other leads to a front-desk Task", () => {
    const lead = buildLead(leadInputSchema.parse({ ...validInput, type: "sha-help", service: undefined }), {
      id: "lead-2",
      now,
      policyVersion: "v1",
    });
    const task = leadToFhirBundle(lead).entry[1].resource;
    expect(task).toMatchObject({ resourceType: "Task", status: "requested", for: { reference: "urn:uuid:lead-2-patient" } });
  });
});

describe("webhook signing", () => {
  it("round-trips and rejects tampering or stale timestamps", async () => {
    const body = JSON.stringify({ hello: "hmis" });
    const header = await signWebhook("s3cret", body, 1_000_000);

    await expect(verifyWebhook("s3cret", body, header, { now: 1_000_010 })).resolves.toBe(true);
    await expect(verifyWebhook("s3cret", body + " ", header, { now: 1_000_010 })).resolves.toBe(false);
    await expect(verifyWebhook("wrong", body, header, { now: 1_000_010 })).resolves.toBe(false);
    await expect(verifyWebhook("s3cret", body, header, { now: 1_000_000 + 3600 })).resolves.toBe(false);
    await expect(verifyWebhook("s3cret", body, null)).resolves.toBe(false);
  });
});
