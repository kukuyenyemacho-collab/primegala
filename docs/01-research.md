# Research Findings: Primegala Digital Platform

*Compiled 4 October 2026 by Steff Cloud Limited. Sources are listed at the end. Items marked **CONFIRM** must be verified with the facility.*

## 1. The facility

| | |
|---|---|
| Registered name | **Primegala Medical Centre** (client refers to it as "Primegala Hospital": **CONFIRM** licence) |
| Registry | Kenya Master Health Facility Registry (KMHFR) |
| Level / type | **KEPH Level 3**, Medical Centre, operational and licensed |
| Opened | **1 March 2022** |
| Ownership | Private, owned by a clinical officer (per KMHFR) |
| Location | Along the Nakuru–Nyahururu Road at **Maili Sita Centre**; Kabatini Ward, Nakuru North (Bahati) Sub-County, Nakuru County |
| Landmark | Opposite **Kiamaina Primary School** (client); KMHFR also lists Kingdom Seeker Church nearby |
| Hours | **Open 24 hours** (KMHFR) |
| Listed services | General outpatient, long-acting family planning, inpatient, HIV testing & counselling, focused antenatal care |
| Brand today | Minimal branding; primary green is the main colour |
| Online presence | No website found. KMHFR listing and third-party directory entries only. **Opportunity: be first.** |

**Local context**

- *Maili Sita* means "six miles" (about 10 km from Nakuru town). The name itself carries the core story: care close to home.
- Nakuru North sub-county is Bahati constituency: Dundori, Kabatini, Kiamaina, Lanet/Umoja and Bahati wards.
- Health facilities nearby:
  - **Esther Memorial Maternity & Nursing Home**, also on the Nakuru–Nyahururu Rd opposite Kiamaina Primary School (direct maternity competitor).
  - **Kenlands Health Services**, Maili Sita.
  - **Bahati Sub-County Hospital**, a public facility at Maili Kumi.
  - **Nakuru Specialist Hospital**, Lanet.
  - Town hospitals: Valley, Mediheal, Nakuru Annex, Nairobi Women's Nakuru and others.
- Most local competitors have weak or no websites. Several rely on directories (Vezeeta, businesslist) and Facebook. A fast, content-rich, SHA-focused site with strong local SEO is a clear competitive gap.

## 2. What the best hospital websites do

### International benchmarks (Mayo Clinic, Cleveland Clinic, top 2026 healthcare sites)
- **Patient-task navigation**, not org-chart navigation: Find care, Book, Locations, Health library.
- **Search-first, mobile-first** with persistent booking.
- **Health library as a publication**: medically reviewed, dated, re-reviewed on a schedule. Mayo reviews content at least every two years. This is the backbone of their SEO.
- **Story-driven trust**: real patient stories (with consent), human photography.
- **Calming palettes**: greens and warm neutrals are replacing clinical blue (good news for Primegala's green).

### Kenyan benchmarks (Aga Khan, MP Shah, Mater, Nairobi Hospital)
- Find-a-doctor by specialty, online booking, contact and referral desks.
- **WhatsApp** is the dominant booking channel. A phone number and WhatsApp must sit beside every form, because urgent bookings happen by call.
- **Google Business Profile** is the single highest-impact local action. Most patients search "clinic near me" before calling.

**Applied to Primegala:** a mobile bottom action bar (Call, WhatsApp, Book, Directions), patient-task navigation, a Health Hub with clinical-review badges, SHA guidance front and centre, and a story built on "six miles".

## 3. SEO and GEO (generative engine optimisation) in 2026

- AI Overviews appear on a large share of health searches, and ChatGPT, Gemini, Claude and Perplexity now answer "which clinic near Bahati is open at night?" directly. Being **the cited source** matters as much as ranking.
- What gets cited:
  - Answer-first paragraphs ("Short answer: …")
  - Question-style headings
  - Tables and checklists
  - FAQ blocks with `FAQPage` schema
  - Clear entity facts (name, address, hours, level, services)
  - Medical review dates and authorship
- Schema priorities:
  - `MedicalClinic` / `MedicalOrganization`, with `LocalBusiness` properties (hours, geo, area served, payment)
  - `MedicalWebPage`
  - `FAQPage`
  - `BreadcrumbList`
  - `Article` with `reviewedBy` and `lastReviewed`
- `llms.txt` gives AI crawlers a curated, factual map of the site.
- Health is "Your Money or Your Life" (YMYL) content: credentialed review is required to rank.

## 4. SHA and HMIS integration

- **SHA replaced NHIF** in October 2024. Three funds:
  - **Primary Healthcare Fund (PHCF):** primary care at Levels 2–3, funded for registered members.
  - **Social Health Insurance Fund (SHIF):** inpatient and higher-level care; needs active contributions.
  - **Emergency, Chronic & Critical Illness Fund (ECCIF).**
- Member registration: USSD **\*147#** or the SHA portal.
- **Mandate:** SHA-contracted facilities must use a **DHA-certified HMIS** integrated with the national Health Information Exchange (HIE). The deadline was extended to **30 September 2026**; non-compliant facilities risk losing their contract.
- **AfyaLink** (Digital Health Agency integration hub) exposes FHIR-based APIs:
  - **Client Registry:** `GET /v3/client-registry/fetch-client?identification_type=…&identification_number=…` (CR number lookup)
  - **Coverage / eligibility** checks for SHA and PFMS
  - **Pre-authorisation** integration
  - **Claim submission** as a FHIR `Bundle` (Organization, Coverage, Patient, Claim) to the SHR mediator `/v1/shr-med/bundle`. Items must use valid SHA/PFMS intervention codes.
- **Implication:** the HMIS must be FHIR R4-native. The marketing site already hands off leads as FHIR R4 bundles (`packages/contracts`), so the public site and HMIS share one data language from day one.

## 5. Regulation affecting the website

| Law / rule | What it means for the site |
|---|---|
| **Medical Practitioners and Dentists (Practitioners and Health Facilities) (Advertising) Rules, 2016**, KMPDC | Ads must be objective, true and dignified. No promised outcomes, no denigrating competitors, no naming or picturing patients without consent. Superlatives like "best hospital in Nakuru" are risky. We use factual claims: 24-hour, Level 3, since 2022, opposite Kiamaina Primary. |
| **Data Protection Act, 2019** + General Regulations 2021 + ODPC Health Data Guidance Note | Health data is sensitive. Explicit, specific, revocable consent; data minimisation; rights requests; 72-hour breach notification; **mandatory ODPC registration for health facilities**. Separate opt-in for marketing (s.37). |
| **Digital Health Act, 2023** + Health Information Management Procedures Regulations, 2025 | Encryption, least-privilege access, audit logs, Kenya-based storage of health data, DHA certification of systems. |
| **Health Act, 2017** | Confidentiality of patient information (s.11); right to emergency treatment. |
| **Constitution Art. 43(2)** | No one may be denied emergency medical treatment. |
| **Kenya National Patients' Rights Charter (2013)** | Basis for the Patient Rights page. |
| **Consumer Protection Act, 2012**; **Computer Misuse and Cybercrimes Act, 2018**; **KICA Consumer Protection Regulations, 2010** | Terms of Use, acceptable use, consent for SMS/WhatsApp marketing. |

All nine policies are on the site under `/legal`. **They must be reviewed by an advocate before launch.**

## 6. Opportunities we're building on

1. **First-mover website** in Maili Sita and Kabatini. Own "hospital Maili Sita", "24 hour clinic Bahati" and "SHA hospital Nakuru North".
2. **SHA confusion is high.** A plain-language SHA guide earns trust, links and AI citations.
3. **Maternity:** free delivery under PHCF for registered members at Level 2–3 is a strong, factual message (**CONFIRM** maternity is offered).
4. **The night-time gap.** The 24-hour story is distinctive and true.
5. **The HMIS mandate deadline has just passed.** A certified, integrated HMIS is urgent for the facility, and it's the bigger project the marketing site feeds into.

## Sources

- [KMHFR: Primegala Medical Centre](https://kmhfr.health.go.ke/public/facilities/06399453-54aa-4da6-ad0b-8bd9a01e2dae)
- [Nakuru health facilities that accept SHA (Achi Systems directory)](https://achisystems.co.ke/directory/nakuru-health-facilities-and-hospitals-that-accept-sha/)
- [Kiamaina Primary School, Bahati](https://primaryschool.co.ke/nakuru/bahati/subukia/kiamaina-11773/)
- [SHA extends HMIS compliance deadline (Kenyans.co.ke)](https://www.kenyans.co.ke/news/126681-sha-extends-deadline-healthcare-providers-comply-hmis)
- [SHA HMIS integration ultimatum (Nairobi Wire)](https://nairobiwire.com/2026/07/sha-hmis-integration-deadline-healthcare-providers-kenya.html)
- [AfyaLink: SHA Claim Bundle](https://afyalink.dha.go.ke/apidocs/claim-bundle) · [Client Registry APIs](https://afyalink.dha.go.ke/apidocs/client-registry-api) · [HMIS–SHA integration guide](https://afyalink.dha.go.ke/hmis-sha-integration-guide)
- [KMPDC Advertising Rules 2016 (Legal Notice 130)](https://kmpdc.go.ke/resources/Advertising_Rules.pdf)
- [ODPC Guidance Note on Processing of Health Data](https://www.odpc.go.ke/wp-content/uploads/2024/02/ODPC-Guidance-Note-on-Processing-of-Health-Data.pdf)
- [Data Protection Act 2019](https://www.odpc.go.ke/wp-content/uploads/2024/02/TheDataProtectionAct__No24of2019.pdf)
- [Registration of Data Controllers and Processors Regulations 2021](https://www.odpc.go.ke/wp-content/uploads/2024/03/THE-DATA-PROTECTION-REGISTRATION-OF-DATA-CONTROLLERS-AND-DATA-PROCESSORS-REGULATIONS-2021.pdf)
- [Digital Health Act 2023](https://new.kenyalaw.org/akn/ke/act/2023/15/eng@2023-11-24) · [Health Information Management Procedures Regulations 2025](https://new.kenyalaw.org/akn/ke/act/ln/2025/76/eng@2025-04-11)
- [Patients' Rights Charter launch (ehospice)](https://ehospice.com/kenya_posts/ministry-of-health-launches-the-kenya-national-patients-rights-charter/)
- [SHA benefits: PHCF, SHIF, ECCIF (Nation)](https://nation.africa/kenya/health/the-highs-lows-and-hard-truths-of-kenya-s-new-health-cover-5454816)
- [Level 2 & 3 maternity under SHA (The Star)](https://www.the-star.co.ke/news/2025-12-10-level-2-3-facilities-to-start-offering-maternity-services-under-sha)
- [GEO for healthcare (Contently)](https://contently.com/2026/03/30/geo-for-healthcare/)
- [Best hospital website designs 2026 (Webstacks)](https://www.webstacks.com/blog/hospital-website-designs)
- [Digital marketing for hospitals in Kenya (Suave Marketing)](https://suavemarketing.co.ke/blog/digital-marketing-for-hospitals-in-kenya-that-attracts-patients)
- [Steff Cloud: Nakuru Digital](https://www.steffcloud.co.ke/nakuru-digital)
