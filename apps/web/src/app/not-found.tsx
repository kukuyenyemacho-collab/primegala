import Link from "next/link";
import { ArrowRight, Siren } from "lucide-react";
import { ButtonLink } from "@/components/ui";

const POPULAR = [
  { href: "/services", label: "Our services" },
  { href: "/book", label: "Book a visit" },
  { href: "/sha", label: "SHA at Primegala" },
  { href: "/contact", label: "Contact and directions" },
  { href: "/health-hub", label: "Health Hub" },
  { href: "/faq", label: "Frequently asked questions" },
];

export default function NotFound() {
  return (
    <section className="border-b border-line bg-surface py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl leading-tight font-bold tracking-tight text-ink sm:text-5xl">Page not found</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          We couldn&apos;t find the page you were looking for. It may have moved, or the address may be mistyped. Our
          medical centre at Maili Sita is open 24 hours a day.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to the home page</ButtonLink>
          <ButtonLink href="/book" variant="secondary">
            Book a visit
          </ButtonLink>
        </div>

        <h2 className="mt-12 text-sm font-bold tracking-wider text-trust-800 uppercase">Popular pages</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {POPULAR.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 font-semibold text-brand-700 transition-colors hover:border-brand-300"
              >
                {p.label}
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-muted">
          <Siren className="mt-0.5 size-5 shrink-0 text-alert" aria-hidden />
          <span>
            <strong className="text-ink">In an emergency</strong>, call{" "}
            <a href="tel:999" className="font-bold text-ink underline underline-offset-4">
              999
            </a>{" "}
            or{" "}
            <a href="tel:112" className="font-bold text-ink underline underline-offset-4">
              112
            </a>
            , or come straight to Primegala at any hour.
          </span>
        </p>
      </div>
    </section>
  );
}
