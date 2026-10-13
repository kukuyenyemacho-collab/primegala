"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { buttonClasses } from "@/components/ui";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "Sign-in failed.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm rounded-xl border border-line bg-white p-6 sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
        <LockKeyhole className="size-5" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">Staff dashboard</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">Sign in to post images to the website.</p>
      <label htmlFor="admin-password" className="mt-6 block text-sm font-semibold text-ink">
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 block h-11 w-full rounded-lg border border-line px-3 text-base text-ink focus:border-brand-500 focus:outline-2 focus:outline-brand-500/30"
      />
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={buttonClasses("primary", "md", "mt-6 w-full")}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
