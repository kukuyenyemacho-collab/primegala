"use client";

import type { ReactNode } from "react";
import { openSiteSearch } from "./events";

/** A button anywhere on the page that opens the header search dialog. */
export function OpenSearchButton({
  className,
  track = "search_open",
  children,
}: {
  className?: string;
  /** data-track event name for analytics. */
  track?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={openSiteSearch} data-track={track} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
