"use client";

import { useId, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

/**
 * Click-to-load map: keeps Google's scripts and cookies off the page until the
 * visitor asks for the map (faster pages, and consent-friendly under the DPA).
 */
export function MapEmbed({ query, mapsUrl }: { query: string; mapsUrl: string }) {
  const [loaded, setLoaded] = useState(false);
  const patternId = `map-grid-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  if (loaded) {
    return (
      <iframe
        title="Map showing Primegala Medical Centre at Maili Sita"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="aspect-[4/3] w-full rounded-xl border border-line"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }
  return (
    <div className="relative flex aspect-[4/3] min-h-80 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-line bg-surface p-6 text-center">
      <svg className="absolute inset-0 size-full text-line" aria-hidden>
        <defs>
          <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        <path d="M-20 260C120 200 260 180 420 120S700 40 900 20" stroke="#dbe6f5" strokeWidth="22" fill="none" />
      </svg>
      <div className="relative">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border-4 border-white bg-brand-600 text-white">
          <MapPin className="size-6" aria-hidden />
        </span>
        <p className="mt-4 font-semibold text-ink">Maili Sita, opposite Kiamaina Primary School</p>
        <p className="mt-1 text-sm text-muted">Nakuru–Nyahururu Road, about 10 km from Nakuru town</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-800"
          >
            Show map here
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener"
            data-track="directions_click_map"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-600 bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-brand-700 hover:bg-brand-700"
          >
            <Navigation className="size-4" aria-hidden /> Open in Google Maps
          </a>
        </div>
        <p className="mt-3 text-xs text-muted">Loading the map shares data with Google.</p>
      </div>
    </div>
  );
}
