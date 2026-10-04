import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { getAllLegalDocs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

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
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/legal/${d.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line hover:ring-brand-300"
              >
                <h2 className="font-display text-xl font-semibold text-ink">{d.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
