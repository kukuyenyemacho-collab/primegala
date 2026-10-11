import { cn } from "@/lib/cn";

/**
 * PRIMEGALA HOSPITAL mark: the facility's green and blue cross with a stethoscope.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-mark.png"
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={400}
      height={400}
      className={cn("object-contain", className)}
    />
  );
}

/**
 * Wordmark lockup in Plus Jakarta Sans: "PRIMEGALA" in bold deep navy (trust) over a
 * small tracked "HOSPITAL" in green. `inverted` is for navy and dark surfaces.
 */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans text-[1.4rem] font-bold tracking-tight",
            inverted ? "text-white" : "text-trust-950",
          )}
        >
          PRIMEGALA
        </span>
        <span
          className={cn(
            "mt-1 font-sans text-[0.68rem] font-bold tracking-[0.32em] uppercase",
            inverted ? "text-trust-200" : "text-brand-600",
          )}
        >
          HOSPITAL
        </span>
      </span>
    </span>
  );
}
