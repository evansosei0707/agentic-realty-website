# Sankofield — Landing Page

The public marketing site for **Sankofield**, the real estate WhatsApp
automation platform documented in this repo. One scrollable page that
explains the product and simulates the internal UI (escalation inbox,
today's viewings, conversation history, system health, team-in-the-field
Telegram bot) so prospects can see the value before booking a demo.

## Naming convention

- **Sankofield** is the platform / company / brand. Use it for the
  wordmark, headers, footer copyright, marketing prose ("Sankofield
  handles your WhatsApp leads"), and the architecture diagram's
  central node.
- **Ama** is the AI agent persona — the name the lead sees on
  WhatsApp. Use it in all conversational copy ("Ama replies in under
  5s"), the system-prompt voice references, and the conversation
  script. Mirrors Anthropic→Claude, Salesforce→Einstein.

Don't replace one with the other. The two names do different jobs.

## What's in this folder

```
landing/
├── README.md                 ← you are here
├── SPEC.md                   ← the full implementation spec
└── docs/
    ├── design-system.md      ← color tokens, type, spacing, motion
    ├── information-architecture.md   ← page sections in order
    ├── content.md            ← every line of copy on the page
    ├── simulated-data.md     ← the faux UI fixtures (lead/viewing/error JSON)
    ├── animation-patterns.md ← the 6 GSAP scroll patterns + code + perf rules
    └── analytics-events.md   ← events to instrument
```

When implementation starts, code lives at `src/`:

```
src/
├── app/page.tsx                          ← composes all 9 sections
├── components/
│   ├── hero/Hero.tsx
│   ├── nav/Nav.tsx
│   ├── simulated-ui/
│   │   ├── ConversationThread.tsx
│   │   ├── EscalationInbox.tsx
│   │   ├── TodayViewings.tsx
│   │   ├── SystemHealth.tsx              ← renamed from WorkflowHealth.tsx
│   │   ├── TelegramThread.tsx            ← NEW (§5d team Telegram demo)
│   │   └── LeadPipeline.tsx
│   ├── how-it-works/Steps.tsx            ← three-step flow (now leads §6)
│   ├── workflow-diagram/Diagram.tsx      ← smaller, supporting visual
│   ├── stats/Stats.tsx
│   ├── pricing/Pricing.tsx
│   ├── faq/FAQ.tsx
│   └── footer/Footer.tsx
└── lib/
    ├── theme.ts             ← design tokens (exports from design-system.md)
    ├── fixtures.ts          ← simulated data (exports from simulated-data.md)
    ├── gsap-init.ts         ← one-time GSAP + ScrollTrigger registration
    ├── use-reduced-motion.ts ← hook returning prefers-reduced-motion boolean
    └── format-stat.ts       ← formatStat(value, unit) used by counter pattern
```

## Recommended stack

- **Next.js 14** (app router) + **TypeScript**
- **Tailwind CSS** with custom tokens from `docs/design-system.md`
- **GSAP 3 + ScrollTrigger + `@gsap/react`** for scroll-driven motion
  (see `docs/animation-patterns.md` for the six scroll patterns)
- **Geist** (sans + mono) from Vercel — closest free match to Mastra
- **Vercel** for preview deploys

Static-only. No backend, no auth on this page. The real operator
dashboard (Phase 2) hits Twenty GraphQL + the operational Postgres.

## How to read these docs

1. Start with `SPEC.md` — the full implementation plan.
2. `docs/information-architecture.md` — section-by-section map.
3. `docs/design-system.md` — visual tokens before building.
4. `docs/content.md` — all copy (so a non-dev can edit voice without
   touching components).
5. `docs/simulated-data.md` — the faux data that drives the simulated
   UI panels. **Field names must match the real schema** in
   `../../docs/01-data-model/operational-db.md` so the swap to live
   data later is one line per fixture.
6. `docs/animation-patterns.md` — the six GSAP scroll patterns, full
   code, section-to-pattern mapping, and performance/cleanup rules.
   **Read before touching any scroll animation.**
7. `docs/analytics-events.md` — what to track when the page is live.

## What this page is NOT

- Not an operator dashboard. That comes later and lives at a different
  URL (likely `app.ama.gh`); this is `ama.gh` or similar.
- Not the Twenty CRM UI. Twenty stays at `crm.my-projects-aws.site`.
- Not a real WhatsApp client. The conversation thread on the page is a
  scripted animation, not a live feed.

## Out of scope for v1

Auth, i18n (Twi/Ga), A/B testing infra, real lead capture form
(`Book a demo` initially links to Calendly or a Tally form).
