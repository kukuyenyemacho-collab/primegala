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
 * Wordmark in Plus Jakarta Sans. On phones the full name sits on one line, "PRIMEGALA" in
 * deep navy and "HOSPITAL" in green, sized to the screen; from tablet up it becomes a lockup
 * of "PRIMEGALA" over a small tracked "HOSPITAL". `inverted` is for navy and dark surfaces.
 */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2 sm:gap-2.5", className)}>
      <LogoMark className="size-8 shrink-0 sm:size-10" />
      <span
        className={cn(
          "font-sans text-[clamp(0.8rem,4.1vw,1.05rem)] leading-none font-extrabold tracking-tight whitespace-nowrap sm:hidden",
          inverted ? "text-white" : "text-trust-950",
        )}
      >
        PRIMEGALA <span className={inverted ? "text-trust-200" : "text-brand-600"}>HOSPITAL</span>
      </span>
      <span className="hidden flex-col leading-none sm:flex">
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
