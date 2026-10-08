import type { Metadata } from "next";
import Link from "next/link";
import type { ServiceCode } from "@primegala/contracts";
import { ArrowRight, Bus, CalendarCheck, Car, Clock, IdCard, Mail, MapPin, Navigation, Phone, Siren, Smartphone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon, WhatsAppIcon } from "@/components/Icon";
import { FactList, StepList } from "@/components/PageSections";
import { SERVICE_PAGES } from "@/content/services";
import { SWAHILI_FAQS } from "@/content/faqs";
import { keywordsFor } from "@/content/keywords";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, emailHref, hasPhone, hasWhatsApp, phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

const PATH = "/kiswahili";

const base = pageMetadata({
  title: "Hospitali ya Saa 24 Maili Sita, Nakuru | Primegala kwa Kiswahili",
  description:
    "Primegala Medical Centre iko Maili Sita, barabara ya Nakuru–Nyahururu, mkabala na Shule ya Msingi Kiamaina. Tuko wazi saa 24 kila siku. Tunakubali SHA kwa huduma zinazostahiki, M-Pesa na pesa taslimu.",
  path: PATH,
  keywords: [
    ...keywordsFor("swahili"),
    "hospitali Maili Sita",
    "hospitali Bahati",
    "hospitali zinazokubali SHA Nakuru",
    "kliniki ya uzazi wa mpango Nakuru",
  ],
});

export const metadata: Metadata = {
  ...base,
  openGraph: { ...base.openGraph, locale: "sw_KE" },
};

/** Kiswahili names and one-line descriptions for every service (keyed by code, so none can be missed). */
const HUDUMA: Record<ServiceCode, { jina: string; maelezo: string }> = {
  "general-outpatient": {
    jina: "Matibabu ya kawaida (wagonjwa wa nje)",
    maelezo: "Fika wakati wowote kwa kikohozi, homa, maumivu, maambukizi au uchunguzi wa afya.",
  },
  "emergency-24hr": {
    jina: "Huduma za dharura saa 24",
    maelezo: "Tuko wazi usiku kucha kwa magonjwa ya ghafla na majeraha. Tunaimarisha hali ya mgonjwa na kumpa rufaa inapohitajika.",
  },
  maternity: {
    jina: "Kujifungua na huduma za uzazi",
    maelezo: "Wakunga wenye ujuzi hukuhudumia wakati wa uchungu wa uzazi, kujifungua na siku za kwanza ukiwa na mtoto wako.",
  },
  "antenatal-care": {
    jina: "Kliniki ya wajawazito (ANC)",
    maelezo: "Uchunguzi wa mara kwa mara wa ujauzito, vipimo na ushauri, kuanzia miezi mitatu ya kwanza.",
  },
  "family-planning": {
    jina: "Uzazi wa mpango",
    maelezo: "Ushauri wa faragha na njia za muda mfupi au mrefu unazochagua, kama vipandikizi na koili.",
  },
  "child-health": {
    jina: "Afya ya mtoto na chanjo",
    maelezo: "Chanjo, ufuatiliaji wa ukuaji na matibabu ya watoto wachanga na watoto wagonjwa.",
  },
  "hiv-testing": {
    jina: "Kupima VVU na ushauri nasaha",
    maelezo: "Kupima kwa siri na kupata majibu kwa takriban dakika 20, pamoja na ushauri kuhusu PEP na PrEP.",
  },
  laboratory: {
    jina: "Huduma za maabara",
    maelezo: "Vipimo vya damu, mkojo na choo hufanyika hapa hapa, na majibu mengi hupatikana siku hiyo hiyo.",
  },
  pharmacy: {
    jina: "Duka la dawa",
    maelezo: "Dawa ulizoandikiwa hutolewa hapa, pamoja na maelezo wazi ya jinsi ya kuzitumia.",
  },
  inpatient: {
    jina: "Kulazwa (wagonjwa wa ndani)",
    maelezo: "Kulazwa na uangalizi wa wauguzi saa 24 unapohitaji kufuatiliwa kwa karibu.",
  },
  "chronic-care": {
    jina: "Kliniki ya kisukari na shinikizo la damu",
    maelezo: "Vipimo vya mara kwa mara, ukaguzi wa dawa na ushauri wa mtindo wa maisha kwa magonjwa ya muda mrefu.",
  },
  "minor-procedures": {
    jina: "Upasuaji mdogo na kutibu vidonda",
    maelezo: "Kushona majeraha, kusafisha na kufunga vidonda, kutoa usaha kwenye jipu na huduma nyingine ndogo.",
  },
  theatre: {
    jina: "Chumba cha upasuaji (inakuja hivi karibuni)",
    maelezo: "Upasuaji uliopangwa na wa dharura karibu na nyumbani. Bado haijafunguliwa: acha maelezo yako tukujulishe.",
  },
  "dental-care": {
    jina: "Huduma za meno (inakuja hivi karibuni)",
    maelezo: "Uchunguzi wa meno, kusafisha, kuziba na kung'oa meno kwa watu wazima na watoto. Bado haijafunguliwa.",
  },
};


export default function KiswahiliPage() {
  return (
    <div lang="sw">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: absoluteUrl(PATH),
          name: "Primegala Medical Centre kwa Kiswahili",
          inLanguage: "sw-KE",
          about: { "@id": `${site.url}/#organization` },
          isPartOf: { "@id": `${site.url}/#website` },
        }}
      />
      <PageHero
        crumbs={[{ name: "Kiswahili", path: PATH }]}
        eyebrow="Kwa Kiswahili"
        title="Karibu Primegala Medical Centre"
        intro="Sisi ni kituo cha afya cha ngazi ya tatu (KEPH Level 3) kilichoko Maili Sita, kando ya barabara ya Nakuru–Nyahururu, mkabala na Shule ya Msingi Kiamaina. Tuko wazi saa 24 kila siku, ikiwemo sikukuu za umma, na tunakubali SHA kwa huduma zinazostahiki."
      >
        <ButtonLink href="/book" size="lg" track="book_click_kiswahili">
          <CalendarCheck className="size-5" aria-hidden /> Weka miadi
        </ButtonLink>
        <ButtonLink href={site.mapsUrl} variant="secondary" size="lg" track="directions_click_kiswahili">
          <Navigation className="size-5" aria-hidden /> Pata maelekezo
        </ButtonLink>
      </PageHero>

      <Section labelledBy="kuhusu">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              id="kuhusu"
              eyebrow="Kuhusu sisi"
              title="Huduma za afya karibu na nyumbani, saa yoyote"
              intro="Tulifungua milango yetu tarehe 1 Machi 2022 ili familia za Maili Sita na maeneo jirani zisilazimike kusafiri maili sita hadi mjini Nakuru kutafuta matibabu, hasa usiku."
            />
            <p className="mt-5 leading-relaxed text-ink/85">
              Primegala imesajiliwa kwenye Sajili Kuu ya Vituo vya Afya nchini Kenya (Kenya Master Health Facility
              Registry). Wahudumu wetu huzungumza Kiswahili na Kiingereza, na hukueleza hali yako na matibabu kwa lugha
              unayoielewa.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <FactList
              items={[
                { term: "Saa za kazi", value: "Saa 24, kila siku, ikiwemo wikendi na sikukuu za umma" },
                { term: "Mahali", value: "Maili Sita, barabara ya Nakuru–Nyahururu, mkabala na Shule ya Msingi Kiamaina" },
                { term: "Eneo", value: "Wadi ya Kiamaina, Kaunti Ndogo ya Nakuru Kaskazini (Bahati), Kaunti ya Nakuru" },
                { term: "Umbali", value: "Takriban kilomita 10 (maili sita) kutoka mjini Nakuru" },
                { term: "Malipo", value: "SHA kwa huduma zinazostahiki, M-Pesa na pesa taslimu" },
                { term: "Lugha", value: "Kiswahili na Kiingereza" },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="huduma">
        <SectionHeading
          id="huduma"
          eyebrow="Huduma zetu"
          title="Huduma 12 chini ya paa moja"
          intro="Bofya huduma yoyote kusoma maelezo zaidi (kurasa hizo ziko kwa Kiingereza). Chumba cha upasuaji na huduma za meno zinakuja hivi karibuni."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map((s) => (
            <li key={s.code}>
              <Link
                href={`/services/${s.slug}`}
                hrefLang="en"
                className={
                  s.comingSoon
                    ? "group flex h-full gap-4 rounded-xl border border-line bg-white p-5 transition-colors hover:border-pink-200 hover:bg-pink-50"
                    : "group flex h-full gap-4 rounded-xl border border-line bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
                }
              >
                <span
                  className={
                    s.comingSoon
                      ? "flex size-10 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-700"
                      : "flex size-10 shrink-0 items-center justify-center rounded-lg bg-trust-50 text-trust-700"
                  }
                >
                  <ServiceIcon name={s.icon} className="size-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-ink group-hover:text-brand-800">{HUDUMA[s.code].jina}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{HUDUMA[s.code].maelezo}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="saa-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              id="saa-24"
              eyebrow="Saa 24"
              title="Tuko wazi saa 24, kila siku"
              intro="Ugonjwa haungoji asubuhi. Milango yetu iko wazi mchana na usiku, siku saba kwa wiki, ikiwemo wikendi na sikukuu za umma."
            />
            <div className="mt-8 flex gap-4 rounded-xl border border-trust-100 bg-trust-50 p-5">
              <Clock className="mt-0.5 size-6 shrink-0 text-trust-700" aria-hidden />
              <p className="leading-relaxed text-ink/85">
                <strong className="text-trust-950">Huhitaji miadi.</strong> Fika moja kwa moja wakati wowote. Muuguzi
                atakupima kwanza, na wagonjwa walio katika hali mbaya zaidi huhudumiwa kwanza.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-trust-800 uppercase">Unapokuja, leta</h3>
            <ul className="mt-4 grid gap-3">
              {[
                "Kitambulisho cha taifa, au cheti cha kuzaliwa cha mtoto",
                "Simu iliyosajiliwa na SHA",
                "Rekodi za matibabu ya awali, majibu ya vipimo na dawa unazotumia",
                "Kijitabu cha Afya ya Mama na Mtoto kwa ziara za ujauzito na za watoto",
                "M-Pesa au pesa taslimu kwa huduma zisizolipwa na SHA",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-line bg-white p-4 leading-relaxed text-ink/85">
                  <IdCard className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="mahali">
        <SectionHeading
          id="mahali"
          eyebrow="Mahali tulipo"
          title="Maili Sita, mkabala na Shule ya Msingi Kiamaina"
          intro="Tuko katika kituo cha Maili Sita kando ya barabara ya Nakuru–Nyahururu, Wadi ya Kiamaina, takriban kilomita 10 kutoka mjini Nakuru."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-white p-6">
            <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
              <span className="flex size-10 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                <Car className="size-5" aria-hidden />
              </span>
              Kwa gari au bodaboda
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              Kutoka mjini Nakuru, fuata barabara ya Nakuru–Nyahururu (B5) kuelekea Bahati. Ukifika kituo cha Maili Sita,
              takriban kilomita 10 kutoka mjini, tafuta Shule ya Msingi Kiamaina. Primegala iko mkabala na shule hiyo.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-white p-6">
            <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
              <span className="flex size-10 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
                <Bus className="size-5" aria-hidden />
              </span>
              Kwa matatu
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              Panda matatu yoyote inayoelekea Bahati, Kiamaina au Nyahururu, na uombe kushushwa Maili Sita, karibu na
              Shule ya Msingi Kiamaina.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.mapsUrl} track="directions_click_kiswahili_map">
            <MapPin className="size-4" aria-hidden /> Fungua ramani ya Google
          </ButtonLink>
          <ButtonLink href="/areas-we-serve" variant="secondary" hrefLang="en">
            Maeneo tunayohudumia
          </ButtonLink>
        </div>
      </Section>

      <Section tone="trustLight" labelledBy="sha" className="border-y border-trust-100">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              id="sha"
              eyebrow="SHA (Social Health Authority)"
              title={<span className="text-trust-950">Tumia SHA katika Primegala</span>}
              intro="SHA ilichukua nafasi ya NHIF mnamo Oktoba 2024. Huduma nyingi za kila siku katika vituo vya ngazi ya pili na ya tatu, kama chetu, hulipwa kupitia Mfuko wa Huduma za Afya ya Msingi (PHCF) kwa wanachama waliosajiliwa."
            />
            <div className="mt-8 flex gap-4 rounded-xl border border-trust-100 bg-white p-5">
              <Smartphone className="mt-0.5 size-6 shrink-0 text-trust-700" aria-hidden />
              <p className="leading-relaxed text-ink/85">
                <strong className="text-trust-950">Ukifika kwetu:</strong> leta kitambulisho chako cha taifa na simu
                iliyosajiliwa na SHA, kwa sababu unaweza kutumiwa nambari ya siri ya mara moja (OTP). Tutakagua
                ustahiki wako na kukueleza kinacholipwa na SHA, na gharama yoyote, kabla ya matibabu.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-trust-800 uppercase">Jinsi ya kujisajili kwa *147#</h3>
            <StepList
              className="mt-4"
              steps={[
                { title: "Piga *147#", body: "Kwenye simu yoyote, mtandao wowote." },
                { title: "Chagua usajili", body: "Weka nambari ya kitambulisho chako cha taifa." },
                { title: "Ongeza wategemezi", body: "Sajili mume au mke na watoto wako ili nao walipiwe." },
                { title: "Jibu maswali ya kaya", body: "Kamilisha maswali ya tathmini ya kipato cha familia." },
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Ukikwama, wahudumu wetu wa mapokezi watakusaidia wakati wowote.{" "}
              <Link href="/sha" hrefLang="en" className="link-brand">
                Maelezo zaidi kuhusu SHA (kwa Kiingereza)
              </Link>
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="dharura">
        <div className="rounded-xl border-2 border-alert bg-[#fdf0ef] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-alert text-white">
                <Siren className="size-6" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="eyebrow text-alert!">Dharura</p>
                <h2 id="dharura" className="mt-2 text-2xl leading-tight font-bold text-alert sm:text-3xl">
                  Dharura inayohatarisha maisha? Piga 999 au 112.
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink">
                  Kwa mtu aliyepoteza fahamu, anayetokwa na damu nyingi, mwenye maumivu makali ya kifua, degedege au
                  aliyepata ajali mbaya, piga 999 au 112 mara moja, au fika moja kwa moja. Primegala iko wazi saa 24.
                </p>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink">
                  <strong>Fika mara moja ukiona:</strong> kupumua kwa shida; homa kali pamoja na kuchanganyikiwa; mtoto
                  asiyeweza kunywa au kunyonya, au mwenye degedege; mjamzito anayetokwa na damu, mwenye maumivu makali ya
                  kichwa, au mtoto tumboni anayecheza kidogo kuliko kawaida.
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/85">
                  Kwa mujibu wa Kifungu 43(2) cha Katiba ya Kenya, hakuna mtu atakayenyimwa matibabu ya dharura.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {["999", "112"].map((n) => (
                <a
                  key={n}
                  href={`tel:${n}`}
                  data-track={`emergency_call_${n}_kiswahili`}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-lg border border-alert bg-alert px-6 py-2 font-semibold text-white transition-colors hover:border-[#9e1f17] hover:bg-[#9e1f17] focus-visible:outline-alert"
                >
                  <Phone className="size-5" aria-hidden /> Piga {n}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="wasiliana">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="wasiliana"
              eyebrow="Wasiliana nasi"
              title="Tuandikie au fika moja kwa moja"
              intro="Dawati letu la mapokezi liko wazi mchana na usiku. Kwa maswali yasiyo ya dharura, tutumie barua pepe."
            />
          </div>
          <div className="min-w-0 lg:col-span-7">
            <ul className="grid gap-3">
              <li className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <Mail className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">Barua pepe</h3>
                  <a href={emailHref("Swali kutoka tovuti ya Primegala")} className="link-brand mt-1 inline-block break-all" data-track="email_click_kiswahili">
                    {site.contact.email}
                  </a>
                </div>
              </li>
              {hasPhone && (
                <li className="flex gap-4 rounded-xl border border-line bg-white p-5">
                  <Phone className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
                  <div className="min-w-0">
                    <h3 className="font-bold text-ink">Simu</h3>
                    <a href={phoneHref()} className="link-brand mt-1 inline-block" data-track="call_click_kiswahili">
                      {phoneDisplay()}
                    </a>
                  </div>
                </li>
              )}
              {hasWhatsApp && (
                <li className="flex gap-4 rounded-xl border border-line bg-white p-5">
                  <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-trust-700" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-ink">WhatsApp</h3>
                    <a
                      href={whatsappHref("Habari Primegala, ningependa kuweka miadi.")}
                      className="link-brand mt-1 inline-block"
                      data-track="whatsapp_click_kiswahili"
                    >
                      Tutumie ujumbe
                    </a>
                  </div>
                </li>
              )}
              <li className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">Fika moja kwa moja</h3>
                  <p className="mt-1 leading-relaxed text-muted">
                    Dawati la mapokezi, Maili Sita, mkabala na Shule ya Msingi Kiamaina. Wakati wowote, mchana au usiku.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <CalendarCheck className="mt-0.5 size-5 shrink-0 text-trust-700" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">Weka miadi mtandaoni</h3>
                  <p className="mt-1 leading-relaxed text-muted">
                    Jaza fomu fupi nasi tutawasiliana nawe kuthibitisha.{" "}
                    <Link href="/book" hrefLang="en" className="link-brand">
                      Fomu ya miadi (kwa Kiingereza)
                    </Link>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="maswali">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="maswali" eyebrow="Maswali" title="Maswali yanayoulizwa mara kwa mara" />
          </div>
          <div className="min-w-0 lg:col-span-8">
            <FaqList faqs={SWAHILI_FAQS} />
          </div>
        </div>
      </Section>

      {/* Closing call to action, in Kiswahili (same design as the shared CtaBand). */}
      <section className="on-dark border-t-4 border-brand-500 bg-trust-950 text-white" aria-labelledby="karibu-cta">
        <div className="container-page grid gap-8 py-14 sm:py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 id="karibu-cta" className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
              Tuko karibu nawe, mchana na usiku.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-trust-100">
              Fika wakati wowote, mchana au usiku, au weka miadi mapema. Tuko barabara ya Nakuru–Nyahururu, Maili Sita,
              mkabala na Shule ya Msingi Kiamaina.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ButtonLink href="/book" size="lg" track="book_click_kiswahili_cta">
              <CalendarCheck className="size-5" aria-hidden /> Weka miadi
            </ButtonLink>
            <ButtonLink href={site.mapsUrl} variant="inverted" size="lg" track="directions_click_kiswahili_cta">
              <Navigation className="size-5" aria-hidden /> Pata maelekezo
            </ButtonLink>
            {!hasPhone && !hasWhatsApp && (
              <ButtonLink href={emailHref("Swali kutoka tovuti ya Primegala")} variant="inverted" size="lg" track="email_click_kiswahili_cta">
                <Mail className="size-5" aria-hidden /> Tuma barua pepe
              </ButtonLink>
            )}
            {hasPhone && (
              <ButtonLink href={phoneHref()} variant="inverted" size="lg" track="call_click_kiswahili_cta">
                <Phone className="size-5" aria-hidden /> Piga simu
              </ButtonLink>
            )}
          </div>
          <p lang="en" className="text-sm text-trust-200 lg:col-span-12">
            Prefer English?{" "}
            <Link href="/" className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-4">
              Go to the home page <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
