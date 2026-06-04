# Design System

Visual tokens for the Sankofield landing page. Dark-canvas base with a
lime-yellow brand accent, soft surface ramp, and monospace data labels.
Tokens are defined as CSS custom properties in `src/styles.css` and
exposed to Tailwind via `@theme inline { ... }` (Tailwind v4 — no
`tailwind.config.ts` file).

Light + dark are both first-class. The site defaults to dark; the
`.dark` class on `<html>` is toggled by `src/lib/theme.ts`.

---

## Color tokens

All values below are the CSS custom property names exactly as they
appear in `src/styles.css`. Use the Tailwind utility (`bg-canvas`,
`text-text-primary`, `border-border-subtle`, `text-accent-green`,
`text-primary`, etc.) in components — do not hardcode hex.

### Brand accent (identical in light + dark)

| Token | Hex | Usage |
|---|---|---|
| `--primary` / `--accent-green` | `#d1fe17` | Primary CTA, success, active pills, "confirmed" status, focus ring |
| `--primary-foreground` | `#000000` | Text on filled primary surfaces |
| `--primary-soft` / `--accent-green-soft` | `#d1fe171a` | Hover background, glow tint (10% alpha) |
| `--primary-line` / `--accent-green-line` | `#d1fe1766` | Dotted-line motif, decorative strokes (40% alpha) |
| `--surface-glow` | `#d1fe170f` | Faint lime wash behind hero / CTAs (~6% alpha) |
| `--accent-orange` | `#ff9f40` | Warnings, `escalation`, `pending`, agent-needed |
| `--accent-orange-soft` | `#ff9f4014` | Orange pill background (8% alpha) |
| `--accent-pink` | `#ff4dd9` | VIP / highlight pills (max 1 per viewport) |
| `--accent-pink-soft` | `#ff4dd914` | Pink pill background |
| `--accent-red` / `--destructive` | `#ff5c5c` | Errors, `failing` status, destructive |
| `--accent-red-soft` | `#ff5c5c14` | Red pill background |

> **WhatsApp section override.** Inside any element with the class
> `.whatsapp-section`, `--accent-green` / `-soft` / `-line` are
> overridden to `#1fff6a` / `#1fff6a1a` / `#1fff6a66` (bright WhatsApp
> green). This is the *only* place that bright green appears — it
> keeps the WhatsApp sim reading as native WhatsApp. Everywhere else
> the brand accent is lime-yellow `#d1fe17`.

### Surface + text ramp (split by mode)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--canvas` | `#fafafa` | `#000000` | Page background |
| `--surface-1` | `#ffffff` | `#0a0a0a` | Subtle section bg, ghost-button bg |
| `--surface-2` | `#f4f4f4` | `#111111` | Primary card background |
| `--surface-3` | `#ebebeb` | `#181818` | Nested card / input / pill background |
| `--border-subtle` | `#e4e4e4` | `#1f1f1f` | Default 1px card border |
| `--border-strong` | `#cfcfcf` | `#2a2a2a` | Hover / focus border |
| `--text-primary` | `#0a0a0a` | `#ffffff` | Headlines, hero copy |
| `--text-secondary` | `#525252` | `#a8a8a8` | Body, supporting copy |
| `--text-muted` | `#8a8a8a` | `#6b6b6b` | Timestamps, mono labels, metadata |
| `--text-disabled` | `#b8b8b8` | `#3f3f3f` | Inactive nav items, disabled buttons |

Shadcn-compat semantic tokens (`--background`, `--foreground`, `--card`,
`--popover`, `--muted`, `--accent`, `--border`, `--input`, `--ring`) are
also defined in `src/styles.css` and bound to the same ramp; `--ring`
resolves to `var(--primary)` in both modes.

### Hero motif

The hero right column is a circular `<video src="/videos/hero.mp4">`
(autoplay, muted, loop, `rounded-full`), backed by an `aria-hidden`
radial-gradient div: `radial-gradient(circle, rgba(209,254,23,0.18),
transparent 65%)`. The dotted-tendril / organic-blob motif is reserved
for the architecture/workflow-diagram section, drawn as inline SVG in
`--accent-green-line`.

---

## Theming

| Concern | Implementation |
|---|---|
| Mode switch | `.dark` class on `<html>`, toggled by `src/lib/theme.ts` |
| Storage key | `localStorage['sankofield-theme']` |
| Default | Dark, unless `localStorage` has `'light'` or `prefers-color-scheme: light` and no stored value |
| Hook | `useTheme()` → `{ theme, setTheme, toggle }` |
| Toggle component | `<ThemeToggle />` at `src/components/landing/primitives/theme-toggle.tsx` — segmented radiogroup (Light / Dark); pill indicator translates via `translateX(activeIndex * 100%)` |
| Boot script | Inline in `index.html` — sets `.dark` before paint to prevent FOUC |

---

## Branded logo

`<Logo />` at `src/components/landing/primitives/logo.tsx` renders
`/logo.png` at configurable `height` (default `32`; the top nav uses
`72`). Default `alt="Sankofield"`. It's a raster PNG, not inline SVG —
use it everywhere instead of typesetting "Sankofield" in the display font.

The same PNG is also the favicon (`<link rel="icon" href="/logo.png">`
in `index.html`).

---

## Typography

### Family

| Role | Font | Fallback chain (from `--font-sans` / `--font-mono`) |
|---|---|---|
| Display + body | **Geist** | Inter Tight, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif |
| Mono (data/code/labels) | **Geist Mono** | JetBrains Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace |

Loaded via `<link>` in `index.html` from `fonts.googleapis.com`:

```html
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" />
```

Weights available: **Geist 400, 500, 600** and **Geist Mono 400, 500**.
Never request 700+ — it gets brittle on dark backgrounds.

### Scale

| Token | Size / Line / Tracking | Use |
|---|---|---|
| `display.xl` | 84 / 1.0 / -0.02em | Hero headline (desktop) |
| `display.lg` | 64 / 1.05 / -0.02em | Section headlines |
| `display.md` | 44 / 1.1 / -0.015em | Hero on mobile, large card titles |
| `display.sm` | 32 / 1.15 / -0.01em | Subsection / card title |
| `body.lg` | 20 / 1.5 / 0 | Hero subhead |
| `body.md` | 16 / 1.55 / 0 | Default body |
| `body.sm` | 14 / 1.5 / 0 | Card body, FAQ answers |
| `mono.md` | 14 / 1.4 / 0 | Pill labels, table data |
| `mono.sm` | 13 / 1.4 / 0 | Timestamps, IDs, eyebrow text |
| `mono.xs` | 11 / 1.3 / 0.05em UPPER | Section eyebrows |

### Weight rules

- Display: Geist 600 (semibold). Never 700+.
- Body: Geist 400 (regular). Bold only for emphasis runs in copy.
- Mono: Geist Mono 500 (medium) for pills; 400 for table data.

---

## Spacing

8px grid throughout. Base `--spacing: 0.25rem` (4px), so Tailwind's
default spacing scale lines up.

| Token | Px | Use |
|---|---|---|
| `space.1` | 4 | Inline padding, icon-to-text |
| `space.2` | 8 | Pill internal padding |
| `space.3` | 12 | Compact gaps |
| `space.4` | 16 | Card body padding (mobile) |
| `space.6` | 24 | Card body padding (desktop) |
| `space.8` | 32 | Stack between cards |
| `space.12` | 48 | Subsection rhythm |
| `space.16` | 64 | Section rhythm (mobile) |
| `space.24` | 96 | Section rhythm (desktop) |

Page max-width: **1280px** content, **1440px** outer (for hero
motif). Gutters: 24px mobile, 48px tablet, 80px desktop.

---

## Radius

Base `--radius: 1.5rem`. Discrete steps exposed to Tailwind via
`@theme inline`:

| Token | Px | Use |
|---|---|---|
| `--radius-sm` | 6 | Inline tags, small inputs |
| `--radius-md` | 14 | Nested cards, buttons |
| `--radius-lg` | 20 | Top-level cards |
| `--radius-xl` | 28 | Hero photo frames (rare) |
| `radius.pill` | 9999 | Pills, badges, theme toggle |

Cards: 1px solid `--border-subtle`. **No box-shadows for depth.**
Depth comes from background + border. The single exception is the
theme-toggle's active-pill, which uses a hairline `box-shadow` for a
subtle lift.

---

## Motion

Scroll-driven motion uses **GSAP 3 + ScrollTrigger + `@gsap/react`**
exclusively. No Framer Motion. No `whileInView`. See
[`animation-patterns.md`](animation-patterns.md) for the full pattern
library, code, and per-section mapping.

### Hover and micro-motion (non-scroll)

| Token | Duration / Easing | Use | Implementation |
|---|---|---|---|
| `motion.fast` | 120ms `ease-out` | Hover color shifts | Tailwind `transition-colors` |
| `motion.base` | 200ms `ease-out` | Card border lift, pill glow, FAQ chevron | Tailwind / CSS `transition` |
| `motion.press` | 150ms `power2.out` | Button `scale: 0.97` on mousedown | `gsap.quickTo` |
| `motion.pulse` | 4000ms ease-in-out infinite | Hero blob breathing fallback | CSS keyframe `sanko-breathe` via `.hero-breathe`; disabled under `prefers-reduced-motion: reduce` |

The `--lit` mechanic (§4 status pills / cards) is also CSS-only — GSAP
tweens the `--lit` custom property from 0 → 1 on `.lit-pill` /
`.lit-card`, and CSS interpolates the result via:

```css
--lit-bg: color-mix(in srgb,
  var(--surface-1) calc((1 - var(--lit)) * 100%),
  var(--lit-accent) calc(var(--lit) * 100%));
```

(See `src/styles.css` lines 221+ for the full set: border, background,
icon color, transform, box-shadow.)

### Scroll-driven motion (the six patterns)

Each major section uses **one** of the six patterns in
[`animation-patterns.md`](animation-patterns.md). No stacking, no
mixing. Pattern → section mapping:

| Section | Pattern | One-line summary |
|---|---|---|
| §2 hero | Pattern 5 — layered parallax | `.hero-bg`, `.hero-copy`, `.hero-video` translate / scale at different rates on scroll |
| §4 WhatsApp sim | Pattern 1 — pinned scrub timeline | Pin for 1.5vh; messages scrub on, pills light up |
| §5 feature cards | Pattern 3 — `batch()` clip-path reveal | Cards mask in with stagger |
| §6 architecture | Pattern 2 — SVG path-draw with scrub | Tendrils draw via `stroke-dashoffset` |
| §7 stats | Pattern 4 — scrub number counter | Numerals count up on scroll-in |
| §8 pricing | Pattern 3 — `batch()` clip-path reveal | Same rhythm as §5 |
| §5 + §6 `<h2>`s | Pattern 6 — word-by-word reveal | Words rise from below a clipPath mask |

### Reduced-motion contract

Honor `prefers-reduced-motion: reduce`. First line of every `useGSAP`
body must check the media query, set the final state, and bail before
constructing any timeline. The hero's CSS breathing animation also
bails (handled via the `.hero-breathe` media query in `styles.css`).
CSS hover transitions stay — they're fast and non-vestibular.

---

## Iconography

- **Lucide** icons at 16px (inline) and 20px (button slot). 1.5px stroke.
- WhatsApp / Twenty / Claude / n8n / Google logos as monochrome SVGs
  in `--text-muted`; on hover, fade to `--text-secondary`.
- Status dots are **CSS-drawn** (not icons): 8px filled circles in
  `--accent-green` / `--accent-orange` / `--accent-red`.

---

## Tailwind v4 setup (no config file)

There is **no `tailwind.config.ts`** in this project. Tailwind v4 is
wired up via:

- `@import "tailwindcss";` at the top of `src/styles.css`
- `@theme inline { ... }` block in the same file that registers every
  CSS variable as a Tailwind utility
- `@tailwindcss/vite` plugin in `vite.config.ts`

That means tokens are exposed as flat utilities, not a `bg.*` /
`accent.*` namespace:

```html
<!-- correct -->
<div class="bg-canvas text-text-primary border border-border-subtle">…</div>
<button class="bg-primary text-primary-foreground">…</button>
<span class="text-accent-green">…</span>

<!-- not this -->
<div class="bg-bg-canvas text-text-text-primary">…</div>
```

The full token registration (mirroring every CSS var as
`--color-<name>`) lives in `src/styles.css` lines 117–172.

---

## Component primitives

### Pill

```
[●] LABEL
└── 4px dot + 8px gap + 13px mono UPPER text
   inside --surface-3, 1px --border-subtle, radius.pill, 6×12 padding
```

Variants by accent: green (default), orange (warning), pink (vip),
red (error). Dot color matches the variant accent.

### Card

```
+--------------------+
|  Optional label    |  ← top-left pill, 12px from edges
|                    |
|  Content           |  ← 24px padding desktop, 16px mobile
|                    |
+--------------------+
   --surface-2 / --border-subtle / radius.lg
```

Hover state: `--border-strong`, no transform.

### Button — Primary

```
bg:      --primary (#d1fe17)
text:    --primary-foreground (#000)
font:    Geist 500, 14px
padding: 12px 20px
radius:  pill
hover:   opacity 90% (no transform)
```

### Button — Ghost

```
bg:     transparent
text:   --text-primary
border: 1px --border-subtle
hover:  --border-strong
```

### Theme toggle

Segmented radiogroup at `src/components/landing/primitives/theme-toggle.tsx`.
Container: `border-border-subtle bg-surface-2/70 backdrop-blur-sm`,
`rounded-full`, 1px padding. Active pill: `bg-surface-1` with a
hairline `box-shadow`, slides via `translateX(activeIndex * 100%)`.
Active label uses `text-text-primary`; inactive `text-text-muted` with
`hover:text-text-secondary`. Icon takes `text-primary` only when its
mode is active.

---

## Accessibility

- Color contrast: in dark mode, `--text-secondary` (`#a8a8a8`) on
  `--canvas` (`#000`) is ~10.4:1. In light mode, `--text-secondary`
  (`#525252`) on `--canvas` (`#fafafa`) is ~7.3:1. Both clear AAA for
  body text.
- Focus rings: 2px `--primary` with 2px offset, `--radius-md`.
- Touch targets: ≥ 44×44px on interactive elements (mobile).
- All animations honor `prefers-reduced-motion`.
- Simulated UI panels are decorative but have proper ARIA: each panel
  has an `<h3>` label and a `role="figure"` wrapper with `aria-label`
  describing what it depicts.
- `<ThemeToggle />` uses `role="radiogroup"` with `aria-label="Theme"`;
  each option is `role="radio"` with `aria-checked` reflecting state.
