import type { ServiceCode } from "@primegala/contracts";
import { keywordsFor, type KeywordGroup } from "./keywords";

export type IconName =
  | "Stethoscope"
  | "Siren"
  | "Baby"
  | "HeartPulse"
  | "CalendarHeart"
  | "Syringe"
  | "Ribbon"
  | "FlaskConical"
  | "Pill"
  | "BedDouble"
  | "Activity"
  | "Bandage";

export interface ServiceContent {
  code: ServiceCode;
  slug: string;
  name: string;
  icon: IconName;
  /** One line for cards */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  /** Hero paragraph */
  intro: string;
  /** Storytelling paragraph: a real-life moment this service exists for */
  story: { heading: string; body: string };
  offers: string[];
  steps: { title: string; body: string }[];
  sha: string;
  faqs: { q: string; a: string }[];
  keywordGroups: KeywordGroup[];
  related: string[];
  featured?: boolean;
}

export const SERVICE_PAGES: ServiceContent[] = [
  {
    code: "general-outpatient",
    slug: "general-outpatient",
    name: "General Outpatient",
    icon: "Stethoscope",
    summary: "Walk in any time for coughs, fevers, aches, infections and check-ups.",
    metaTitle: "Walk-in Outpatient Clinic, Maili Sita Nakuru | Open 24/7",
    metaDescription:
      "Walk-in outpatient care 24 hours a day at Primegala Medical Centre, Maili Sita on the Nakuru–Nyahururu Road. Consultations, treatment, lab and pharmacy under one roof. SHA accepted.",
    intro:
      "Most health worries don't need a trip to town. Our outpatient clinic sees adults and children for everyday illnesses and check-ups, day and night, with the lab and pharmacy a few steps away.",
    story: {
      heading: "From “I'll wait and see” to “I'm glad I came”",
      body: "Most people walk in after days of hoping a cough or fever will clear on its own. We'd rather you didn't wait. A quick consultation, a test if it's needed and the right treatment usually take one visit, and you leave knowing what's going on.",
    },
    offers: [
      "Consultations for adults and children",
      "Treatment of fevers, malaria, typhoid, chest, ear, throat, urinary and skin infections",
      "Blood pressure, blood sugar, weight and BMI checks",
      "Referrals and follow-up plans",
      "Medical reports and sick notes after a consultation",
    ],
    steps: [
      { title: "Arrive or book", body: "Walk in any time, or book ahead on WhatsApp to be seen sooner." },
      { title: "Triage & registration", body: "A nurse checks your vital signs. Bring your ID and SHA details." },
      { title: "See a clinician", body: "We listen, examine and explain what we find in plain language." },
      { title: "Tests & medicine", body: "The lab and pharmacy are on site, so there's no running around town." },
    ],
    sha: "Outpatient consultations for registered SHA members are covered under the Primary Healthcare Fund at Level 2 and 3 facilities. Our front desk confirms your eligibility using your ID number.",
    faqs: [
      {
        q: "Do I need an appointment to see a clinician at Primegala?",
        a: "No. Walk-ins are welcome 24 hours a day. Booking ahead on WhatsApp or online helps us prepare and can shorten your wait.",
      },
      {
        q: "Can I use SHA for an outpatient visit?",
        a: "Yes. Registered SHA members can use the Primary Healthcare Fund for outpatient care at Level 3 facilities like Primegala. Bring your national ID so we can check your status.",
      },
      {
        q: "Do you treat children at the outpatient clinic?",
        a: "Yes. We see babies, children and adults. Bring your child's Mother & Child Health booklet if you have one.",
      },
    ],
    keywordGroups: ["core", "local", "swahili"],
    related: ["your-first-visit-to-primegala", "malaria-or-typhoid-how-to-tell"],
    featured: true,
  },
  {
    code: "emergency-24hr",
    slug: "24-hour-urgent-care",
    name: "24-Hour Urgent Care",
    icon: "Siren",
    summary: "Open all night for sudden illness and injuries, with stabilisation and referral when needed.",
    metaTitle: "24-Hour Clinic in Nakuru North | Night Care at Maili Sita",
    metaDescription:
      "Primegala Medical Centre at Maili Sita is open 24 hours for urgent care: high fevers, injuries, breathing problems and pregnancy concerns. Stabilisation and referral on the Nakuru–Nyahururu Road.",
    intro:
      "Illness doesn't keep office hours. Our doors on the Nakuru–Nyahururu Road stay open through the night, so the closest help is minutes away. We assess urgent problems quickly and, when someone needs a higher-level hospital, we stabilise them first and arrange the referral.",
    story: {
      heading: "Maili Sita: six miles from town, minutes from us",
      body: "Maili Sita means “six miles” in Swahili, about how far the nearest big hospitals in town are. At 2 a.m., with matatus off the road, that's a long way. Primegala opened here so that families from Kabatini to Kiamaina have somewhere to go at night that's a short boda ride away.",
    },
    offers: [
      "Night-time assessment for high fever, vomiting, diarrhoea and dehydration",
      "Wound care, cuts and minor injuries",
      "Asthma and breathing difficulty first-line care",
      "Pregnancy warning signs, assessed any hour",
      "Stabilisation and referral coordination to higher-level hospitals",
    ],
    steps: [
      { title: "Come straight in", body: "No appointment needed. Tell the nurse at the door what's happening." },
      { title: "Rapid triage", body: "The most urgent cases are seen first, whatever time they arrive." },
      { title: "Treat or stabilise", body: "We treat what can be treated here and stabilise anything more serious." },
      { title: "Refer if needed", body: "We arrange onward transfer and send your notes with you." },
    ],
    sha: "Emergency care is covered by SHA's Emergency, Chronic and Critical Illness Fund (ECCIF). Under Article 43(2) of the Constitution of Kenya, no one may be denied emergency medical treatment.",
    faqs: [
      {
        q: "Is Primegala really open at night?",
        a: "Yes. Primegala Medical Centre is listed on the Kenya Master Health Facility Registry as open 24 hours, every day of the year, including public holidays.",
      },
      {
        q: "What should I do in a life-threatening emergency?",
        a: "Call 999 or 112 for an ambulance, or come straight to the nearest facility. For heavy bleeding, chest pain, unconsciousness or seizures, don't wait to book.",
      },
      {
        q: "What happens if I need a bigger hospital?",
        a: "We stabilise you, explain why you need referral, coordinate transport and send a referral note so the receiving hospital knows what has been done.",
      },
    ],
    keywordGroups: ["emergency", "core"],
    related: ["when-to-seek-urgent-care", "your-first-visit-to-primegala"],
    featured: true,
  },
  {
    code: "maternity",
    slug: "maternity",
    name: "Maternity & Delivery",
    icon: "Baby",
    summary: "Respectful, skilled care through labour, birth and the first days with your baby.",
    metaTitle: "Maternity in Bahati & Maili Sita, Nakuru | SHA Delivery",
    metaDescription:
      "Plan your delivery close to home at Primegala Medical Centre, Maili Sita, Nakuru. Skilled midwifery care 24/7, newborn care and postnatal follow-up. Ask us about delivery under SHA.",
    intro:
      "Bringing a baby into the world should feel safe and close to home, not like a race to town. Our midwives support you through labour, birth and the first hours with your newborn, with a plan for referral if a higher level of care is needed.",
    story: {
      heading: "A plan made early is a birth made calmer",
      body: "Many mothers we meet started labour without a plan: no bag packed, no transport arranged, no idea whether SHA would cover them. Planning together during antenatal visits changes that. By the time contractions start you know where you're going, who'll be there and what to bring.",
    },
    offers: [
      "24-hour skilled midwifery and labour monitoring",
      "Normal (vaginal) delivery",
      "Immediate newborn care, breastfeeding support and first immunisations",
      "Postnatal checks for mother and baby",
      "Birth preparedness planning and referral pathway for complications",
    ],
    steps: [
      { title: "Book a maternity visit", body: "Meet the team and see the ward before your due date." },
      { title: "Plan your birth", body: "We agree on transport, a birth companion and what to bring." },
      { title: "Labour & delivery", body: "Come in when labour starts. We monitor you and baby throughout." },
      { title: "Going home", body: "Postnatal checks, family planning counselling and baby's next visits." },
    ],
    sha: "Under current SHA rules, normal delivery at Level 2 and 3 facilities is paid for through the Primary Healthcare Fund for registered members. Register on SHA (dial *147#) early in pregnancy and ask our front desk to confirm your status before your due date.",
    faqs: [
      {
        q: "Can I deliver at Primegala using SHA?",
        a: "Registered SHA members can access delivery services at Level 3 facilities. Ask our front desk to check your SHA status during an antenatal visit, well before your due date.",
      },
      {
        q: "What should I pack for delivery?",
        a: "Your ID, SHA details, antenatal booklet, baby clothes and blankets, sanitary pads, a lesso or kanga, and a change of clothes. Our article on preparing for delivery has a full checklist.",
      },
      {
        q: "What if there is a complication during labour?",
        a: "Our midwives monitor labour closely. If you need a caesarean section or specialist care, we stabilise you and transfer you quickly to a higher-level hospital.",
      },
    ],
    keywordGroups: ["maternity", "local"],
    related: ["antenatal-care-8-visits", "pregnancy-danger-signs"],
    featured: true,
  },
  {
    code: "antenatal-care",
    slug: "antenatal-care",
    name: "Antenatal Care (ANC)",
    icon: "HeartPulse",
    summary: "Regular pregnancy check-ups, tests and counselling from your first trimester.",
    metaTitle: "Antenatal Clinic (ANC) in Nakuru North | Maili Sita",
    metaDescription:
      "Antenatal care at Primegala Medical Centre, Maili Sita: pregnancy check-ups, tests, nutrition advice and birth planning, following Kenya's 8-contact ANC guidelines. SHA accepted.",
    intro:
      "Healthy pregnancies are built visit by visit. Our antenatal clinic follows Kenya's recommended schedule of at least eight contacts, so problems are caught early and you're ready for the birth.",
    story: {
      heading: "Your first visit matters most",
      body: "The best time to start antenatal care is within the first 12 weeks. Early visits confirm how far along you are, check for anaemia, infections and blood pressure problems, and start the supplements your baby needs. Every visit after that builds on the first.",
    },
    offers: [
      "Pregnancy confirmation and dating",
      "Blood pressure, weight and baby's growth checks at every visit",
      "Routine ANC tests: haemoglobin, blood group, urine, HIV, syphilis and hepatitis B screening",
      "Iron and folic acid supplements, tetanus vaccination and nutrition counselling",
      "Birth preparedness and danger-sign education",
    ],
    steps: [
      { title: "Start early", body: "Come in as soon as you know you're pregnant, ideally before 12 weeks." },
      { title: "Get your booklet", body: "We record every visit in your Mother & Child Health booklet." },
      { title: "Regular contacts", body: "At least eight contacts, closer together as your due date nears." },
      { title: "Birth plan", body: "Together we agree where you'll deliver and how you'll get there." },
    ],
    sha: "Antenatal care is a Primary Healthcare Fund service for registered SHA members at Level 2 and 3 facilities.",
    faqs: [
      {
        q: "How many antenatal visits should I have?",
        a: "Kenya follows the WHO recommendation of at least eight antenatal contacts, starting in the first 12 weeks of pregnancy.",
      },
      {
        q: "What tests are done at the first ANC visit?",
        a: "Usually a haemoglobin (blood level) test, blood group, urine test, and screening for HIV, syphilis and hepatitis B, plus blood pressure and weight.",
      },
      {
        q: "Can my partner come to antenatal visits?",
        a: "Yes, partners are warmly welcome. Partner involvement improves birth planning and joint HIV testing is offered.",
      },
    ],
    keywordGroups: ["maternity"],
    related: ["antenatal-care-8-visits", "pregnancy-danger-signs"],
  },
  {
    code: "family-planning",
    slug: "family-planning",
    name: "Family Planning",
    icon: "CalendarHeart",
    summary: "Private counselling and your choice of short- and long-acting methods.",
    metaTitle: "Family Planning Clinic Nakuru | Implants, Coil, Depo",
    metaDescription:
      "Confidential family planning at Primegala Medical Centre, Maili Sita: counselling, implants, IUCD (coil), injectables, pills and removals. Long-acting methods available. SHA accepted.",
    intro:
      "The right method is the one that fits your life. We take time to explain your options, answer your questions privately and support whatever you choose, including removal when you're ready to conceive.",
    story: {
      heading: "No judgement, just good information",
      body: "Many women tell us they put off family planning because of myths they'd heard, or because they didn't want to be judged. Our counselling room is private and our job is simple: give you honest information so you can decide what's right for you.",
    },
    offers: [
      "One-on-one counselling for individuals and couples",
      "Implants (3- and 5-year options) insertion and removal",
      "Intrauterine device (IUCD / coil) insertion and removal",
      "Injectables, pills and condoms",
      "Emergency contraception and postpartum family planning",
    ],
    steps: [
      { title: "Talk privately", body: "A provider explains each method, how it works and possible side effects." },
      { title: "Choose", body: "You decide. We check that the method is safe for you." },
      { title: "Start the same day", body: "Most methods can be started at the same visit." },
      { title: "Follow-up", body: "We'll remind you on WhatsApp when your next dose or review is due." },
    ],
    sha: "Family planning services are part of primary healthcare for registered SHA members.",
    faqs: [
      {
        q: "Does Primegala offer long-acting family planning methods?",
        a: "Yes. Long-acting methods such as implants and the IUCD (coil) are listed services for Primegala on the Kenya Master Health Facility Registry.",
      },
      {
        q: "Can I have my implant removed at Primegala?",
        a: "Yes. Implant and coil removals are done by trained providers. Fertility usually returns quickly after removal.",
      },
      {
        q: "Is family planning counselling confidential?",
        a: "Yes. Consultations are private and your records are protected under the Data Protection Act, 2019.",
      },
    ],
    keywordGroups: ["familyPlanning"],
    related: ["family-planning-options-explained"],
  },
  {
    code: "child-health",
    slug: "child-health",
    name: "Child Health & Immunisation",
    icon: "Syringe",
    summary: "Vaccinations, growth monitoring and care for sick babies and children.",
    metaTitle: "Child Clinic & Immunisation | Maili Sita, Nakuru",
    metaDescription:
      "Baby and child clinic at Primegala Medical Centre, Maili Sita: immunisations on the Kenya schedule, growth monitoring, vitamin A, deworming and sick-child care, 24 hours a day.",
    intro:
      "From the first vaccines to the last growth check, we keep your child's health on track, and we're here at night when a little one is unwell.",
    story: {
      heading: "Every stamp in the booklet is a disease prevented",
      body: "The Mother & Child Health booklet is one of the most important documents your family owns. Each vaccine recorded in it protects your child from illnesses like measles, pneumonia and polio. We'll help you keep it up to date and remind you before each visit.",
    },
    offers: [
      "Routine immunisations following the Kenya Expanded Programme on Immunisation",
      "Growth and development monitoring",
      "Vitamin A supplementation and deworming",
      "Care for sick babies and children, day and night",
      "Nutrition and breastfeeding advice",
    ],
    steps: [
      { title: "Bring the booklet", body: "Your child's MCH booklet shows which vaccines are due." },
      { title: "Weigh & measure", body: "We track growth on the chart so problems are spotted early." },
      { title: "Vaccinate", body: "We explain each vaccine and what to expect afterwards." },
      { title: "Next date", body: "We give you the next visit date and a WhatsApp reminder." },
    ],
    sha: "Child health services and immunisations are primary healthcare services. Routine vaccines on the national schedule are provided free of charge.",
    faqs: [
      {
        q: "What vaccines does my baby need in Kenya?",
        a: "The national schedule starts at birth (BCG and polio), continues at 6, 10 and 14 weeks, then measles-rubella at 9 and 18 months. Our article on the Kenya immunisation schedule explains each step.",
      },
      {
        q: "My child has a fever at night. Can I come in?",
        a: "Yes. We are open 24 hours. Come in immediately if your child is very drowsy, can't drink, has a convulsion or is breathing fast.",
      },
      {
        q: "Are vaccines free?",
        a: "Vaccines on the Kenya national immunisation schedule are provided free in public programmes. Ask our team about any optional vaccines.",
      },
    ],
    keywordGroups: ["child"],
    related: ["kenya-immunisation-schedule", "when-to-seek-urgent-care"],
  },
  {
    code: "hiv-testing",
    slug: "hiv-testing-and-counselling",
    name: "HIV Testing & Counselling",
    icon: "Ribbon",
    summary: "Confidential testing with results in minutes, PEP and PrEP guidance.",
    metaTitle: "Confidential HIV Testing in Nakuru | VCT, PEP & PrEP",
    metaDescription:
      "Confidential HIV testing and counselling at Primegala Medical Centre, Maili Sita, Nakuru. Rapid results, PEP within 72 hours of exposure and PrEP guidance. Open 24 hours.",
    intro:
      "Knowing your status is one of the bravest and most caring things you can do for yourself and the people you love. Testing is confidential, quick and judgement-free.",
    story: {
      heading: "Twenty minutes that change everything",
      body: "Most people who walk into our counselling room are nervous. Most walk out relieved, either with a negative result and a plan to stay negative, or with a clear path to treatment that lets them live a long, healthy life. Either way, knowing is better than wondering.",
    },
    offers: [
      "Pre- and post-test counselling",
      "Rapid HIV testing with same-visit results",
      "Couples and family testing",
      "Post-exposure prophylaxis (PEP): start within 72 hours of exposure",
      "PrEP information and linkage to treatment and care",
    ],
    steps: [
      { title: "Private talk", body: "A counsellor explains the test and answers your questions." },
      { title: "Quick test", body: "A finger-prick test with results usually in about 20 minutes." },
      { title: "Your result", body: "We explain what it means and the next steps." },
      { title: "Ongoing support", body: "Linkage to prevention or treatment, with confidential follow-up." },
    ],
    sha: "HIV testing services are offered as part of primary healthcare and national HIV programmes.",
    faqs: [
      {
        q: "Is HIV testing at Primegala confidential?",
        a: "Yes. Your result is shared only with you. Health records are protected under the Health Act, 2017 and the Data Protection Act, 2019.",
      },
      {
        q: "What is PEP and how soon must I start it?",
        a: "PEP (post-exposure prophylaxis) is medicine taken after a possible HIV exposure. It must be started as soon as possible and within 72 hours. Come in at any hour.",
      },
      {
        q: "How long do HIV test results take?",
        a: "Rapid tests usually give results in about 20 minutes during the same visit.",
      },
    ],
    keywordGroups: ["hiv"],
    related: ["hiv-testing-what-to-expect"],
  },
  {
    code: "laboratory",
    slug: "laboratory",
    name: "Laboratory Services",
    icon: "FlaskConical",
    summary: "Common blood, urine and stool tests on site, with fast results.",
    metaTitle: "Lab Tests in Maili Sita, Nakuru | Malaria, Typhoid, Blood",
    metaDescription:
      "On-site laboratory at Primegala Medical Centre, Maili Sita: malaria, typhoid, full blood count, blood sugar, urine, pregnancy and HIV tests with fast results, 24 hours.",
    intro:
      "The right treatment starts with the right diagnosis. Our on-site laboratory runs the tests clinicians rely on every day, so most results are ready before you leave.",
    story: {
      heading: "Test, don't guess",
      body: "Fever in Kenya is often treated as malaria by default, but it might be typhoid, a urinary infection or something else entirely. A quick test means the right medicine the first time, and less money spent on treatments that were never going to work.",
    },
    offers: [
      "Malaria testing (rapid test and microscopy)",
      "Typhoid and stool tests",
      "Full blood count and haemoglobin",
      "Blood sugar and urine analysis",
      "Pregnancy, HIV, syphilis and other screening tests",
    ],
    steps: [
      { title: "Request", body: "Tests are ordered by a clinician, or ask us about walk-in tests." },
      { title: "Sample", body: "Quick, hygienic sample collection by a lab technologist." },
      { title: "Results", body: "Most routine results are ready the same visit." },
      { title: "Explained", body: "Your clinician explains your results and next steps." },
    ],
    sha: "Laboratory tests linked to a primary care consultation are covered for registered SHA members under the Primary Healthcare Fund.",
    faqs: [
      {
        q: "Can I do a malaria test at night in Nakuru North?",
        a: "Yes. Primegala is open 24 hours on the Nakuru–Nyahururu Road at Maili Sita, and malaria testing is available around the clock.",
      },
      {
        q: "Do I need a doctor's request for a lab test?",
        a: "Most tests are requested by a clinician after a consultation so results can be interpreted correctly. Ask our front desk about walk-in tests.",
      },
      {
        q: "How long do lab results take?",
        a: "Most routine tests such as malaria, blood sugar, haemoglobin and urine are ready within the same visit.",
      },
    ],
    keywordGroups: ["lab"],
    related: ["malaria-or-typhoid-how-to-tell"],
  },
  {
    code: "pharmacy",
    slug: "pharmacy",
    name: "Pharmacy",
    icon: "Pill",
    summary: "Prescriptions filled on site, with clear advice on how to take them.",
    metaTitle: "24-Hour Pharmacy at Maili Sita, Nakuru",
    metaDescription:
      "On-site pharmacy at Primegala Medical Centre, Maili Sita: prescriptions dispensed with clear instructions, open 24 hours along the Nakuru–Nyahururu Road.",
    intro:
      "Leave with the medicine you need and a clear understanding of how to take it. Our pharmacy is part of the clinic, so prescriptions are filled before you head home.",
    story: {
      heading: "The last step that makes treatment work",
      body: "Treatment only works if medicine is taken correctly. Our pharmaceutical team explains each dose in plain language, in English or Kiswahili, and checks for interactions with anything else you take.",
    },
    offers: [
      "Prescription dispensing",
      "Clear dosage counselling in English and Kiswahili",
      "Chronic medication refills",
      "Medicine interaction checks",
      "Advice on safe storage and disposal",
    ],
    steps: [
      { title: "Prescription", body: "Your clinician sends your prescription to the pharmacy." },
      { title: "Checked", body: "We check the dose, allergies and other medicines you take." },
      { title: "Explained", body: "We show you how and when to take each medicine." },
      { title: "Refill reminders", body: "For long-term medicines, we remind you before you run out." },
    ],
    sha: "Medicines prescribed during a covered visit are included according to SHA benefit rules.",
    faqs: [
      {
        q: "Is the Primegala pharmacy open at night?",
        a: "The pharmacy serves patients of the 24-hour clinic around the clock.",
      },
      {
        q: "Can I refill my blood pressure or diabetes medicine?",
        a: "Yes. Bring your current prescription or clinic card. A clinician reviews long-term prescriptions regularly.",
      },
      {
        q: "Do you explain medicines in Kiswahili?",
        a: "Yes. Our team explains doses in English or Kiswahili, whichever you prefer.",
      },
    ],
    keywordGroups: ["pharmacy"],
    related: ["managing-high-blood-pressure"],
  },
  {
    code: "inpatient",
    slug: "inpatient-care",
    name: "Inpatient Care",
    icon: "BedDouble",
    summary: "Admission and round-the-clock nursing when you need closer observation.",
    metaTitle: "Inpatient Admission in Nakuru North | Maili Sita",
    metaDescription:
      "Inpatient care at Primegala Medical Centre, Maili Sita, Nakuru: admission, 24-hour nursing, IV treatment and observation close to home. SHA inpatient cover accepted.",
    intro:
      "Some illnesses need more than a prescription. When you or a loved one needs closer observation, IV treatment or round-the-clock nursing, our inpatient ward keeps care close to home and family.",
    story: {
      heading: "Close enough for family to visit",
      body: "Being admitted far from home is hard on patients and harder on families, who spend money and time travelling. Our ward means recovery happens near the people who matter, with visiting that fits around school runs and work.",
    },
    offers: [
      "Short-stay and overnight admission",
      "24-hour nursing care and monitoring",
      "IV fluids and medication",
      "Management of severe malaria, dehydration and infections",
      "Discharge planning and follow-up",
    ],
    steps: [
      { title: "Assessment", body: "A clinician decides whether admission is the safest option." },
      { title: "Admission", body: "We explain the plan, expected stay and costs or SHA cover." },
      { title: "Care", body: "Regular reviews and 24-hour nursing until you are well enough." },
      { title: "Discharge", body: "Medicine, instructions and a follow-up date before you go home." },
    ],
    sha: "Inpatient care is covered under SHA's Social Health Insurance Fund (SHIF) for members with active contributions, according to SHA tariffs for Level 3 facilities.",
    faqs: [
      {
        q: "Does Primegala admit patients?",
        a: "Yes. Inpatient services are listed for Primegala Medical Centre on the Kenya Master Health Facility Registry.",
      },
      {
        q: "Can I use SHA for admission?",
        a: "SHA's SHIF covers inpatient care for members with active contributions. We check your eligibility at admission.",
      },
      {
        q: "What are the visiting hours?",
        a: "Ask our front desk for current visiting hours. We try to make visits easy for working families.",
      },
    ],
    keywordGroups: ["inpatient", "sha"],
    related: ["how-to-use-sha-at-primegala"],
  },
  {
    code: "chronic-care",
    slug: "diabetes-and-hypertension-clinic",
    name: "Diabetes & Hypertension Clinic",
    icon: "Activity",
    summary: "Regular checks, medication reviews and lifestyle support for long-term conditions.",
    metaTitle: "Diabetes & Blood Pressure Clinic | Maili Sita, Nakuru",
    metaDescription:
      "Diabetes and hypertension care at Primegala Medical Centre, Maili Sita: blood pressure and sugar checks, medication reviews, nutrition advice and WhatsApp reminders.",
    intro:
      "High blood pressure and diabetes are often silent until they cause serious harm. Regular checks close to home make it much easier to stay on track.",
    story: {
      heading: "The condition you can't feel is the one to check",
      body: "Many people with high blood pressure feel completely fine. That's what makes it dangerous. A five-minute check at every visit, and a simple plan you can follow, can prevent strokes, heart and kidney disease years down the line.",
    },
    offers: [
      "Blood pressure and blood sugar screening",
      "Medication start, review and refills",
      "Diet, exercise and weight counselling",
      "Kidney, eye and foot complication screening and referral",
      "WhatsApp reminders for reviews and refills",
    ],
    steps: [
      { title: "Screen", body: "A quick blood pressure and sugar check at any visit." },
      { title: "Plan", body: "Agree on targets, medicine and lifestyle changes." },
      { title: "Review", body: "Regular reviews to adjust treatment." },
      { title: "Stay on track", body: "Reminders so you never run out of medicine." },
    ],
    sha: "Chronic disease follow-up at primary care level is supported under SHA; specialised chronic care beyond SHIF limits may fall under ECCIF.",
    faqs: [
      {
        q: "How often should I check my blood pressure?",
        a: "Adults should have their blood pressure checked at least once a year, and more often if it has been high before or you have diabetes, kidney disease or a family history.",
      },
      {
        q: "What blood sugar level means diabetes?",
        a: "A fasting blood sugar of 7.0 mmol/L or higher on two occasions usually indicates diabetes. A clinician confirms the diagnosis with the right tests.",
      },
      {
        q: "Can I get my monthly medicine at Primegala?",
        a: "Yes. After a review we can provide refills and remind you before your next review is due.",
      },
    ],
    keywordGroups: ["chronic"],
    related: ["managing-high-blood-pressure", "diabetes-early-signs"],
  },
  {
    code: "minor-procedures",
    slug: "minor-procedures",
    name: "Minor Procedures & Wound Care",
    icon: "Bandage",
    summary: "Stitches, dressings, abscess drainage and other quick procedures.",
    metaTitle: "Wound Care & Minor Procedures | Maili Sita, Nakuru",
    metaDescription:
      "Wound dressing, stitching, abscess drainage and minor procedures at Primegala Medical Centre, Maili Sita, Nakuru. Clean, careful care, 24 hours a day.",
    intro:
      "Cuts, burns and boils heal best when they're cleaned and treated properly from the start. Our team handles minor procedures in a clean, calm setting, at any hour.",
    story: {
      heading: "Small wounds, handled properly",
      body: "A cut from the shamba or a burn from the jiko can become infected if it isn't cleaned well. We clean, close and dress wounds properly, check your tetanus protection and tell you exactly what to watch for at home.",
    },
    offers: [
      "Wound cleaning, stitching and dressing",
      "Burns care",
      "Incision and drainage of abscesses",
      "Removal of stitches",
      "Tetanus vaccination",
    ],
    steps: [
      { title: "Assess", body: "We check the wound and decide on the right treatment." },
      { title: "Treat", body: "Local anaesthetic where needed, then careful treatment." },
      { title: "Dress", body: "A clean dressing and clear home-care instructions." },
      { title: "Review", body: "A dressing change or stitch removal date." },
    ],
    sha: "Minor procedures are covered according to SHA benefit rules for the type of visit.",
    faqs: [
      {
        q: "Can I get stitches at night?",
        a: "Yes. Primegala is open 24 hours for wound care and stitching.",
      },
      {
        q: "Do I need a tetanus injection for a cut?",
        a: "If the wound is dirty or deep and you haven't had a tetanus booster in the last 5–10 years, you may need one. Our team will check.",
      },
      {
        q: "When should stitches be removed?",
        a: "Usually after 5–14 days depending on where the wound is. We'll give you a date.",
      },
    ],
    keywordGroups: ["emergency"],
    related: ["when-to-seek-urgent-care"],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function serviceKeywords(service: ServiceContent) {
  return keywordsFor(...service.keywordGroups);
}
