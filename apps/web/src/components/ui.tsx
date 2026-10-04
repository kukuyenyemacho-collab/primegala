import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "sun" | "inverted";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  secondary: "bg-white text-brand-800 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
  ghost: "text-brand-700 hover:bg-brand-50",
  whatsapp: "bg-[#128C4A] text-white hover:bg-[#0f7a40] shadow-sm",
  sun: "bg-sun-400 text-brand-950 hover:bg-sun-300 shadow-sm",
  inverted: "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/15",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-6 text-base gap-2.5",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2",
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

export function Section({
  children,
  className,
  id,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "surface" | "cream" | "brand" | "dark";
}) {
  const tones = {
    white: "bg-white",
    surface: "bg-surface",
    cream: "bg-cream",
    brand: "bg-brand-50",
    dark: "bg-brand-950 text-white",
  };
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      <div className="container-page">{children}</div>
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
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  inverted?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow", inverted && "text-sun-300")}>
          <span className={cn("h-px w-6", inverted ? "bg-sun-300" : "bg-brand-400")} aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "mt-3 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", inverted ? "text-brand-100" : "text-muted")}>{intro}</p>
      )}
    </div>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 ring-1 ring-inset ring-brand-100",
        className,
      )}
    >
      {children}
    </span>
  );
}
