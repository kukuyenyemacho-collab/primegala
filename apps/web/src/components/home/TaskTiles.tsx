import Link from "next/link";
import { ArrowRight, Baby, CalendarCheck, MapPin, ShieldCheck, Siren, Wallet, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Task {
  href: string;
  title: string;
  body: string;
  icon: LucideIcon;
  emergency?: boolean;
}

const TASKS: Task[] = [
  {
    href: "/book",
    title: "Book a visit",
    body: "Request an appointment online. Walk-ins are welcome at any hour.",
    icon: CalendarCheck,
  },
  {
    href: "/sha",
    title: "Use my SHA cover",
    body: "What SHA covers here, how to register and what to bring.",
    icon: ShieldCheck,
  },
  {
    href: "/emergency",
    title: "Emergency care",
    body: "What to do in an emergency and when to come straight in.",
    icon: Siren,
    emergency: true,
  },
  {
    href: "/contact",
    title: "Find us",
    body: "Maili Sita Centre, opposite Kiamaina Primary School. Directions and contact details.",
    icon: MapPin,
  },
  {
    href: "/services/maternity",
    title: "Maternity care",
    body: "Antenatal visits, labour and delivery care day and night, and newborn care.",
    icon: Baby,
  },
  {
    href: "/payments-and-insurance",
    title: "Payments & insurance",
    body: "Pay with SHA, M-Pesa or cash, and what to expect at the front desk.",
    icon: Wallet,
  },
];

/** Government-style task list: the most common reasons people visit the site, one click away. */
export function TaskTiles() {
  return (
    <Section tone="surface" labelledBy="tasks-heading">
      <SectionHeading id="tasks-heading" title="How can we help you today?" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TASKS.map(({ href, title, body, icon: Icon, emergency }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full items-start gap-4 rounded-xl border border-line bg-white p-5 transition-colors duration-150 hover:border-brand-300 hover:bg-brand-50/40 focus-visible:border-brand-300"
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-lg",
                  emergency ? "bg-alert/10 text-alert" : "bg-trust-50 text-trust-700",
                )}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <h3 className="text-lg leading-snug font-bold text-brand-700 decoration-brand-300 underline-offset-4 group-hover:underline">
                  {title}
                </h3>
                <span className="mt-1 block text-[0.95rem] leading-relaxed text-muted">{body}</span>
              </span>
              <ArrowRight
                className="mt-1 size-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
