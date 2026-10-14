import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminNav } from "@/components/admin/AdminNav";
import { SlotCard } from "@/components/admin/SlotCard";
import { MEDIA_SLOTS, SLOT_GROUPS } from "@/content/media-slots";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { listMediaItems, storageDriver, type MediaItem } from "@/lib/media-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Staff dashboard | PRIMEGALA HOSPITAL" },
  robots: { index: false, follow: false },
};

const STEPS = [
  { title: "Find the card", body: "Each card is one place on the website. The link opens that page." },
  { title: "Choose an image", body: "Take or pick a photo. Large phone photos are shrunk automatically." },
  { title: "Describe it", body: "One line on what it shows. It is read aloud to blind visitors and helps Google." },
  { title: "Upload & post", body: "It appears on the page straight away. Use the bin icon to take it down." },
];

const GROUP_INTRO: Record<(typeof SLOT_GROUPS)[number], string> = {
  Homepage: "The first page most visitors see. Promotions slide in the hero at the top.",
  Gallery: "A page of photos of the facility, the team and community events.",
  About: "Our story and care team pages.",
  Services: "Photos for each service page, shown under “A look inside”.",
};

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <div className="container-page py-16">
        <Notice tone="warn" title="The dashboard is not set up yet">
          Add an <code>ADMIN_PASSWORD</code> environment variable in Vercel (Settings → Environment Variables), then
          redeploy.
        </Notice>
      </div>
    );
  }

  if (!(await isAdmin())) {
    return (
      <div className="container-page py-16 sm:py-24">
        <AdminLogin />
      </div>
    );
  }

  const ready = Boolean(storageDriver());
  let items: MediaItem[] = [];
  let loadError = false;
  if (ready) {
    try {
      items = (await listMediaItems()).reverse();
    } catch {
      loadError = true;
    }
  }

  return (
    <div className="bg-surface pb-20">
      <div className="container-page py-10 sm:py-12">
        <AdminNav current="images" />
        <div className="mt-8">
          <p className="eyebrow">Staff only</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Image dashboard</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Post images to any page of the website. Changes go live within seconds, with no developer needed.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3 rounded-xl border border-line bg-white p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-trust-800 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{s.title}</span>
                <span className="mt-0.5 block text-sm leading-snug text-muted">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          {!ready ? (
            <Notice tone="warn" title="Image storage is not connected">
              Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel (Settings → Environment Variables), apply
              the database migration, then redeploy. Until then you can look around, but uploads are switched off.
            </Notice>
          ) : loadError ? (
            <Notice tone="warn" title="Could not load posted images">
              The storage service did not respond. Refresh the page in a minute.
            </Notice>
          ) : (
            <Notice tone="ok" title="Ready">
              Only use photos you own, and only show patients or staff who have agreed in writing. Never post anything
              with patient names, files or results on screen.
            </Notice>
          )}
        </div>

        <nav aria-label="Dashboard sections" className="mt-8 flex flex-wrap gap-2">
          {SLOT_GROUPS.map((g) => (
            <a
              key={g}
              href={`#group-${g.toLowerCase()}`}
              className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink hover:border-brand-300"
            >
              {g}
            </a>
          ))}
        </nav>

        {SLOT_GROUPS.map((group) => (
          <section key={group} id={`group-${group.toLowerCase()}`} className="mt-12 scroll-mt-28" aria-labelledby={`h-${group}`}>
            <h2 id={`h-${group}`} className="text-2xl font-bold tracking-tight text-ink">
              {group}
            </h2>
            <p className="mt-1 text-muted">{GROUP_INTRO[group]}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {MEDIA_SLOTS.filter((s) => s.group === group).map((slot) => (
                <SlotCard key={slot.id} slot={slot} items={items.filter((i) => i.slot === slot.id)} ready={ready} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Notice({ tone, title, children }: { tone: "ok" | "warn"; title: string; children: React.ReactNode }) {
  const Icon = tone === "ok" ? CheckCircle2 : AlertTriangle;
  return (
    <div
      className={`flex gap-3 rounded-xl border p-4 ${tone === "ok" ? "border-brand-200 bg-brand-50" : "border-sun-300 bg-sun-100"}`}
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${tone === "ok" ? "text-brand-700" : "text-trust-950"}`} aria-hidden />
      <div className="text-sm leading-relaxed text-ink">
        <p className="font-bold">{title}</p>
        <p className="mt-1">{children}</p>
      </div>
    </div>
  );
}
