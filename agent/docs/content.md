# Content — All Copy on the Landing Page

Every line of text the user sees, organised by section. Edit voice
here, not in components. Components import from `src/lib/content.ts`
which mirrors this file 1:1.

**Voice rules** (lifted from `n8n-workflows/lead-intake/b-lead-intake.json`
Build Claude Context system prompt, VOICE & ENERGY section):

- **Banned openers:** "Great!", "Absolutely!", "Of course!", "Perfect!",
  "Thanks for reaching out", "I'd be happy to". These read as AI tells.
- **Answer first, context second.** "Yes, available. GHS 4,500." not
  "I'd love to help you with that! Let me check…"
- **Opinion over hedge.** "That budget gets you Adenta or Teshie, not
  East Legon" is better than "There are many factors to consider…"
- **Specific over abstract.** "Saved 14h/week" beats "save time".
- **Ghanaian English register.** Confident, plain, no British formality.

**Naming convention** (apply consistently across all copy):

- **Sankofield** = the platform, the company, the brand. Use in
  wordmark, footer, "Sankofield handles your WhatsApp leads",
  copyright. Adinkra root: *Sankofa* — "go back and fetch what you
  forgot" — encodes the product's memory across every conversation.
- **Ama** = the AI agent's name (the WhatsApp persona). Use in any
  copy describing the conversation: "Ama replies in under 5s", "Ama
  escalates when she can't help", "Does Ama replace my agents?"
- The two are introduced together once in the hero subhead; thereafter
  pick whichever fits the sentence. Never write "Sankofield says hi"
  (it's not a person); never write "Ama Automation" (Ama is not a
  company).

---

## §nav

- Logo wordmark: `Sankofield`
- Nav items: `Product` · `How it works` · `Pricing` · `Customers` · `Docs`
- Right side: `Login` (ghost button), `Book a demo` (primary)
- GitHub badge: `★ 0` (placeholder — replace if repo goes public)

---

## §hero

**Eyebrow** (mono.xs UPPER, green):
```
LIVE PILOT · ACCRA · MAY 2026
```

**Headline** (display.xl):
```
Your WhatsApp leads, handled.
```

**Subhead** (body.lg secondary):
```
Sankofield runs Ama, the AI agent who qualifies, schedules, and
follows up on every property inquiry. Ghanaian English, on WhatsApp,
24/7. She waits and types like a real person, knows when a deal is
done, and only pings your agents when something really needs them.
```

**Primary CTA:** `Book a 15-min demo`
**Secondary CTA:** `See how it works ↓`

---

## §logos

**Section caption** (mono.sm muted, centered above logos):
```
Trusted by agencies and listing portals across Ghana
```

**Logo list (placeholder until partnerships confirmed):**
- meQasa
- Jiji
- Tonaton
- Lamudi Ghana
- Property Hub
- DDP

> ⚠ Verify each before going live. If unverified, render the
> mark `Trusted by leading agencies in Accra` and drop named logos
> until at least 3 are signed.

---

## §whatsapp-sim

**Section eyebrow** (mono.xs UPPER, green): `THE PRODUCT, IN ACTION`

**Section title** (display.lg):
```
Watch Ama close a lead in 90 seconds
```

**Section subhead** (body.lg secondary):
```
A real conversation on real WhatsApp. The only thing simulated is the
timing. Ama really does reply in under 5 seconds, waits while the lead
is still typing, and answers voice notes too.
```

**Conversation script** (see [`simulated-data.md`](simulated-data.md)
section `conversation_script`).

**Pills below conversation (right column):**
- `LEAD QUALIFIED`: lights up when Ama figures out what the lead wants
- `VIEWING SCHEDULED`: lights up when the slot is locked in
- `FOLLOW-UPS PAUSED`: once a viewing is booked, the automatic
  follow-up messages pause. They start again if the viewing falls through.

**Caption** (mono.sm muted, centered below):
```
Real WhatsApp. Real AI. Real conversation.
```

---

## §feature-escalation

**Card label pill:** `AGENT COCKPIT`

**Card title** (display.md):
```
Ama escalates when Ama can't help.
```

**Card body** (body.md secondary):
```
Angry lead, tricky question, suspected VIP. Every escalation shows up
in your inbox before WhatsApp pings your phone. And if your team goes
quiet on one, the system keeps nudging them until someone picks it up.
No lead falls through the cracks overnight.
```

**Subcaption under panel** (mono.sm muted):
```
3 escalations today · last 2 minutes ago
```

---

## §feature-viewings

**Card label pill:** `OPS BOARD`

**Card title** (display.md):
```
Every viewing, every reminder, on time.
```

**Card body** (body.md secondary):
```
Slots offered automatically from your agents' availability. The lead
gets a reminder a day before and again two hours before. Your agent
gets a final ping two hours before too, so nobody no-shows because
someone forgot.
```

**Subcaption under panel** (mono.sm muted):
```
4 viewings today · all reminders firing
```

---

## §feature-system-health

**Card label pill:** `ALWAYS ON`

**Card title** (display.md):
```
Everything checked. Every minute. No silent failures.
```

**Card body** (body.md secondary):
```
Lead replies, follow-ups, property matching, reminders, reviews. Every
behind-the-scenes job is checked every minute. If something stalls,
you know first, not the lead. No 11pm calls about a thing that quietly
broke last Tuesday.
```

**Subcaption under panel** (mono.sm muted):
```
All systems running · 0 issues today
```

---

## §feature-telegram

**Card label pill:** `FROM THE FIELD`

**Card title** (display.md):
```
Your team updates the CRM by texting a bot.
```

**Card body** (body.md secondary):
```
Agents add a new listing, log a note, or check on a lead from their
phone. Plain English, text or voice note, no laptop, no app to learn.
Ama handles the leads on WhatsApp. Her twin on Telegram handles your
team.
```

**Subcaption under panel** (mono.sm muted):
```
Add a listing. Log a note. Find a lead. Without ever opening the CRM.
```

---

## §how-it-works

**Section eyebrow** (mono.xs UPPER, green): `HOW IT ALL CONNECTS`

**Section title** (display.lg):
```
One agent. Connected to everything you already use.
```

**Section subhead** (body.lg secondary):
```
Fully managed for you, or run it on your own servers. Either way, it
just works. No setup on your end.
```

**Diagram caption** (body.sm secondary, centered below SVG):
```
Everything connected. Nothing for you to configure.
```

**Step 1 title:** `Lead messages on WhatsApp.`
**Step 1 body:**
```
Ama greets in their register (formal, casual, pidgin) and figures out
budget, location, and bedroom count. Within seconds, the lead is in
your CRM with everything they've told her, ready for your team to pick
up later.
```

**Step 2 title:** `Match and schedule.`
**Step 2 body:**
```
She matches them to listings in your CRM, in their budget, in the
areas they want. Add a new property in the CRM and Ama knows about it
within minutes. She offers three viewing slots. When the lead picks
one, the viewing is booked, follow-ups pause, and your agent gets a
WhatsApp summary.
```

**Step 3 title:** `Follow up and close.`
**Step 3 body:**
```
Ama follows up at Day 3, 7, 14, and 30 if the lead goes quiet, and
sends viewing reminders a day before and two hours before. When the
deal closes, she sends a Google review request two hours later, then a
gentle nudge a week after if no review came through.
```

---

## §stats

**Section eyebrow:** `BY THE NUMBERS`

| Number | Label |
|---|---|
| `14` | safety rules Ama follows. She never invents specs, never pushes after no, never gets the name wrong. |
| `5` | follow-up message types ready to go. Ama reaches out at Day 3, 7, 14, 30, and after viewings, fully within WhatsApp's rules. |
| `9` | live automations running 24/7 for your agency. Always on, even at 11pm. |
| `< 5s` | typical reply time, day or night. |

**Footnote** (mono.sm muted, centered):
```
Numbers from live pilot, May 2026.
```

---

## §pricing

**Section eyebrow:** `PRICING`

**Section title** (display.lg):
```
One agent. Pay for what you use.
```

**Section subhead** (body.lg secondary):
```
Fully managed by us, or on your own servers if you prefer. Cancel any
time. No setup fee for pilot clients booked before July 1, 2026.
```

### Pilot

- **Price:** `GHS 5,000 / mo`
- **Tagline:** `For solo brokers and small agencies testing the waters.`
- **Features:**
  - Up to 200 leads/month
  - 1 agent persona (Ama or your branded name)
  - WhatsApp Business and your CRM included
  - Automatic property matching
  - Email support (24h response)
- **CTA:** `Start pilot`

### Studio (recommended)

- **Price:** `GHS 9,800 / mo`
- **Tagline:** `For agencies running 5+ agents.`
- **Features:**
  - Up to 1,000 leads/month
  - 3 agent personas
  - Property matching, viewing scheduler, and review requests
  - Telegram bot for your team to update the CRM from the field
  - Ama tuned to your agency's voice
  - WhatsApp support (4h response)
- **CTA:** `Book a demo`

### Agency

- **Price:** `Custom`
- **Tagline:** `For multi-location agencies and franchises.`
- **Features:**
  - Unlimited leads
  - Unlimited agent personas
  - E-signature for offers and contracts (Phase 3)
  - Social media autopilot (Phase 3)
  - Dedicated SLA + Slack channel
  - White-label option
- **CTA:** `Contact sales`

**Footnote** (mono.sm muted, centered, below cards):
```
All prices in GHS. Setup waived for pilot clients booked before 2026-07-01.
Prefer to run it on your own servers? Ask us.
```

---

## §faq

**Section eyebrow:** `QUESTIONS`

**Section title** (display.lg):
```
Things agency owners usually ask first.
```

### 1. Does Ama replace my agents?

```
No. She handles the first 80% so they close the last 20%. Your agents
stop chasing first-touch messages at 11pm and start closing actual
deals. Ama escalates anything she can't handle.
```

### 2. What languages does Ama speak?

```
Ghanaian English first. She understands pidgin and recognises Twi and
Ga keywords. Full Twi replies are on the Phase 2 roadmap.
```

### 3. What happens when the AI makes a mistake?

```
Four safety nets. (1) Fourteen rules Ama follows: she won't quote a
price the lead never mentioned, won't invent property features, won't
push after someone says no, won't reuse a name from someone else.
(2) Instant escalation: any complaint, anger, or tricky question lands
in your inbox immediately. (3) Per-lead silence: flag any VIP as
agent-only and Ama goes quiet on that thread. Your agent takes over
directly. (4) Name check: before booking any viewing, Ama confirms the
lead's real name, so reminders and review requests always go to the
right person.
```

### 4. Where does my data live?

```
On your own servers or our managed ones. Your call. WhatsApp messages
kept for 90 days. Lead details (name, notes) anonymised after 2 years
of inactivity. Compliance roadmap follows Ghana's emerging
data-protection guidelines.
```

### 5. Can Ama follow up if a lead goes quiet for days?

```
Yes. Five ready-to-go follow-up messages handle the windows WhatsApp
sets: property follow-up, new listing alert, two viewing reminders,
and a review request. Ama reaches out at Day 3, 7, 14, 30, and after
viewings, fully within WhatsApp's rules. You never have to touch any
of this.
```

### 6. How long does setup take?

```
Five working days from contract to your first live lead. We set
everything up, connect your WhatsApp Business number, train Ama on
your agency's voice, and go.
```

### 7. Can my team update the CRM from the field?

```
Yes. Your agents text or send a voice note to a Telegram bot. Add a
property, log a note about a lead, look up a lead's status, check who
the hot ones are in East Legon. Plain English, no laptop, no app to
learn. Ama runs the lead side on WhatsApp. Her twin runs the team side
on Telegram.
```

### 8. Does Ama understand voice notes?

```
Yes. Leads who prefer to talk instead of type can send a voice note.
Ama hears it and replies normally. Your team can send voice notes to
the Telegram bot too.
```

---

## §footer

**Brand block (left):**
- Logo: `Sankofield`
- Tagline (body.sm muted):
```
The AI agent for real estate, made in Accra.
```

**Column 1 — Product:**
- How it works
- Pricing
- Customers
- Integrations

**Column 2 — Resources:**
- Docs
- Status
- Changelog
- Open source

**Column 3 — Company:**
- About
- Contact
- Careers
- Press kit

**Column 4 — Legal:**
- Privacy
- Terms
- Data processing
- Cookies

**Bottom bar:**
```
© 2026 Sankofield · Accra, Ghana                    [X] [GitHub] [LinkedIn] [Email]
```

---

## Style sanity checklist (run before sign-off)

Search `content.md` for these banned strings. Every hit is a rewrite:

- "Great!"
- "Absolutely!"
- "Of course!"
- "Perfect!"
- "Thanks for reaching out"
- "I'd be happy to"
- "I'm here to help"
- "Don't hesitate to"
- "We're excited to"
- Any "AI-powered" used as a noun (it's a feature, not a category)

**Banned dev-speak in rendered copy** (this is what makes the page feel
like a developer tool wrapped for users — every hit is a rewrite):

- "system prompt" — rewrite as "rules Ama follows" or "safety rules"
- "n8n" — rewrite as "automation" or just drop
- "Postgres" / "GraphQL" / "API" / "Cloud API" / "Meta API" — drop or
  reframe as "WhatsApp Business"
- "workflow" (when shown to buyers) — rewrite as "automation" or use
  the specific job name ("follow-ups", "property matching")
- "operational DB" / "source of truth" / "reasoning" — drop these
  diagram sublabels entirely
- "observability" / "monitoring stack" — rewrite as "always-on checks"
- "lead_score" / "ai_disabled" / any `field_name=value` — drop or
  describe in plain English
- "self-hosted" / "VPS" / "Hetzner" — rewrite as "on your own servers"
- "templates pre-approved by Meta" / "24-hour window" — rewrite around
  the buyer benefit ("Ama reaches back out even after days of silence")
- "Claude Opus" / "Claude Sonnet 4.6" / any specific model name — drop
  the version. Just "Claude" or "the AI" is fine; the model is a
  moving target.
- "Day 3 / 7 / 14 / 30" as a slash-formatted list — rewrite as "Day 3,
  7, 14, and 30" or "over the first month" depending on the sentence

**Punctuation rule (rendered copy only):**

- **No em dashes (`—`) anywhere on the page.** Rewrite into a period,
  comma, colon, semicolon, or parentheses. Em dashes are AI tells in
  marketing copy and the team explicitly removed them. This applies
  to rendered text (hero, body, FAQ, footer, conversation script). It
  does **not** apply to internal dev docs (SPEC, README, this style
  section), where em dashes are fine.
- En dashes (`–`) are also discouraged in rendered copy. Use a hyphen
  for ranges (`24-48 hours`, not `24–48 hours`).
