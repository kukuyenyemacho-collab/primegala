import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarCheck, Clock, ClipboardList, Landmark, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { ArticleCard, ServiceCard } from "@/components/Cards";
import { FaqList } from "@/components/FaqList";
import { LeadForm } from "@/components/LeadForm";
import { ServiceIcon, WhatsAppIcon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { CheckList, InfoPanel, StepList } from "@/components/PageSections";
import { SERVICE_PAGES, getServiceBySlug, serviceKeywords } from "@/content/services";
import { getArticlesBySlugs } from "@/lib/content";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { emailHref, hasPhone, hasWhatsApp, phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

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
  const isUrgent = service.code === "emergency-24hr";

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
          <div className="rounded-xl border border-line bg-white p-6">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                <ServiceIcon name={service.icon} className="size-6" strokeWidth={1.75} />
              </span>
              <p className="font-bold text-ink">{service.summary}</p>
            </div>
            <ul className="mt-5 space-y-3 border-t border-line pt-5 text-sm text-ink/85">
              <li className="flex gap-3">
                <Clock className="size-5 shrink-0 text-trust-700" aria-hidden /> Open 24 hours, walk-ins welcome
              </li>
              <li className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-trust-700" aria-hidden /> Maili Sita, opposite Kiamaina Primary
                School
              </li>
              {site.shaContracted && (
                <li className="flex gap-3">
                  <ShieldCheck className="size-5 shrink-0 text-trust-700" aria-hidden /> SHA accepted for eligible services
                </li>
              )}
            </ul>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <ButtonLink href={`/book?service=${service.code}`} track="book_click_service">
                <CalendarCheck className="size-4" aria-hidden /> Book
              </ButtonLink>
              {hasWhatsApp ? (
                <ButtonLink
                  href={whatsappHref(`Hello Primegala, I'd like to ask about ${service.name}.`)}
                  variant="whatsapp"
                  track="whatsapp_click_service"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </ButtonLink>
              ) : hasPhone ? (
                <ButtonLink href={phoneHref()} variant="secondary" track="call_click_service">
                  <Phone className="size-4" aria-hidden /> Call {phoneDisplay()}
                </ButtonLink>
              ) : (
                <ButtonLink
                  href={emailHref(`Question about ${service.name}`)}
                  variant="secondary"
                  track="email_click_service"
                >
                  <Mail className="size-4" aria-hidden /> Email us
                </ButtonLink>
              )}
            </div>
            {isUrgent && (
              <p className="mt-4 text-sm leading-relaxed text-ink">
                <strong className="text-alert">Life-threatening emergency?</strong> Call{" "}
                <a href="tel:999" className="font-bold text-alert underline underline-offset-2">
                  999
                </a>{" "}
                or{" "}
                <a href="tel:112" className="font-bold text-alert underline underline-offset-2">
                  112
                </a>
                .{" "}
                <Link href="/emergency" className="link-brand">
                  Emergency care
                </Link>
              </p>
            )}
          </div>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <section aria-labelledby="story-title" className="border-l-4 border-trust-200 pl-5 sm:pl-6">
              <h2 id="story-title" className="text-2xl leading-tight font-bold tracking-tight text-ink sm:text-3xl">
                {service.story.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/85">{service.story.body}</p>
            </section>

            <section aria-labelledby="offers-title" className="mt-14">
              <h2 id="offers-title" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                What we offer
              </h2>
              <CheckList className="mt-6" tone="brand" columns={2} items={service.offers} />
            </section>

            <section aria-labelledby="expect-title" className="mt-14">
              <h2 id="expect-title" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                What to expect
              </h2>
              <StepList className="mt-6" steps={service.steps} />
            </section>

            <section aria-labelledby="prepare-title" className="mt-14">
              <h2 id="prepare-title" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                  <ClipboardList className="size-5" aria-hidden />
                </span>
                How to prepare
              </h2>
              <div className="mt-6 rounded-xl border border-line bg-white p-5 sm:p-6">
                <CheckList items={service.prepare} />
                <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                  General guidance only. Your clinician will tell you about anything specific to you.{" "}
                  <Link href="/patients-and-visitors#before-your-visit" className="link-brand">
                    Full patient guide
                  </Link>
                </p>
              </div>
            </section>

            <InfoPanel icon={Landmark} as="h2" className="mt-14" title={`${service.name} and SHA`}>
              <p>{service.sha}</p>
              <p className="mt-3">
                <Link href="/sha">How SHA works at Primegala</Link> ·{" "}
                <Link href="/payments-and-insurance">Payments &amp; insurance</Link>
              </p>
            </InfoPanel>
          </div>

          <aside className="min-w-0 lg:col-span-5" aria-labelledby="request-title">
            <div className="lg:sticky lg:top-28">
              <h2 id="request-title" className="text-2xl font-bold tracking-tight text-ink">
                Request an appointment
              </h2>
              <p className="mt-2 text-muted">Our team will contact you to confirm. Walk-ins are welcome at any hour.</p>
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

      <Section tone="surface" labelledBy="service-faqs">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="service-faqs" eyebrow="FAQs" title={`${service.name}: your questions`} />
          </div>
          <div className="min-w-0 lg:col-span-8">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-reading">
          <SectionHeading id="related-reading" eyebrow="From the Health Hub" title="Helpful reading" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="surface" labelledBy="more-services">
        <SectionHeading id="more-services" eyebrow="More services" title="Other care at Primegala" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {others.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/services" className="link-brand">
            See all services
          </Link>
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
