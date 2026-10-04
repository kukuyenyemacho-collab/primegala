import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getAllLegalDocs, getLegalDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

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
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <aside className="lg:col-span-3">
          <div className="space-y-8 lg:sticky lg:top-32">
            {doc.headings.length > 2 && (
              <nav aria-label="On this page">
                <p className="text-xs font-bold tracking-widest text-ink uppercase">On this page</p>
                <ul className="mt-4 space-y-2.5 border-l border-line">
                  {doc.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted hover:border-brand-500 hover:text-brand-700">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <nav aria-label="Other policies" className="hidden lg:block">
              <p className="text-xs font-bold tracking-widest text-ink uppercase">Other policies</p>
              <ul className="mt-4 space-y-2">
                {others.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/legal/${d.slug}`} className="text-sm text-muted hover:text-brand-700">
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <div
          className="prose-primegala prose-base sm:prose-lg lg:col-span-8 lg:col-start-5 [&_.table-scroll]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </div>
    </>
  );
}
