import { site } from "@/lib/site";

export interface Faq {
  q: string;
  a: string;
}

/**
 * Written as the exact questions people type into Google or ask AI assistants,
 * each answered in the first sentence (GEO: answer-first).
 */
export const GENERAL_FAQS: Faq[] = [
  {
    q: "Where is Primegala Medical Centre located?",
    a: "Primegala Medical Centre is at Maili Sita Centre on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School, in Kabatini Ward, Nakuru North (Bahati) Sub-County, Nakuru County. It is about six miles (roughly 10 km) from Nakuru town.",
  },
  {
    q: "Is Primegala open 24 hours?",
    a: "Yes. Primegala Medical Centre is open 24 hours a day, 7 days a week, including weekends and public holidays.",
  },
  {
    q: "Does Primegala accept SHA?",
    a: site.shaContracted
      ? "Yes. Primegala accepts the Social Health Authority (SHA) for eligible services. Bring your national ID so our front desk can confirm your eligibility. Primary care visits are covered under the Primary Healthcare Fund."
      : "Our front desk can explain how SHA applies to your visit. Bring your national ID so we can check your status.",
  },
  {
    q: "What services does Primegala Medical Centre offer?",
    a: "Primegala offers general outpatient care, 24-hour urgent care, maternity and antenatal care, family planning including long-acting methods, child health and immunisation, HIV testing and counselling, laboratory tests, pharmacy, inpatient admission, diabetes and hypertension follow-up, and minor procedures.",
  },
  {
    q: "What level of facility is Primegala?",
    a: "Primegala Medical Centre is a KEPH Level 3 medical centre registered on the Kenya Master Health Facility Registry, established in March 2022.",
  },
  {
    q: "How do I book an appointment at Primegala?",
    a: "You can book online on our website, send us a WhatsApp message, or simply walk in. Walk-ins are welcome at any hour.",
  },
  {
    q: "How do I get to Primegala from Nakuru town?",
    a: "Take the Nakuru–Nyahururu Road (B5) north from Nakuru town towards Bahati. At Maili Sita Centre, about 10 km from town, look for Kiamaina Primary School: Primegala is directly opposite. Matatus heading towards Bahati, Kiamaina and Nyahururu pass the door.",
  },
  {
    q: "What payment methods does Primegala accept?",
    a: `Primegala accepts ${site.payments.join(", ")}. Ask our front desk about private insurance.`,
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring your national ID or birth certificate (for children), your SHA details, any previous medical records or prescriptions, and your Mother & Child Health booklet for pregnancy and child visits.",
  },
  {
    q: "Is my medical information kept private?",
    a: "Yes. Primegala keeps patient information confidential in line with the Health Act, 2017, the Data Protection Act, 2019 and the Digital Health Act, 2023. Read our Privacy Policy for details.",
  },
];

export const SWAHILI_SUMMARY = {
  heading: "Karibu Primegala",
  body: "Tuko wazi saa 24, kila siku, Maili Sita kando ya barabara ya Nakuru–Nyahururu, mkabala na Shule ya Msingi Kiamaina. Tunatoa huduma za matibabu ya kawaida, kliniki ya wajawazito, kujifungua, uzazi wa mpango, kupima VVU, maabara, dawa na kulazwa. Tunakubali SHA.",
};
