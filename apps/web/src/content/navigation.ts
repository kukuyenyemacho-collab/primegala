/**
 * Site navigation: one source for the header mega menus, the mobile menu, the
 * footer and the search index. Every href here must resolve to a real page.
 */

export interface NavLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  /** "services" and "hub" panels are generated from content; others list `items`. */
  panel: "services" | "hub" | "links" | "none";
  intro?: string;
  items?: NavLink[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Services",
    href: "/services",
    panel: "services",
    intro: "Sixteen services under one roof at Maili Sita, open 24 hours. Theatre and dental care coming soon.",
  },
  {
    label: "Patients & Visitors",
    href: "/patients-and-visitors",
    panel: "links",
    intro: "Everything you need before, during and after your visit.",
    items: [
      { href: "/book", label: "Book a visit", description: "Request an appointment or a call back" },
      { href: "/sha", label: "SHA at Primegala", description: "Registration, cover and what to bring" },
      { href: "/payments-and-insurance", label: "Payments & insurance", description: "SHA, M-Pesa, cash and insurers" },
      { href: "/patients-and-visitors", label: "Patient & visitor guide", description: "Your visit, admission and visiting" },
      { href: "/emergency", label: "Emergency care", description: "What to do and when to come in" },
      { href: "/areas-we-serve", label: "Areas we serve", description: "Directions from across Nakuru North" },
      { href: "/legal/patient-rights", label: "Patient rights", description: "Your rights and responsibilities" },
      { href: "/legal/complaints", label: "Feedback & complaints", description: "Tell us how we did" },
      { href: "/faq", label: "FAQs", description: "Answers to common questions" },
    ],
  },
  {
    label: "Health Hub",
    href: "/health-hub",
    panel: "hub",
    intro: "Clear, practical health guides written for families in Nakuru.",
  },
  {
    label: "About",
    href: "/about",
    panel: "links",
    intro: "A 24-hour medical centre serving Maili Sita since 2022.",
    items: [
      { href: "/about", label: "Our story", description: "Why we opened at Maili Sita" },
      { href: "/team", label: "Our care team", description: "The people behind your care" },
      { href: "/kiswahili", label: "Kiswahili", description: "Taarifa kwa Kiswahili" },
      { href: "/contact", label: "Contact & directions", description: "Opposite Kiamaina Primary School" },
    ],
  },
  { label: "Contact", href: "/contact", panel: "none" },
];

/** Routes that the pages workstream must create (kept here so links never 404). */
export const NEW_PAGES = ["/patients-and-visitors", "/payments-and-insurance", "/emergency", "/kiswahili"] as const;
