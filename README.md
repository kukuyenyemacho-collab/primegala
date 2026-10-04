# Primegala Digital Platform

Marketing site + modular HMIS/ERP for **Primegala Medical Centre**, a 24-hour KEPH Level 3 facility at Maili Sita on the Nakuru–Nyahururu Road, opposite Kiamaina Primary School, Nakuru.

Phase 1 (this release) is the **public marketing site**: SEO/GEO-optimised, story-led, with legal policies for Kenyan regulation and lead capture that hands every enquiry to the HMIS as a signed FHIR R4 bundle. Phase 2 builds the **HMIS (Primegala CareOS)** in modules, integrated with SHA via the DHA AfyaLink exchange.

Designed and built by [Steff Cloud Limited](https://steffcloud.co.ke), Nakuru.

## Repository layout

```
apps/web/                 Public site (Next.js 16, React 19, Tailwind CSS 4)
  src/app/                Pages, API route, sitemap, robots, llms.txt, OG image
  src/content/            Services, FAQs, areas, Nakuru keyword map
  src/content/articles/   Health Hub (Markdown, answer-first, FAQ front matter)
  src/content/legal/      9 policies (Markdown; facility facts injected from config)
  src/lib/site.ts         Single source of truth for facility facts
packages/contracts/       Shared with the HMIS: service codes, lead schema,
                          FHIR R4 mapping, webhook signing, Kenyan phone utils
docs/                     Research, brand, meeting pack, architecture, SEO/GEO, wireframes
```

## Preview it yourself (in your browser, no installation)

1. Open **[codespaces.new/kukuyenyemacho-collab/primegala](https://codespaces.new/kukuyenyemacho-collab/primegala?quickstart=1)** while logged in to GitHub (or on the repo page: **Code → Codespaces → Create codespace**).
2. Wait 3–5 minutes the first time while it installs and builds. You'll see `pnpm build` then `pnpm start` in the terminal.
3. The site opens in a new browser tab. If it doesn't, open the **Ports** tab and click the globe icon next to **Primegala site (3000)**.

The preview address is **private**: only you, logged in to GitHub, can open it. Every non-production copy shows a yellow **Preview** banner and tells search engines not to index it, so it can't be mistaken for the official site. Test bookings are accepted and logged, not sent anywhere. Stop the codespace when you're done to save your free hours (GitHub → Your codespaces → Stop).

## Quick start

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local   # fill in phone, WhatsApp, etc.
pnpm dev                                        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Run the site locally (leads are logged, not sent) |
| `pnpm build` | Production build (all pages statically prerendered) |
| `pnpm test` | Contract tests (phone, schema, FHIR, signing) and API tests |
| `pnpm typecheck` / `pnpm lint` | Type-check and lint all packages |

## Configuration

Facility facts live in `apps/web/src/lib/site.ts`; contact details come from environment variables (see `apps/web/.env.example`). Leaving phone/WhatsApp blank shows a clear `07XX XXX XXX` placeholder and routes buttons to the booking page.

**Lead delivery:** set `HMIS_LEADS_WEBHOOK_URL` and `HMIS_LEADS_WEBHOOK_SECRET`. Each lead is POSTed as `{ lead, fhir }` with an `x-primegala-signature` HMAC header and an `idempotency-key`. The receiver verifies with `verifyWebhook()` from `@primegala/contracts`. In production, without a webhook, the API returns 503 and asks patients to call or WhatsApp, so leads are never silently lost. For a demo or staging deploy only, set `LEADS_LOG_ONLY=true`.

## Deploy

Any Node 20+ host works (Vercel, Netlify, a VPS with `pnpm build && pnpm start`). On Vercel, set the project root to `apps/web`. Point `primegala.co.ke` at it and set `NEXT_PUBLIC_SITE_URL`.

## Pre-launch checklist

Facts and claims (see `docs/03-client-discovery-questionnaire.md`):

- [ ] Confirm licensed name/level (Medical Centre vs Hospital) and update `site.name` if needed
- [ ] Confirm **SHA contract** (`site.shaContracted`), MFL code, phone, WhatsApp, email, map pin
- [ ] Confirm each service in `apps/web/src/content/services.ts` (`listedOnKmhfr` in `packages/contracts/src/services.ts` marks the registry-verified ones); remove anything not offered
- [ ] Confirm area directions in `src/content/areas.ts` with local staff

Legal and compliance:

- [ ] Advocate review of all policies in `src/content/legal/`
- [ ] Add ODPC registration number (`NEXT_PUBLIC_ODPC_REGISTRATION`) and DPO contact (`NEXT_PUBLIC_DPO_CONTACT`)

Content and assets:

- [ ] Clinician reviews each Health Hub article, then set `reviewedBy` and `lastReviewed` in its front matter
- [ ] Replace the proposed logo with official files if the facility has them; add real photography (with consent)

Launch:

- [ ] Set `NEXT_PUBLIC_SITE_ENV=production` on the live deployment only (removes the Preview banner and allows indexing)
- [ ] Configure the HMIS webhook (or `LEADS_LOG_ONLY` for staging only)
- [ ] Add GA4 ID and Search Console/Bing verification; submit the sitemap
- [ ] Claim Google Business Profile ([`docs/05-seo-geo-playbook.md`](docs/05-seo-geo-playbook.md))

## Docs

1. [Research findings](docs/01-research.md)
2. [Brand guide & naming](docs/02-brand-guide.md)
3. [Client discovery meeting pack](docs/03-client-discovery-questionnaire.md)
4. [Architecture & HMIS roadmap](docs/04-architecture-and-roadmap.md)
5. [SEO & GEO playbook + Nakuru keyword map](docs/05-seo-geo-playbook.md)
6. [Wireframes & page templates](docs/06-wireframes.md)
