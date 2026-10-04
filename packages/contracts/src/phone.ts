/**
 * Kenyan phone number helpers.
 *
 * Patients type numbers in every possible shape ("0712 345 678", "+254-712-345678",
 * "712345678", "254712345678"). The HMIS keys patients by E.164, so everything is
 * normalised here once and shared by the public site and the HMIS.
 */

const KENYAN_MOBILE = /^(?:7\d{8}|1\d{8})$/;

/**
 * Normalise a Kenyan mobile number (07xx / 01xx ranges) to E.164 (+2547XXXXXXXX).
 * Returns `null` when the input is not a valid Kenyan mobile number.
 */
export function normalizeKenyanPhone(input: string): string | null {
  const digits = input.replace(/[^\d+]/g, "");
  let national: string;

  if (digits.startsWith("+254")) national = digits.slice(4);
  else if (digits.startsWith("254")) national = digits.slice(3);
  else if (digits.startsWith("0")) national = digits.slice(1);
  else national = digits;

  if (national.includes("+")) return null;
  return KENYAN_MOBILE.test(national) ? `+254${national}` : null;
}

/** Format an E.164 Kenyan number for display: +254712345678 -> 0712 345 678 */
export function formatKenyanPhone(e164: string): string {
  const normalized = normalizeKenyanPhone(e164);
  if (!normalized) return e164;
  const n = `0${normalized.slice(4)}`;
  return `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`;
}

/** wa.me expects the international number without "+" */
export function toWhatsAppNumber(e164: string): string | null {
  const normalized = normalizeKenyanPhone(e164);
  return normalized ? normalized.slice(1) : null;
}
