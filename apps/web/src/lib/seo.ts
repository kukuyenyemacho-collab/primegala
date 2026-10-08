import type { Metadata } from "next";
import { EMAILS, absoluteUrl, fullAddress, isProductionSite, site } from "./site";
import { AREAS } from "@/content/keywords";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/** Consistent, canonical metadata for every page. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    // Short titles get the brand suffix; longer ones already carry the keywords and location.
    title: title.length > 48 ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: site.name,
      locale: site.locale,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    // Omit the key unless needed: `robots: undefined` would override the layout's robots settings.
    ...(!isProductionSite
      ? { robots: { index: false, follow: false } }
      : noindex
        ? { robots: { index: false, follow: true } }
        : {}),
  };
}

type JsonLdObject = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** Facility entity: MedicalClinic is a MedicalOrganization and a LocalBusiness. */
export function organizationJsonLd(): JsonLdObject {
  const sameAs = [
    ...Object.values(site.social).filter(Boolean),
    "https://kmhfr.health.go.ke/public/facilities/06399453-54aa-4da6-ad0b-8bd9a01e2dae",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": ORG_ID,
    name: site.name,
    alternateName: [site.shortName, "Primegala Maili Sita"],
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/brand/logo-mark.png"),
    image: absoluteUrl("/opengraph-image"),
    foundingDate: site.foundingDate,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    contactPoint: EMAILS.map((e) => ({
      "@type": "ContactPoint",
      contactType: e.label,
      email: e.address,
      availableLanguage: ["en", "sw"],
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.building}, ${site.address.street} (${site.address.landmark})`,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    ...(site.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } }
      : {}),
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    isAccessibleForFree: false,
    currenciesAccepted: "KES",
    paymentAccepted: site.payments.join(", "),
    priceRange: "KES",
    medicalSpecialty: ["PrimaryCare", "Obstetric", "Gynecologic", "Pediatric", "Emergency", "LaboratoryScience"],
    knowsLanguage: ["en", "sw"],
    areaServed: AREAS.map((name) => ({ "@type": "Place", name: `${name}, Nakuru County, Kenya` })),
    ...(site.mflCode
      ? { identifier: { "@type": "PropertyValue", propertyID: "Kenya MFL Code", value: site.mflCode } }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "en-KE",
    publisher: { "@id": ORG_ID },
    creator: { "@type": "Organization", name: site.credit.legalName, url: site.credit.url },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(service: {
  name: string;
  description: string;
  path: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    url: absoluteUrl(service.path),
    name: `${service.name} at ${site.name}`,
    description: service.description,
    inLanguage: "en-KE",
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "MedicalTherapy",
      name: service.name,
      provider: { "@id": ORG_ID },
    },
    audience: { "@type": "Patient" },
    mainEntityOfPage: absoluteUrl(service.path),
    publisher: { "@id": ORG_ID },
    contentLocation: { "@type": "Place", name: fullAddress() },
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
  author: string;
  reviewedBy?: string;
  lastReviewed?: string;
  category: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Article"],
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    mainEntityOfPage: absoluteUrl(article.path),
    datePublished: article.published,
    dateModified: article.updated ?? article.published,
    inLanguage: "en-KE",
    articleSection: article.category,
    author: { "@type": "Organization", name: article.author, url: site.url },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    image: absoluteUrl("/opengraph-image"),
    audience: { "@type": "Patient" },
    ...(article.reviewedBy
      ? { reviewedBy: { "@type": "Person", name: article.reviewedBy }, lastReviewed: article.lastReviewed }
      : {}),
  };
}
