import type { ServiceCode } from "@primegala/contracts";
import { keywordsFor, type KeywordGroup } from "./keywords";
import type { PhotoName } from "@/components/Photo";

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
  | "Bandage"
  | "Scissors"
  | "Toothbrush"
  | "Venus"
  | "ClipboardPlus"
  | "PersonStanding"
  | "BriefcaseMedical";

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
  /**
   * "How to prepare": 3-5 practical, general items (what to bring, how to get ready).
   * Keep them safe and generic; never promise anything specific to Primegala here.
   */
  prepare: string[];
  sha: string;
  faqs: { q: string; a: string }[];
  keywordGroups: KeywordGroup[];
  related: string[];
  featured?: boolean;
  /**
   * Shown instead of "Open 24 hours, walk-ins welcome" for services that run as
   * booked clinics on set days.
   */
  hoursNote?: string;
  /** Real photos of this service at Primegala, shown on the service page. */
  photos?: { name: PhotoName; caption: string }[];
  /**
   * Announced but not yet open. The page says so plainly, takes "notify me" requests
   * instead of bookings, and the card carries a soft pink accent.
   */
  comingSoon?: boolean;
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
      { title: "Arrive or book", body: "Walk in any time, or book ahead online so we can prepare for you." },
      { title: "Triage & registration", body: "A nurse checks your vital signs. Bring your ID and SHA details." },
      { title: "See a clinician", body: "We listen, examine and explain what we find in plain language." },
      { title: "Tests & medicine", body: "The lab and pharmacy are on site, so there's no running around town." },
    ],
    prepare: [
      "Bring your national ID (or your child's birth certificate) and the phone registered with SHA.",
      "Note when your symptoms started, what makes them better or worse, and any temperatures you have taken.",
      "Bring the medicines you are taking, or their packets, including herbal remedies.",
      "Bring any previous test results, prescriptions or discharge notes.",
      "For a child's visit, bring the Mother & Child Health booklet.",
    ],
    sha: "Outpatient consultations for registered SHA members are covered under the Primary Healthcare Fund at Level 2 and 3 facilities. Our front desk confirms your eligibility using your ID number.",
    faqs: [
      {
        q: "Do I need an appointment to see a clinician at Primegala?",
        a: "No. Walk-ins are welcome 24 hours a day. Booking ahead online helps us prepare for your visit.",
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
    related: [
      "your-first-visit-to-primegala",
      "malaria-or-typhoid-how-to-tell",
      "stress-and-sleep",
      "cervical-cancer-screening-hpv",
    ],
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
    prepare: [
      "In a life-threatening emergency, call 999 or 112. Don't delay to gather documents.",
      "If you can, bring the patient's ID, SHA details and any medicines they take.",
      "Bring someone who knows what happened and can stay with the patient.",
      "For a suspected poisoning or overdose, bring the container or packet with you.",
      "For heavy bleeding, press firmly on the wound with a clean cloth on the way in.",
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
    related: [
      "when-to-seek-urgent-care",
      "your-first-visit-to-primegala",
      "asthma-attack-first-aid",
      "dog-bites-rabies",
    ],
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
    prepare: [
      "Pack your maternity bag by 36 weeks: ID, SHA details, Mother & Child Health booklet, pads, lessos and baby clothes.",
      "Confirm your SHA registration (dial *147#) well before your due date.",
      "Arrange day and night transport, and save the numbers of two people you can call.",
      "Choose a birth companion and agree who will care for your other children.",
      "Know the danger signs (bleeding, severe headache, waters breaking early, baby moving less) and come in at once if they happen.",
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
        a: "Our midwives monitor labour closely. If you need a caesarean section or specialist care, we stabilise you and arrange transfer to a higher-level hospital, with your notes.",
      },
    ],
    keywordGroups: ["maternity", "local"],
    related: [
      "antenatal-care-8-visits",
      "pregnancy-danger-signs",
      "delivery-under-sha-level-3",
      "postnatal-care-6-week-check",
    ],
    featured: true,
  },
  {
    code: "antenatal-care",
    photos: [{ name: "mchDoor", caption: "Look for the ANC/MCH/F.P door: antenatal, child health and family planning." }],
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
    prepare: [
      "Come as soon as you know you are pregnant, ideally before 12 weeks.",
      "Bring your national ID and the phone registered with SHA.",
      "Bring your Mother & Child Health booklet if you have one, plus any scan or test results.",
      "Note the first day of your last menstrual period, if you know it.",
      "Bring your partner if you wish: birth planning and joint HIV testing are easier together.",
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
    related: ["antenatal-care-8-visits", "pregnancy-danger-signs", "delivery-under-sha-level-3"],
  },
  {
    code: "family-planning",
    photos: [{ name: "mchDoor", caption: "Look for the ANC/MCH/F.P door: antenatal, child health and family planning." }],
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
      { title: "Follow-up", body: "With your consent, we can remind you when your next dose or review is due." },
    ],
    prepare: [
      "Think about how long you want to delay or avoid pregnancy; it helps narrow the options.",
      "Note the first day of your last period and whether you could be pregnant.",
      "Bring a list of medicines you take and any health conditions, such as high blood pressure or migraines.",
      "For a removal, bring any card or record from when the implant or coil was fitted.",
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
    photos: [{ name: "mchDoor", caption: "Look for the ANC/MCH/F.P door: antenatal, child health and family planning." }],
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
      { title: "Next date", body: "We write the next date in the booklet and, with your consent, send a reminder." },
    ],
    prepare: [
      "Bring your child's Mother & Child Health booklet: it shows which vaccines are due.",
      "Bring your national ID and your child's birth certificate or birth notification, if you have it.",
      "Dress your child in loose clothes that are easy to remove for weighing and vaccination.",
      "For a sick child, note when the illness started, any temperatures taken and any medicines given.",
      "Bring a feed, water and a spare nappy for the wait.",
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
    related: ["kenya-immunisation-schedule", "when-to-seek-urgent-care", "child-fever-at-night"],
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
    prepare: [
      "No fasting or special preparation is needed for a rapid HIV test.",
      "If you think you were exposed to HIV in the last 72 hours, come in straight away for PEP, at any hour.",
      "You can come alone, or with a partner for couples testing.",
      "Bring a list of any medicines you take.",
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
    photos: [
      { name: "labBench", caption: "Microscope, centrifuge, shaker and incubator on our lab bench." },
      { name: "labAnalyser", caption: "Our automated blood-count analyser for full blood counts." },
      { name: "labMicroscope", caption: "Microscopy for malaria and other tests, on site." },
      { name: "labAnalysers", caption: "Analysers for blood chemistry and rapid tests." },
    ],
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
    prepare: [
      "Ask your clinician whether your test needs fasting. Some blood sugar tests do, usually for about 8 hours (water is fine).",
      "For urine or stool samples, use only the clean container the lab gives you.",
      "Bring the request form if another facility asked for the test.",
      "Tell us about any medicines you take, as some can affect results.",
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
    related: ["malaria-or-typhoid-how-to-tell", "cough-tb-testing", "brucellosis-milk-fever", "utis-in-women"],
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
    prepare: [
      "Bring your prescription, or your clinic card for repeat medicines.",
      "Bring the medicines you already take, or their packets, so we can check for interactions.",
      "Tell us about any allergies, and whether you are pregnant or breastfeeding.",
      "Ask how to store each medicine and what to do if you miss a dose.",
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
    photos: [
      { name: "pharmacyStock", caption: "Antibiotics, syrups and antacids, each on its own labelled shelf." },
      { name: "pharmacyCounter", caption: "Children's medicines and cough remedies within easy reach of the counter." },
      { name: "pharmacyShelves", caption: "Our pharmacy store at Maili Sita." },
      { name: "pharmacyDoor", caption: "Follow the green 'Pharmacy' sign after your consultation." },
    ],
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
      body: "Being admitted far from home is hard on patients and harder on families, who spend money and time travelling. Our ward means recovery happens close to home, near the people who matter.",
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
    prepare: [
      "Bring the patient's national ID, SHA details and the phone registered with SHA.",
      "Pack nightwear, a change of clothes, toiletries, a towel and slippers.",
      "Bring all current medicines in their packets, plus any recent results or referral notes.",
      "Agree on one family contact we can update, and keep their number handy.",
      "Leave jewellery and large amounts of cash at home.",
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
        a: "Ask our front desk for current visiting hours. Our patient and visitor guide explains what to bring for a stay and how visitors can help prevent infections on the ward.",
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
      "Diabetes and hypertension care at Primegala Medical Centre, Maili Sita: blood pressure and sugar checks, medication reviews, nutrition advice and review reminders.",
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
      "Reminders for reviews and refills, with your consent",
    ],
    steps: [
      { title: "Screen", body: "A quick blood pressure and sugar check at any visit." },
      { title: "Plan", body: "Agree on targets, medicine and lifestyle changes." },
      { title: "Review", body: "Regular reviews to adjust treatment." },
      { title: "Stay on track", body: "Reminders so you never run out of medicine." },
    ],
    prepare: [
      "Bring all your current medicines, or their packets, to every review.",
      "Bring your clinic card, any home blood pressure or sugar readings and recent results.",
      "If you have been asked to fast for a blood sugar test, ask your clinician how to take your diabetes medicine that morning.",
      "Write down any symptoms or side effects you've noticed since your last visit.",
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
    related: ["managing-high-blood-pressure", "diabetes-early-signs", "medical-checkups-by-age"],
  },
  {
    code: "minor-procedures",
    slug: "minor-procedures",
    name: "Minor Surgery & Wound Care",
    icon: "Bandage",
    summary: "Minor surgery, stitches, dressings, abscess drainage and other quick procedures.",
    metaTitle: "Minor Surgery & Wound Care | Maili Sita, Nakuru",
    metaDescription:
      "Minor surgery, wound dressing, stitching and abscess drainage at Primegala Medical Centre, Maili Sita, Nakuru. Clean, careful care, 24 hours a day.",
    intro:
      "Cuts, burns and boils heal best when they're cleaned and treated properly from the start. Our team handles minor procedures in a clean, calm setting, at any hour.",
    story: {
      heading: "Small wounds, handled properly",
      body: "A cut from the shamba or a burn from the jiko can become infected if it isn't cleaned well. We clean, close and dress wounds properly, check your tetanus protection and tell you exactly what to watch for at home.",
    },
    offers: [
      "Minor surgical procedures under local anaesthetic",
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
    prepare: [
      "Keep the wound covered with a clean cloth or dressing on the way in.",
      "For bleeding, press firmly on the wound and raise it if you can.",
      "For a burn, cool it under cool running water for 20 minutes. Don't apply butter, toothpaste or oil.",
      "Bring your tetanus vaccination record if you have one.",
      "Wear loose clothing that is easy to move away from the wound.",
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
    related: ["when-to-seek-urgent-care", "dog-bites-rabies"],
  },
  {
    code: "obstetrics-gynaecology",
    hoursNote: "Booked clinics: call or ask reception for clinic days",
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    icon: "Venus",
    summary: "Women's health from puberty to menopause: pregnancy care, gynae checks and screening.",
    metaTitle: "Obstetrics & Gynaecology Clinic, Maili Sita Nakuru",
    metaDescription:
      "Obstetrics and gynaecology at Primegala Medical Center, Maili Sita, Nakuru: pregnancy care, period problems, cervical cancer screening, fertility questions and menopause care. SHA accepted.",
    intro:
      "Women's health deserves unhurried, private care. Our obstetrics and gynaecology clinic sees women and girls for pregnancy, period problems, screening, fertility questions and menopause, close to home.",
    story: {
      heading: "The questions that are hard to ask",
      body: "Heavy periods, pain, a missed period or a lump you're worried about are easy to put off talking about. Here you can ask in private, in English or Kiswahili, and get a clear plan, whether that's a test, treatment or a referral.",
    },
    offers: [
      "Pregnancy reviews alongside our antenatal clinic",
      "Period problems: heavy, painful or irregular periods",
      "Cervical cancer screening",
      "Pelvic infections and vaginal discharge",
      "Fertility questions and preconception advice",
      "Menopause care",
    ],
    steps: [
      { title: "Book or walk in", body: "Book a visit or ask at reception for the next clinic." },
      { title: "Private consultation", body: "We listen, examine with your consent and explain what we find." },
      { title: "Tests if needed", body: "Laboratory tests on site, with referral for scans when needed." },
      { title: "Your plan", body: "Treatment, follow-up or referral, explained clearly." },
    ],
    prepare: [
      "Note the date of your last period and how long your cycles usually are.",
      "Bring your Mother & Child Health booklet if you are pregnant.",
      "Bring any previous test results, scans or prescriptions.",
      "You are welcome to bring a female relative or friend, or ask for a female chaperone.",
    ],
    sha: "Gynaecology and pregnancy care are covered according to SHA benefit rules. We confirm what is covered, and any cost, before treatment.",
    faqs: [
      {
        q: "Do I need a referral to see the gynaecology clinic?",
        a: "No. You can book or walk in. Our clinicians may also refer you to the clinic after an outpatient visit.",
      },
      {
        q: "Can I get a cervical cancer screening at Primegala?",
        a: "Yes. Ask for screening at reception or during your visit. It takes a few minutes and is done in private.",
      },
      {
        q: "Can I ask for a female chaperone?",
        a: "Yes. You can always ask for a chaperone during an examination.",
      },
    ],
    keywordGroups: ["gynae", "maternity"],
    related: ["cervical-cancer-screening-hpv", "period-pain-when-to-worry", "utis-in-women"],
    photos: [{ name: "mchDoor", caption: "Our ANC, MCH and family planning room, where pregnancy reviews take place." }],
  },
  {
    code: "gp-clinic",
    hoursNote: "Booked clinics: call or ask reception for clinic days",
    slug: "gp-clinic",
    name: "General Practitioner Clinic",
    icon: "ClipboardPlus",
    summary: "See a doctor for a full review, ongoing problems, check-ups and medical reports.",
    metaTitle: "GP Clinic: See a Doctor at Maili Sita, Nakuru",
    metaDescription:
      "General practitioner clinic at Primegala Medical Center, Maili Sita, Nakuru: doctor consultations, check-ups, medical reports and referrals, with lab and pharmacy on site. SHA accepted.",
    intro:
      "Sometimes you want time with a doctor to look at the whole picture. Our general practitioner clinic is for full reviews, problems that keep coming back, check-ups and medical reports.",
    story: {
      heading: "One doctor who sees the whole picture",
      body: "A cough, tiredness and poor sleep can look like three problems, or one. A general practitioner reviews your history, your medicines and your test results together, then agrees a plan with you.",
    },
    offers: [
      "Doctor consultations for adults and children",
      "Full medical check-ups",
      "Review of problems that keep coming back",
      "Medical reports and fitness certificates",
      "Referral letters to specialists and hospitals",
    ],
    steps: [
      { title: "Book or ask at reception", body: "Book ahead online, or ask at reception for the next GP slot." },
      { title: "Triage", body: "A nurse checks your vital signs before you see the doctor." },
      { title: "Consultation", body: "The doctor reviews your history, examines you and explains the findings." },
      { title: "Plan", body: "Tests, treatment, follow-up or referral, agreed with you." },
    ],
    prepare: [
      "Write down your symptoms, when they started and what makes them better or worse.",
      "Bring all the medicines you take, or their packets.",
      "Bring previous test results, discharge summaries or referral letters.",
      "For a medical report, bring the form and your national ID.",
    ],
    sha: "GP consultations are covered according to SHA benefit rules. We confirm what is covered, and any cost, before treatment.",
    faqs: [
      {
        q: "What is the difference between the GP clinic and outpatient?",
        a: "Outpatient is for walk-in care at any hour. The GP clinic is for a fuller review with a doctor, check-ups, medical reports and long-running problems.",
      },
      {
        q: "Can I get a medical report or fitness certificate?",
        a: "Yes. Bring the form and your national ID. The doctor examines you before completing it.",
      },
      {
        q: "Do I need an appointment?",
        a: "Booking ahead helps us plan, but you can also ask at reception for the next available slot.",
      },
    ],
    keywordGroups: ["gp", "core"],
    related: ["medical-checkups-by-age", "know-your-numbers", "your-first-visit-to-primegala"],
  },
  {
    code: "physiotherapy",
    hoursNote: "Booked clinics: call or ask reception for clinic days",
    slug: "physiotherapy",
    name: "Physiotherapy",
    icon: "PersonStanding",
    summary: "Exercise and hands-on treatment to ease pain and help you move again.",
    metaTitle: "Physiotherapy at Maili Sita, Nakuru",
    metaDescription:
      "Physiotherapy at Primegala Medical Center, Maili Sita, Nakuru: back and neck pain, joint problems, recovery after injury or surgery, and rehabilitation after a stroke.",
    intro:
      "Pain and stiffness can make work, farming and daily life hard. Our physiotherapy service uses guided exercise and hands-on treatment to ease pain and help you move with confidence again.",
    story: {
      heading: "Getting back to the shamba",
      body: "Back pain after lifting, a stiff knee or weakness after an illness can stop you working for weeks. Physiotherapy gives you a plan of exercises and treatment, and shows you how to keep improving at home.",
    },
    offers: [
      "Back, neck and shoulder pain",
      "Joint pain and stiffness",
      "Recovery after injuries and fractures",
      "Rehabilitation after surgery",
      "Rehabilitation after a stroke",
      "Home exercise programmes",
    ],
    steps: [
      { title: "Assessment", body: "We ask about your pain and check how you move." },
      { title: "Plan", body: "Together we set goals and agree a treatment plan." },
      { title: "Treatment", body: "Guided exercise and hands-on treatment during your sessions." },
      { title: "At home", body: "Exercises to continue at home, and review sessions to track progress." },
    ],
    prepare: [
      "Wear loose, comfortable clothing you can move in.",
      "Bring any X-rays, scan reports or discharge summaries.",
      "Bring a list of the medicines you take.",
      "Note which movements or activities make the pain worse.",
    ],
    sha: "We confirm what SHA covers for physiotherapy, and any cost, before your first session.",
    faqs: [
      {
        q: "Do I need a referral for physiotherapy?",
        a: "Not always. You can book directly, and our clinicians can also refer you after a consultation.",
      },
      {
        q: "How many sessions will I need?",
        a: "It depends on the problem. Your physiotherapist will suggest a plan after your first assessment.",
      },
      {
        q: "Does physiotherapy help after a stroke?",
        a: "Yes. Rehabilitation can help with movement, balance and daily activities. Starting early helps.",
      },
    ],
    keywordGroups: ["physio"],
    related: ["medical-checkups-by-age", "stress-and-sleep"],
  },
  {
    code: "specialist-clinics",
    hoursNote: "Booked clinics: call or ask reception for clinic days",
    slug: "specialist-clinics",
    name: "Specialist Clinics",
    icon: "BriefcaseMedical",
    summary: "Booked clinics with specialists, so you can see one without the trip to town.",
    metaTitle: "Specialist Clinics at Maili Sita, Nakuru",
    metaDescription:
      "Specialist clinics at Primegala Medical Center, Maili Sita, Nakuru: booked appointments with specialists, with referral from our clinicians and follow-up close to home.",
    intro:
      "Seeing a specialist often means a long trip and a long wait. Primegala runs specialist clinics at Maili Sita, so you can see a specialist close to home and keep your follow-up here.",
    story: {
      heading: "Specialist care, closer to home",
      body: "When your clinician thinks you need a specialist's opinion, we book you into a specialist clinic here when we can, so your records, tests and follow-up stay in one place.",
    },
    offers: [
      "Booked appointments with specialists",
      "Referral from our clinicians",
      "Tests before your appointment, on site",
      "Follow-up with your Primegala clinician",
      "Referral to a hospital when you need one",
    ],
    steps: [
      { title: "Referral or booking", body: "Our clinician refers you, or you ask reception about upcoming clinics." },
      { title: "Tests", body: "Any tests the specialist needs can be done here beforehand." },
      { title: "Specialist visit", body: "The specialist reviews you and agrees a plan with you." },
      { title: "Follow-up", body: "Your Primegala clinician helps you follow the plan." },
    ],
    prepare: [
      "Bring your referral letter, if you have one.",
      "Bring previous test results, scans and discharge summaries.",
      "Bring all the medicines you take.",
      "Write down the questions you want to ask the specialist.",
    ],
    sha: "Specialist consultations are covered according to SHA benefit rules. We confirm what is covered, and any cost, before your appointment.",
    faqs: [
      {
        q: "Which specialists come to Primegala?",
        a: "Specialist clinics are held on set days. Call or ask at reception which specialists are coming and when.",
      },
      {
        q: "Do I need a referral for a specialist clinic?",
        a: "A referral from our clinicians helps the specialist prepare, but you can also ask reception to book you.",
      },
      {
        q: "Can I have my tests done before the clinic?",
        a: "Yes. Our laboratory can do most routine tests beforehand, so results are ready for the specialist.",
      },
    ],
    keywordGroups: ["specialist"],
    related: ["managing-high-blood-pressure", "diabetes-early-signs"],
  },
  {
    code: "theatre",
    slug: "surgical-theatre",
    name: "Surgical Theatre",
    icon: "Scissors",
    comingSoon: true,
    summary: "Coming soon: an operating theatre for planned and urgent surgery, closer to home.",
    metaTitle: "Surgical Theatre at Maili Sita, Nakuru | Coming Soon",
    metaDescription:
      "Primegala Medical Center is opening a surgical theatre at Maili Sita on the Nakuru–Nyahururu Road, for planned and urgent operations closer to home. Register your interest.",
    intro:
      "Primegala is preparing an operating theatre at Maili Sita, so families along the Nakuru–Nyahururu Road can have planned and urgent operations closer to home. It is not open yet. Leave your details and we will tell you as soon as it is.",
    story: {
      heading: "Surgery without the long trip",
      body: "Today, an operation often means travelling to town, waiting, and arranging for family to visit far from home. A theatre at Maili Sita means the same team that knows you before an operation cares for you after it, a short ride from home.",
    },
    offers: [
      "Planned (elective) surgical procedures",
      "Urgent operations, with referral when a higher level of care is needed",
      "Safe anaesthesia with monitoring before, during and after surgery",
      "Pre-operative assessment and tests on site",
      "Recovery on our inpatient ward, with follow-up reviews",
    ],
    steps: [
      { title: "Consultation", body: "A clinician assesses you and explains whether surgery is the right option." },
      { title: "Preparation", body: "Tests, a pre-operative check and clear instructions for the day." },
      { title: "Your operation", body: "Surgery in the theatre, with anaesthesia and close monitoring." },
      { title: "Recovery", body: "Care on the ward, then a review date and home-care advice." },
    ],
    prepare: [
      "Bring any referral letter, previous test results and a list of the medicines you take.",
      "Follow the fasting instructions you are given before surgery: usually no food for several hours.",
      "Tell us about allergies, bleeding problems, pregnancy or past reactions to anaesthesia.",
      "Arrange for an adult to accompany you home after the procedure.",
    ],
    sha: "Once the theatre opens, eligible surgical procedures will be covered according to SHA benefit rules. We will confirm what is covered, and any cost, before your operation.",
    faqs: [
      {
        q: "Is the Primegala theatre open now?",
        a: "Not yet. It is coming soon. Leave your details and we will let you know when it opens. Until then, our clinicians refer patients who need surgery.",
      },
      {
        q: "What kind of operations will be done?",
        a: "Planned and urgent procedures suitable for the facility's level. When you need more specialised care, we refer you and help arrange it.",
      },
      {
        q: "Will SHA cover surgery at Primegala?",
        a: "Eligible procedures will be covered according to SHA benefit rules. We confirm cover and any costs with you before treatment.",
      },
    ],
    keywordGroups: ["theatre", "inpatient"],
    related: ["your-first-visit-to-primegala", "how-to-use-sha-at-primegala"],
  },
  {
    code: "dental-care",
    slug: "dental-care",
    name: "Dental Care",
    icon: "Toothbrush",
    comingSoon: true,
    summary: "Coming soon: check-ups, fillings, extractions and dental advice for the whole family.",
    metaTitle: "Dental Care at Maili Sita, Nakuru | Coming Soon",
    metaDescription:
      "Dental care is coming to Primegala Medical Center at Maili Sita, Nakuru: check-ups, cleaning, fillings, extractions and children's dental care. Register your interest.",
    intro:
      "Dental care is coming to Primegala at Maili Sita: check-ups, cleaning, fillings and extractions for adults and children, without the trip to town. It is not open yet. Leave your details and we will tell you when it is.",
    story: {
      heading: "A toothache shouldn't wait for a trip to town",
      body: "Many people put up with a painful tooth for weeks because the nearest dentist is far away. Small problems caught early are simpler to treat. A dental clinic at Maili Sita brings check-ups and treatment closer to home.",
    },
    offers: [
      "Dental check-ups and oral health advice",
      "Scaling and cleaning",
      "Fillings for cavities",
      "Tooth extractions",
      "Children's dental care",
    ],
    steps: [
      { title: "Examination", body: "A dental check of your teeth and gums." },
      { title: "Plan", body: "We explain what we found and the treatment options." },
      { title: "Treatment", body: "Cleaning, filling or extraction, with local anaesthetic where needed." },
      { title: "Aftercare", body: "Home-care advice and a review date if you need one." },
    ],
    prepare: [
      "Brush your teeth before your visit.",
      "Bring a list of the medicines you take, especially blood thinners.",
      "Tell us about allergies, heart conditions or pregnancy.",
      "For a child's first visit, tell them what to expect in simple, positive words.",
    ],
    sha: "Once dental services open, we will confirm what SHA covers, and any cost, before treatment.",
    faqs: [
      {
        q: "Is the dental clinic open now?",
        a: "Not yet. It is coming soon. Leave your details and we will let you know when it opens.",
      },
      {
        q: "What should I do about a toothache until then?",
        a: "Rinse with warm salty water and keep the area clean. Come in to the outpatient clinic if you have swelling of the face, fever or pain that stops you sleeping.",
      },
      {
        q: "Will children be seen?",
        a: "Yes. Children's dental care will be part of the service.",
      },
    ],
    keywordGroups: ["dental"],
    related: ["medical-checkups-by-age", "your-first-visit-to-primegala"],
  },
];

/** Services patients can use today (the rest are announced as coming soon). */
export const OPEN_SERVICES = SERVICE_PAGES.filter((s) => !s.comingSoon);

/** Options for booking-form service selects; coming-soon services take "notify me" requests. */
export function serviceOptions() {
  return SERVICE_PAGES.map((s) => ({ code: s.code, name: s.comingSoon ? `${s.name} (coming soon)` : s.name }));
}

export function getServiceBySlug
(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function serviceKeywords(service: ServiceContent) {
  return keywordsFor(...service.keywordGroups);
}
