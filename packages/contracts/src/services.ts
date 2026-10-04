/**
 * Service catalogue shared by the public site (service pages, booking form) and the
 * HMIS (appointment types, queues, billing). Codes are stable identifiers: never
 * rename a code once the HMIS has records against it; add a new one instead.
 *
 * `listedOnKmhfr` marks services published on the Kenya Master Health Facility
 * Registry for Primegala Medical Centre. Everything else must be confirmed with the
 * facility before launch (see docs/03-client-discovery-questionnaire.md).
 */
export const SERVICE_CODES = [
  "general-outpatient",
  "emergency-24hr",
  "maternity",
  "antenatal-care",
  "family-planning",
  "child-health",
  "hiv-testing",
  "laboratory",
  "pharmacy",
  "inpatient",
  "chronic-care",
  "minor-procedures",
] as const;

export type ServiceCode = (typeof SERVICE_CODES)[number];

export interface ServiceDefinition {
  code: ServiceCode;
  name: string;
  /** Matches the KMHFR listing for the facility */
  listedOnKmhfr: boolean;
  /** Which SHA fund typically pays, for patient guidance only (tariffs change) */
  shaFund?: "PHCF" | "SHIF" | "ECCIF";
}

export const SERVICES: readonly ServiceDefinition[] = [
  { code: "general-outpatient", name: "General Outpatient (OPD)", listedOnKmhfr: true, shaFund: "PHCF" },
  { code: "emergency-24hr", name: "24-Hour Urgent Care", listedOnKmhfr: false, shaFund: "ECCIF" },
  { code: "maternity", name: "Maternity & Delivery", listedOnKmhfr: false, shaFund: "PHCF" },
  { code: "antenatal-care", name: "Antenatal Care (ANC)", listedOnKmhfr: true, shaFund: "PHCF" },
  { code: "family-planning", name: "Family Planning", listedOnKmhfr: true, shaFund: "PHCF" },
  { code: "child-health", name: "Child Health & Immunisation", listedOnKmhfr: false, shaFund: "PHCF" },
  { code: "hiv-testing", name: "HIV Testing & Counselling", listedOnKmhfr: true, shaFund: "PHCF" },
  { code: "laboratory", name: "Laboratory Services", listedOnKmhfr: false, shaFund: "PHCF" },
  { code: "pharmacy", name: "Pharmacy", listedOnKmhfr: false },
  { code: "inpatient", name: "Inpatient Care", listedOnKmhfr: true, shaFund: "SHIF" },
  { code: "chronic-care", name: "Diabetes & Hypertension Clinic", listedOnKmhfr: false, shaFund: "PHCF" },
  { code: "minor-procedures", name: "Minor Procedures & Wound Care", listedOnKmhfr: false },
];

export function getService(code: ServiceCode): ServiceDefinition {
  const service = SERVICES.find((s) => s.code === code);
  if (!service) throw new Error(`Unknown service code: ${code}`);
  return service;
}
