# Analytics Events

Events to instrument on the landing page. The page itself is static
and stateless, but conversion attribution requires consistent event
naming. Use **PostHog** (already a project dependency per the agent
toolkit) or **Plausible** for the public site. Set up both before
launch; switch primary based on cost.

---

## Naming convention

`{section}.{element}.{action}` — all lowercase, dot-separated.

Examples: `hero.cta.click`, `pricing.tier.click`,
`whatsapp_sim.script.complete`.

---

## Required events

### Page lifecycle

| Event | When | Properties |
|---|---|---|
| `page.view` | DOMContentLoaded | `path`, `referrer`, `utm_*`, `viewport_width` |
| `page.scroll_depth` | Reaches 25/50/75/100% | `percent`, `time_on_page_s` |
| `page.exit` | Page hidden / unload | `time_on_page_s`, `max_scroll_pct` |

### Navigation

| Event | When | Properties |
|---|---|---|
| `nav.item.click` | Nav link clicked | `item` (product / how / pricing / customers / docs) |
| `nav.login.click` | Login button clicked | — |
| `nav.demo.click` | Top-right Book a demo clicked | — |
| `nav.github.click` | GitHub badge clicked | — |

### Hero

| Event | When | Properties |
|---|---|---|
| `hero.cta.click` | Book a 15-min demo clicked | `placement: 'hero'` |
| `hero.secondary.click` | See how it works ↓ clicked | — |

### WhatsApp simulation (§4)

| Event | When | Properties |
|---|---|---|
| `whatsapp_sim.start` | Scrolls into view, animation begins | — |
| `whatsapp_sim.message.render` | Each message renders | `message_index` (1–6) |
| `whatsapp_sim.script.complete` | All 6 messages rendered | `duration_ms` |
| `whatsapp_sim.script.loop` | Loops to message 1 | `loop_count` |

### Feature cards (§5)

| Event | When | Properties |
|---|---|---|
| `feature.view` | Card scrolls into view | `card: 'escalation' \| 'viewings' \| 'system_health' \| 'telegram'` |
| `feature.panel.hover` | Hover on simulated UI panel | `card`, `dwell_ms` |

### How it works — three steps + diagram (§6)

| Event | When | Properties |
|---|---|---|
| `how_it_works.step.view` | Step scrolls into view | `step: 1 \| 2 \| 3` |
| `architecture.view` | Diagram in view | — |
| `architecture.node.hover` | Hover on a tendril/node | `node_id` (whatsapp / crm / ama / telegram / gcal) |

### Pricing (§8)

| Event | When | Properties |
|---|---|---|
| `pricing.view` | Pricing section in view | — |
| `pricing.tier.click` | Tier CTA clicked | `tier: 'pilot' \| 'studio' \| 'agency'`, `placement: 'pricing'` |

### FAQ (§9)

| Event | When | Properties |
|---|---|---|
| `faq.question.expand` | An FAQ row opens | `question_index` (0–5), `question_text` |
| `faq.question.collapse` | An FAQ row closes | `question_index` |

### Footer

| Event | When | Properties |
|---|---|---|
| `footer.link.click` | Any footer link clicked | `column`, `label`, `href` |
| `footer.social.click` | Social icon clicked | `platform: 'x' \| 'github' \| 'linkedin' \| 'email'` |

### CTA roll-up

All demo-booking CTAs (hero, pricing-pilot, pricing-studio, pricing-agency,
nav, anywhere else) fire the same secondary event for funnel attribution:

```
demo.booking.start
  placement: 'hero' | 'nav' | 'pricing:pilot' | 'pricing:studio' | 'pricing:agency' | 'footer'
  url: <calendly or tally url>
```

---

## UTM and referrer capture

On `page.view`, capture and persist (sessionStorage) all UTM parameters.
Forward them on every `demo.booking.start` event so the booking form
captures source attribution.

UTMs to capture:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Also capture:
- `referrer` (document.referrer)
- `first_visit` (timestamp; sessionStorage)
- `viewport_width`, `viewport_height`
- `device_type` (mobile / tablet / desktop, derived)

---

## Properties always sent

Use PostHog `register()` (or equivalent) so these are attached to every event:

```ts
{
  app: 'sankofield-landing',
  app_version: import.meta.env.VITE_GIT_SHA, // short sha at build
  env: import.meta.env.MODE, // 'production' | 'development'
  locale: navigator.language,
  utm_source: <captured>,
  utm_campaign: <captured>,
}
```

This project is Vite + React (not Next.js), so build-time env vars use
the `import.meta.env.VITE_*` namespace, not `process.env.NEXT_PUBLIC_*`.
Wire `VITE_GIT_SHA` in the deploy environment (e.g., set
`VITE_GIT_SHA=$(git rev-parse --short HEAD)` in the build step). If
hosted on Vercel, you can also forward `VERCEL_ENV` by re-exposing it
as `VITE_DEPLOY_ENV` in the Vercel project settings.

---

## Privacy

- **No PII collected.** The page has no form fields. The booking CTA
  hands off to Calendly / Tally where their own privacy applies.
- **Cookie banner:** required for EU visitors (rare for this audience
  but cheap insurance). Use a minimal banner with `Accept` /
  `Reject all` — block PostHog until accepted.
- **DNT respect:** if `navigator.doNotTrack === '1'`, skip all events
  except `page.view` (anonymous, no IP stored).

---

## Funnels to build in PostHog

### Primary funnel: landing → demo booked

```
1. page.view
2. (any) demo.booking.start
3. (Calendly webhook → PostHog) demo.booking.complete
```

Target conversion rate: **3–5%** of unique visitors.

### Engagement funnel: landing → fully scrolled

```
1. page.view
2. page.scroll_depth (pct >= 75)
3. whatsapp_sim.script.complete
4. (any) demo.booking.start
```

A visitor reaching step 3 is highly qualified.

### Drop-off funnel: where do they leave?

Bucket `page.exit` by `max_scroll_pct`:
- 0–25%: didn't engage with hero
- 25–50%: bailed before features
- 50–75%: bailed during features
- 75–100%: engaged but didn't book

Each bucket needs its own copy and UX intervention.

---

## Dashboards to set up

In PostHog, create 4 dashboards:

1. **Acquisition** — page views by `utm_source`, `referrer`, `utm_campaign`
2. **Engagement** — scroll depth distribution, time on page, WhatsApp sim
   completion rate
3. **Conversion** — demo bookings by tier, by placement, by UTM
4. **Quality** — bookings that turn into pilot signups (requires data
   from the booking system)

---

## Implementation note

Instrument events in a single hook:

```ts
// src/lib/analytics.ts
export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (navigator.doNotTrack === '1') return;
  if (!hasConsent()) return; // cookie banner check
  posthog?.capture(name, { ...defaultProps(), ...props });
}
```

Then `import { trackEvent } from '@/lib/analytics'` everywhere — no
direct PostHog calls in components. Easier to swap providers later.
