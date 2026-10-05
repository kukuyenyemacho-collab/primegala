import { hasPhone, hasWhatsApp, phoneDisplay, site } from "@/lib/site";

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
    a: hasWhatsApp
      ? "You can book online on our website, send us a WhatsApp message, or simply walk in. Walk-ins are welcome at any hour."
      : "Use the booking form on our website and our team will contact you to confirm, or simply walk in. Walk-ins are welcome at any hour.",
  },
  {
    q: "How do I get to Primegala from Nakuru town?",
    a: "Take the Nakuru–Nyahururu Road (B5) north from Nakuru town towards Bahati. At Maili Sita Centre, about 10 km from town, look for Kiamaina Primary School: Primegala is directly opposite. Matatus heading towards Bahati, Kiamaina and Nyahururu pass the door.",
  },
  {
    q: "What payment methods does Primegala accept?",
    a: `Primegala accepts ${site.payments.join(", ")}. Ask our front desk which private insurance schemes we currently accept. We explain what is covered, and any cost to you, before treatment.`,
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring your national ID or birth certificate (for children), the phone registered with SHA, any previous medical records or prescriptions, a list of medicines you take, and your Mother & Child Health booklet for pregnancy and child visits.",
  },
  {
    q: "How can I contact Primegala Medical Centre?",
    a: `${hasPhone ? `Call ${phoneDisplay()}, email` : "Email"} ${site.contact.email}, book online, or come to the front desk at Maili Sita at any hour. For a life-threatening emergency, call 999 or 112.`,
  },
  {
    q: "Which languages are spoken at Primegala?",
    a: "Our team serves patients in English and Kiswahili.",
  },
  {
    q: "Is my medical information kept private?",
    a: "Yes. Primegala keeps patient information confidential in line with the Health Act, 2017, the Data Protection Act, 2019 and the Digital Health Act, 2023. Read our Privacy Policy for details.",
  },
];

export const SWAHILI_SUMMARY = {
  heading: "Karibu Primegala",
  body: "Tuko wazi saa 24, kila siku, Maili Sita kando ya barabara ya Nakuru–Nyahururu, mkabala na Shule ya Msingi Kiamaina. Tunatoa huduma za matibabu ya kawaida, kliniki ya wajawazito, kujifungua, uzazi wa mpango, kupima VVU, maabara, dawa na kulazwa. Tunakubali SHA kwa huduma zinazostahiki.",
};

/** Patient & visitor guide (/patients-and-visitors). */
export const VISITOR_FAQS: Faq[] = [
  {
    q: "What should I bring to Primegala Medical Centre?",
    a: "Bring your national ID (or your child's birth certificate), the phone number registered with SHA, any previous prescriptions, test results or discharge notes, a list of the medicines you take, and your Mother & Child Health booklet for pregnancy and child visits.",
  },
  {
    q: "Do I need an appointment?",
    a: "No. Primegala is open 24 hours and walk-ins are welcome at any time. Booking ahead online helps us prepare for your visit.",
  },
  {
    q: "Why was someone who arrived after me seen first?",
    a: "Patients are seen in order of medical need, not arrival time. A nurse assesses everyone at triage so that the sickest people are treated first. If you feel worse while waiting, tell the nurse straight away.",
  },
  {
    q: "What are the visiting hours at Primegala?",
    a: "Please ask our front desk for the current visiting hours. When you visit, clean your hands before and after, and stay away if you have a fever, cough, diarrhoea or vomiting.",
  },
  {
    q: "How do I get a copy of my medical records?",
    a: `Ask at our front desk or email ${site.contact.email}. We will confirm your identity before sharing records. A parent or guardian can request a child's records, and you can authorise someone else in writing to request yours.`,
  },
  {
    q: "Can I use SHA if I am admitted?",
    a: "Inpatient care is covered under SHA's Social Health Insurance Fund (SHIF) for members whose contributions are up to date. We check your eligibility at admission and explain what is covered, and any cost to you, before treatment.",
  },
];

/** Payments & insurance (/payments-and-insurance). */
export const PAYMENT_FAQS: Faq[] = [
  {
    q: "Does Primegala Medical Centre accept SHA?",
    a: site.shaContracted
      ? "Yes. Primegala accepts the Social Health Authority (SHA) for eligible services. Bring your national ID and the phone registered with SHA so our front desk can confirm your eligibility before treatment."
      : "Our front desk will explain how SHA applies to your visit. Bring your national ID and the phone registered with SHA.",
  },
  {
    q: "Can I pay with M-Pesa at Primegala?",
    a: "Yes. You can pay by M-Pesa or in cash at the front desk. Ask the front desk for our payment details and keep your M-Pesa confirmation message.",
  },
  {
    q: "Which insurance does Primegala accept?",
    a: "Primegala accepts SHA for eligible services. For private insurance, please ask our front desk which schemes we currently accept, and bring your insurance card and ID.",
  },
  {
    q: "Will I know the cost before I am treated?",
    a: "Yes. Before treatment we explain what SHA or your insurer covers and any cost to you. If your care plan changes, we explain again before going ahead.",
  },
  {
    q: "Can I be refused emergency treatment if I cannot pay?",
    a: "No. Under Article 43(2) of the Constitution of Kenya, no one may be denied emergency medical treatment. In an emergency we assess and stabilise first.",
  },
  {
    q: "Will I get a receipt?",
    a: "Yes. Ask for a receipt for every payment, and keep it with your M-Pesa confirmation message in case you need to make a claim or raise a query.",
  },
];

/** Emergency care (/emergency). */
export const EMERGENCY_FAQS: Faq[] = [
  {
    q: "Is Primegala open at night for emergencies?",
    a: "Yes. Primegala Medical Centre at Maili Sita is open 24 hours a day, every day, including public holidays. For urgent problems, come straight in: no appointment is needed.",
  },
  {
    q: "What number do I call for an ambulance in Kenya?",
    a: "Call 999 or 112 for emergency services in Kenya.",
  },
  {
    q: "Can a hospital refuse me emergency treatment if I can't pay?",
    a: "No. Article 43(2) of the Constitution of Kenya states that a person shall not be denied emergency medical treatment.",
  },
  {
    q: "What happens if I need a bigger hospital?",
    a: "Primegala is a KEPH Level 3 medical centre. If you need surgery, intensive care or specialist care, we stabilise you, explain why you need referral, help arrange onward transfer and send a referral note so the receiving hospital knows what has been done.",
  },
  {
    q: "Does SHA cover emergency care?",
    a: "SHA's Emergency, Chronic and Critical Illness Fund (ECCIF) supports emergency care for registered members. In an emergency we treat and stabilise first; eligibility can be checked afterwards.",
  },
];

/** Kiswahili page (/kiswahili). Maswali kwa Kiswahili. */
export const SWAHILI_FAQS: Faq[] = [
  {
    q: "Primegala Medical Centre iko wapi?",
    a: "Primegala Medical Centre iko Maili Sita, kando ya barabara ya Nakuru–Nyahururu, mkabala na Shule ya Msingi Kiamaina, katika Wadi ya Kabatini, Kaunti Ndogo ya Nakuru Kaskazini (Bahati), Kaunti ya Nakuru. Ni takriban kilomita 10 (maili sita) kutoka mjini Nakuru.",
  },
  {
    q: "Je, Primegala iko wazi saa 24?",
    a: "Ndiyo. Tuko wazi saa 24 kila siku, ikiwemo wikendi na sikukuu za umma. Huhitaji miadi: unaweza kufika moja kwa moja wakati wowote.",
  },
  {
    q: "Je, mnakubali SHA?",
    a: site.shaContracted
      ? "Ndiyo. Tunakubali SHA kwa huduma zinazostahiki. Leta kitambulisho chako cha taifa ili wahudumu wa mapokezi wakague ustahiki wako kabla ya matibabu."
      : "Wahudumu wetu wa mapokezi watakueleza jinsi SHA inavyotumika katika ziara yako. Leta kitambulisho chako cha taifa.",
  },
  {
    q: "Ninawezaje kujisajili na SHA?",
    a: "Piga *147# kwenye simu yoyote, chagua usajili kisha weka nambari ya kitambulisho chako. Ongeza mume au mke na watoto wako kama wategemezi. Ukikwama, wahudumu wetu wa mapokezi watakusaidia.",
  },
  {
    q: "Je, ninaweza kujifungua Primegala?",
    a: "Ndiyo. Wakunga wetu hutoa huduma za kujifungua kwa njia ya kawaida saa 24. Iwapo matatizo yatatokea, tunaimarisha hali yako na kukupa rufaa kwa hospitali ya ngazi ya juu. Jisajili na SHA mapema wakati wa ujauzito.",
  },
  {
    q: "Ninaweza kulipa vipi?",
    a: "Tunakubali SHA kwa huduma zinazostahiki, M-Pesa na pesa taslimu. Kwa bima ya kibinafsi, uliza wahudumu wa mapokezi ni bima zipi tunazokubali kwa sasa. Tunakueleza gharama yoyote kabla ya matibabu.",
  },
];
