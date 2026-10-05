"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, WhatsAppIcon } from "@/components/Icon";

const ACTION =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-800";

/** Copies text, falling back to a hidden textarea where the Clipboard API is unavailable (older browsers, http). */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy method
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Share an article: copy its link, or share it on WhatsApp or Facebook. These are
 * share links for the reader's own accounts, not Primegala's contact channels.
 */
export function ShareRow({ title, url, noun = "guide" }: { title: string; url: string; noun?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onCopy = async () => {
    const ok = await copyText(url);
    setState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  };

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-ink" id="share-label">
        Share this {noun}
      </p>
      <ul aria-labelledby="share-label" className="flex flex-wrap gap-2">
        <li>
          <button type="button" onClick={onCopy} className={ACTION}>
            {state === "copied" ? (
              <Check className="size-4 text-brand-600" aria-hidden />
            ) : (
              <Link2 className="size-4 text-trust-700" aria-hidden />
            )}
            {state === "copied" ? "Copied" : state === "failed" ? "Couldn’t copy" : "Copy link"}
          </button>
        </li>
        <li>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={ACTION} data-track="share_whatsapp">
            <WhatsAppIcon className="size-4 text-[#0f7a40]" />
            <span>
              <span className="sr-only">Share on </span>WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </li>
        <li>
          <a href={facebook} target="_blank" rel="noopener noreferrer" className={ACTION} data-track="share_facebook">
            <FacebookIcon className="size-4 text-[#1877f2]" />
            <span>
              <span className="sr-only">Share on </span>Facebook<span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </li>
      </ul>
      <p role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Link copied to clipboard" : state === "failed" ? "Could not copy the link. Copy it from your browser's address bar." : ""}
      </p>
    </div>
  );
}
