"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LeadStatus } from "@/lib/lead-store";

const NEXT: Record<LeadStatus, { to: LeadStatus; label: string } | null> = {
  new: { to: "contacted", label: "Mark contacted" },
  contacted: { to: "done", label: "Mark done" },
  done: { to: "new", label: "Reopen" },
};

export function LeadStatusButton({ id, status }: { id: string; status: LeadStatus }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const next = NEXT[status];
  if (!next) return null;
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const res = await fetch("/api/admin/leads", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, status: next.to }),
        });
        setBusy(false);
        if (res.ok) router.refresh();
        else window.alert("Could not update. Please try again.");
      }}
      className="inline-flex min-h-9 items-center rounded-lg border border-line bg-white px-3 text-sm font-semibold text-ink hover:border-brand-300 disabled:opacity-60"
    >
      {busy ? "Saving…" : next.label}
    </button>
  );
}
