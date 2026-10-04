import { z } from "zod";
import { normalizeKenyanPhone } from "./phone";
import { SERVICE_CODES } from "./services";

/**
 * A "lead" is any patient-initiated contact captured by the public site.
 * Every lead is forwarded to the HMIS, where front-desk staff convert it into a
 * registered patient + appointment, or close it.
 */
export const LEAD_TYPES = [
  "appointment",
  "callback",
  "enquiry",
  "sha-help",
  "maternity-tour",
] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export const CONTACT_CHANNELS = ["whatsapp", "call", "sms"] as const;
export const TIME_WINDOWS = ["morning", "afternoon", "evening", "any"] as const;

const kenyanPhone = z
  .string()
  .trim()
  .min(9, "Enter your phone number")
  .transform((value, ctx) => {
    const normalized = normalizeKenyanPhone(value);
    if (!normalized) {
      ctx.addIssue({ code: "custom", message: "Enter a valid Kenyan mobile number, e.g. 0712 345 678" });
      return z.NEVER;
    }
    return normalized;
  });

/** Today's date in Kenya (EAT, UTC+3) as YYYY-MM-DD */
export function kenyaToday(now: Date = new Date()): string {
  return new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/** What the browser submits. Kept deliberately small: data minimisation (DPA 2019 s.25). */
export const leadInputSchema = z.object({
  type: z.enum(LEAD_TYPES),
  fullName: z.string().trim().min(2, "Enter your name").max(120),
  phone: kenyanPhone,
  email: z
    .union([z.literal(""), z.email("Enter a valid email address")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  service: z.enum(SERVICE_CODES).optional(),
  preferredDate: z
    .union([z.literal(""), z.iso.date()])
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || v >= kenyaToday(), "Choose today or a future date"),
  preferredTime: z.enum(TIME_WINDOWS).optional(),
  preferredChannel: z.enum(CONTACT_CHANNELS).default("whatsapp"),
  /** Free text. The form asks patients not to share detailed medical history here. */
  message: z.string().trim().max(1000).optional(),
  /** Explicit, specific consent to be contacted about this request (DPA 2019 s.30, s.32). */
  consent: z.literal(true, { error: "Please agree so we can contact you about your request" }),
  /** Separate, optional opt-in for health tips & reminders (DPA 2019 s.37 direct marketing). */
  marketingOptIn: z.boolean().default(false),
  /** Honeypot: real users never fill this */
  website: z.string().max(0).optional(),
  attribution: z
    .object({
      landingPage: z.string().max(500).optional(),
      referrer: z.string().max(500).optional(),
      utmSource: z.string().max(100).optional(),
      utmMedium: z.string().max(100).optional(),
      utmCampaign: z.string().max(100).optional(),
      utmTerm: z.string().max(100).optional(),
      utmContent: z.string().max(100).optional(),
      gclid: z.string().max(200).optional(),
      fbclid: z.string().max(200).optional(),
    })
    .partial()
    .default({}),
});

export type LeadInput = z.input<typeof leadInputSchema>;
export type ParsedLeadInput = z.output<typeof leadInputSchema>;

export const LEAD_SCHEMA_VERSION = "2026-10-01";

/** The envelope delivered to the HMIS. */
export interface Lead {
  schemaVersion: typeof LEAD_SCHEMA_VERSION;
  id: string;
  createdAt: string;
  source: "website";
  type: LeadType;
  contact: {
    fullName: string;
    phone: string;
    email?: string;
    preferredChannel: (typeof CONTACT_CHANNELS)[number];
  };
  request: {
    service?: (typeof SERVICE_CODES)[number];
    preferredDate?: string;
    preferredTime?: (typeof TIME_WINDOWS)[number];
    message?: string;
  };
  consent: {
    contactAboutRequest: true;
    marketingOptIn: boolean;
    capturedAt: string;
    policyVersion: string;
  };
  attribution: ParsedLeadInput["attribution"];
}

export function buildLead(
  input: ParsedLeadInput,
  opts: { id: string; now?: Date; policyVersion: string },
): Lead {
  const createdAt = (opts.now ?? new Date()).toISOString();
  return {
    schemaVersion: LEAD_SCHEMA_VERSION,
    id: opts.id,
    createdAt,
    source: "website",
    type: input.type,
    contact: {
      fullName: input.fullName,
      phone: input.phone,
      email: input.email,
      preferredChannel: input.preferredChannel,
    },
    request: {
      service: input.service,
      preferredDate: input.preferredDate,
      preferredTime: input.preferredTime,
      message: input.message || undefined,
    },
    consent: {
      contactAboutRequest: true,
      marketingOptIn: input.marketingOptIn,
      capturedAt: createdAt,
      policyVersion: opts.policyVersion,
    },
    attribution: input.attribution,
  };
}
