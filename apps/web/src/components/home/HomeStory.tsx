import Link from "next/link";
import { ArrowRight, MoonStar } from "lucide-react";
import { Badge, Section } from "@/components/ui";

export function HomeStory() {
  return (
    <Section tone="surface" labelledBy="story-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          <p className="eyebrow">Why we&apos;re here</p>
          <h2 id="story-heading" className="mt-3 text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">
            Six miles from town. <span className="text-trust-700">Minutes from you.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">
            <em>Maili Sita</em> means “six miles”: the distance between this junction and the big hospitals in Nakuru
            town. In daylight that&apos;s a matatu ride. At 2 a.m., with a feverish child or a mother in early labour, it
            can feel like the other side of the world.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink/85">
            Primegala opened its doors here on 1 March 2022 so that families from Kabatini to Kiamaina, and Bahati to
            Lanet, have somewhere close to turn, at any hour.
          </p>
          <Link href="/about" className="link-brand mt-8 inline-flex items-center gap-2">
            Read our story <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <figure className="rounded-xl border border-line bg-white p-6 sm:p-8 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge tone="trust">Illustrative example</Badge>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
              <MoonStar className="size-4 text-trust-700" aria-hidden /> Night shift, 2:07 a.m.
            </span>
          </div>
          <blockquote className="mt-6 border-l-4 border-trust-700 pl-5 text-xl leading-relaxed font-medium text-ink sm:text-[1.4rem]">
            <p>
              “The gate opens and a father carries in his daughter, burning with fever. Within minutes a nurse has checked
              her temperature, the lab has run a malaria test, and a clinician is explaining the plan in Kiswahili. By
              sunrise she is resting, and her father knows what happens next.”
            </p>
          </blockquote>
          <figcaption className="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-muted">
            An illustration of a typical night at Primegala, not a real patient. We only share real patient stories with
            written consent.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
