"use client";

import { useEffect } from "react";

/** Registers the service worker so the site installs as an app and works offline. */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
