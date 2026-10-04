import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarCheck, CircleCheck, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { ArticleCard, ServiceCard } from "@/components/Cards";
import { FaqList } from "@/components/FaqList";
import { LeadForm } from "@/components/LeadForm";
import { ServiceIcon, WhatsAppIcon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { SERVICE_PAGES, getServiceBySlug, serviceKeywords } from "@/content/services";
import { getArticlesBySlugs } from "@/lib/content";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: serviceKeywords(service),
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getArticlesBySlugs(service.related);
  const others = SERVICE_PAGES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const formServices = SERVICE_PAGES.map((s) => ({ code: s.code, name: s.name }));
  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: service.name, description: service.metaDescription, path })} />
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path },
        ]}
        eyebrow="Primegala services"
        title={service.name}
        intro={service.intro}
        aside={
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft ring-1 ring-line">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <ServiceIcon name={service.icon} className="size-7" strokeWidth={1.75} />
            </span>
            <ul className="mt-5 space-y-2.5 text-sm text-ink/85">
              <li className="flex gap-2">
                <CircleCheck className="size-5 shrink-0 text-brand-600" aria-hidden /> Open 24 hours, walk-ins welcome
              </li>
              <li className="flex gap-2">
                <CircleCheck className="size-5 shrink-0 text-brand-600" aria-hidden /> Maili Sita, opposite Kiamaina
                Primary School
              </li>
              {site.shaContracted && (
                <li className="flex gap-2">
                  <CircleCheck className="size-5 shrink-0 text-brand-600" aria-hidden /> SHA accepted for eligible
                  services
                </li>
              )}
            </ul>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <ButtonLink href={`/book?service=${service.code}`} track="book_click_service">
                <CalendarCheck className="size-4" aria-hidden /> Book
              </ButtonLink>
              <ButtonLink
                href={whatsappHref(`Hello Primegala, I'd like to ask about ${service.name}.`)}
                variant="whatsapp"
                track="whatsapp_click_service"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </ButtonLink>
            </div>
          </div>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <figure className="rounded-[var(--radius-card)] bg-cream p-8 ring-1 ring-sun-200/60">
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{service.story.heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">{service.story.body}</p>
            </figure>

            <h2 className="mt-14 text-3xl font-semibold text-ink">What we offer</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.offers.map((o) => (
                <li key={o} className="flex gap-3 rounded-2xl bg-surface p-4 ring-1 ring-line">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                  <span className="leading-relaxed text-ink/85">{o}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-3xl font-semibold text-ink">What to expect</h2>
            <ol className="mt-6 space-y-4">
              {service.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-600 font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 flex gap-4 rounded-[var(--radius-card)] bg-brand-900 p-6 text-white sm:p-8">
              <ShieldCheck className="size-8 shrink-0 text-sun-300" aria-hidden />
              <div>
                <h2 className="font-sans text-lg font-bold">{service.name} and SHA</h2>
                <p className="mt-2 leading-relaxed text-brand-100">{service.sha}</p>
                <Link href="/sha" className="mt-3 inline-block font-semibold text-sun-300 underline underline-offset-4">
                  How SHA works at Primegala
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-display text-2xl font-semibold text-ink">Request an appointment</h2>
              <p className="mt-2 text-muted">We&apos;ll confirm by WhatsApp or phone.</p>
              <LeadForm
                className="mt-5"
                services={formServices}
                defaultType={service.code === "maternity" ? "maternity-tour" : "appointment"}
                defaultService={service.code}
                whatsappHref={whatsappHref()}
              />
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQs" title={`${service.name}: your questions`} />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <SectionHeading eyebrow="From the Health Hub" title="Helpful reading" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="surface">
        <SectionHeading eyebrow="More services" title="Other care at Primegala" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {others.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
