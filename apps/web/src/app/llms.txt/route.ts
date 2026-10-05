import { SERVICE_PAGES } from "@/content/services";
import { GENERAL_FAQS } from "@/content/faqs";
import { AREAS_SERVED } from "@/content/areas";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl, fullAddress, hasPhone, hasWhatsApp, phoneDisplay, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt (https://llmstxt.org): a plain-language map of the site for AI
 * assistants, so answers about Primegala quote verified facts and link to the
 * right page.
 */
export function GET() {
  const articles = getAllArticles();
  // Only list contact channels that are really set up on the live site.
  const contactLines = [
    `- Email: ${site.contact.email}`,
    ...(hasPhone ? [`- Phone: ${phoneDisplay()}`] : []),
    ...(hasWhatsApp ? [`- WhatsApp: https://wa.me/${site.contact.whatsapp}`] : []),
    "- In person: front desk open 24 hours",
  ].join("\n");

  const body = `# ${site.name}

> ${site.description}

## Key facts
- Name: ${site.name} (also "Primegala", "Primegala Maili Sita")
- Type: KEPH Level ${site.kephLevel} medical centre, registered on the Kenya Master Health Facility Registry
- Opened: 1 March 2022
- Hours: Open 24 hours, 7 days a week, including public holidays
- Address: ${fullAddress()}
- Landmark: Directly opposite Kiamaina Primary School, Maili Sita Centre
- Distance: About 6 miles (10 km) from Nakuru town on the Nakuru–Nyahururu Road (B5)
- SHA (Social Health Authority): ${site.shaContracted ? "Accepted for eligible services" : "Ask the front desk"}
- Payments: ${site.payments.join(", ")}. For private insurance, ask the front desk which schemes are currently accepted.
- Languages: English, Kiswahili
- Areas served: ${AREAS_SERVED.map((a) => a.name).join(", ")}
- Booking: ${absoluteUrl("/book")} (walk-ins welcome 24 hours)
- Emergencies: call 999 or 112 (Kenya national emergency numbers), or come straight in

## Contact
${contactLines}

## Services
${SERVICE_PAGES.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`).join("\n")}

## Main pages
- [Patient & visitor guide](${absoluteUrl("/patients-and-visitors")}): what to bring, the front desk and SHA check, triage, admission, visiting, discharge, records and feedback
- [Payments & insurance](${absoluteUrl("/payments-and-insurance")}): SHA, M-Pesa and cash, costs explained before treatment, receipts, emergency treatment as a right
- [Emergency care](${absoluteUrl("/emergency")}): when to call 999 or 112, warning signs for adults, children and pregnancy, what happens on arrival
- [SHA at Primegala](${absoluteUrl("/sha")}): how to use SHA, the three SHA funds, registration on *147#
- [Kiswahili](${absoluteUrl("/kiswahili")}): taarifa kuhusu Primegala kwa Kiswahili
- [Contact & directions](${absoluteUrl("/contact")})
- [Areas we serve](${absoluteUrl("/areas-we-serve")})
- [Our story](${absoluteUrl("/about")})
- [Our care team](${absoluteUrl("/team")})
- [FAQs](${absoluteUrl("/faq")})

## Health Hub
${articles.map((a) => `- [${a.title}](${absoluteUrl(`/health-hub/${a.slug}`)}): ${a.description}`).join("\n")}

## Frequently asked questions
${GENERAL_FAQS.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Policies
- [Privacy Policy](${absoluteUrl("/legal/privacy-policy")})
- [Terms of Use](${absoluteUrl("/legal/terms-of-use")})
- [Patient Rights](${absoluteUrl("/legal/patient-rights")})
- [Feedback & Complaints](${absoluteUrl("/legal/complaints")})
- [Medical Disclaimer](${absoluteUrl("/legal/medical-disclaimer")})
- [Editorial Policy](${absoluteUrl("/legal/editorial-policy")})

## Optional
- [Full content for AI assistants](${absoluteUrl("/llms-full.txt")})
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
