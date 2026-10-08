# Primegala Brand Guide (v1 proposal)

## 1. Name, domain and naming system

| Asset | Recommendation | Why |
|---|---|---|
| **Public brand** | **Primegala Medical Centre** (short: **Primegala**) | Matches the KMHFR registration. Using "Hospital" before it is licensed as one could breach KMPDC advertising rules. Switch in one line (`apps/web/src/lib/site.ts`) if re-licensed. |
| **Primary domain** | **primegalahospital.co.ke** (owned by the facility) | `.co.ke` signals a Kenyan business to patients and to Google's local ranking. Emails: info@, health@ and support@primegalahospital.co.ke. |
| Defensive domains | primegala.co.ke, primegala.com → 301 to primegalahospital.co.ke | Protects the name and captures typed variations. |
| Tagline | **"Prime care, close to home."** | Uses the brand name; true to the location story. |
| Story line | **"Six miles from town. Minutes from you."** | *Maili Sita* = six miles. A memorable, local, factual hook. |
| Health content | **Primegala Health Hub** | |
| Future patient app/portal | **MyPrimegala** | |
| HMIS/ERP platform | **Primegala CareOS** (internal name) | One name for the modular system. |

## 2. Positioning

> **For families along the Nakuru–Nyahururu Road, Primegala is the 24-hour medical centre at Maili Sita that brings dependable, respectful, SHA-ready care close to home, so nobody has to travel six miles to town at 2 a.m.**

Proof points (all factual, KMPDC-safe):

- Open 24 hours, every day, since March 2022
- KEPH Level 3 registered facility
- Directly opposite Kiamaina Primary School
- Consultation, lab, pharmacy and admission under one roof
- SHA guidance at the front desk

## 3. Voice

| We are | We are not |
|---|---|
| Warm, neighbourly, calm | Salesy, alarmist |
| Plain-spoken (English, with Kiswahili where it helps: *Karibu*, *Asante*) | Jargon-heavy |
| Honest about what a Level 3 facility does, and when we refer | "Best hospital in Nakuru" (no superlatives or promised outcomes) |
| Answer-first | Long preambles |

**Storytelling pillars**

1. **The six miles:** the night-time gap Primegala closes.
2. **The night shift:** illustrative scenes, always labelled as illustrations unless a patient consents in writing.
3. **The people:** our nurses, midwives and clinicians, neighbours caring for neighbours.
4. **Making SHA simple:** we turn a confusing system into three clear steps.

## 4. Colour

The client's existing identity uses a primary green. We've formalised it into an accessible palette.

| Token | Hex | Use | Contrast on white |
|---|---|---|---|
| `brand-950` | `#062616` | Footer, darkest surfaces | — |
| `brand-900` | `#0B3F23` | Dark sections, wordmark | 12.0 : 1 |
| `brand-700` | `#116335` | Hover states, headings accent | 7.3 : 1 |
| **`brand-600`** | **`#167A41`** | **Primegala Green: buttons, links, icons** | **5.4 : 1 (AA)** |
| `brand-500` | `#1F9450` | Logo / decorative / large text only | 3.9 : 1 |
| `brand-50` | `#EEF8F1` | Tinted backgrounds | — |
| **`trust-900`** | **`#0E2444`** | **Trust blue: footer, SHA and information panels** | **15.5 : 1** |
| `trust-700` | `#1B4076` | Section labels, info icons, key figures | 10.3 : 1 |
| `trust-50` | `#EEF3FA` | Information panel backgrounds | — |
| `sun-400` | `#F7C548` | Tiny highlights only (with dark text: 10.3 : 1) | — |
| `cream` | `#FBF8F1` | Story sections | — |
| `ink` | `#10221A` | Body text | 16.6 : 1 |
| `alert` | `#C0261C` | Emergency only | 5.9 : 1 |

**Rule:** green is the action colour (buttons, links), deep trust blue carries institutional surfaces (footer, SHA, information panels, section labels), sun only as a tiny highlight, red only for emergencies. The pairing follows the minimal, professional style of government service sites: white surfaces, thin borders, no gradients.

## 5. Typography

- **Plus Jakarta Sans** (variable sans) for everything: bold, tightly tracked headings and regular body text. One family keeps pages light and reads as calm and institutional. It's highly legible on low-end phones.
- Self-hosted, with no Google Fonts request, for speed and privacy.

## 6. Logo

**Proposed mark:** a two-tone rounded medical cross (`brand-600` vertical, `brand-500` horizontal) carrying a white leaf at the centre, meaning *care that grows with the community*.

- Files:
  - `apps/web/public/brand/primegala-mark.svg`
  - `apps/web/public/brand/primegala-logo.svg`
  - Favicon: `apps/web/src/app/icon.svg`
- Wordmark: "Primegala" in Plus Jakarta Sans bold over "MEDICAL CENTRE" in Plus Jakarta Sans bold, small and tracked +24%.
- Clear space: the height of the cross arm on every side. Minimum size: 24 px mark, 120 px full lockup.
- If the facility already has a logo, we keep its recognisable elements and apply this palette. **CONFIRM at the meeting.**

## 7. Imagery

- **Now:** custom SVG illustration of Maili Sita (Menengai ridge, the road, Kiamaina Primary, the clinic, sun and moon for day and night). Zero download weight.
- **Next:** a professional photo shoot of the real building, signage, team and rooms. Natural light, real staff, no generic stock photos of foreign hospitals. Written consent from everyone pictured.

## 8. Signage and print alignment (recommendation)

Repaint the signboard in Primegala Green with the new mark. Add "OPEN 24 HOURS" and "SHA ACCEPTED" panels, plus a QR code linking to `primegalahospital.co.ke/book?utm_source=signboard`.
