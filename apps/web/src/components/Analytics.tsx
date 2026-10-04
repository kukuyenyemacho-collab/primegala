"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";

const CONSENT_KEY = "pg-analytics-consent";
const CONSENT_EVENT = "pg-consent-change";
type Consent = "granted" | "denied" | "unset";

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function setConsent(value: Exclude<Consent, "unset">) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode: choice lasts for this page view only */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Sends a conversion event for any element with data-track="event_name". */
function useClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (el) track(el.dataset.track!, { link_url: el.getAttribute("href") ?? undefined });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

/**
 * Consent-gated analytics. Google Analytics loads only after the visitor accepts
 * (Data Protection Act, 2019 s.30, s.32). Without NEXT_PUBLIC_GA_ID nothing loads
 * and no banner is shown.
 */
export function Analytics({ gaId }: { gaId: string | null }) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => "unset" as Consent);
  useClickTracking();

  if (!gaId) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === "unset" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-lift ring-1 ring-line md:bottom-6"
        >
          <p className="text-sm leading-relaxed text-ink/85">
            We use optional analytics cookies to understand which pages help patients find care. No advertising
            cookies, ever.{" "}
            <Link href="/legal/cookie-policy" className="font-semibold text-brand-700 underline underline-offset-2">
              Cookie Policy
            </Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="rounded-full px-5 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-200 hover:bg-brand-50"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
