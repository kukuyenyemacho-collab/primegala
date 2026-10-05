import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "trust" | "ghost" | "whatsapp" | "sun" | "inverted";
type Size = "md" | "lg";

/**
 * Green is the action colour; trust navy is for institutional actions (SHA, information).
 * Every variant sets its own border colour so all buttons share the same box size.
 */
const variants: Record<Variant, string> = {
  primary: "border-brand-600 bg-brand-600 text-white hover:border-brand-700 hover:bg-brand-700",
  secondary: "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-800",
  trust: "border-trust-800 bg-trust-800 text-white hover:border-trust-900 hover:bg-trust-900",
  ghost: "border-transparent text-brand-700 hover:bg-brand-50",
  whatsapp: "border-[#0f7a40] bg-[#0f7a40] text-white hover:border-[#0c6435] hover:bg-[#0c6435]",
  sun: "border-sun-400 bg-sun-400 text-trust-950 hover:border-sun-300 hover:bg-sun-300",
  inverted: "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  // min-height (44px / 48px) rather than a fixed height, so a long label can wrap on a narrow phone
  // instead of pushing the page sideways.
  md: "min-h-11 px-5 py-2 text-sm gap-2",
  lg: "min-h-12 px-6 py-2 text-base gap-2.5",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-lg border text-center leading-tight font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  href,
  track,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; track?: string }) {
  const external = typeof href === "string" && /^(https?:|tel:|mailto:)/.test(href);
  const trackProps = track ? { "data-track": track } : {};
  if (external) {
    return (
      <a
        href={href as string}
        className={buttonClasses(variant, size, className)}
        {...(String(href).startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
        {...trackProps}
        {...(props as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={buttonClasses(variant, size, className)} {...trackProps} {...props} />;
}

type Tone = "white" | "surface" | "cream" | "brand" | "dark" | "trust" | "trustLight";

const tones: Record<Tone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  cream: "bg-cream",
  brand: "bg-brand-50",
  dark: "on-dark bg-brand-950 text-white",
  trust: "on-dark bg-trust-950 text-white",
  trustLight: "bg-trust-50",
};

export function Section({
  children,
  className,
  id,
  tone = "white",
  bordered = false,
  labelledBy,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: Tone;
  /** Adds a thin top rule, useful between two sections of the same tone. */
  bordered?: boolean;
  /** id of the section's heading, for aria-labelledby. */
  labelledBy?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-14 sm:py-20",
        tones[tone],
        bordered && (tone === "trust" || tone === "dark" ? "border-t border-white/10" : "border-t border-line"),
        className,
      )}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  inverted = false,
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  inverted?: boolean;
  /** id for the heading element (pair with Section labelledBy). */
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", inverted && "text-trust-200")}>{eyebrow}</p>}
      <Tag
        id={id}
        className={cn(
          "text-3xl leading-tight font-bold tracking-tight sm:text-4xl",
          eyebrow && "mt-3",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", inverted ? "text-trust-100" : "text-muted")}>{intro}</p>
      )}
    </div>
  );
}

type BadgeTone = "brand" | "trust" | "neutral" | "sun";

const badgeTones: Record<BadgeTone, string> = {
  brand: "border-brand-200 bg-brand-50 text-brand-800",
  trust: "border-trust-200 bg-trust-50 text-trust-800",
  neutral: "border-line bg-white text-ink",
  sun: "border-sun-300 bg-sun-100 text-trust-950",
};

/** Small status chip. Pills are reserved for chips like this; everything else is rounded-lg/xl. */
export function Badge({
  children,
  className,
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
