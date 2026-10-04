import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CircleCheck,
  Clock,
  HeartHandshake,
  Lock,
  MapPin,
  Navigation,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HeroIllustration } from "@/components/HeroIllustration";
import { ButtonLink, Section, SectionHeading, Badge } from "@/components/ui";
import { ServiceCard, ArticleCard } from "@/components/Cards";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { MapEmbed } from "@/components/MapEmbed";
import { WhatsAppIcon } from "@/components/Icon";
import { SERVICE_PAGES } from "@/content/services";
import { GENERAL_FAQS, SWAHILI_SUMMARY } from "@/content/faqs";
import { AREAS_SERVED } from "@/content/areas";
import { keywordsFor } from "@/content/keywords";
import { getAllArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} | 24-Hour Clinic, Maili Sita Nakuru`,
    description:
      "24-hour medical centre at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School. Outpatient, maternity, antenatal, family planning, lab, pharmacy and inpatient care. SHA accepted.",
    path: "/",
    keywords: keywordsFor("core", "local", "sha", "maternity", "emergency", "swahili"),
  }),
  title: { absolute: `${site.name} | 24-Hour Clinic, Maili Sita Nakuru` },
};

const REASONS = [
  {
    icon: Clock,
    title: "Open 24 hours, every day",
    body: "Nights, weekends and public holidays. Illness doesn't keep office hours, and neither do we.",
  },
  {
    icon: Route,
    title: "Easy to find, easy to reach",
    body: "On the Nakuru–Nyahururu Road at Maili Sita, directly opposite Kiamaina Primary School. Matatus stop at the door.",
  },
  {
    icon: ShieldCheck,
    title: "SHA help at the front desk",
    body: "We check your eligibility before treatment and help you register if you haven't yet.",
  },
  {
    icon: Sparkles,
    title: "Everything under one roof",
    body: "Consultation, laboratory, pharmacy and admission in one place: no running around town.",
  },
  {
    icon: HeartHandshake,
    title: "Respectful, unhurried care",
    body: "We listen, explain in English or Kiswahili, and treat every patient with dignity.",
  },
  {
    icon: Lock,
    title: "Your information stays private",
    body: "Confidential care, protected under the Health Act and the Data Protection Act.",
  },
];

const JOURNEY = [
  { title: "Book or walk in", body: "WhatsApp us, book online, or just come. Walk-ins are welcome at any hour." },
  { title: "Triage & registration", body: "A nurse checks your vitals. Bring your ID so we can confirm SHA." },
  { title: "See a clinician", body: "We listen, examine and explain what's going on in plain language." },
  { title: "Tests & medicine on site", body: "Lab and pharmacy a few steps away. Most results the same visit." },
  { title: "Reminders that help", body: "Follow-ups, refills and vaccine dates sent to your WhatsApp." },
];

export default function HomePage() {
  const featured = SERVICE_PAGES.filter((s) => s.featured);
  const rest = SERVICE_PAGES.filter((s) => !s.featured).slice(0, 3);
  const articles = getAllArticles()
    .filter((a) => a.category !== "health-tips")
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div
          className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-brand-100/60 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative grid items-center gap-12 pt-12 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-2">
              <Badge>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
                </span>
                Open now: 24 hours, 7 days
              </Badge>
              {site.shaContracted && <Badge className="bg-sun-100 text-brand-900 ring-sun-200">SHA accepted</Badge>}
            </div>
            <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-semibold text-ink sm:text-6xl lg:text-[4.1rem]">
              Prime care, <span className="text-brand-600 italic">close to home</span>. Day and night.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Primegala Medical Centre is the 24-hour clinic at <strong className="text-ink">Maili Sita</strong> on the
              Nakuru–Nyahururu Road, opposite Kiamaina Primary School. Outpatient, maternity, family planning, lab,
              pharmacy and inpatient care for families across Nakuru North.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book" size="lg" track="book_click_hero">
                <CalendarCheck className="size-5" aria-hidden /> Book a visit
              </ButtonLink>
              <ButtonLink href={whatsappHref()} variant="whatsapp" size="lg" track="whatsapp_click_hero">
                <WhatsAppIcon className="size-5" /> WhatsApp us
              </ButtonLink>
              <ButtonLink href={phoneHref()} variant="secondary" size="lg" track="call_click_hero">
                <Phone className="size-5" aria-hidden /> {phoneDisplay()}
              </ButtonLink>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ["24/7", "Always open"],
                ["Level 3", "KEPH facility"],
                ["2022", "Opened at Maili Sita"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-2xl font-semibold text-brand-700 sm:text-3xl">{value}</dd>
                  <dd className="mt-1 text-xs font-medium text-muted sm:text-sm">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6">
            <HeroIllustration className="mx-auto w-full max-w-xl drop-shadow-[0_30px_60px_rgba(6,38,22,0.28)]" />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-cream py-16 sm:py-24" aria-labelledby="story-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">
              <span className="h-px w-6 bg-brand-400" aria-hidden />
              Why we&apos;re here
            </p>
            <h2 id="story-heading" className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
              Six miles from town. <span className="text-brand-600">Minutes from you.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              <em>Maili Sita</em> means “six miles”: the distance between this junction and the big hospitals in
              Nakuru town. In daylight that&apos;s a matatu ride. At 2 a.m., with a feverish child or a mother in early
              labour, it can feel like the other side of the world.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              Primegala opened its doors here in March 2022 so families from Kabatini to Kiamaina, Bahati to Lanet,
              have somewhere close to turn, at any hour.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
            >
              Read our story <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <figure className="relative h-full rounded-[2rem] bg-brand-900 p-8 text-white sm:p-12">
              <div className="absolute top-8 right-8 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100">
                <span className="size-1.5 rounded-full bg-sun-400" aria-hidden /> Night shift, 2:07 a.m.
              </div>
              <blockquote className="mt-10 font-display text-2xl leading-snug sm:text-[2rem]">
                “The gate opens, a father carries in his daughter, burning with fever. Within minutes a nurse has
                checked her temperature, the lab has run a malaria test, and a clinician is explaining the plan in
                Kiswahili. By sunrise, she&apos;s asleep and her fever is down.”
              </blockquote>
              <figcaption className="mt-8 border-t border-white/15 pt-6 text-sm text-brand-200">
                An illustration of a typical night at Primegala, not a real patient. We only share real patient stories
                with written consent.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section id="services">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our services"
            title="Everyday care, under one roof"
            intro="From a midnight fever to your baby's first vaccines, we cover the care most families need, without the trip to town."
          />
          <ButtonLink href="/services" variant="secondary" className="self-start md:self-auto">
            All 12 services <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...featured, ...rest].map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* JOURNEY */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Your visit"
          title="What happens when you come in"
          intro="No guesswork. Here's how a visit to Primegala works, from the gate to going home."
          align="center"
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-5">
          {JOURNEY.map((step, i) => (
            <li key={step.title} className="relative rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 font-display text-lg font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-sans text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* SHA */}
      <section className="relative overflow-hidden bg-brand-900 py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-brand-600/40 blur-3xl" aria-hidden />
        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Social Health Authority"
              title={site.shaContracted ? "Yes, we accept SHA. And we'll help you use it." : "Using SHA? We'll guide you."}
              intro="Most everyday visits at Level 3 facilities like ours are funded through SHA's Primary Healthcare Fund. Bring your ID, and our front desk confirms what's covered before treatment."
              inverted
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/sha" variant="sun" size="lg">
                How SHA works at Primegala <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/book?type=sha-help" variant="inverted" size="lg" track="book_click_sha">
                Get SHA help
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-4">
            {[
              ["Primary Healthcare Fund", "Outpatient visits, antenatal care, family planning, child health and basic tests."],
              ["Social Health Insurance Fund", "Inpatient care and admissions for members with active contributions."],
              ["Emergency, Chronic & Critical Illness Fund", "Emergency stabilisation and care beyond SHIF limits."],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                <CircleCheck className="mt-0.5 size-6 shrink-0 text-sun-300" aria-hidden />
                <div>
                  <h3 className="font-sans font-bold text-white">{title}</h3>
                  <p className="mt-1 text-brand-100">{body}</p>
                </div>
              </li>
            ))}
            <li className="text-sm text-brand-200">
              Not registered yet? Dial <strong className="text-white">*147#</strong>, or ask us to help.
            </li>
          </ul>
        </div>
      </section>

      {/* MATERNITY SPOTLIGHT */}
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["8+", "antenatal contacts, as Kenya's guidelines recommend"],
                ["24/7", "midwife-led labour care"],
                ["Day 1", "newborn care, breastfeeding support & first vaccines"],
                ["SHA", "delivery cover for registered members"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line">
                  <p className="font-display text-4xl font-semibold text-brand-600">{value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Maternity & antenatal"
              title="Bring your baby into the world close to home"
              intro="A calm birth starts months before labour. We plan it with you at every antenatal visit: where you'll deliver, how you'll get here at night, who will be with you, and how SHA applies."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services/maternity">Maternity care</ButtonLink>
              <ButtonLink href="/book?type=maternity-tour" variant="secondary" track="book_click_maternity">
                Book a maternity visit
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* WHY */}
      <Section>
        <SectionHeading
          eyebrow="Why families choose Primegala"
          title="Good care is close, open and honest"
          align="center"
        />
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                <Icon className="size-6" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h3 className="font-sans text-lg font-bold text-ink">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FIND US */}
      <Section tone="surface" id="find-us">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Find us"
              title="Opposite Kiamaina Primary School, Maili Sita"
              intro="On the Nakuru–Nyahururu Road (B5), about 10 km from Nakuru town. Any matatu towards Bahati, Kiamaina or Nyahururu will drop you at the gate."
            />
            <h3 className="mt-8 font-sans text-sm font-bold tracking-widest text-ink uppercase">Areas we serve</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {AREAS_SERVED.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas-we-serve#${a.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink/80 ring-1 ring-line hover:ring-brand-300"
                  >
                    <MapPin className="size-3.5 text-brand-600" aria-hidden /> {a.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.mapsUrl} track="directions_click_home">
                <Navigation className="size-4" aria-hidden /> Get directions
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact details
              </ButtonLink>
            </div>
          </div>
          <MapEmbed query="Primegala Medical Centre, Maili Sita, Nakuru" mapsUrl={site.mapsUrl} />
        </div>
      </Section>

      {/* HEALTH HUB */}
      <Section>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Health Hub"
            title="Clear answers to the questions we hear most"
            intro="Practical guides written for families in Nakuru, from using SHA to spotting pregnancy danger signs."
          />
          <ButtonLink href="/health-hub" variant="secondary" className="self-start md:self-auto">
            Visit the Health Hub <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQs" title="Questions people ask before visiting" />
            <div className="mt-8 rounded-[var(--radius-card)] bg-brand-900 p-6 text-white" lang="sw">
              <h3 className="font-display text-2xl font-semibold">{SWAHILI_SUMMARY.heading}</h3>
              <p className="mt-3 leading-relaxed text-brand-100">{SWAHILI_SUMMARY.body}</p>
            </div>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700">
              See all FAQs <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={GENERAL_FAQS.slice(0, 7)} />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
