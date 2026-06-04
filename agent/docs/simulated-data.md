# Simulated Data Fixtures

All faux data that powers the embedded UI panels on the landing page.
Field names **must match the real schema** in
[`../../../docs/01-data-model/operational-db.md`](../../../docs/01-data-model/operational-db.md)
and [`../../../docs/01-data-model/twenty-realestate-schema.md`](../../../docs/01-data-model/twenty-realestate-schema.md)
so the swap from fixture to live `fetch()` in Phase 2 is one line per
component.

Components import these from `src/lib/fixtures.ts`. The TypeScript
shapes mirror what each table actually returns.

---

## TypeScript shapes (mirror real schema)

```ts
// realestate_db.leads + Twenty Lead
export type Lead = {
  id: string;                      // UUID
  name: string;
  phone: string;                   // 233••••• masked for display
  status:
    | 'new'
    | 'qualified'
    | 'hot'
    | 'viewing_scheduled'
    | 'converted'
    | 'cold'
    | 'lost';
  source: 'whatsapp' | 'referral' | 'portal' | 'walk_in';
  budget_min: number;              // GHS
  budget_max: number;              // GHS
  location_preferences: string[];  // multi-area array
  property_type: 'buy' | 'rent';
  bedrooms: number;
  lead_score: number;              // 0–100
  ai_disabled: boolean;
  agent_context: string | null;
  name_verified: boolean;
  last_contact: string;            // ISO
  created_at: string;              // ISO
};

// realestate_db.conversations
export type ConversationMessage = {
  id: string;
  lead_id: string;
  direction: 'inbound' | 'outbound';
  message: string;
  created_at: string;              // ISO
};

// realestate_db.viewings
export type Viewing = {
  id: string;
  lead_name: string;               // joined for display
  property_label: string;          // e.g. "East Legon 2BR"
  scheduled_datetime: string;      // ISO
  status:
    | 'pending_confirmation'
    | 'confirmed'
    | 'completed'
    | 'cancelled'
    | 'no_show';
  reminder_sent_24h: boolean;
  reminder_sent_2h: boolean;
};

// derived from realestate_db.workflow_errors aggregations
export type WorkflowHealthRow = {
  workflow: string;                // internal n8n workflow name (not shown to buyers)
  label: string;                   // plain-English description rendered on the landing
  status: 'healthy' | 'retry' | 'failing';
  last_run: string;                // ISO
  errors_24h: number;
  avg_latency_ms: number;          // kept for Phase 2 ops dashboard; NOT rendered on landing
};

// derived from b-lead-intake escalation logic
export type Escalation = {
  lead_name: string;
  phone_masked: string;
  reason:
    | 'out_of_scope'
    | 'complaint'
    | 'vip_inbound'
    | 'angry'
    | 'name_verify';
  last_message: string;
  occurred_at: string;             // ISO
};
```

---

## Fixture: `conversation_script` (§4 WhatsApp sim)

Used by `src/components/landing/simulated-ui/conversation-thread.tsx`.
The thread is **scroll-scrubbed** (Pattern 1 in
[`animation-patterns.md`](animation-patterns.md)), not autoplayed —
the user drives playback by scrolling through the pinned section, and
scrolling back up rewinds it. There is no 25-second autoplay loop.

```ts
export const conversation_script: ConversationMessage[] = [
  {
    id: 'c1',
    lead_id: 'lead-kofi-001',
    direction: 'inbound',
    message: 'hi, saw a 2-bed in East Legon. is it still available?',
    created_at: '2026-05-20T12:42:14Z',
  },
  {
    id: 'c2',
    lead_id: 'lead-kofi-001',
    direction: 'outbound',
    message:
      "Hey Kofi 👋 Yes, the East Legon 2-bed is still available. " +
      "GHS 4,500/month, furnished, parking for one car. Want me to " +
      "set up a viewing this week?",
    created_at: '2026-05-20T12:42:21Z',
  },
  {
    id: 'c3',
    lead_id: 'lead-kofi-001',
    direction: 'inbound',
    message: 'how about Saturday morning',
    created_at: '2026-05-20T12:43:02Z',
  },
  {
    id: 'c4',
    lead_id: 'lead-kofi-001',
    direction: 'outbound',
    message: "I've got 9am, 11am, or 1pm Saturday. Which works?",
    created_at: '2026-05-20T12:43:08Z',
  },
  {
    id: 'c5',
    lead_id: 'lead-kofi-001',
    direction: 'inbound',
    message: '11am',
    created_at: '2026-05-20T12:44:11Z',
  },
  {
    id: 'c6',
    lead_id: 'lead-kofi-001',
    direction: 'outbound',
    message:
      "Booked. I'll send a reminder 24h before. Address coming " +
      "Friday evening.",
    created_at: '2026-05-20T12:44:16Z',
  },
];
```

**Animation cues:**
- Typing dots between c1 → c2, c3 → c4, c5 → c6: 1.2s before each
  outbound message renders.
- After c2 renders → trigger `LEAD QUALIFIED` pill pulse.
- After c6 renders → trigger `VIEWING SCHEDULED` + `FOLLOW-UPS PAUSED`
  pulses (stagger 150ms).

---

## Fixture: `status_pills` (§4 right rail)

```ts
export const status_pills = [
  {
    id: 'pill-qualified',
    label: 'LEAD QUALIFIED',
    detail: 'Strong match',
    accent: 'green' as const,
    triggerAt: 'c2',
  },
  {
    id: 'pill-viewing',
    label: 'VIEWING SCHEDULED',
    detail: 'Sat 2026-05-23 · 11:00 · East Legon 2BR',
    accent: 'green' as const,
    triggerAt: 'c6',
  },
  {
    id: 'pill-paused',
    label: 'FOLLOW-UPS PAUSED',
    detail: 'Resumes if the viewing falls through',
    accent: 'orange' as const,
    triggerAt: 'c6',
  },
];
```

---

## Fixture: `escalations` (§5a Escalation inbox)

3 rows. Names and phone numbers are fictional — middle digits masked.

```ts
export const escalations: Escalation[] = [
  {
    lead_name: 'Akosua A.',
    phone_masked: '23324•••456',
    reason: 'out_of_scope',
    last_message: 'Can I tour the Cantonments duplex tonight?',
    occurred_at: '2026-05-20T13:08:00Z', // 2 min ago at render
  },
  {
    lead_name: 'Yaw M.',
    phone_masked: '23354•••012',
    reason: 'complaint',
    last_message: "The agent didn't show up for the viewing!",
    occurred_at: '2026-05-20T12:56:00Z', // 14 min ago
  },
  {
    lead_name: 'Adwoa B.',
    phone_masked: '23320•••789',
    reason: 'vip_inbound',
    last_message: 'Hi, this is Adwoa from XYZ Corp…',
    occurred_at: '2026-05-20T12:32:00Z', // 38 min ago
  },
];
```

**Reason → pill color mapping:**
- `out_of_scope` → orange
- `complaint` → red
- `vip_inbound` → pink
- `angry` → red
- `name_verify` → orange

---

## Fixture: `viewings_today` (§5b Today's viewings)

4 viewings, mix of statuses. Times in Africa/Accra.

```ts
export const viewings_today: Viewing[] = [
  {
    id: 'v-001',
    lead_name: 'Kofi A.',
    property_label: 'East Legon 2BR',
    scheduled_datetime: '2026-05-20T09:00:00+00:00',
    status: 'confirmed',
    reminder_sent_24h: true,
    reminder_sent_2h: true,
  },
  {
    id: 'v-002',
    lead_name: 'Esi O.',
    property_label: 'Labadi 3BR studio',
    scheduled_datetime: '2026-05-20T11:00:00+00:00',
    status: 'confirmed',
    reminder_sent_24h: true,
    reminder_sent_2h: false,  // panel shows "2h pending"
  },
  {
    id: 'v-003',
    lead_name: 'Nana K.',
    property_label: 'Adenta townhouse',
    scheduled_datetime: '2026-05-20T14:30:00+00:00',
    status: 'pending_confirmation',
    reminder_sent_24h: false,
    reminder_sent_2h: false,
  },
  {
    id: 'v-004',
    lead_name: 'Yaa B.',
    property_label: 'Cantonments penthouse',
    scheduled_datetime: '2026-05-20T17:00:00+00:00',
    status: 'confirmed',
    reminder_sent_24h: true,
    reminder_sent_2h: true,
  },
];
```

**Status → display dot mapping:**
- `confirmed` → green dot, label `confirmed`
- `pending_confirmation` → orange dot, label `pending`
- `completed` → muted dot, label `done`
- `cancelled` → red dot, label `cancelled`
- `no_show` → red dot, label `no-show`

**Mini-calendar widget data:** 7 days (current week), each day has a dot
count:
```ts
export const week_density = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 5 }, // highlighted, today
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 6 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 1 },
];
```

---

## Fixture: `workflows` (§5c System health)

5 rows. Each row is a plain-English description of a behind-the-scenes
job. The `workflow` field maps internally to the n8n workflow name (see
[`../../../n8n-workflows/`](../../../n8n-workflows/) and
[`../../../.claude/memory/status.md`](../../../.claude/memory/status.md)),
but only the `label` is shown to buyers.

```ts
export const workflows: WorkflowHealthRow[] = [
  {
    workflow: 'b-lead-intake',
    label: 'Lead replies',
    status: 'healthy',
    last_run: '2026-05-20T13:09:48Z', // 12s ago
    errors_24h: 0,
    avg_latency_ms: 4200,
  },
  {
    workflow: 'c-followup-sender',
    label: 'Follow-ups',
    status: 'healthy',
    last_run: '2026-05-20T12:58:00Z', // 12m ago
    errors_24h: 0,
    avg_latency_ms: 1800,
  },
  {
    workflow: 'd-matching',
    label: 'Property matching',
    status: 'retry',
    last_run: '2026-05-20T12:42:00Z', // 28m ago
    errors_24h: 1,
    avg_latency_ms: 2100,
  },
  {
    workflow: 'e-reviews',
    label: 'Review requests',
    status: 'healthy',
    last_run: '2026-05-20T11:10:00Z', // 2h ago
    errors_24h: 0,
    avg_latency_ms: 900,
  },
  {
    workflow: 'i-telegram-agent',
    label: 'Team chat',
    status: 'healthy',
    last_run: '2026-05-20T13:09:48Z', // 12s ago
    errors_24h: 0,
    avg_latency_ms: 3400,
  },
];
```

**Status → dot + label:**
- `healthy` → green dot, `running`
- `retry` → orange dot, `retrying`
- `failing` → red dot, `paused`

**Buyer-facing table columns:** `label` · status dot + word · last run
("12s ago", "12m ago"). The `avg_latency_ms` and raw `workflow` fields
exist in the type but are NOT rendered on the landing page.

---

## Fixture: `activity_14d` (§5c sparkline)

14 days of activity (replies, follow-ups, reminders sent). Lightly
noisy curve so the line reads as "always on, never quiet."

```ts
export const activity_14d = [
  42, 38, 51, 61, 48, 55, 46,
  53, 67, 58, 60, 49, 54, 56,
];
```

No caption beneath the sparkline. The visual itself signals consistent
activity. If a label is needed for screen readers / SEO:
```
14 days of activity. Always on.
```

> **Migration note:** the earlier fixture was `token_spend_14d` with a
> "$1.42 / day avg · Claude Opus" caption. Both removed because an
> agency owner has no frame for AI vendor billing; what they care
> about is that the system is working, not what it costs us to run.

---

## Fixture: `telegram_demo` (§5d Team in the field)

Used by `TelegramThread.tsx`. A scripted Telegram conversation between
an agent and the CRM bot. Plays on scroll-into-view with Pattern 3
(batch reveal) — not Pattern 1, which is reserved for §4.

```ts
export type TelegramMessage = {
  id: string;
  sender: 'agent' | 'bot';
  message: string;
  kind?: 'text' | 'voice' | 'confirmation';
  durationSec?: number; // for voice-note pill rendering
};

export const telegram_demo: TelegramMessage[] = [
  {
    id: 't1',
    sender: 'agent',
    kind: 'voice',
    durationSec: 7,
    message: 'New listing. 3-bedroom in Cantonments, 8,500 a month, furnished, available now.',
  },
  {
    id: 't2',
    sender: 'bot',
    kind: 'confirmation',
    message: 'Added Cantonments 3BR · GHS 8,500/mo · furnished · available. Anything else?',
  },
  {
    id: 't3',
    sender: 'agent',
    kind: 'text',
    message: 'How many hot leads in East Legon under 5,000?',
  },
  {
    id: 't4',
    sender: 'bot',
    kind: 'confirmation',
    message: '4 hot leads. Kofi A., Esi O., Nana K., Yaa B. Want me to message them about the new listing?',
  },
];
```

**Render notes:**
- `kind: 'voice'` renders as a voice-note bubble (mic icon + duration
  pill + waveform), with the transcript shown muted beneath.
- `kind: 'confirmation'` shows a small green check next to the bot
  bubble to signal "done."
- Use the same green/grey bubble palette as §4 so the visual language
  reads as "another WhatsApp-like chat" without confusion.

---

## Fixture: `architecture_nodes` (§6 diagram)

Used by `src/components/landing/workflow-diagram/diagram.tsx` to render
the central `Sankofield` blob and 5 tendrils.

> **`color` field is semantic, not literal.** The values `'green'`,
> `'orange'`, `'pink'` map to the CSS custom properties
> `--accent-green` / `--accent-orange` / `--accent-pink` at render
> time. Components must consume them via `var(--accent-green)` (or
> the Tailwind utility `text-accent-green` / `bg-accent-green`) — never
> hardcode a hex. That way the §4 `.whatsapp-section` override (which
> remaps `--accent-green` to the bright WhatsApp green) and any future
> theme tweak propagate without touching the fixture.

```ts
export const architecture_nodes = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sublabel: 'where leads talk to Ama',
    color: 'green',
    position: 'top-right',
  },
  {
    id: 'crm',
    label: 'Your CRM',
    sublabel: 'every lead, in one place',
    color: 'green',
    position: 'right',
  },
  {
    id: 'ama',
    label: 'Ama',
    sublabel: 'the AI agent on WhatsApp',
    color: 'green',
    position: 'bottom-right',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    sublabel: 'where your team talks to the bot',
    color: 'orange',
    position: 'bottom-left',
  },
  {
    id: 'gcal',
    label: 'Google Calendar',
    sublabel: 'coming soon',
    color: 'pink',
    position: 'left',
    dashed: true, // dotted tendril for "future"
  },
];
```

> Internal note: the earlier diagram had a 4th node "Operational DB ·
> n8n-owned Postgres" — removed. That node is internal plumbing the
> buyer doesn't need to see. The Telegram node now occupies that
> position to surface the team-side CRM agent (workflow I) instead.

---

## Schema-drift verification

Before going live, run this checklist:

| Fixture field | Real-schema source | OK? |
|---|---|---|
| `Lead.status` enum | `database/migrations/V001__create_realestate_core.sql` |  |
| `Lead.location_preferences` (TEXT[]) | `database/migrations/V005__location_preferences_array.sql` |  |
| `Lead.ai_disabled` | `database/migrations/V007__ai_disabled_agent_context.sql` |  |
| `Lead.agent_context` | `database/migrations/V007__ai_disabled_agent_context.sql` |  |
| `Lead.name_verified` | `database/migrations/V006__name_verified.sql` |  |
| `Viewing.status` enum | `database/migrations/V001__create_realestate_core.sql` |  |
| `Viewing.reminder_sent_24h` / `_2h` | `database/migrations/V001__create_realestate_core.sql` |  |
| Workflow `workflow` field (internal name) | `n8n-workflows/*/<name>.json` `.name` field |  |
| Workflow `label` field (buyer-facing) | hand-curated; must read as plain English, not internal naming |  |
| `telegram_demo` reflects shipped agent | `docs/02-workflows/i-telegram-agent-design-v1.md` |  |

If any row fails, **the fixture is wrong, not the doc.** Update
`fixtures.ts` to match — never rename real columns to fit the fixture.

---

## Why this matters

Phase 2 of this frontend is the real operator dashboard. The Phase 1
landing page exists to test the visual language and the messaging. If
the fixtures here match the real schema, Phase 2 becomes a swap of
fixture imports for real API calls — same components, same shape.
Mismatch now = rework later.
