"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Click-to-load map: keeps Google's scripts and cookies off the page until the
 * visitor asks for the map (faster pages, and consent-friendly under the DPA).
 */
export function MapEmbed({ query, mapsUrl }: { query: string; mapsUrl: string }) {
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    return (
      <iframe
        title="Map showing Primegala Medical Centre at Maili Sita"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="aspect-[4/3] w-full rounded-[var(--radius-card)] border-0 ring-1 ring-line"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }
  return (
    <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-brand-50 p-6 text-center ring-1 ring-brand-100">
      <svg className="absolute inset-0 size-full text-brand-100" aria-hidden>
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path d="M-20 260C120 200 260 180 420 120S700 40 900 20" stroke="#efe6d1" strokeWidth="26" fill="none" />
      </svg>
      <div className="relative">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lift">
          <MapPin className="size-7" aria-hidden />
        </span>
        <p className="mt-4 font-semibold text-ink">Maili Sita, opposite Kiamaina Primary School</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-200 hover:bg-brand-50"
          >
            Show map here
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener"
            data-track="directions_click_map"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Open in Google Maps
          </a>
        </div>
        <p className="mt-3 text-xs text-muted">Loading the map shares data with Google.</p>
      </div>
    </div>
  );
}
