import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/Cards";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { SERVICE_PAGES } from "@/content/services";

export function HomeServices() {
  return (
    <Section id="services" labelledBy="services-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="services-heading"
          eyebrow={`Our ${SERVICE_PAGES.length} services`}
          title="Everyday care, under one roof"
          intro="From a midnight fever to your baby's first vaccines: consultation, laboratory, pharmacy and admission in one place at Maili Sita, without the trip to town."
        />
        <ButtonLink href="/services" variant="secondary" className="self-start md:self-auto">
          All services <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SERVICE_PAGES.map((s) => (
          <li key={s.slug}>
            <ServiceCard service={s} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
