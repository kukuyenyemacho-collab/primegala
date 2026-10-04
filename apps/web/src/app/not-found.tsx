import Link from "next/link";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white py-24">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-5xl font-semibold text-ink">This page took a wrong turn at Maili Sita</h1>
        <p className="mt-5 text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist. But we&apos;re still here, 24 hours a day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/book" variant="secondary">
            Book a visit
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-muted">
          Looking for something specific? Try our <Link href="/services" className="font-semibold text-brand-700">services</Link>,{" "}
          <Link href="/health-hub" className="font-semibold text-brand-700">Health Hub</Link> or{" "}
          <Link href="/faq" className="font-semibold text-brand-700">FAQs</Link>.
        </p>
      </div>
    </section>
  );
}
