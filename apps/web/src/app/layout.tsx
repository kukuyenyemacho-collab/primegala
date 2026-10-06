import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Analytics } from "@/components/Analytics";
import { PwaRegister } from "@/components/PwaRegister";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { keywordsFor } from "@/content/keywords";
import { isProductionSite, site } from "@/lib/site";

const jakarta = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | 24-Hour Clinic, Maili Sita Nakuru`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: keywordsFor("core", "local"),
  authors: [{ name: site.name, url: site.url }],
  creator: site.credit.legalName,
  publisher: site.name,
  category: "health",
  appleWebApp: { capable: true, title: site.shortName, statusBarStyle: "default" },
  formatDetection: { telephone: true, address: true, email: true },
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/health-hub/feed.xml` },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: isProductionSite
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  other: {
    "geo.region": "KE-31",
    "geo.placename": "Maili Sita, Nakuru",
    ...(site.geo ? { "geo.position": `${site.geo.lat};${site.geo.lng}`, ICBM: `${site.geo.lat}, ${site.geo.lng}` } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#08172d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-KE" className={jakarta.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-brand-600 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <PwaRegister />
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID?.trim() || null} />
      </body>
    </html>
  );
}
