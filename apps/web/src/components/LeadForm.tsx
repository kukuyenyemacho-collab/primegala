"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CircleAlert, CircleCheck, Lock, LoaderCircle } from "lucide-react";
import { buttonClasses } from "./ui";
import { WhatsAppIcon } from "./Icon";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type LeadType = "appointment" | "callback" | "sha-help" | "enquiry" | "maternity-tour";

const TYPE_OPTIONS: { value: LeadType; label: string }[] = [
  { value: "appointment", label: "Book a visit" },
  { value: "callback", label: "Call me back" },
  { value: "sha-help", label: "SHA help" },
  { value: "maternity-tour", label: "Maternity visit" },
  { value: "enquiry", label: "Ask a question" },
];

export interface ServiceOption {
  code: string;
  name: string;
}

interface Props {
  services: ServiceOption[];
  defaultType?: LeadType;
  defaultService?: string;
  whatsappHref: string;
  className?: string;
}

const FIRST_TOUCH_KEY = "pg-first-touch";

/**
 * Static env reads are inlined into the client bundle at build time (unlike the
 * dynamic lookups in lib/site.ts), so this matches site.contact.email everywhere.
 */
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_EMAIL?.trim() || "info@primegala.co.ke";

/** Field order for the error summary, so errors are listed top to bottom. */
const FIELD_LABELS: Record<string, string> = {
  fullName: "Full name",
  phone: "Mobile number",
  email: "Email",
  preferredDate: "Preferred date",
  consent: "Consent",
};

function collectAttribution() {
  const params = new URLSearchParams(window.location.search);
  const current = {
    landingPage: window.location.pathname,
    referrer: document.referrer || undefined,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmTerm: params.get("utm_term") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
  };
  try {
    const stored = sessionStorage.getItem(FIRST_TOUCH_KEY);
    return stored ? { ...current, ...JSON.parse(stored) } : current;
  } catch {
    return current;
  }
}

function minDate() {
  // Today in Kenya (EAT, UTC+3)
  return new Date(Date.now() + 3 * 3600 * 1000).toISOString().slice(0, 10);
}

/** Quick checks before the round trip; the server (shared zod schema) remains the source of truth. */
function validateLocally(form: FormData): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  if (String(form.get("fullName") ?? "").trim().length < 2) errors.fullName = ["Enter your name"];
  if (String(form.get("phone") ?? "").replace(/\D/g, "").length < 9) errors.phone = ["Enter your phone number"];
  if (form.get("consent") !== "on") errors.consent = ["Please agree so we can contact you about your request"];
  return errors;
}

function LeadFormInner({ services, defaultType = "appointment", defaultService, whatsappHref, className }: Props) {
  const id = useId();
  const [type, setType] = useState<LeadType>(defaultType);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState<string>();
  const [error, setError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  /** Bumped on every failed attempt so focus returns to the summary each time. */
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Only offer WhatsApp when the facility's WhatsApp number is really configured.
  const whatsappReady = /^https:\/\/wa\.me\//.test(whatsappHref);
  const fallbackContact = whatsappReady
    ? "message us on WhatsApp"
    : `email ${CONTACT_EMAIL}`;

  // Remember where the visitor first came from (session only), for marketing attribution.
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(FIRST_TOUCH_KEY)) {
        const params = new URLSearchParams(window.location.search);
        const firstTouch = Object.fromEntries(
          [
            ["landingPage", window.location.pathname],
            ["referrer", document.referrer],
            ["utmSource", params.get("utm_source")],
            ["utmMedium", params.get("utm_medium")],
            ["utmCampaign", params.get("utm_campaign")],
          ].filter(([, v]) => v),
        );
        sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
      }
    } catch {
      /* storage unavailable: attribution falls back to the current page */
    }
  }, []);

  // Move focus to the error summary or the confirmation so screen readers announce it.
  useEffect(() => {
    if (status === "error") summaryRef.current?.focus();
    if (status === "done") successRef.current?.focus();
  }, [status, attempt]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const localErrors = validateLocally(form);
    if (Object.keys(localErrors).length) {
      setFieldErrors(localErrors);
      setError("Please check the highlighted fields.");
      setStatus("error");
      setAttempt((n) => n + 1);
      return;
    }

    const payload = {
      type,
      fullName: form.get("fullName"),
      phone: form.get("phone"),
      email: form.get("email") || "",
      service: form.get("service") || undefined,
      preferredDate: form.get("preferredDate") || "",
      preferredTime: form.get("preferredTime") || undefined,
      preferredChannel: form.get("preferredChannel") || "whatsapp",
      message: form.get("message") || undefined,
      consent: form.get("consent") === "on",
      marketingOptIn: form.get("marketingOptIn") === "on",
      website: form.get("website") || "",
      attribution: collectAttribution(),
    };

    setStatus("sending");
    setError(undefined);
    setFieldErrors({});
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        const validation = res.status === 422 || res.status === 400;
        setFieldErrors(json.fieldErrors ?? {});
        setError(
          validation
            ? (json.error ?? "Please check the highlighted fields.")
            : `We couldn't send your request just now. Please try again in a few minutes, ${fallbackContact}, or come straight in: we're open 24 hours.`,
        );
        setStatus("error");
        setAttempt((n) => n + 1);
        return;
      }
      setReference(json.reference);
      setStatus("done");
      track("generate_lead", { lead_type: type, service: String(payload.service ?? "") });
    } catch {
      setError(`You appear to be offline. Please try again when you're connected, ${fallbackContact}, or come straight in: we're open 24 hours.`);
      setStatus("error");
      setAttempt((n) => n + 1);
    }
  }

  if (status === "done") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-xl border border-brand-200 bg-brand-50 p-6 focus:outline-none sm:p-8", className)}
      >
        <CircleCheck className="size-10 text-brand-600" aria-hidden />
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">Asante! We&apos;ve got your request.</h3>
        <p className="mt-2 leading-relaxed text-ink/85">
          Your reference is <strong className="font-bold whitespace-nowrap text-ink">{reference}</strong>. Our team will
          contact you shortly, using the channel you chose, to confirm. If it&apos;s urgent, please don&apos;t wait: come
          straight in, we&apos;re open 24 hours.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {whatsappReady && (
            <a href={whatsappHref} className={buttonClasses("whatsapp", "md")} data-track="whatsapp_click_form_success">
              <WhatsAppIcon className="size-5" /> Continue on WhatsApp
            </a>
          )}
          <Link
            href="/patients-and-visitors#before-your-visit"
            className={buttonClasses(whatsappReady ? "secondary" : "primary", "md")}
            data-track="guide_click_form_success"
          >
            What to bring to your visit <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  const errorId = (name: string) => `${id}-${name}-error`;
  const err = (name: string) =>
    fieldErrors[name]?.[0] ? (
      <p id={errorId(name)} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-alert">
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          <span className="sr-only">Error: </span>
          {fieldErrors[name][0]}
        </span>
      </p>
    ) : null;
  /** aria wiring for a field: its hint (if any) plus its error (if any). */
  const describe = (name: string, hintId?: string) => {
    const ids = [hintId, fieldErrors[name] ? errorId(name) : undefined].filter(Boolean).join(" ");
    return {
      ...(fieldErrors[name] ? { "aria-invalid": true as const } : {}),
      ...(ids ? { "aria-describedby": ids } : {}),
    };
  };
  const summaryItems = Object.keys(FIELD_LABELS).filter((name) => fieldErrors[name]?.[0]);

  const input =
    "block min-h-11 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-ink/30 focus:border-brand-600 aria-invalid:border-alert aria-invalid:ring-1 aria-invalid:ring-alert";
  const label = "mb-1.5 block text-sm font-semibold text-ink";
  const hint = "mt-1.5 text-sm text-muted";
  const optional = <span className="font-normal text-muted">(optional)</span>;
  const showSchedule = type === "appointment" || type === "maternity-tour";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "sending"}
      className={cn("@container rounded-xl border border-line bg-white p-5 sm:p-8", className)}
    >
      {status === "error" && error && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${id}-summary-title`}
          className="mb-6 rounded-lg border-2 border-alert bg-[#fdf0ef] p-4 focus:outline-none sm:p-5"
        >
          <h3 id={`${id}-summary-title`} className="flex items-center gap-2 text-base font-bold text-alert">
            <CircleAlert className="size-5 shrink-0" aria-hidden /> There is a problem
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink">{error}</p>
          {summaryItems.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {summaryItems.map((name) => (
                <li key={name}>
                  <a
                    href={`#${id}-${name}`}
                    onClick={(e) => {
                      // useId values contain characters that make fragment links unreliable; focus directly.
                      e.preventDefault();
                      document.getElementById(`${id}-${name}`)?.focus();
                    }}
                    className="font-semibold text-alert underline underline-offset-2"
                  >
                    {FIELD_LABELS[name]}: {fieldErrors[name][0]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <fieldset>
        <legend className={label}>How can we help?</legend>
        <div className="grid grid-cols-2 gap-2 @lg:grid-cols-3">
          {TYPE_OPTIONS.map((o) => (
            <label key={o.value} className="relative block cursor-pointer">
              <input
                type="radio"
                name="type"
                value={o.value}
                checked={type === o.value}
                onChange={() => setType(o.value)}
                className="peer sr-only"
              />
              <span className="flex min-h-11 items-center justify-center rounded-lg border border-line bg-white px-3 py-2 text-center text-sm leading-tight font-semibold text-ink/85 transition-colors peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:text-brand-800 peer-checked:ring-1 peer-checked:ring-brand-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600 hover:border-brand-300">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 @md:grid-cols-2">
        <div className="@md:col-span-2">
          <label htmlFor={`${id}-fullName`} className={label}>
            Full name
          </label>
          <input
            id={`${id}-fullName`}
            name="fullName"
            autoComplete="name"
            required
            className={input}
            {...describe("fullName")}
          />
          {err("fullName")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Mobile number
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0712 345 678"
            required
            className={input}
            {...describe("phone", `${id}-phone-hint`)}
          />
          <p id={`${id}-phone-hint`} className={hint}>
            We use this to confirm your request.
          </p>
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email {optional}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={input}
            {...describe("email")}
          />
          {err("email")}
        </div>

        {(type === "appointment" || type === "callback" || type === "enquiry") && (
          <div className="@md:col-span-2">
            <label htmlFor={`${id}-service`} className={label}>
              Service
            </label>
            <select id={`${id}-service`} name="service" defaultValue={defaultService ?? ""} className={input}>
              <option value="">Not sure / general visit</option>
              {services.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {type === "maternity-tour" && <input type="hidden" name="service" value="maternity" />}

        {showSchedule && (
          <>
            <div>
              <label htmlFor={`${id}-preferredDate`} className={label}>
                Preferred date {optional}
              </label>
              <input
                id={`${id}-preferredDate`}
                name="preferredDate"
                type="date"
                min={minDate()}
                suppressHydrationWarning
                className={input}
                {...describe("preferredDate")}
              />
              {err("preferredDate")}
            </div>
            <div>
              <label htmlFor={`${id}-time`} className={label}>
                Preferred time
              </label>
              <select id={`${id}-time`} name="preferredTime" defaultValue="any" className={input}>
                <option value="any">Any time</option>
                <option value="morning">Morning (8am–12pm)</option>
                <option value="afternoon">Afternoon (12–4pm)</option>
                <option value="evening">Evening (4–8pm)</option>
              </select>
            </div>
          </>
        )}

        <fieldset className="@md:col-span-2">
          <legend className={label}>How should we contact you?</legend>
          <div className="grid gap-2 @sm:grid-cols-3">
            {[
              ["whatsapp", "WhatsApp"],
              ["call", "Phone call"],
              ["sms", "SMS"],
            ].map(([value, text]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-300 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50"
              >
                <input
                  type="radio"
                  name="preferredChannel"
                  value={value}
                  defaultChecked={value === "whatsapp"}
                  className="size-4 shrink-0 accent-brand-600"
                />
                {text}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="@md:col-span-2">
          <label htmlFor={`${id}-message`} className={label}>
            Anything we should know? {optional}
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={3}
            maxLength={1000}
            className={input}
            aria-describedby={`${id}-message-hint`}
          />
          <p id={`${id}-message-hint`} className={hint}>
            Please keep it brief. Share detailed medical history with your clinician during your visit.
          </p>
        </div>

        {/* Honeypot: hidden from people, irresistible to bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="space-y-3 border-t border-line pt-5 @md:col-span-2">
          <div>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/85">
              <input
                id={`${id}-consent`}
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-5 shrink-0 accent-brand-600"
                {...describe("consent")}
              />
              <span>
                I agree that Primegala may contact me about this request by my chosen channel, and process my details as
                described in the{" "}
                <Link href="/legal/privacy-policy" className="font-semibold text-brand-700 underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {err("consent")}
          </div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/85">
            <input type="checkbox" name="marketingOptIn" className="mt-0.5 size-5 shrink-0 accent-brand-600" />
            <span>
              Optional: send me occasional health tips and reminders on WhatsApp/SMS. Reply STOP anytime.{" "}
              <Link href="/legal/communications-consent" className="text-brand-700 underline underline-offset-2">
                Learn more
              </Link>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 @md:flex-row @md:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClasses("primary", "lg", "w-full @md:w-auto")}
        >
          {status === "sending" ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            "Send request"
          )}
        </button>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Lock className="size-3.5 shrink-0" aria-hidden /> Encrypted and kept confidential.
        </p>
      </div>
      <p className="mt-4 text-sm text-muted">
        Emergency? Don&apos;t use this form. Call{" "}
        <a href="tel:999" className="font-semibold text-alert underline underline-offset-2">
          999
        </a>{" "}
        or{" "}
        <a href="tel:112" className="font-semibold text-alert underline underline-offset-2">
          112
        </a>{" "}
        or come straight in.
      </p>
    </form>
  );
}

function LeadFormFromUrl(props: Props) {
  const params = useSearchParams();
  const type = params.get("type");
  const service = params.get("service");
  const validType = TYPE_OPTIONS.some((o) => o.value === type) ? (type as LeadType) : props.defaultType;
  const validService = props.services.some((s) => s.code === service) ? service! : props.defaultService;
  return <LeadFormInner key={`${validType}-${validService}`} {...props} defaultType={validType} defaultService={validService} />;
}

/** Reads ?type= and ?service= presets (e.g. /book?service=antenatal-care) while staying statically rendered. */
export function LeadForm(props: Props) {
  return (
    <Suspense fallback={<LeadFormInner {...props} />}>
      <LeadFormFromUrl {...props} />
    </Suspense>
  );
}
