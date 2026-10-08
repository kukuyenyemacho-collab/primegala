# SEO & GEO Playbook: Getting Primegala to the Top in Nakuru

**An honest note first:** nobody can guarantee position #1 on Google or in AI answers. Rankings depend on Google's algorithms, competitors and, for "near me" searches, the searcher's distance from the facility. What we *can* do is pull every lever that decides local health rankings. This document lists them, what's already built, and what must happen after launch.

For "near me" searches, the biggest factors are a **complete, verified Google Business Profile**, **reviews**, **consistent name/address/phone everywhere**, and **proximity**. The website supports all of them.

## 1. What's built into the site

| Lever | Implementation |
|---|---|
| Fast, static pages | 67 pages prerendered; self-hosted fonts; SVG illustration (no hero image download); click-to-load map |
| Mobile-first | Bottom action bar (Call, WhatsApp, Book, Directions); thumb-sized targets; no horizontal scroll at 390 px |
| Technical SEO | Canonical URLs, unique titles and descriptions, `sitemap.xml` (55 URLs), `robots.txt`, RSS feed, 301 redirects for common URLs, `lang="en-KE"` |
| Entity schema | `MedicalClinic` with address, 24/7 hours, area served (10 places), payments, specialties, KMHFR `sameAs`, MFL code (when set) |
| Page schema | `MedicalWebPage` (services), `Article` + `MedicalWebPage` (Health Hub, with `reviewedBy`/`lastReviewed` once reviewed), `FAQPage`, `BreadcrumbList`, `ItemList`, `CollectionPage`, `AboutPage` |
| GEO (AI answers) | Answer-first "Short answer" paragraphs, question headings, tables, 60+ FAQs, `/llms.txt` and `/llms-full.txt`, AI crawlers explicitly allowed |
| E-E-A-T | Author, publish date, clinical review badge, Editorial Policy, Medical Disclaimer, Patient Rights, real facility facts |
| Local relevance | Every page repeats the true NAP and landmark: *Maili Sita · Nakuru–Nyahururu Road · opposite Kiamaina Primary School*. Areas-we-serve page with real directions, not doorway pages. |
| Kiswahili | Swahili summary on the home and FAQ pages; Swahili keywords in metadata |
| Conversion tracking | `data-track` events for calls, WhatsApp, directions and bookings; `generate_lead` on form success (GA4 loads only after consent) |

## 2. Keyword map (target page for each intent)

Source of truth in code: `apps/web/src/content/keywords.ts`.

| Intent | Example searches | Target page |
|---|---|---|
| Core / near me | hospital near me, clinic near me, medical centre Nakuru, 24 hour hospital Nakuru, private hospital Nakuru, affordable hospital Nakuru, doctor near me Nakuru | `/` |
| Local places | hospital Maili Sita, clinic Maili Sita, hospital along Nakuru Nyahururu road, hospital near Kiamaina Primary School, hospital Kabatini / Kiamaina / Bahati / Lanet / Dundori / Maili Kumi | `/`, `/contact`, `/areas-we-serve` |
| 24-hour & urgent | 24 hour clinic Nakuru, night clinic Nakuru, emergency clinic Nakuru, hospital open now near me, urgent care Nakuru | `/services/24-hour-urgent-care`, `/health-hub/when-to-seek-urgent-care` |
| Maternity | maternity hospital Nakuru, maternity near me, maternity in Bahati, where to deliver in Nakuru, delivery cost Nakuru, free delivery SHA Nakuru | `/services/maternity`, `/health-hub/pregnancy-danger-signs`, `/health-hub/hospital-bag-checklist` |
| Antenatal | antenatal clinic Nakuru, ANC clinic near me, pregnancy check up Nakuru, kliniki ya wajawazito | `/services/antenatal-care`, `/health-hub/antenatal-care-8-visits` |
| Family planning | family planning clinic Nakuru, implant family planning, coil IUCD insertion, depo injection near me, implant removal Nakuru | `/services/family-planning`, `/health-hub/family-planning-options-explained` |
| HIV | HIV testing Nakuru, VCT near me, free HIV test, PEP Nakuru, PrEP Nakuru, kupima ukimwi bure | `/services/hiv-testing-and-counselling`, `/health-hub/hiv-testing-what-to-expect` |
| Lab | laboratory Nakuru, lab tests near me, malaria test near me, typhoid test Nakuru, blood sugar test, full blood count | `/services/laboratory`, `/health-hub/malaria-or-typhoid-how-to-tell` |
| Child | child clinic Nakuru, baby clinic near me, immunisation clinic, child vaccination schedule Kenya | `/services/child-health`, `/health-hub/kenya-immunisation-schedule` |
| Chronic | diabetes clinic Nakuru, hypertension clinic, blood pressure check near me, sugar check near me | `/services/diabetes-and-hypertension-clinic`, two Health Hub articles |
| Pharmacy | pharmacy near me open 24 hours, chemist Maili Sita, 24 hour pharmacy Nakuru | `/services/pharmacy` |
| Inpatient | admission hospital Nakuru, inpatient hospital Bahati, hospital with beds near me | `/services/inpatient-care` |
| SHA / NHIF | SHA hospitals in Nakuru, hospitals that accept SHA in Nakuru, SHA accredited hospitals, SHIF hospitals, NHIF hospitals Nakuru, how to use SHA at hospital | `/sha`, `/health-hub/how-to-use-sha-at-primegala` |
| Swahili | hospitali Nakuru, hospitali karibu na mimi, hospitali ya saa 24, daktari karibu Maili Sita, kujifungua bure SHA | Home and FAQ Swahili blocks (full Kiswahili pages in phase 2) |
| Questions (GEO) | which hospital near Bahati is open 24 hours? where can I deliver using SHA in Nakuru? is there a hospital at Maili Sita? how far is Maili Sita from Nakuru town? | `/faq`, `/areas-we-serve`, FAQ blocks site-wide |

## 3. Off-site actions after launch (these decide local rankings)

### Google Business Profile (week 1, highest impact)
- Claim or verify "Primegala Medical Centre". Primary category **Medical clinic**; secondary categories Maternity hospital, Medical laboratory, Pharmacy, Family planning center (only those confirmed).
- Hours: open 24 hours. Add every service, with descriptions copied from the service pages.
- Exact pin at the gate. Website: `https://primegalahospital.co.ke/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
- Booking link: `/book?utm_source=google&utm_medium=gbp`.
- At least 20 real photos (exterior with signage, reception, team, rooms), then weekly posts that link to new Health Hub articles.
- Q&A: seed with real FAQs (hours, SHA, directions).

### Name, address and phone consistency (weeks 2–4)
Use the identical name, address and phone everywhere:
- KMHFR (request a correction if anything is outdated)
- SHA facility list
- Bing Places and Apple Business Connect
- Facebook and Instagram
- Kenyan directories: businesslist.co.ke, Yellow Pages Kenya, Vezeeta, local Nakuru directories

### Reviews (ongoing, KMPDC-compliant)
- Ask satisfied patients for a review with a QR card at discharge and in the WhatsApp follow-up. **Never** offer incentives, never write reviews yourself, never pressure.
- Reply to every review within 48 hours, and never confirm someone was a patient (confidentiality).

### Local links and mentions
- Nakuru Digital / Steff Cloud case study
- Kiamaina Primary School health days
- Churches and chamas
- County health department partnerships
- Local radio (Kameme, Inooro Nakuru shows)
- Kenyans.co.ke and Nakuru community pages for medical camps

## 4. Content calendar: first 12 weeks (2 per week)

| Week | Article 1 | Article 2 (tip) |
|---|---|---|
| 1 | Delivery under SHA at Level 3: what's covered | Breastfeeding in the first week |
| 2 | Cough that won't go away: when to test for TB | Handwashing at home |
| 3 | UTIs in women: symptoms and treatment | Drinking enough water |
| 4 | Brucellosis in Nakuru: the "milk fever" | Boil your milk |
| 5 | Child fever at night: what to do | Thermometer basics |
| 6 | Postnatal care: the 6-week check | Postpartum warning signs |
| 7 | Asthma attacks: first aid | Dust and smoke at home |
| 8 | Medical check-ups: what to test at 30, 40, 50 | Healthy ugali plate |
| 9 | Cervical cancer screening and HPV vaccine | Period pain: when to worry |
| 10 | Dog bites and rabies: act fast | Wound care at home |
| 11 | Mental health: stress and sleep | 10-minute walk habit |
| 12 | Year-end: holiday travel and malaria | Safe festive eating |

Every article needs: an answer-first summary, question headings, a table or checklist, 2–3 FAQs, an internal link to the service page and booking, a clinician review before marking it reviewed, and a re-review within 12 months.

## 5. Measure monthly

- **Search Console:** impressions and clicks for the keyword groups above; pages indexed; Core Web Vitals.
- **Google Business Profile insights:** calls, direction requests, website clicks.
- **GA4:** `call_click*`, `whatsapp_click*`, `directions_click*`, `generate_lead` by source.
- **HMIS:** lead → visit conversion, by UTM source.
- **AI visibility:** monthly prompts in ChatGPT, Gemini, Claude and Perplexity. For example: "24 hour clinic near Bahati Nakuru", "hospitals that accept SHA along Nakuru Nyahururu road", "where can I deliver in Maili Sita". Record whether Primegala is cited.
