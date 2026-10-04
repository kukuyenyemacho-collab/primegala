import { formatKenyanPhone, normalizeKenyanPhone, toWhatsAppNumber } from "@primegala/contracts";

/**
 * Single source of truth for facility facts. Everything here appears in page copy,
 * JSON-LD, llms.txt and the footer, so a fact changed here changes everywhere.
 *
 * Facts marked CONFIRM come from public registries or are assumptions and must be
 * verified with the facility before launch (docs/03-client-discovery-questionnaire.md).
 */

const env = (key: string) => {
  const value = process.env[key]?.trim();
  return value ? value : null;
};

const phone = env("NEXT_PUBLIC_PHONE");
const whatsapp = env("NEXT_PUBLIC_WHATSAPP") ?? phone;
const lat = Number(env("NEXT_PUBLIC_GEO_LAT"));
const lng = Number(env("NEXT_PUBLIC_GEO_LNG"));

export const site = {
  /** Registered name on KMHFR. CONFIRM if the facility has been re-licensed as a hospital. */
  name: "Primegala Medical Centre",
  shortName: "Primegala",
  tagline: "Prime care, close to home.",
  description:
    "Primegala Medical Centre is a 24-hour, KEPH Level 3 medical centre at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School. Outpatient, maternity, antenatal, family planning, HIV testing, laboratory, pharmacy and inpatient care for families in Bahati, Kabatini, Kiamaina, Lanet and Dundori.",
  url: (env("NEXT_PUBLIC_SITE_URL") ?? "https://primegala.co.ke").replace(/\/$/, ""),
  locale: "en_KE",
  foundingDate: "2022-03-01",
  kephLevel: 3,
  open24h: true,
  /** CONFIRM: SHA contract status. Drives every "SHA accepted" claim on the site. */
  shaContracted: true,
  mflCode: env("NEXT_PUBLIC_MFL_CODE"),
  address: {
    street: "Nakuru–Nyahururu Road, Maili Sita Centre",
    landmark: "Opposite Kiamaina Primary School",
    locality: "Maili Sita",
    ward: "Kabatini Ward",
    subCounty: "Nakuru North (Bahati) Sub-County",
    region: "Nakuru County",
    country: "KE",
  },
  geo: Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0 ? { lat, lng } : null,
  mapsUrl:
    env("NEXT_PUBLIC_GOOGLE_MAPS_URL") ??
    "https://www.google.com/maps/search/?api=1&query=Primegala+Medical+Centre+Maili+Sita+Nakuru",
  contact: {
    phone: phone ? normalizeKenyanPhone(phone) : null,
    whatsapp: whatsapp ? toWhatsAppNumber(whatsapp) : null,
    email: env("NEXT_PUBLIC_EMAIL"),
    emergencyPhone: env("NEXT_PUBLIC_EMERGENCY_PHONE"),
  },
  social: {
    facebook: env("NEXT_PUBLIC_FACEBOOK_URL"),
    instagram: env("NEXT_PUBLIC_INSTAGRAM_URL"),
    tiktok: env("NEXT_PUBLIC_TIKTOK_URL"),
    x: env("NEXT_PUBLIC_X_URL"),
    youtube: env("NEXT_PUBLIC_YOUTUBE_URL"),
  },
  /** CONFIRM accepted private insurers at the meeting. */
  payments: ["SHA", "M-Pesa", "Cash"] as string[],
  insurers: [] as string[],
  /** Version stamp stored with every consent captured by forms. Bump when policies change. */
  policyVersion: "2026-10-04",
  policiesUpdated: "4 October 2026",
  credit: {
    name: "Steff Cloud",
    legalName: "Steff Cloud Limited",
    url: "https://steffcloud.co.ke",
  },
} as const;

export const NATIONAL_EMERGENCY_NUMBERS = [
  { label: "National emergency", number: "999" },
  { label: "Emergency (alt.)", number: "112" },
];

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function phoneDisplay(): string {
  return site.contact.phone ? formatKenyanPhone(site.contact.phone) : "07XX XXX XXX";
}

export function phoneHref(): string {
  return site.contact.phone ? `tel:${site.contact.phone}` : "/contact";
}

export function whatsappHref(message = "Hello Primegala, I would like to book an appointment."): string {
  return site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`
    : "/book";
}

export function fullAddress(): string {
  const a = site.address;
  const landmark = a.landmark.charAt(0).toLowerCase() + a.landmark.slice(1);
  return `${a.street}, ${landmark}, ${a.ward}, ${a.region}, Kenya`;
}
