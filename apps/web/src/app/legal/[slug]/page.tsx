import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InfoPanel, OnThisPage } from "@/components/PageSections";
import { getAllLegalDocs, getLegalDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { emailHref, site } from "@/lib/site";

export function generateStaticParams() {
  return getAllLegalDocs().map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return pageMetadata({ title: doc.title, description: doc.description, path: `/legal/${doc.slug}` });
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();
  const others = getAllLegalDocs().filter((d) => d.slug !== doc.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Policies", path: "/legal" },
          { name: doc.title, path: `/legal/${doc.slug}` },
        ]}
        eyebrow="Policies"
        title={doc.title}
        intro={doc.description}
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <aside className="min-w-0 lg:col-span-4 xl:col-span-3">
          <div className="space-y-6 lg:sticky lg:top-28">
            {doc.headings.length > 2 && (
              <OnThisPage items={doc.headings.map((h) => ({ id: h.id, label: h.text }))} />
            )}
            <nav aria-labelledby="other-policies-title" className="hidden rounded-xl border border-line bg-white p-5 lg:block">
              <h2 id="other-policies-title" className="text-xs font-semibold tracking-[0.14em] text-trust-700 uppercase">
                Other policies
              </h2>
              <ul className="mt-3 space-y-2">
                {others.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/legal/${d.slug}`} className="text-sm text-ink/80 hover:text-brand-700 hover:underline">
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <div className="min-w-0 lg:col-span-8 xl:col-span-9">
          <div
            className="prose-primegala prose-base max-w-3xl sm:prose-lg [&_.table-scroll]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
          <InfoPanel icon={Mail} className="mt-12 max-w-3xl" title="Questions about this policy?">
            <p>
              Email{" "}
              <a href={emailHref(`Question about our ${doc.title}`)} className="break-all">
                {site.contact.email}
              </a>{" "}
              or speak to our front desk, which is open 24 hours. <Link href="/legal">All policies</Link>.
            </p>
          </InfoPanel>
        </div>
      </div>
    </>
  );
}
