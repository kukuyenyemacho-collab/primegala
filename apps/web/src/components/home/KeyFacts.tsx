import { BadgeCheck, CalendarDays, Clock, MapPin, type LucideIcon } from "lucide-react";

const FACTS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Clock, title: "Open 24/7", body: "Every day, including weekends and public holidays." },
  {
    icon: BadgeCheck,
    title: "KEPH Level 3 facility",
    body: "Registered on the Kenya Master Health Facility Registry.",
  },
  { icon: CalendarDays, title: "Serving Maili Sita since March 2022", body: "Our doors opened on 1 March 2022." },
  {
    icon: MapPin,
    title: "Opposite Kiamaina Primary School",
    body: "On the Nakuru–Nyahururu Road, about 10 km from Nakuru town.",
  },
];

/** Navy band of verifiable facility facts (no statistics or claims we can't stand behind). */
export function KeyFacts() {
  return (
    <section aria-label="Key facts about Primegala" className="on-dark bg-trust-950 text-white">
      <div className="container-page py-2">
        <ul className="grid gap-px bg-white/10 sm:-mx-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4 bg-trust-950 py-6 sm:px-6 lg:py-8">
              <Icon className="mt-0.5 size-6 shrink-0 text-brand-300" strokeWidth={1.75} aria-hidden />
              <div className="min-w-0">
                <p className="text-base leading-snug font-bold text-white sm:text-lg">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-trust-200">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
