import { cn } from "@/lib/cn";

/**
 * Primegala mark: a two-tone medical cross carrying a leaf, meaning care that
 * grows with the community. Proposed refresh of the facility's existing green
 * identity; swap for the official logo files once supplied.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="17" y="2" width="14" height="44" rx="7" fill="#167A41" />
      <rect x="2" y="17" width="44" height="14" rx="7" fill="#1F9450" />
      <path d="M24 34.5c-5.6-4.8-5.9-12.6 0-19.5 5.9 6.9 5.6 14.7 0 19.5Z" fill="#fff" />
      <path d="M24 32.2V19.4" stroke="#1F9450" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 27.4l2.6-2.4M24 23.8l-2.3-2" stroke="#1F9450" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.45rem] font-semibold tracking-tight",
            inverted ? "text-white" : "text-brand-900",
          )}
        >
          Primegala
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-bold tracking-[0.24em] uppercase",
            inverted ? "text-brand-200" : "text-brand-600",
          )}
        >
          Medical Centre
        </span>
      </span>
    </span>
  );
}
