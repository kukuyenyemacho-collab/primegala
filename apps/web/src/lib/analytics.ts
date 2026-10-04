type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Conversion events (call, WhatsApp, booking, directions). No-op until analytics consent is given. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) window.gtag("event", event, params);
  else window.dataLayer?.push({ event, ...params });
}
