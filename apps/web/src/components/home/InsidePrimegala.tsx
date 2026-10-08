import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { Section, SectionHeading } from "@/components/ui";

/** Real photos of the facility, so first-time visitors know what to expect when they walk in. */
export function InsidePrimegala() {
  return (
    <Section tone="surface" labelledBy="inside-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="inside-heading"
          eyebrow="Inside Primegala"
          title="See where you'll be cared for"
          intro="Look for the white and blue building at Maili Sita. Inside, every visit starts at reception with triage beside it, and the laboratory and pharmacy are a few steps away."
        />
        <Link href="/patients-and-visitors" className="link-brand inline-flex shrink-0 items-center gap-2">
          Patient &amp; visitor guide <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Photo
          name="building"
          caption="Primegala Medical Centre & Nursing Home, Esther Memorial Building, opposite Kiamaina Primary School."
          className="sm:col-span-2"
          imgClassName="lg:aspect-[16/10]"
        />
        <Photo name="reception" caption="Reception and triage: the first stop on every visit, day or night." />
        <Photo name="labMicroscope" caption="Our on-site laboratory, for malaria tests and more." />
        <Photo name="labAnalyser" caption="Automated full blood counts, with results during your visit." />
        <Photo name="pharmacyStock" caption="Our pharmacy: medicines sorted and labelled by type." />
      </div>
    </Section>
  );
}
