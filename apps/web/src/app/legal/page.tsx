import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { InfoPanel } from "@/components/PageSections";
import { getAllLegalDocs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { emailHref, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Policies & Legal Information",
  description:
    "Privacy policy, terms of use, cookie policy, patient rights, complaints procedure, accessibility, editorial and communications policies for Primegala Medical Centre.",
  path: "/legal",
});

export default function LegalIndexPage() {
  const docs = getAllLegalDocs();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Policies", path: "/legal" }]}
        eyebrow="Policies"
        title="Policies & legal information"
        intro="How we protect your data, your rights as a patient, and the standards we hold ourselves to, written in line with Kenyan law."
      />
      <Section>
        <h2 className="sr-only">All policies</h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/legal/${d.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                  <FileText className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg leading-snug font-bold text-ink">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  Read policy <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <InfoPanel icon={Mail} className="mt-10 max-w-3xl" title="Questions about our policies?">
          <p>
            Email <a href={emailHref("Question about a Primegala policy")} className="break-all">{site.contact.email}</a>{" "}
            or ask at our front desk, which is open 24 hours. Our policies were last updated on {site.policiesUpdated}.
          </p>
        </InfoPanel>
      </Section>
    </>
  );
}
