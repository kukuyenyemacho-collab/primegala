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
          intro="Every visit starts at our reception desk, with triage right beside it. Prescriptions are filled a few steps away at our on-site pharmacy, with medicines kept on labelled shelves."
        />
        <Link href="/patients-and-visitors" className="link-brand inline-flex shrink-0 items-center gap-2">
          Patient &amp; visitor guide <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Photo name="reception" caption="Reception and triage: the first stop on every visit, day or night." />
        <Photo name="pharmacyStock" caption="Our pharmacy: medicines sorted and labelled by type." />
        <Photo
          name="pharmacyShelves"
          caption="Prescriptions are filled on site, so there's no need to go to town."
          className="sm:col-span-2 lg:col-span-1"
          imgClassName="sm:aspect-[16/9] lg:aspect-[4/5]"
        />
      </div>
    </Section>
  );
}
