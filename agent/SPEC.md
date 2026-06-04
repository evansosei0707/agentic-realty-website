# Landing Page Spec — Sankofield (Real Estate WhatsApp Automation)

> **Naming:** *Sankofield* = the platform/brand. *Ama* = the AI agent
> persona that talks to leads on WhatsApp. Both names appear on the
> page and they do different jobs — don't conflate them.

**Status:** Approved 2026-05-20
**Owner:** Platform builder
**Source plan:** `/Users/shaqexpress/.claude/plans/i-m-planning-a-frontend-logical-teacup.md`

---

## Context

This is the **public marketing landing page** for the real estate
automation platform (the system documented across this repo). It is
**not** the internal operator dashboard — the Twenty CRM at
`crm.my-projects-aws.site` already serves that purpose.

This page exists to convert visiting agency owners into pilot leads.
It must **simulate the product visually** by embedding faux-UI panels
(escalation inbox, today's viewings, conversation history, workflow
health) so a prospect can see the value without logging in.

**Design language:** Mastra-inspired dark theme with neon green primary
accent, plus orange + magenta secondary accents. Pure black background,
rounded cards with subtle dark-gray borders, monospace for data/code,
humanist sans for everything else.

**Scope:** One scrollable landing page first. Multi-page operator app
(real data, real writes) comes in Phase 2. Read-only — no interactive
writes from this page.

---

## Personas

| Persona | What they're looking for | What converts them |
|---|---|---|
| **Agency owner** (Accra/Tema) | "Can this stop me chasing WhatsApp leads at 11pm?" | KPI snapshot + screenshots of the inbox + Ghana-specific signals (GHS, MTN/Telecel numbers, area names) |
| **Agent / sales lead** | "Will this replace me or help me?" | Escalation inbox preview + Telegram bot demo — the AI hands off when it should, and lets agents update the CRM from the field |
| **Platform builder peer** | "Is this real or vapor?" | The three-step flow + the small architecture diagram + integration logos (WhatsApp, CRM, Telegram, Claude) |

---

## Information architecture (9 sections, top → bottom)

Full section-by-section detail in [`docs/information-architecture.md`](docs/information-architecture.md).

1. Sticky nav
2. Hero
3. Trusted-by logo strip
4. Live WhatsApp simulation (centerpiece)
5. Product walkthrough — 4 feature cards with simulated UI
   - 5a Escalation inbox
   - 5b Today's viewings
   - 5c System health (was "Workflow health")
   - 5d From the field — Telegram CRM agent (NEW)
6. How it works in three steps (steps lead; diagram is a supporting visual)
7. Numbers / proof bar
8. Pricing — 3 tiers
9. FAQ + footer (now 8 questions; added Q7 team Telegram, Q8 voice notes)

---

## Design system summary

Full token reference in [`docs/design-system.md`](docs/design-system.md).

- Background: pure black `#000000`; surface `#111111`; nested `#181818`
- Border: `#1F1F1F` default, `#2A2A2A` strong/hover
- Text: `#FFFFFF` primary, `#A8A8A8` secondary, `#6B6B6B` muted
- Accents: `#1FFF6A` green (primary), `#FF9F40` orange (warning/escalation),
  `#FF4DD9` pink (VIP/highlight), `#FF5C5C` red (errors)
- Type: humanist sans for headlines (Geist or Inter Tight); mono for
  data (Geist Mono or JetBrains Mono); 84px hero → 16px body → 13px mono
- Radius: 20px cards, 14px nested, 999px pills
- No shadows. 1px borders only.
- Motion: 150ms hover transitions; scroll-in fade-up with stagger

---

## Recommended stack

- **Next.js 14** app router + **TypeScript**
- **Tailwind CSS** with custom tokens
- **GSAP 3 + ScrollTrigger + `@gsap/react`** for scroll-driven motion
  (six patterns documented in [`docs/animation-patterns.md`](docs/animation-patterns.md))
- **Geist** (Vercel) for sans + mono
- **Vercel** for hosting

No backend. Static. Edge-cached. Sub-2s LCP target.

---

## Simulated data (single source)

All faux data lives in `src/lib/fixtures.ts` and is documented field-by-field
in [`docs/simulated-data.md`](docs/simulated-data.md).

**Critical rule:** fixture field names must match the real schema in
`../../docs/01-data-model/operational-db.md`. When live wiring happens
in Phase 2, the swap should be a one-line `fetch()` per fixture, not a
component rewrite.

---

## What is NOT in v1

- Real backend / live data wiring (Phase 2 — becomes the operator
  dashboard with real Twenty GraphQL + Postgres reads/writes)
- Auth (Login button is non-functional)
- i18n (English only; copy externalised in `docs/content.md` so Twi
  translation is later a swap)
- A/B testing infra (events listed but not wired)

---

## Verification gates (before sign-off)

1. **Visual parity** — side-by-side with Mastra reference screenshots:
   dark canvas, neon green, organic SVG motif, card rhythm, mono labels
2. **Lighthouse** — Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90
   mobile; simulated panels must not block LCP
3. **Responsive sweep** — 375 / 768 / 1280 / 1920px all work
4. **Copy review** — matches Ama's voice (no banned openers — see
   `docs/content.md`)
5. **Schema drift** — every fixture field exists in
   `../../docs/01-data-model/operational-db.md`
6. **Click-through** — every CTA goes somewhere; no dead links in footer
7. **Browser test** — 100% + 200% zoom, light + dark OS preference;
   page stays dark-themed regardless

Done = all 7 pass on a deployed Vercel preview URL shared with the
pilot agency owner.

---

## Cross-references inside this repo

| You need... | Open... |
|---|---|
| Real schema for lead/viewing/deal | `../../docs/01-data-model/operational-db.md` |
| Twenty CRM custom-object fields | `../../docs/01-data-model/twenty-realestate-schema.md` |
| Workflow names + IDs for health panel | `../../.claude/memory/status.md` |
| Ama's voice (banned openers, etc) | `../../n8n-workflows/lead-intake/b-lead-intake.json` (system prompt in Build Claude Context) |
| WhatsApp template names | `../../.claude/rules/whatsapp-templates.md` |
| Architecture overview | `../../docs/00-foundations/infrastructure.md` |
