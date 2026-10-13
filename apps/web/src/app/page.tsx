import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import type { TipSummary } from "@/components/TipCard";
import { FindUs } from "@/components/home/FindUs";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHealthTips } from "@/components/home/HomeHealthTips";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeStory } from "@/components/home/HomeStory";
import { InsidePrimegala } from "@/components/home/InsidePrimegala";
import { KeyFacts } from "@/components/home/KeyFacts";
import { MaternitySpotlight } from "@/components/home/MaternitySpotlight";
import { ShaPanel } from "@/components/home/ShaPanel";
import { TaskTiles } from "@/components/home/TaskTiles";
import { VisitSteps } from "@/components/home/VisitSteps";
import { GENERAL_FAQS } from "@/content/faqs";
import { keywordsFor } from "@/content/keywords";
import { getAllArticles, getArticlesByCategory, getArticlesBySlugs } from "@/lib/content";
import { getSlotItems } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import { hasWhatsApp, site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} | 24-Hour Care, Maili Sita Nakuru`,
    description:
      "24-hour hospital at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School. Outpatient, maternity, antenatal, family planning, lab, pharmacy and inpatient care. SHA accepted.",
    path: "/",
    keywords: keywordsFor("core", "local", "sha", "maternity", "emergency", "swahili"),
  }),
  title: { absolute: `${site.name} | 24-Hour Care, Maili Sita Nakuru` },
};

/** Re-check every minute: new uploads, and promotions past their "show until" date. */
export const revalidate = 60;

const MATERNITY_GUIDES = ["antenatal-care-8-visits", "pregnancy-danger-signs", "kenya-immunisation-schedule"];

export default async function HomePage() {
  const [promotions, insidePhotos] = await Promise.all([getSlotItems("promotions"), getSlotItems("home-inside")]);

  const tips: TipSummary[] = getArticlesByCategory("health-tips")
    .slice(0, 6)
    .map(({ slug, title, description, html, readingMinutes }) => ({ slug, title, description, html, readingMinutes }));

  // Newest first (getAllArticles is sorted by updated/published date), skipping the
  // maternity guides already linked in the maternity section.
  const guides = getAllArticles()
    .filter((a) => a.category !== "health-tips" && !MATERNITY_GUIDES.includes(a.slug))
    .slice(0, 3);

  const maternityGuides = getArticlesBySlugs(MATERNITY_GUIDES).map(({ slug, title }) => ({
    slug,
    title: title.replace(/^Health Tip:\s*/i, ""),
  }));

  // Never point visitors to a channel that isn't set up on the live site.
  const faqs = GENERAL_FAQS.filter((f) => hasWhatsApp || !/whatsapp/i.test(f.a)).slice(0, 6);

  return (
    <>
      <HomeHero promotions={promotions.map(({ id, url, alt, title, link }) => ({ id, url, alt, title, link }))} />
      <TaskTiles />
      <KeyFacts />
      <HomeServices />
      <HomeStory />
      <VisitSteps />
      <InsidePrimegala uploads={insidePhotos} />
      <ShaPanel />
      <MaternitySpotlight guides={maternityGuides} />
      <HomeHealthTips tips={tips} guides={guides} />
      <FindUs />
      <HomeFaq faqs={faqs} />
      <CtaBand />
    </>
  );
}
