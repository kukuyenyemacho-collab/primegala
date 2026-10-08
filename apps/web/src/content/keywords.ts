/**
 * Nakuru search-intent keyword map.
 *
 * Built from how people in Nakuru North actually look for care: "near me" and
 * "open now" searches on phones, place names along the Nakuru–Nyahururu Road,
 * service + town combinations, SHA/NHIF questions, Swahili phrasing and full
 * questions typed into Google or asked to AI assistants.
 *
 * Each page pulls the groups relevant to it, and the copy on that page answers
 * those searches in plain language (keywords stuffed into meta tags alone do not
 * rank). The full map, with target pages, lives in docs/05-seo-geo-playbook.md.
 */

export const AREAS = [
  "Maili Sita",
  "Kabatini",
  "Kiamaina",
  "Bahati",
  "Lanet",
  "Umoja",
  "Dundori",
  "Maili Kumi",
  "Nakuru North",
  "Nakuru Town",
] as const;

export const KEYWORDS = {
  core: [
    "hospital in Nakuru",
    "hospitals in Nakuru",
    "private hospital Nakuru",
    "medical centre Nakuru",
    "clinic in Nakuru",
    "hospital near me",
    "clinic near me",
    "medical centre near me",
    "24 hour hospital Nakuru",
    "24 hour clinic Nakuru",
    "hospital open now near me",
    "affordable hospital Nakuru",
    "doctor near me Nakuru",
    "level 3 hospital Nakuru",
  ],
  local: [
    "hospital Maili Sita",
    "clinic Maili Sita",
    "Primegala Medical Centre Maili Sita",
    "hospital along Nakuru Nyahururu road",
    "hospital near Kiamaina Primary School",
    "hospital Kabatini",
    "hospital Kiamaina",
    "hospital in Bahati Nakuru",
    "clinic in Bahati",
    "hospital near Lanet",
    "hospital Dundori",
    "hospital Maili Kumi",
    "hospital Nakuru North sub county",
    "medical centre Bahati constituency",
  ],
  maternity: [
    "maternity hospital Nakuru",
    "maternity near me",
    "maternity in Bahati",
    "where to deliver in Nakuru",
    "delivery cost Nakuru private hospital",
    "free delivery SHA Nakuru",
    "antenatal clinic Nakuru",
    "ANC clinic near me",
    "pregnancy check up Nakuru",
    "postnatal clinic Nakuru",
  ],
  familyPlanning: [
    "family planning clinic Nakuru",
    "family planning near me",
    "implant family planning Nakuru",
    "coil IUCD insertion Nakuru",
    "depo injection near me",
    "implant removal Nakuru",
    "emergency contraceptive Nakuru",
  ],
  hiv: [
    "HIV testing Nakuru",
    "VCT near me",
    "free HIV test Nakuru",
    "PEP Nakuru",
    "PrEP Nakuru",
    "confidential HIV testing near me",
  ],
  lab: [
    "laboratory Nakuru",
    "lab tests near me",
    "blood test Nakuru",
    "malaria test near me",
    "typhoid test Nakuru",
    "pregnancy test near me",
    "blood sugar test Nakuru",
    "full blood count Nakuru",
  ],
  child: [
    "child clinic Nakuru",
    "baby clinic near me",
    "immunisation clinic Nakuru",
    "paediatric clinic Nakuru",
    "child vaccination schedule Kenya",
  ],
  chronic: [
    "diabetes clinic Nakuru",
    "hypertension clinic Nakuru",
    "blood pressure check near me",
    "sugar check near me",
  ],
  emergency: [
    "emergency clinic Nakuru",
    "24 hour emergency near me",
    "night clinic Nakuru",
    "urgent care Nakuru",
  ],
  pharmacy: ["pharmacy near me open 24 hours", "chemist Maili Sita", "24 hour pharmacy Nakuru"],
  inpatient: ["admission hospital Nakuru", "inpatient hospital Bahati", "hospital with beds near me"],
  theatre: [
    "hospital with theatre Nakuru",
    "surgery hospital Nakuru",
    "caesarean section hospital Nakuru",
    "minor surgery Bahati",
    "operation hospital near me",
  ],
  gynae: [
    "gynaecologist Nakuru",
    "obstetrician Nakuru",
    "gynae clinic near me",
    "women's health clinic Nakuru",
    "pap smear Nakuru",
  ],
  gp: ["GP near me Nakuru", "general practitioner Nakuru", "doctor consultation Nakuru", "medical check up Nakuru"],
  physio: [
    "physiotherapy Nakuru",
    "physiotherapist near me",
    "physio Bahati",
    "back pain treatment Nakuru",
    "stroke rehabilitation Nakuru",
  ],
  specialist: ["specialist clinic Nakuru", "specialist doctor Nakuru", "see a specialist near me Nakuru"],
  dental: [
    "dentist Nakuru",
    "dentist near me",
    "dental clinic Nakuru",
    "dentist Bahati",
    "tooth extraction Nakuru",
    "daktari wa meno Nakuru",
  ],
  sha: [
    "SHA hospitals in Nakuru",
    "hospitals that accept SHA in Nakuru",
    "SHA accredited hospitals Nakuru",
    "SHA approved clinic near me",
    "SHA primary health care facility Nakuru",
    "SHIF hospitals Nakuru",
    "NHIF hospitals Nakuru",
    "how to use SHA at hospital",
    "SHA registration help Nakuru",
  ],
  swahili: [
    "hospitali Nakuru",
    "hospitali karibu na mimi",
    "hospitali ya saa 24 Nakuru",
    "kliniki ya wajawazito Nakuru",
    "kupima ukimwi bure Nakuru",
    "daktari karibu Maili Sita",
    "kujifungua bure SHA",
  ],
  questions: [
    "which hospital near Bahati is open 24 hours",
    "where can I deliver using SHA in Nakuru",
    "is there a hospital at Maili Sita",
    "which hospitals accept SHA along Nakuru Nyahururu road",
    "where can I get an implant removed in Nakuru",
    "where can I test for malaria at night in Nakuru",
    "how far is Maili Sita from Nakuru town",
  ],
} as const;

export type KeywordGroup = keyof typeof KEYWORDS;

export function keywordsFor(...groups: KeywordGroup[]): string[] {
  return [...new Set(groups.flatMap((g) => KEYWORDS[g]))];
}
