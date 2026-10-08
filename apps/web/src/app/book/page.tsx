import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppIcon } from "@/components/Icon";
import { EmergencyNotice, StepList, VisitFacts } from "@/components/PageSections";
import { serviceOptions } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { hasWhatsApp, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment | Maili Sita, Nakuru",
  description:
    "Book a visit, request a call back, get SHA help or arrange a maternity visit at Primegala Medical Centre, Maili Sita. Our team contacts you to confirm. Walk-ins are welcome 24 hours a day.",
  path: "/book",
  keywords: ["book hospital appointment Nakuru", "book doctor Nakuru", "clinic appointment Maili Sita", "hospital near me"],
});

export default function BookPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Book a visit", path: "/book" }]}
        eyebrow="Appointments"
        title="Book a visit"
        intro="Tell us what you need and when suits you, and our team will contact you to confirm. Prefer to just come? Walk-ins are welcome at any hour, and you don't need an appointment."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <h2 className="sr-only">Your request</h2>
            <LeadForm services={serviceOptions()} whatsappHref={whatsappHref()} />
          </div>
          <aside className="min-w-0 space-y-5 lg:col-span-4" aria-label="Before you book">
            <EmergencyNotice title="Emergency? Don't book." as="h2">
              <p>
                Call{" "}
                <a href="tel:999" className="font-bold text-alert underline underline-offset-4">
                  999
                </a>{" "}
                or{" "}
                <a href="tel:112" className="font-bold text-alert underline underline-offset-4">
                  112
                </a>
                , or come straight to Primegala. We&apos;re open now.
              </p>
            </EmergencyNotice>

            <div>
              <h2 className="text-sm font-bold tracking-wider text-trust-800 uppercase">What happens next</h2>
              <StepList
                className="mt-3"
                steps={[
                  { title: "We contact you", body: "Our team gets in touch by your chosen channel to confirm a time." },
                  { title: "Come in", body: "Bring your ID, the phone registered with SHA and any previous records." },
                  { title: "We check your cover", body: "We explain what SHA covers and any cost before treatment." },
                ]}
              />
              <p className="mt-3 text-sm">
                <Link href="/patients-and-visitors#before-your-visit" className="link-brand inline-flex items-center gap-1">
                  What to bring <ArrowRight className="size-4" aria-hidden />
                </Link>
              </p>
            </div>

            {hasWhatsApp && (
              <div className="rounded-xl border border-line bg-white p-6">
                <h2 className="text-lg font-bold text-ink">Prefer WhatsApp?</h2>
                <p className="mt-2 text-muted">Send us a message and we&apos;ll book you in.</p>
                <a
                  href={whatsappHref()}
                  data-track="whatsapp_click_book"
                  target="_blank"
                  rel="noopener"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#0f7a40] bg-[#0f7a40] px-5 text-sm font-semibold text-white hover:border-[#0c6435] hover:bg-[#0c6435]"
                >
                  <WhatsAppIcon className="size-5" /> Chat on WhatsApp
                </a>
              </div>
            )}

            <VisitFacts title="Walk in any time" />
          </aside>
        </div>
      </Section>
    </>
  );
}
