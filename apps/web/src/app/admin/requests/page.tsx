import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminNav } from "@/components/admin/AdminNav";
import { LeadStatusButton } from "@/components/admin/LeadStatusButton";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { listLeads, type LeadStatus, type StoredLead } from "@/lib/lead-store";
import { supabaseConfigured } from "@/lib/supabase";
import { formatKenyanPhone, getService } from "@primegala/contracts";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Booking requests | PRIMEGALA HOSPITAL" },
  robots: { index: false, follow: false },
};

const TYPE_LABEL: Record<string, string> = {
  appointment: "Book a visit",
  callback: "Call me back",
  enquiry: "Question",
  "sha-help": "SHA help",
  "maternity-tour": "Maternity visit",
};

const FILTERS: { key: LeadStatus | "all"; label: string }[] = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "done", label: "Done" },
  { key: "all", label: "All" },
];

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "medium", timeStyle: "short" }).format(
    new Date(iso),
  );

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!adminConfigured() || !(await isAdmin())) {
    return (
      <div className="container-page py-16 sm:py-24">
        {adminConfigured() ? <AdminLogin /> : <p>The dashboard password has not been set up yet.</p>}
      </div>
    );
  }

  const { status: raw } = await searchParams;
  const filter = FILTERS.find((f) => f.key === raw)?.key ?? "new";
  let leads: StoredLead[] = [];
  let failed = false;
  if (supabaseConfigured()) {
    try {
      leads = await listLeads(filter === "all" ? undefined : filter);
    } catch {
      failed = true;
    }
  }

  return (
    <div className="bg-surface pb-20">
      <div className="container-page py-10 sm:py-12">
        <AdminNav current="requests" />
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-ink">Booking requests</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Requests sent from the website. Contact each person the way they asked, then mark it contacted. This is
          personal health information: do not share or copy it outside the facility.
        </p>

        {!supabaseConfigured() ? (
          <p className="mt-6 rounded-xl border border-sun-300 bg-sun-100 p-4 text-sm text-ink">
            The database is not connected yet, so requests are not being saved here. See the setup steps in
            docs/07-image-dashboard.md.
          </p>
        ) : failed ? (
          <p className="mt-6 rounded-xl border border-sun-300 bg-sun-100 p-4 text-sm text-ink">
            Could not load requests from the database. Refresh in a minute.
          </p>
        ) : null}

        <nav aria-label="Filter requests" className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={f.key === "new" ? "/admin/requests" : `/admin/requests?status=${f.key}`}
              aria-current={filter === f.key ? "page" : undefined}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium",
                filter === f.key
                  ? "border-trust-800 bg-trust-800 text-white"
                  : "border-line bg-white text-ink hover:border-brand-300",
              )}
            >
              {f.label}
            </Link>
          ))}
        </nav>

        {leads.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-line bg-white p-8 text-center text-muted">
            No {filter === "all" ? "" : filter} requests.
          </p>
        ) : (
          <ul className="mt-6 grid gap-3">
            {leads.map((l) => {
              const phone = formatKenyanPhone(l.phone);
              const wa = `https://wa.me/${l.phone.replace(/^\+/, "")}`;
              return (
                <li key={l.id} className="rounded-xl border border-line bg-white p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                        {l.reference} · {TYPE_LABEL[l.type] ?? l.type} · {when(l.created_at)}
                      </p>
                      <p className="mt-1 text-lg font-bold text-ink">{l.full_name}</p>
                      <p className="mt-1 text-sm text-ink/85">
                        {l.service ? safeServiceName(l.service) : "No service chosen"}
                        {l.preferred_date && ` · prefers ${l.preferred_date}`}
                        {l.preferred_time && l.preferred_time !== "any" && ` (${l.preferred_time})`}
                        {l.contact_channel && ` · contact by ${l.contact_channel}`}
                      </p>
                      {l.message && <p className="mt-2 text-sm leading-relaxed text-muted">“{l.message}”</p>}
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
                        l.status === "new" && "bg-pink-50 text-pink-800",
                        l.status === "contacted" && "bg-trust-50 text-trust-800",
                        l.status === "done" && "bg-brand-50 text-brand-800",
                      )}
                    >
                      {l.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`tel:${l.phone}`}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm font-semibold text-ink hover:border-brand-300"
                    >
                      <Phone className="size-4" aria-hidden /> {phone}
                    </a>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm font-semibold text-ink hover:border-brand-300"
                    >
                      <MessageCircle className="size-4" aria-hidden /> WhatsApp
                    </a>
                    {l.email && (
                      <a
                        href={`mailto:${l.email}`}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm font-semibold text-ink hover:border-brand-300"
                      >
                        <Mail className="size-4" aria-hidden /> Email
                      </a>
                    )}
                    <LeadStatusButton id={l.id} status={l.status} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function safeServiceName(code: string) {
  try {
    return getService(code as Parameters<typeof getService>[0]).name;
  } catch {
    return code;
  }
}
