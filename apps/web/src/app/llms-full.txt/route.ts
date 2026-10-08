import { SERVICE_PAGES } from "@/content/services";
import { EMERGENCY_FAQS, GENERAL_FAQS, PAYMENT_FAQS, SWAHILI_FAQS, VISITOR_FAQS, type Faq } from "@/content/faqs";
import { getAllArticles, getArticleMarkdown } from "@/lib/content";
import { PHONES, absoluteUrl, fullAddress, hasPhone, site } from "@/lib/site";

export const dynamic = "force-static";

const qa = (faqs: Faq[]) => faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

export function GET() {
  const services = SERVICE_PAGES.map(
    (s) => `## ${s.name}
URL: ${absoluteUrl(`/services/${s.slug}`)}

${s.intro}

What we offer:
${s.offers.map((o) => `- ${o}`).join("\n")}

What to expect:
${s.steps.map((step, i) => `${i + 1}. ${step.title}: ${step.body}`).join("\n")}

How to prepare:
${s.prepare.map((p) => `- ${p}`).join("\n")}

SHA: ${s.sha}

${qa(s.faqs)}`,
  ).join("\n\n---\n\n");

  const guides = `## Patient & visitor guide
URL: ${absoluteUrl("/patients-and-visitors")}

Walk in at any hour or book ahead. Bring your national ID (or a child's birth certificate), the phone registered with SHA, previous records, a list of medicines and the Mother & Child Health booklet for pregnancy and child visits. At the front desk your SHA eligibility is checked and any cost is explained before treatment. A nurse sees every patient at triage, and the sickest patients are always seen first. The laboratory and pharmacy are on site. For admission, bring ID, SHA details, current medicines, nightwear, toiletries and one family contact. Ask the front desk for current visiting hours. Medical records can be requested at the front desk or by email to ${site.contact.email}, with ID.

${qa(VISITOR_FAQS)}

---

## Payments & insurance
URL: ${absoluteUrl("/payments-and-insurance")}

Primegala accepts ${site.payments.join(", ")}. SHA is checked with your national ID, and a one-time code may be sent to the phone registered with SHA; register on *147#. SHA pays through three funds: the Primary Healthcare Fund (PHCF), the Social Health Insurance Fund (SHIF) and the Emergency, Chronic and Critical Illness Fund (ECCIF). For private insurance, ask the front desk which schemes are currently accepted. What is covered and any cost are explained before treatment, and a receipt is given for every payment. Under Article 43(2) of the Constitution of Kenya, no one may be denied emergency medical treatment.

${qa(PAYMENT_FAQS)}

---

## Emergency care
URL: ${absoluteUrl("/emergency")}

In a life-threatening emergency, call 999 or 112. Primegala is open 24 hours: for urgent problems, come straight in without an appointment. As a KEPH Level 3 facility, Primegala assesses, treats and stabilises patients, and arranges referral to a higher-level hospital with notes when needed. Warning signs include difficulty breathing, chest pain, heavy bleeding, seizures, confusion, signs of dehydration, a child who cannot drink or is very sleepy, and in pregnancy bleeding, severe headache or reduced baby movements.

${qa(EMERGENCY_FAQS)}

---

## Kiswahili
URL: ${absoluteUrl("/kiswahili")}

Primegala Medical Centre iko Maili Sita, kando ya barabara ya Nakuru–Nyahururu, mkabala na Shule ya Msingi Kiamaina. Tuko wazi saa 24 kila siku. Tunakubali SHA kwa huduma zinazostahiki, M-Pesa na pesa taslimu. Kwa dharura, piga 999 au 112.

${qa(SWAHILI_FAQS)}`;

  const articles = getAllArticles()
    .map((a) => `## ${a.title}\nURL: ${absoluteUrl(`/health-hub/${a.slug}`)}\nPublished: ${a.published}\n\n${getArticleMarkdown(a.slug)}`)
    .join("\n\n---\n\n");

  const body = `# ${site.name}: full site content

${site.description}

Address: ${fullAddress()}. Open 24 hours.
Email: ${site.contact.email}${hasPhone ? `. Phone: ${PHONES.map((p) => p.label).join(" or ")}` : ""}. Emergencies: call 999 or 112.

# Frequently asked questions

${qa(GENERAL_FAQS)}

# Services

${services}

# Patients, payments, emergencies and Kiswahili

${guides}

# Health Hub

${articles}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
