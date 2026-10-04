# Wireframes & Page Templates

The layouts follow the patterns that work for top hospital sites (Mayo Clinic, Cleveland Clinic): patient-task navigation, persistent booking and answer-first content. They're adapted for Kenyan phone users with WhatsApp-first contact. The implemented pages live in `apps/web/src/app`.

## Homepage: a story arc (problem → promise → proof → action)

```
┌──────────────────────────────────────────────────────────────┐
│ ● Open 24 hours · Maili Sita, opp. Kiamaina Primary · SHA  ☎ │  utility bar
│ [+] Primegala      Services  SHA  Our Story  Health Hub  Find│  sticky nav
│                                               [Book a visit] │
├──────────────────────────────────────────────────────────────┤
│ (●Open now) (SHA accepted)            ┌────────────────────┐ │
│ Prime care, close to home.            │  illustration:     │ │  HERO
│ Day and night.                        │  Menengai, road,   │ │
│ 24-hour clinic at Maili Sita…         │  school, clinic,   │ │
│ [Book] [WhatsApp] [☎ phone]           │  sun + moon        │ │
│ 24/7 · Level 3 · 2022                 └────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ Six miles from town.        │ "Night shift, 2:07 a.m."       │  STORY (problem)
│ Minutes from you.           │  illustrative scene (labelled) │
├──────────────────────────────────────────────────────────────┤
│ Everyday care, under one roof                 [All services] │  SERVICES (promise)
│ [card] [card] [card]                                         │
│ [card] [card] [card]                                         │
├──────────────────────────────────────────────────────────────┤
│ What happens when you come in: 1 → 2 → 3 → 4 → 5             │  JOURNEY
├──────────────────────────────────────────────────────────────┤
│ Yes, we accept SHA.         │ ✓ PHCF  ✓ SHIF  ✓ ECCIF        │  SHA (dark band)
│ [How SHA works] [SHA help]  │ Dial *147#                     │
├──────────────────────────────────────────────────────────────┤
│ [8+] [24/7]                 │ Bring your baby into the world │  MATERNITY
│ [Day 1] [SHA]               │ close to home  [Book visit]    │
├──────────────────────────────────────────────────────────────┤
│ Why families choose Primegala: 6 factual reasons             │  PROOF
├──────────────────────────────────────────────────────────────┤
│ Opposite Kiamaina Primary   │ [ click-to-load map ]          │  FIND US
│ (area chips) [Directions]   │                                │
├──────────────────────────────────────────────────────────────┤
│ Health Hub: 3 featured guides                                │  AUTHORITY
├──────────────────────────────────────────────────────────────┤
│ FAQs + Karibu (Kiswahili)   │ ▸ Q&A accordion (FAQ schema)   │  GEO
├──────────────────────────────────────────────────────────────┤
│ Care is six miles closer than you think. [Book][WA][Map]     │  ACTION
├──────────────────────────────────────────────────────────────┤
│ Footer: NAP · hours · services · patients · WhatsApp ·       │
│ 999/112 · policies · "Website by Steff Cloud"                │
└──────────────────────────────────────────────────────────────┘
Mobile: fixed bottom bar  [☎ Call] [WhatsApp] (● Book) [Directions]
```

## Service page template

```
Breadcrumb › Services › Maternity
H1 + intro                              ┌ quick card ┐
                                        │ ✓ 24h ✓ loc│
                                        │ [Book][WA] │
─────────────────────────────────────────┴────────────┘
┌ story box (cream) ┐                   ┌ sticky booking form ┐
What we offer (✓ grid)                  │ type · name · phone │
What to expect (1-2-3-4)                │ service · date      │
SHA note (dark)                         │ consent ✓           │
                                        └─────────────────────┘
FAQs (FAQPage schema) · Related Health Hub articles · Other services · CTA
```

## Health Hub article template

```
Breadcrumb › Health Hub › Category › Title
[Category] H1 · description · author · date · read time
(Clinically reviewed by … / Clinical review pending)
┌ On this page (TOC) ┐   Short answer: …  (answer-first for AI)
│ At Primegala card  │   H2 sections, tables, checklists
│ [Book a visit]     │   FAQs · medical disclaimer
Related articles · CTA
```

## Booking (lead) form

- Intent chips: Book a visit · Call me back · SHA help · Maternity visit · Ask a question
- Minimal fields (data minimisation): name, phone (Kenyan format check), optional email, service, date/time window, channel (WhatsApp/call/SMS), short note
- Two separate consents: required contact consent; optional health-tips opt-in
- Emergency warning, honeypot, success screen with reference number and a WhatsApp continue button
- Pre-fill from links: `/book?service=antenatal-care`, `/book?type=sha-help`
