"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";
import {
  ArrowRight,
  Baby,
  BookOpen,
  CalendarCheck,
  CircleHelp,
  FileText,
  LoaderCircle,
  MapPin,
  Scale,
  Search,
  ShieldCheck,
  Siren,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Dialog } from "@/components/Dialog";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { SearchEntry, SearchType } from "@/lib/search";
import { OPEN_SEARCH_EVENT } from "./events";
import {
  groupResults,
  highlightParts,
  parseQuery,
  prepareIndex,
  searchIndex,
  type ParsedQuery,
  type PreparedIndex,
} from "./search-engine";

const QUICK_LINKS: { title: string; href: string; description: string; icon: LucideIcon; tone?: "alert" }[] = [
  { title: "Book a visit", href: "/book", description: "Request an appointment or a call back", icon: CalendarCheck },
  { title: "SHA at Primegala", href: "/sha", description: "Registration, cover and what to bring", icon: ShieldCheck },
  {
    title: "Emergency care",
    href: "/emergency",
    description: "What to do and when to come in",
    icon: Siren,
    tone: "alert",
  },
  { title: "Find us", href: "/contact", description: "Maili Sita, opposite Kiamaina Primary School", icon: MapPin },
  { title: "Maternity", href: "/services/maternity", description: "Labour, birth and care after delivery", icon: Baby },
];

const POPULAR = ["Antenatal", "Malaria", "Family planning", "Laboratory", "Immunisation", "SHA"];

const TYPE_ICONS: Record<SearchType, LucideIcon> = {
  service: Stethoscope,
  article: BookOpen,
  page: FileText,
  faq: CircleHelp,
  policy: Scale,
};

// Fetched once per page load, the first time search opens, then shared.
let indexRequest: Promise<PreparedIndex> | null = null;
function loadIndex() {
  indexRequest ??= fetch("/search-index.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Search index: HTTP ${res.status}`);
      return res.json() as Promise<SearchEntry[]>;
    })
    .then(prepareIndex)
    .catch((error: unknown) => {
      indexRequest = null; // allow a retry
      throw error;
    });
  return indexRequest;
}

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

const isPlainClick = (e: MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

function Highlight({ text, query }: { text: string; query: ParsedQuery }) {
  return (
    <>
      {highlightParts(text, query).map((part, i) =>
        part.hit ? (
          <mark key={i} className="rounded-[2px] bg-sun-200 text-ink">
            {part.text}
          </mark>
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}

interface Option {
  key: string;
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  tone?: "alert";
}

/**
 * Header search: a trigger button plus an accessible search dialog.
 * Opens with the button, the "/" key, Ctrl/Cmd+K, or the `open-search` window event
 * (see ./events.ts). Results are grouped by type and navigable with the arrow keys.
 * Render once per page.
 */
export function SiteSearch({ className }: { className?: string }) {
  const router = useRouter();
  const uid = useId();
  const listId = `${uid}-results`;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<PreparedIndex | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const fetchIndex = useCallback(() => {
    setStatus((s) => (s === "ready" ? s : "loading"));
    loadIndex().then(
      (loaded) => {
        setIndex(loaded);
        setStatus("ready");
      },
      () => setStatus("error"),
    );
  }, []);

  const openSearch = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
    fetchIndex();
  }, [fetchIndex]);

  // Keyboard shortcuts and the open-search event.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;
      const commandK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey;
      const slash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey;
      if (!commandK && !slash) return;
      if (slash && isTypingTarget(e.target)) return;
      if (inputRef.current?.closest("dialog[open]")) {
        // Already open: Ctrl/Cmd+K jumps back to the search box.
        if (commandK) {
          e.preventDefault();
          inputRef.current.select();
        }
        return;
      }
      if (document.querySelector("dialog[open]")) return; // another dialog is open
      e.preventDefault();
      openSearch();
    };
    window.addEventListener(OPEN_SEARCH_EVENT, openSearch);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, openSearch);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openSearch]);

  // Focus the box once the dialog is showing (Dialog calls showModal in its own effect, which runs first).
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const parsed = useMemo(() => parseQuery(query), [query]);
  const searching = parsed.tokens.length > 0;
  const groups = useMemo(
    () => (index && searching ? groupResults(searchIndex(index, parsed)) : []),
    [index, parsed, searching],
  );

  const options: Option[] = useMemo(
    () =>
      searching
        ? groups.flatMap((g) =>
            g.items.map((item) => ({
              key: `${item.type}:${item.href}:${item.title}`,
              title: item.title,
              href: item.href,
              description: item.description,
              icon: TYPE_ICONS[item.type],
            })),
          )
        : QUICK_LINKS.map((link) => ({ ...link, key: `quick:${link.href}` })),
    [groups, searching],
  );

  const activeIndex = options.length ? Math.min(active, options.length - 1) : -1;
  const optionId = (i: number) => `${uid}-option-${i}`;

  // Keep the highlighted option in view while moving with the arrow keys.
  useEffect(() => {
    if (activeIndex < 0) return;
    listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function choose(option: Option) {
    if (searching) track("search", { search_term: query.trim(), link_url: option.href });
    setOpen(false);
  }

  function onInputKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (!options.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIndex + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((activeIndex - 1 + options.length) % options.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const option = options[activeIndex];
      choose(option);
      router.push(option.href);
    }
  }

  const resultCount = groups.reduce((n, g) => n + g.items.length, 0);
  const announcement =
    status === "loading" && searching
      ? "Loading search"
      : status === "error" && searching
        ? "Search could not load"
        : searching
          ? resultCount
            ? `${resultCount} result${resultCount === 1 ? "" : "s"}`
            : "No results"
          : "";

  function renderOption(option: Option, i: number) {
    const Icon = option.icon;
    const selected = i === activeIndex;
    return (
      <li
        key={option.key}
        id={optionId(i)}
        role="option"
        aria-selected={selected}
        data-index={i}
        className="group"
        onMouseMove={() => {
          if (!selected) setActive(i);
        }}
      >
        <Link
          href={option.href}
          tabIndex={-1}
          onClick={(e) => {
            if (isPlainClick(e)) choose(option);
          }}
          className={cn(
            "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
            selected ? "bg-trust-50" : "hover:bg-surface",
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border",
              option.tone === "alert"
                ? "border-[#f5c6c2] bg-[#fdecea] text-alert"
                : selected
                  ? "border-trust-200 bg-white text-trust-700"
                  : "border-trust-100 bg-trust-50 text-trust-700",
            )}
          >
            <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className={cn("block font-semibold leading-snug", selected ? "text-trust-900" : "text-ink")}>
              <Highlight text={option.title} query={parsed} />
            </span>
            <span className="mt-0.5 line-clamp-2 block text-sm leading-snug text-muted">
              <Highlight text={option.description} query={parsed} />
            </span>
          </span>
          <ArrowRight
            className={cn("mt-2.5 size-4 shrink-0 text-brand-600", selected ? "opacity-100" : "opacity-0")}
            aria-hidden
          />
        </Link>
      </li>
    );
  }

  // Each group's first position in the flat options list (arrow keys move through all groups).
  const starts = groups.map((_, g) => groups.slice(0, g).reduce((n, prev) => n + prev.items.length, 0));
  const results = searching
    ? groups.map((group, g) => {
        const headingId = `${uid}-group-${group.type}`;
        return (
          <li key={group.type} role="presentation" className="mt-4 first:mt-0">
            <p id={headingId} role="presentation" className="eyebrow px-3 pb-1.5">
              {group.label}
            </p>
            <ul role="group" aria-labelledby={headingId}>
              {group.items.map((_, i) => renderOption(options[starts[g] + i], starts[g] + i))}
            </ul>
          </li>
        );
      })
    : null;

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        data-track="search_open"
        aria-haspopup="dialog"
        aria-keyshortcuts="/ Control+K Meta+K"
        className={cn(
          "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-transparent text-sm font-semibold text-trust-900 transition-colors hover:border-line hover:bg-trust-50 xl:border-line xl:px-3.5",
          className,
        )}
      >
        <Search className="size-5" aria-hidden />
        <span className="sr-only xl:not-sr-only">Search</span>
        <kbd
          aria-hidden
          className="hidden rounded border border-line bg-surface px-1.5 font-sans text-xs font-medium text-muted xl:inline"
        >
          /
        </kbd>
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Search"
        description="Find a service, health guide, answer or policy."
        size="lg"
        className="mt-4 mb-auto sm:mt-[10vh]"
      >
        <div className="sticky -top-5 z-10 -mx-6 -mt-5 bg-white px-6 pt-5 pb-3">
          <label htmlFor={`${uid}-input`} className="sr-only">
            Search the Primegala website
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              ref={inputRef}
              id={`${uid}-input`}
              type="text"
              inputMode="search"
              enterKeyHint="go"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              role="combobox"
              aria-expanded={options.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
              placeholder="Try “antenatal”, “SHA” or “malaria”"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKeyDown}
              className="block h-12 w-full rounded-lg border border-line bg-white pr-4 pl-11 text-base text-ink placeholder:text-muted/80 focus:border-brand-600"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>

        <div ref={listRef}>
          {!searching && (
            <>
              <p id={`${uid}-quick`} className="eyebrow px-3 pb-1.5">
                Suggested
              </p>
              <ul id={listId} role="listbox" aria-labelledby={`${uid}-quick`}>
                {options.map(renderOption)}
              </ul>
              <div className="mt-5 border-t border-line px-3 pt-4">
                <p className="text-xs font-semibold text-muted">Popular searches</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {POPULAR.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(term);
                          setActive(0);
                          inputRef.current?.focus();
                        }}
                        className="rounded-full border border-line px-3 py-1 text-sm font-medium text-ink transition-colors hover:border-brand-300 hover:bg-brand-50/60"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {searching && status === "ready" && resultCount > 0 && (
            <ul id={listId} role="listbox" aria-label={`Results for ${query.trim()}`}>
              {results}
            </ul>
          )}

          {searching && status === "loading" && (
            <p className="flex items-center gap-2 px-3 py-6 text-sm text-muted">
              <LoaderCircle className="size-4 animate-spin" aria-hidden /> Loading search…
            </p>
          )}

          {searching && status === "error" && (
            <div className="px-3 py-6 text-sm">
              <p className="font-semibold text-ink">Search could not load.</p>
              <p className="mt-1 text-muted">Check your connection and try again, or browse the pages below.</p>
              <button
                type="button"
                onClick={fetchIndex}
                className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-line px-4 font-semibold text-ink hover:border-brand-300"
              >
                Try again
              </button>
              <BrowseLinks onNavigate={() => setOpen(false)} />
            </div>
          )}

          {searching && status === "ready" && resultCount === 0 && (
            <div className="px-3 py-6 text-sm">
              <p className="font-semibold text-ink">No results for “{query.trim()}”.</p>
              <p className="mt-1 text-muted">Check the spelling or try a simpler word, such as “maternity” or “SHA”.</p>
              <BrowseLinks onNavigate={() => setOpen(false)} />
            </div>
          )}
        </div>

        <p className="mt-5 hidden items-center gap-4 border-t border-line pt-4 text-xs text-muted sm:flex">
          <span>
            <kbd className="rounded border border-line bg-surface px-1.5 font-sans">↑</kbd>{" "}
            <kbd className="rounded border border-line bg-surface px-1.5 font-sans">↓</kbd> to move
          </span>
          <span>
            <kbd className="rounded border border-line bg-surface px-1.5 font-sans">Enter</kbd> to open
          </span>
          <span>
            <kbd className="rounded border border-line bg-surface px-1.5 font-sans">Esc</kbd> to close
          </span>
        </p>
      </Dialog>
    </>
  );
}

function BrowseLinks({ onNavigate }: { onNavigate: () => void }) {
  const links = [
    { href: "/services", label: "All services" },
    { href: "/health-hub", label: "Health Hub" },
    { href: "/faq", label: "FAQs" },
    { href: "/contact", label: "Contact us" },
  ];
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} onClick={onNavigate} className="link-brand">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
