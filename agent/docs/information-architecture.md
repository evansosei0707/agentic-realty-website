# Information Architecture

Section-by-section map of the landing page. Sections render top-to-bottom
in this order. Each section has: purpose, layout, content references,
and (where applicable) the simulated-UI fixture it embeds.

Copy text lives in [`content.md`](content.md). Fixture data lives in
[`simulated-data.md`](simulated-data.md). Visual tokens live in
[`design-system.md`](design-system.md).

---

## 1. Top nav (sticky)

**Purpose:** persistent identity + escape hatch to demo CTA.

**Behavior:**
- Transparent at top of page
- On scroll past 80px → backdrop-blur `12px` + `bg-canvas/80` opacity

**Layout (1280px container):**

```
[Logo Sankofield]   Product · How it works · Pricing · Customers · Docs   [GH ★ 0]  [Login]  [Book a demo]
```

**Mobile (< 768px):** logo left, hamburger right → drawer slide-in with
the same items stacked + CTA.

---

## 2. Hero

**Purpose:** in 5 seconds, communicate what Sankofield is, introduce
Ama (the AI agent), and tell prospects who it's for.

**Layout (split, ~52/48 left/right desktop; stacked mobile):**

```
┌────────────────────────────────────┬──────────────────────┐
│  [● LIVE PILOT · ACCRA · MAY 2026] │                      │
│                                    │   circular video     │
│  Your WhatsApp leads,              │   (rounded-full),    │
│  handled.                          │   lime radial glow   │
│                                    │   behind it          │
│  Sankofield runs Ama, the AI       │                      │
│  agent that qualifies, schedules,  │   /videos/hero.mp4   │
│  and follows up on every property  │   autoplay · muted · │
│  inquiry. Ghanaian English, on     │   loop · playsInline │
│  WhatsApp, 24/7. Your agents only  │                      │
│  step in when it matters.          │                      │
│                                    │                      │
│  [ Book a 15-min demo ]            │                      │
│   See how it works ↓               │                      │
│                                    │                      │
│  < 5s median reply · 14 AI safety  │                      │
│  rules · 9 live automations        │                      │
└────────────────────────────────────┴──────────────────────┘
```

**Copy:** §`hero` in [`content.md`](content.md).
**Motion:** **Pattern 5** (layered parallax). Three layers transform
at different rates on scroll:

- `.hero-bg` (the video container) → `yPercent: -16`
- `.hero-copy` (eyebrow / headline / subhead / CTAs / metric row) → `yPercent: -6`
- `.hero-video` (the video element itself) → `scale: 1.04`

Subtle breathing on the lime blob is CSS-only (`.hero-breathe`
keyframe), not a GSAP tween. Full code in
[`animation-patterns.md`](animation-patterns.md).
**Component:** `src/components/landing/hero/hero.tsx`.

---

## 3. Logo strip — "trusted by"

**Purpose:** social proof at a glance.

**Layout:** horizontal row of 6 greyscale logos with 64px gaps. Wraps
on mobile to 2×3.

**Content:** placeholder logos until partnerships are confirmed.
Suggested (from `content.md`): meQasa, Jiji, Tonaton, Lamudi Ghana,
Property Hub, DDP.

**⚠ Action item for human:** confirm any partnership claim before going
live. Use the placeholder list as visual mass only.

---

## 4. Live WhatsApp simulation (the centerpiece)

**Purpose:** show, don't tell. A scripted conversation that proves Ama
sounds like a real person.

**Layout (split 50/50, stacked mobile):**

```
┌──────────────────────┬─────────────────────────┐
│  WhatsApp thread     │  Status pills (stacked) │
│  (phone-shaped card) │                         │
│                      │  ● LEAD QUALIFIED       │
│  [Kofi → Ama →       │    Strong match         │
│   Kofi → Ama → ...]  │                         │
│                      │  ● VIEWING SCHEDULED    │
│  Scrubs to scroll —  │    Sat 2026-05-23 11:00 │
│  section pinned for  │    East Legon 2BR       │
│  ~1.5vh; one message │                         │
│  per scroll step.    │  ● FOLLOW-UPS PAUSED    │
│                      │    Resumes if viewing   │
│                      │    falls through        │
└──────────────────────┴─────────────────────────┘

           Real WhatsApp. Real AI. Real conversation.
```

**Conversation script:** `script` in [`simulated-data.md`](simulated-data.md).

**Motion:** **Pattern 1** (pinned scrub timeline) from
[`animation-patterns.md`](animation-patterns.md). The section pins for
~1.5 viewport heights; messages reveal one at a time as the user
scrolls; pills `--lit` CSS variable interpolates 0 → 1 inside the same
timeline so they "light up" in sync with their scripted message. The
phone-frame mockup gets a subtle `rotateY: 0 → -4deg` across the full
pin for depth. No autoplay — the user scrubs the conversation.

**Status pills behavior (driven by the same timeline):**
- All three start dimmed (`--lit: 0` → `--border-subtle`, `--text-muted`)
- At message 3 (Ama's first reply): `LEAD QUALIFIED` `--lit` → 1
  (lime border + soft lime wash)
- At message 6 (Ama confirms slot): `VIEWING SCHEDULED` `--lit` → 1
  (lime), `FOLLOW-UPS PAUSED` `--lit` → 1 (orange variant)
- Scrolling **back up** reverses the timeline — pills dim again. This
  is intentional; users can "rewind" the demo.
- **Mobile (< 768px):** drop the pin to avoid scroll-hijack on touch;
  replace with Pattern 3 batch reveal so the messages and pills still
  animate in, just not scrubbed.

> The whole section is wrapped in a `.whatsapp-section` container, so
> `--accent-green` resolves to the bright WhatsApp green `#1fff6a`
> here (not the brand lime). This is the only place that override
> applies. See [`design-system.md`](design-system.md).

**Components:**
- `src/components/landing/simulated-ui/conversation-thread.tsx`
- `src/components/landing/simulated-ui/status-pills.tsx`
- `src/components/landing/simulated-ui/whatsapp-simulation.tsx` (composes the two)

---

## 5. Product walkthrough — 4 feature cards

**Purpose:** show the four product surfaces a prospect would interact
with if they bought. Cards 5a/5b/5c face the lead and the back-office;
5d (new) faces the team in the field.

**Layout rhythm (Mastra-style):** large card with corner pill label.
Cards alternate text-left/right.

### 5a. Escalation inbox

**Label pill:** `AGENT COCKPIT` (mono, top-left)

**Layout:**
```
┌─────────────────────┬──────────────────────────────┐
│  When Ama can't     │  ┌────────────────────────┐  │
│  help, she          │  │ Escalation inbox       │  │
│  escalates.         │  │                        │  │
│  You see it here    │  │ [list of 3 lead rows]  │  │
│  before WhatsApp    │  │                        │  │
│  pings you.         │  └────────────────────────┘  │
└─────────────────────┴──────────────────────────────┘
```

**Embedded panel:** `src/components/landing/simulated-ui/escalation-inbox.tsx`
**Data:** `escalations` array in `simulated-data.md`

**Row anatomy (each of 3):**

```
[avatar] Akosua A.    [orange pill: out_of_scope]    2m ago
         23324•••456  "Can I tour the Cantonments duplex tonight?"
```

- avatar: filled circle, initial in mono on `--surface-3`
- name: `body.md` primary
- phone: mono.sm, muted, with 3 dots masking middle
- reason pill: orange (or pink for `vip_inbound`)
- message: body.sm secondary, 1-line truncated
- timestamp: mono.sm muted, right-aligned

### 5b. Today's viewings

**Label pill:** `OPS BOARD`

**Layout:**
```
┌──────────────────────────────┬─────────────────────┐
│  ┌────────────────────────┐  │  Every confirmed    │
│  │ Today's viewings       │  │  viewing, 24h and   │
│  │                        │  │  2h reminders fired │
│  │ [timeline, 4 viewings] │  │  automatically,     │
│  │                        │  │  agent pinged at    │
│  │ [mini calendar widget] │  │  the 2h mark.       │
│  └────────────────────────┘  │                     │
└──────────────────────────────┴─────────────────────┘
```

**Embedded panel:** `src/components/landing/simulated-ui/today-viewings.tsx`
**Data:** `viewings_today` array in `simulated-data.md`

**Row anatomy:**

```
09:00  ● confirmed   Kofi A.    East Legon 2BR
                     24h ✓      2h ✓
```

- Time column: 60px wide, mono.md primary
- Status dot: green / orange
- Lead name + property: 2 lines, body.sm primary + secondary
- Reminder ticks: mono.sm muted ✓ or muted "pending"

### 5c. System health

**Label pill:** `ALWAYS ON`

**Layout:**
```
┌─────────────────────┬──────────────────────────────────┐
│  Every check, every │  ┌────────────────────────────┐  │
│  minute. No silent  │  │ System health              │  │
│  failures.          │  │                            │  │
│  You know first,    │  │ [5 plain-English rows]     │  │
│  not the lead.      │  │                            │  │
│                     │  │ All systems running        │  │
│                     │  │ [14-day activity sparkline]│  │
│                     │  └────────────────────────────┘  │
└─────────────────────┴──────────────────────────────────┘
```

**Embedded panel:** `src/components/landing/simulated-ui/system-health.tsx`
**Data:** `workflows` (use the `label` field) + `activity_14d` in
`simulated-data.md`

**Table columns (buyer-facing):**

| What it does (label) | Status (dot + word) | Last run (mono) |
|---|---|---|

Buyer rows render as:
```
Lead replies          ● running       12s ago
Follow-ups            ● running       12m ago
Property matching     ● retrying      28m ago
Review requests       ● running       2h ago
Team chat             ● running       12s ago
```

Drop the internal `workflow` name, the `avg_latency_ms`, and the
`errors_24h` count from the buyer view. They live in the fixture for
the Phase 2 ops dashboard, not for the landing.

Sparkline: 14 data points (`activity_14d`), line drawn in `--accent-green`
(resolves to the brand lime `#d1fe17`), no axes, last point as a dot.
Component: `src/components/landing/simulated-ui/sparkline.tsx`. No
caption beneath; the line itself signals "always on, never quiet."

### 5d. From the field — Telegram CRM agent (NEW)

**Label pill:** `FROM THE FIELD`

**Purpose:** show the second AI surface — the one your team uses, not
the lead. Agents text or voice-note a Telegram bot to add a listing,
log a note, or check who the hot leads are. No CRM UI needed.

**Layout:** mirror of 5a (text-left, panel-right).
```
┌─────────────────────┬──────────────────────────────────┐
│  Your team updates  │  ┌────────────────────────────┐  │
│  the CRM by texting │  │ Telegram thread            │  │
│  a bot. Plain       │  │                            │  │
│  English. Text or   │  │ [voice note → confirm]     │  │
│  voice note. No     │  │ [text query → answer]      │  │
│  app to learn.      │  │                            │  │
│                     │  └────────────────────────────┘  │
└─────────────────────┴──────────────────────────────────┘
```

**Embedded panel:** `src/components/landing/simulated-ui/telegram-thread.tsx`
**Data:** `telegram_demo` array in `simulated-data.md`

**Motion:** **Pattern 3** (batch reveal). Do NOT pin-scrub here — §4
is the only pinned scrub section to avoid scroll fatigue.

**Voice note bubble:** mic icon + duration pill + simple 3-bar
waveform. Transcript shown beneath in muted body.sm.

**Confirmation bubble:** small green check next to the bot reply to
signal "done."

---

## 6. How it works — three steps

**Purpose:** show how the system fits into an agency's day in three
steps. The buyer is an agency owner, not a developer evaluating a
stack, so the **three steps are the section hero**. The connecting
diagram is a smaller visual aid to the side, not the centerpiece.

**Layout (steps-first, diagram-second):**

```
┌─────────────────────────────────┬─────────────────────────┐
│  Step 1. Lead messages          │                         │
│          on WhatsApp.           │   [small organic-shape  │
│  Ama greets, qualifies, saves   │    diagram, 4 tendrils] │
│  the lead to your CRM in        │                         │
│  seconds.                       │   WhatsApp · Your CRM · │
│                                 │   Ama · Telegram        │
│  Step 2. Match and schedule.    │   (Google Calendar      │
│  Add a property in the CRM      │    coming soon, dotted) │
│  and Ama knows about it within  │                         │
│  minutes. She offers slots,     │                         │
│  books the viewing, pauses      │                         │
│  follow-ups.                    │                         │
│                                 │                         │
│  Step 3. Follow up and close.   │                         │
│  Day 3, 7, 14, 30 follow-ups,   │                         │
│  viewing reminders, and a       │                         │
│  Google review request after    │                         │
│  the deal closes.               │                         │
│                                 │                         │
│  Everything connected. Nothing  │                         │
│  for you to configure.          │                         │
└─────────────────────────────────┴─────────────────────────┘
```

**Step component:** `src/components/landing/how-it-works/steps.tsx`.
Three numbered rows, large step number in lime, body text in primary.

**Diagram component:** `src/components/landing/workflow-diagram/diagram.tsx`.
Inline SVG, smaller scale than the previous version (roughly 40% of the
section width on desktop, hidden or stacked below on mobile). Four
nodes only: WhatsApp, Your CRM, Ama, Telegram. Google Calendar drawn
with a dashed tendril to signal "coming soon."

**Motion:**
- Steps use Pattern 6 (word rise) for each step heading and Pattern 3
  (batch reveal) for the bodies, staggered.
- Diagram uses Pattern 2 (SVG path-draw with scrub) — tendrils draw
  via `stroke-dashoffset` as the section scrolls past; each node label
  fades in as its tendril completes.

> **What changed:** the previous version centered a full architecture
> diagram with five technical nodes (including "Operational DB ·
> n8n-owned Postgres") and labelled the section as proof "the system
> is real software, not vibes." That framing serves a developer
> evaluator. The buyer's question is "what will this do for me on
> Monday morning?" — which the three steps answer, while the diagram
> still satisfies anyone who wants to see the pieces.

---

## 7. Numbers / proof bar

**Purpose:** quick credibility check.

**Layout:** 4-column grid (2×2 mobile). Each cell:

```
   14
 ────────────
   rules
   in Ama's system prompt
   (banned openers, voice
    calibration, post-deal
    awareness, name verification)
```

Numerals: `display.lg` (64px) in `--accent-green` (the brand lime
`#d1fe17`, not bright neon green). Labels: `body.sm` secondary.
Divider: 1px `--border-subtle`.

**Content:** §`stats` in [`content.md`](content.md).

---

## 8. Pricing — 3 tiers

**Purpose:** convert curiosity into a demo call.

**Layout:** 3 cards side-by-side (stacked mobile). Middle card
("Studio") is taller by 8px, has a lime border (`--accent-green` 1px
instead of `--border-subtle`), and a `RECOMMENDED` pill at top-right.

**Card anatomy:**

```
┌──────────────────────┐
│  Pilot               │  ← tier name, display.sm
│  GHS 4,500           │  ← price, display.md + /mo muted
│  /mo                 │
│  ─────────────────   │
│  ✓ Up to 200 leads   │  ← features, body.sm + green check
│  ✓ 1 agent persona   │
│  ✓ WhatsApp + Twenty │
│  ✓ Email support     │
│  ─────────────────   │
│  [ Start pilot ]     │  ← button: ghost for outer, primary for middle
└──────────────────────┘
```

**Content:** §`pricing` in [`content.md`](content.md).

Footnote (`mono.sm muted`, centered, 16px below cards):
"All prices in GHS. Setup waived for pilot clients booked before
2026-07-01."

---

## 9. FAQ + footer

### FAQ

**Layout:** centered column, max-width 720px. Accordion. Each item is
a row with a question, a chevron, and a hidden answer panel that
expands on click.

```
┌────────────────────────────────────────────────────────┐
│  Does Ama replace my agents?                       [v] │
└────────────────────────────────────────────────────────┘
```

Expanded:

```
┌────────────────────────────────────────────────────────┐
│  Does Ama replace my agents?                       [^] │
│  No. She handles the first 80% so they close the       │
│  last 20%. Your agents stop chasing first-touch        │
│  messages and start closing.                           │
└────────────────────────────────────────────────────────┘
```

**Content:** §`faq` in [`content.md`](content.md). 8 questions.
(Originally 6; added Q7 "Can my team update the CRM from the field?"
and Q8 "Does Ama understand voice notes?" alongside the new feature
card 5d.)

### Footer

**Layout:** 4-column grid (collapses to accordion mobile), then
bottom row with copyright + socials.

```
Sankofield logo + tagline

Product            Resources         Company           Legal
- How it works     - Docs            - About           - Privacy
- Pricing          - Status          - Contact         - Terms
- Customers        - Changelog       - Careers         - DPA
- Integrations     - Open source     - Press kit       - Cookies

────────────────────────────────────────────────────────────────
© 2026 Sankofield · Accra, Ghana              [X] [GH] [in] [@]
```

---

## Section ordering rationale

1. Nav — orientation
2. Hero — promise
3. Logos — trust
4. WhatsApp sim — proof (the killer demo)
5. Feature cards — depth (4 cards: lead handoff, viewings, system
   health, team-in-the-field Telegram bot)
6. How it works in three steps — what happens on Monday morning
7. Numbers — quick scan
8. Pricing — decision moment
9. FAQ — handle objections, then close

Every section has at most one CTA. The pricing CTAs feed into the
same demo-booking endpoint as the hero CTA so funnel attribution stays
clean (see [`analytics-events.md`](analytics-events.md) for event names).

> §6 was previously framed as "architecture — credibility (we know
> what we're doing)" with a full system diagram as the centerpiece.
> That serves a developer evaluator, not an Accra agency owner. The
> three-step flow now leads; the diagram is a supporting visual.
