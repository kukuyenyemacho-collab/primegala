"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useState, type FormEvent } from "react";
import { CircleCheck, Lock, LoaderCircle } from "lucide-react";
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

function LeadFormInner({ services, defaultType = "appointment", defaultService, whatsappHref, className }: Props) {
  const id = useId();
  const [type, setType] = useState<LeadType>(defaultType);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState<string>();
  const [error, setError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
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
        setFieldErrors(json.fieldErrors ?? {});
        setError(json.error ?? "Something went wrong. Please call or WhatsApp us.");
        setStatus("error");
        return;
      }
      setReference(json.reference);
      setStatus("done");
      track("generate_lead", { lead_type: type, service: String(payload.service ?? "") });
    } catch {
      setError("You appear to be offline. Please call or WhatsApp us; we're open 24 hours.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={cn("rounded-[var(--radius-card)] bg-brand-50 p-8 ring-1 ring-brand-100", className)} role="status">
        <CircleCheck className="size-10 text-brand-600" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">Asante! We&apos;ve got your request.</h3>
        <p className="mt-2 leading-relaxed text-muted">
          Your reference is <strong className="text-ink">{reference}</strong>. Our team will contact you shortly to
          confirm. If it&apos;s urgent, please don&apos;t wait: come straight in, we&apos;re open 24 hours.
        </p>
        <a
          href={whatsappHref}
          className={buttonClasses("whatsapp", "md", "mt-6")}
          data-track="whatsapp_click_form_success"
        >
          <WhatsAppIcon className="size-5" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  const err = (name: string) =>
    fieldErrors[name]?.[0] ? (
      <p id={`${id}-${name}-error`} className="mt-1.5 text-sm font-medium text-alert">
        {fieldErrors[name][0]}
      </p>
    ) : null;
  const invalid = (name: string) =>
    fieldErrors[name] ? { "aria-invalid": true, "aria-describedby": `${id}-${name}-error` } : {};

  const input =
    "block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-ink ring-1 ring-inset ring-line placeholder:text-muted/70 focus:ring-2 focus:ring-brand-600 aria-invalid:ring-alert";
  const label = "mb-1.5 block text-sm font-semibold text-ink";
  const showSchedule = type === "appointment" || type === "maternity-tour";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line sm:p-8", className)}
    >
      <fieldset>
        <legend className={label}>How can we help?</legend>
        <div className="flex flex-wrap gap-2">
          {TYPE_OPTIONS.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value={o.value}
                checked={type === o.value}
                onChange={() => setType(o.value)}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink/80 ring-1 ring-line transition peer-checked:bg-brand-600 peer-checked:text-white peer-checked:ring-brand-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className={label}>
            Full name
          </label>
          <input id={`${id}-name`} name="fullName" autoComplete="name" required className={input} {...invalid("fullName")} />
          {err("fullName")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Phone (WhatsApp)
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
            {...invalid("phone")}
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={input} {...invalid("email")} />
          {err("email")}
        </div>

        {(type === "appointment" || type === "callback" || type === "enquiry") && (
          <div className="sm:col-span-2">
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
              <label htmlFor={`${id}-date`} className={label}>
                Preferred date
              </label>
              <input
                id={`${id}-date`}
                name="preferredDate"
                type="date"
                min={minDate()}
                suppressHydrationWarning
                className={input}
                {...invalid("preferredDate")}
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

        <fieldset className="sm:col-span-2">
          <legend className={label}>Best way to reach you</legend>
          <div className="flex flex-wrap gap-4">
            {[
              ["whatsapp", "WhatsApp"],
              ["call", "Phone call"],
              ["sms", "SMS"],
            ].map(([value, text]) => (
              <label key={value} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <input
                  type="radio"
                  name="preferredChannel"
                  value={value}
                  defaultChecked={value === "whatsapp"}
                  className="size-4 accent-brand-600"
                />
                {text}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={label}>
            Anything we should know? <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id={`${id}-message`} name="message" rows={3} maxLength={1000} className={input} />
          <p className="mt-1.5 text-xs text-muted">
            Please keep it brief. Share detailed medical history with your clinician during your visit.
          </p>
        </div>

        {/* Honeypot: hidden from people, irresistible to bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="space-y-3 sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/85">
            <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-brand-600" {...invalid("consent")} />
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
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/85">
            <input type="checkbox" name="marketingOptIn" className="mt-1 size-4 shrink-0 accent-brand-600" />
            <span>
              Optional: send me occasional health tips and reminders on WhatsApp/SMS. Reply STOP anytime.{" "}
              <Link href="/legal/communications-consent" className="text-brand-700 underline underline-offset-2">
                Learn more
              </Link>
            </span>
          </label>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-[#fdecea] px-4 py-3 text-sm font-medium text-alert">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {status === "sending" ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            "Send request"
          )}
        </button>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Lock className="size-3.5" aria-hidden /> Encrypted and kept confidential.
        </p>
      </div>
      <p className="mt-4 text-xs text-muted">
        Emergency? Don&apos;t use this form. Call <a href="tel:999" className="font-semibold">999</a> /{" "}
        <a href="tel:112" className="font-semibold">112</a> or come straight in.
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
