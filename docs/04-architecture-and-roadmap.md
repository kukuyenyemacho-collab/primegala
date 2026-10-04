# Primegala Platform: Architecture & Roadmap

One platform, two faces: the **public marketing site** (live first) and **Primegala CareOS**, the modular HMIS/ERP that becomes the system of record and integrates with SHA through the DHA AfyaLink Health Information Exchange.

## 1. Architecture

```
                    Patients (phone-first)
        Google · Maps · AI assistants · WhatsApp · Facebook
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│  apps/web: Public site (Next.js, static, primegala.co.ke)  │
│  Services · SHA guide · Health Hub · Book · Policies       │
│  SEO/GEO: JSON-LD, sitemap, llms.txt, RSS                  │
│  POST /api/leads ── validate (zod) ── consent record       │
└───────────────┬────────────────────────────────────────────┘
                │ HTTPS + HMAC-SHA256 signature + idempotency key
                │ { lead envelope, FHIR R4 Bundle }
                ▼
┌────────────────────────────────────────────────────────────┐
│  apps/hmis: Primegala CareOS (Phase 2+)                    │
│  Leads inbox → Registration/MPI → Queue → OPD → Lab →      │
│  Pharmacy → Billing/M-Pesa → Inpatient → Reports           │
│  FHIR R4 internal model · audit log · RBAC                 │
└──────┬───────────────────────┬─────────────────────┬───────┘
       │                       │                     │
       ▼                       ▼                     ▼
 DHA AfyaLink HIE        WhatsApp Cloud API     M-Pesa Daraja
 · Client Registry       · reminders            · STK push
 · Facility/HW registry  · results-ready        · C2B reconciliation
 · Eligibility/Pre-auth  · booking bot
 · SHA claim bundles     · opt-out (STOP)       KHIS / DHIS2
                                                · MOH 705/711/717
```

**Shared contracts** (`packages/contracts`) are used by both apps:

- `SERVICE_CODES`: stable service catalogue (appointment types, billing items)
- `leadInputSchema` / `buildLead`: validated lead envelope with consent and attribution
- `leadToFhirBundle`: FHIR R4 transaction Bundle. An appointment request maps to `Patient` + `Appointment(status=proposed)`; any other lead maps to `Patient` + `Task`.
- `signWebhook` / `verifyWebhook`: HMAC-SHA256 with a 5-minute replay window
- `normalizeKenyanPhone`: E.164 keys for patient matching

## 2. Lead → patient flow (built now)

1. A patient submits the form, chooses WhatsApp, call or SMS, and gives explicit consent. An optional marketing opt-in is stored separately.
2. `/api/leads` validates the request, checks the honeypot, rate-limits, and builds the lead with UTM/referrer attribution.
3. The site POSTs `{ lead, fhir }` to `HMIS_LEADS_WEBHOOK_URL` with `x-primegala-signature` and `idempotency-key` headers.
4. The HMIS verifies the signature, then dedupes on the lead id and on phone (E.164).
5. Front desk sees the lead in the **Leads inbox**, contacts the patient, and converts the lead into a registered patient (Client Registry lookup) plus a booked appointment.
6. Marketing reports cover leads by source, campaign and service, and conversion to visits.

The production site **refuses to drop leads silently**. If the HMIS is unreachable, the patient is told to call or WhatsApp. `LEADS_LOG_ONLY=true` exists only for demos and staging.

## 3. CareOS modules (modular, in delivery order)

| Phase | Module | Key capabilities | Integrations |
|---|---|---|---|
| **1** (done) | Public site | Marketing, SEO/GEO, lead capture, policies | GA4 (consented), WhatsApp click-to-chat |
| **2a** | Core & identity | Users, RBAC (least privilege), audit log, facility settings | DHA Health Worker Registry |
| 2a | Registration / MPI | Patient search, CR lookup by ID, dependants, consent capture | **AfyaLink Client Registry** |
| 2a | Leads inbox & appointments | Website and WhatsApp leads, calendar, queue tokens, triage | Site webhook, WhatsApp |
| **2b** | OPD / EMR | Vitals, SOAP notes, ICD-11 diagnoses, orders, prescriptions | |
| 2b | Billing & cashier | Tariffs, invoices, receipts, M-Pesa STK push and reconciliation | **M-Pesa Daraja**, KRA eTIMS |
| 2b | **SHA claims** | Eligibility, pre-auth, claim bundle build, status tracking, rejections | **AfyaLink** (FHIR) |
| **3** | Laboratory | Orders, specimen tracking, results, reference ranges | Analyser integration (optional) |
| 3 | Pharmacy & inventory | Dispensing, stock, batches and expiry, reorder levels, suppliers | |
| 3 | Inpatient | Admissions, bed board, nursing notes, discharge summaries | SHIF inpatient claims |
| 3 | MCH suite | ANC (8 contacts), partograph, PNC, immunisation (KEPI), FP, HTS registers | |
| **4** | Reporting | MOH 705A/B, 711, 717, 731 auto-generated; dashboards | **KHIS / DHIS2** |
| 4 | ERP back office | GL, expenses, procurement, HR, rota, payroll | KRA, banks |
| 4 | Patient engagement | WhatsApp bot, reminders, results-ready, satisfaction surveys | **WhatsApp Cloud API** |
| 5 | MyPrimegala portal | Appointments, visit history, invoices, M-Pesa payments | |

## 4. DHA certification readiness (design requirements)

- FHIR R4 resources and identifiers aligned to AfyaLink: Client Registry (CR number), facility code, practitioner IDs, and SHA intervention codes for claim items.
- Encryption in transit (TLS 1.2+) and at rest; field-level encryption for sensitive identifiers.
- Role-based access with least privilege (Digital Health Regulations 2025); break-glass access with justification.
- Immutable audit log of every read and write of patient data.
- Kenya-hosted primary data store (Digital Health Act; DP General Regulations reg. 26).
- Backups with tested restore, uptime monitoring, and an incident and breach runbook (72-hour ODPC notification).
- Consent records linked to the policy version (`site.policyVersion` is already stored with every web lead).

## 5. Recommended stack for CareOS

- **TypeScript monorepo** (this repo): `apps/web`, `apps/hmis`, `packages/contracts`, `packages/fhir`, `packages/ui`
- **Next.js** (staff web app, PWA for tablets) and a **Node API** layer
- **PostgreSQL**, with FHIR-shaped JSONB plus relational indexes (or a FHIR server such as HAPI FHIR if certification demands one)
- Background jobs for claim submission retries, WhatsApp sends and reports
- Hosting: Kenyan cloud region or local data centre for the HMIS; the marketing site can stay on a global CDN since it holds no patient records

## 6. Marketing roadmap (next 90 days)

| Weeks | Work |
|---|---|
| 1 | Confirm facts and assets; buy primegala.co.ke; claim and complete Google Business Profile; deploy |
| 1–2 | Clinician reviews Health Hub articles (adds name and date) → mark as reviewed |
| 2 | Google Search Console and Bing Webmaster: submit sitemap; GA4 conversions (call, WhatsApp, lead) |
| 2–4 | Citations: KMHFR corrections, SHA facility list, Bing Places, Apple Business Connect, Kenyan directories |
| 3–12 | Publish 2 Health Hub posts a week (calendar in `05-seo-geo-playbook.md`); weekly Google Business posts |
| 4 | WhatsApp Business: catalogue, quick replies, greeting/away messages; QR codes on signage |
| 6+ | Review programme (KMPDC-compliant: ask, never incentivise); Kiswahili pages |
| 8+ | Small Google Ads campaign on "24 hour clinic" and "maternity" terms within 10 km |
