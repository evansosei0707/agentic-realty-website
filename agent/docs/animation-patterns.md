# Animation Patterns

All scroll-driven motion on the landing page uses **GSAP 3 +
ScrollTrigger + `@gsap/react`**. No Framer Motion. No CSS keyframe
animations except as `prefers-reduced-motion` fallbacks.

This doc is the single source of truth for *what* animates *where* and
*how*. Six patterns cover the entire page. Each pattern owns exactly
one major section — never stack them.

---

## Library setup

Install:

```bash
npm install gsap @gsap/react
```

One-time registration in `src/lib/gsap-init.ts`:

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}
```

Call `ensureGsap()` from `src/lib/gsap-init.ts` inside any component
that uses GSAP — typically at module top, alongside the component's
`useGSAP()` block (see `src/components/landing/hero/hero.tsx` for the
canonical pattern). This project uses TanStack Router, not Next.js —
there is no `app/layout.tsx`.

---

## Section → pattern mapping (no doubling up)

| Section | Pattern | Why this fits |
|---|---|---|
| §1 nav | None (CSS-only sticky + backdrop blur) | Persistent UI; no animation overhead |
| §2 hero | **Pattern 5** — layered parallax (CSS-only breathing fallback) | Cinematic entrance, sets tone |
| §3 logo strip | None (CSS-only) | Quiet section, lets hero breathe |
| §4 WhatsApp sim | **Pattern 1** — pinned scrub timeline (showstopper) | The page's centerpiece — earns the pin |
| §5 feature cards | **Pattern 3** — batch reveal with clip-path + **Pattern 6** on `<h2>` | Discrete cards deserve discrete reveals |
| §6 architecture | **Pattern 2** — SVG path-draw with scrub + **Pattern 6** on `<h2>` | The diagram literally draws itself |
| §7 stats | **Pattern 4** — scrub-driven number counter | Numbers count up = honest payoff |
| §8 pricing | **Pattern 3** — batch reveal | Three cards, same rhythm as §5 |
| §9 FAQ + footer | None (CSS-only accordion + hover) | Reading section — no distraction |

---

## Pattern 1 — Pinned scrub timeline (`§4 WhatsApp sim`)

The section is pinned for ~1.5 viewport heights. As the user scrolls,
the WhatsApp conversation plays *one message per scroll step*; status
pills light up at scripted progress points; the phone-frame mockup
rotates very slightly (`rotateY: 0 → -4deg`) to add depth. **No
autoplay.** The user scrubs the thread.

```ts
useGSAP(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    gsap.set('.msg-1, .msg-2, .msg-3, .msg-4, .msg-5, .msg-6', { autoAlpha: 1, y: 0 });
    gsap.set('.pill-qualified, .pill-viewing, .pill-paused', { '--lit': 1 });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%',
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
    },
    defaults: { duration: 1, ease: 'none' },
  });

  tl.from('.msg-1', { autoAlpha: 0, y: 16 })
    .from('.msg-2', { autoAlpha: 0, y: 16 }, '+=0.4')
    .to('.pill-qualified', { '--lit': 1 }, '<')
    .from('.msg-3', { autoAlpha: 0, y: 16 }, '+=0.3')
    .from('.msg-4', { autoAlpha: 0, y: 16 }, '+=0.3')
    .from('.msg-5', { autoAlpha: 0, y: 16 }, '+=0.3')
    .from('.msg-6', { autoAlpha: 0, y: 16 }, '+=0.3')
    .to('.pill-viewing', { '--lit': 1 }, '<')
    .to('.pill-paused', { '--lit': 1 }, '<+=0.2')
    .to('.phone-frame', { rotateY: -4, duration: 2 }, 0);
}, { scope: sectionRef });
```

**Pill `--lit` mechanic:** each pill has a CSS custom property
`--lit` that drives `border-color`, `background`, and a soft glow.
Tween it from 0 → 1 inside the timeline to get a smooth "light up"
without a separate animation.

```css
/* From src/styles.css — actual implementation */
.lit-pill {
  --lit: 0;
  --lit-border: color-mix(in srgb,
    var(--border-subtle) calc((1 - var(--lit)) * 100%),
    var(--lit-accent) calc(var(--lit) * 100%));
  --lit-bg: color-mix(in srgb,
    var(--surface-1) calc((1 - var(--lit)) * 100%),
    var(--lit-accent) calc(var(--lit) * 100%));
  border-color: var(--lit-border);
  background: var(--lit-bg);
}
```

Notes:
- Color space is `srgb`, not `oklch` — `color-mix` in `oklch` shifts
  the lime accent off-hue at intermediate `--lit` values.
- Token names are flat: `--surface-1`, `--border-subtle`,
  `--accent-green` — no `--bg-` prefix anywhere in the codebase.
- Each litable element exposes its own `--lit-accent` (typically
  `var(--accent-green)`); change it per pill to get orange / pink
  variants without forking the CSS.

**Mobile fallback (< 768px):** drop the pin to avoid scroll-hijack on
touch. Replace with Pattern 3 batch reveal so the messages and pills
still animate in, just not scrubbed.

---

## Pattern 2 — SVG path-draw with scrub (`§6 architecture diagram`)

Five organic-tendril paths connect the `Sankofield` central blob to the
integration nodes (WhatsApp, Your CRM, Ama, Telegram, Google Calendar).
Each path has `stroke-dasharray` set to its full length and
`stroke-dashoffset` animated from full → 0 driven by scroll. The five
integration node labels fade in *as their tendril completes*. Note: the
Google Calendar tendril is dashed to signal "coming soon."

```ts
useGSAP(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const paths = gsap.utils.toArray<SVGPathElement>('.tendril');

  paths.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len });
  });

  if (reduce) {
    gsap.set('[id^="node-"]', { autoAlpha: 1, scale: 1 });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: diagramRef.current,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 1,
    },
  });

  paths.forEach((p, i) => {
    tl.to(p, { strokeDashoffset: 0, duration: 1 }, i * 0.2)
      .from(`#node-${i}`, { autoAlpha: 0, scale: 0.92, duration: 0.6 }, '>-0.4');
  });
}, { scope: diagramRef });
```

**Cache `getTotalLength()`** after mount; recompute on resize via
`ScrollTrigger.refresh()` callback.

---

## Pattern 3 — Batch reveal with clip-path (`§5 feature cards`, `§8 pricing`)

Three cards per section. Use `ScrollTrigger.batch()` so cards entering
the viewport within ~100ms animate together with a stagger — no
IntersectionObserver, no awkward one-by-one ladder. The reveal is a
**clip-path mask** plus a subtle `y` move, *not* a plain fade.

```ts
useGSAP(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    gsap.set('.feature-card', { clipPath: 'inset(0)', y: 0 });
    return;
  }

  gsap.set('.feature-card', {
    clipPath: 'inset(0 0 100% 0)',
    y: 24,
  });

  ScrollTrigger.batch('.feature-card', {
    start: 'top 80%',
    onEnter: (els) =>
      gsap.to(els, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        overwrite: true,
      }),
    onLeaveBack: (els) =>
      gsap.set(els, { clipPath: 'inset(0 0 100% 0)', y: 24, overwrite: true }),
  });
}, { scope: cardsRef });
```

The clip-path reveal is dramatic but cheap (compositor-only). Pairs
well with Pattern 6 on the section's `<h2>`.

---

## Pattern 4 — Scrub-driven number counter (`§7 stats`)

The four stat numerals (`14`, `5`, `9`, `< 5s`) count up from 0 as the
section scrolls in. Use a proxy object so the value interpolates;
write to `textContent` on every update. Snap to integers (or one
decimal for `< 5s`).

```ts
useGSAP(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
    const target = Number(el.dataset.value);
    if (reduce) {
      el.textContent = formatStat(target, el.dataset.unit);
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 0.5,
      },
      snap: { v: target % 1 === 0 ? 1 : 0.1 },
      onUpdate: () => { el.textContent = formatStat(obj.v, el.dataset.unit); },
      ease: 'none',
    });
  });
}, { scope: statsRef });
```

The current implementation in `src/components/landing/stats/stats.tsx`
formats inline (it parses `data-counter` to an int and writes
`String(Math.round(target * progress))` straight to `textContent`).
The `< 5s` stat is rendered as a static label and excluded from the
scrub counter. If/when a shared `formatStat(value, unit)` helper is
extracted, put it in `src/lib/` next to the other shared utilities and
update this section.

---

## Pattern 5 — Layered parallax (`§2 hero`)

Three layers: video container (back), copy block (middle), the video
itself (foreground). On scroll, each transforms at a *different* rate
so the scene gains depth. **Not** a heavy parallax — small offsets,
scrubbed. The hero ships a looping `<video src="/videos/hero.mp4">` in
a `rounded-full` container with a lime radial-gradient glow behind it;
the dotted-tendril SVG motif lives in the §6 architecture diagram, not
the hero.

```ts
useGSAP(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // Each layer gets its own ScrollTrigger so scrub timing can differ.
  gsap.to('.hero-bg', {
    yPercent: -16,
    ease: 'none',
    scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
  });
  gsap.to('.hero-copy', {
    yPercent: -6,
    ease: 'none',
    scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
  });
  gsap.to('.hero-video', {
    scale: 1.04,
    ease: 'none',
    scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
  });
}, { scope: ref });
```

Subtle "breathing" on the hero blob is CSS-only (the `.hero-breathe`
keyframe defined in `src/styles.css` — `sanko-breathe 4s ease-in-out
infinite`, disabled under `prefers-reduced-motion: reduce`). Do not
add a GSAP infinite tween for breathing — it duplicates the CSS and
makes the reduced-motion bail-out trickier.

---

## Pattern 6 — Word-by-word headline reveal (`§5`, `§6` section titles)

Each section's `<h2>` splits into spans (one per word). On the first
scroll into view, words rise from below a clipPath mask — not opacity
alone — so they emerge from below the baseline.

```ts
useGSAP(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.utils.toArray<HTMLElement>('.split-headline').forEach((h) => {
    const words = h.textContent!.split(' ');
    h.innerHTML = words
      .map((w) => `<span class="word"><span class="word-inner">${w}</span></span>`)
      .join(' ');

    if (reduce) {
      gsap.set(h.querySelectorAll('.word-inner'), { yPercent: 0 });
      return;
    }

    gsap.from(h.querySelectorAll('.word-inner'), {
      yPercent: 110,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: h, start: 'top 80%' },
    });
  });
}, { scope: rootRef });
```

The `.word` wrapper is `overflow: hidden; display: inline-block;` so
`.word-inner` is masked from below. Clean "rising letters" effect, no
fade.

```css
.word { overflow: hidden; display: inline-block; }
.word-inner { display: inline-block; will-change: transform; }
```

---

## Hover / micro-motion (non-scroll)

These are CSS or `quickTo`, **not** GSAP timelines.

**Card hover:** 1px border lift to `--border-strong`, 180ms ease-out.
Tailwind `transition-colors` — no GSAP needed.

**Button press:** `scale: 0.97` on `mousedown`, restored on `mouseup`.
Use `gsap.quickTo` for responsiveness:

```ts
const press = gsap.quickTo(btn, 'scale', { duration: 0.15, ease: 'power2.out' });
btn.addEventListener('mousedown', () => press(0.97));
btn.addEventListener('mouseup',   () => press(1));
btn.addEventListener('mouseleave', () => press(1));
```

Wrap any `addEventListener` calls in `contextSafe(...)` from
`useGSAP` so they no-op after unmount.

---

## Performance + cleanup invariants (must follow)

1. **Every** `useGSAP(() => {...}, { scope: ref })` call must pass a
   `scope` ref. Automatic cleanup on unmount.
2. **One ScrollTrigger per top-level timeline.** Never nest a
   ScrollTrigger in a child tween — anti-pattern that breaks cleanup.
3. **For scrub timelines, child tweens use `ease: 'none'`.** Non-linear
   easing breaks 1:1 scroll mapping.
4. **`prefers-reduced-motion: reduce`** — first line of every
   `useGSAP` body: check the media query, set final state, bail.
5. **After dynamic content loads** (fonts, images, async data), call
   `ScrollTrigger.refresh()` once. Hook it into a `useEffect` after
   the relevant content settles (e.g., on the `document.fonts.ready`
   promise, or after fixture data resolves).
6. **`markers: true` only in dev.** Never ship.
7. **Never animate the pinned element itself**; animate its children.
   For §4, the pinned section contains the phone frame and pills —
   animate those, not the section wrapper.
8. **Mobile (< 768px):** drop the pin on §4 (Pattern 1). Replace with
   Pattern 3 batch reveal. Use a `matchMedia` ScrollTrigger or a
   simple width check inside the hook.
9. **No `whileInView` semantics** — that's Framer Motion. We use
   ScrollTrigger or `ScrollTrigger.batch()` exclusively.

---

## Reduced-motion contract

A page running with `prefers-reduced-motion: reduce` must:

- Show all content in its final state on load (no fade, no slide).
- Honor scroll naturally — no pinning, no scrub, no scroll-hijack.
- Keep CSS hover transitions (they're fast and non-vestibular).
- Keep the hero static (the CSS `.hero-breathe` keyframe is already
  disabled inside `@media (prefers-reduced-motion: reduce)`).

Verify by toggling the OS preference and walking the page top-to-bottom.

---

## Verification (during implementation)

With `markers: true` toggled in dev, walk the page:

- §2 hero: `.hero-bg`, `.hero-copy`, `.hero-video` translate / scale
  at different rates on scroll
- §4: pin engages at top of section, releases after ~1.5vh; all 6
  messages scrubbable both directions; pill `--lit` state syncs
- §5: cards reveal via `clipPath` (not opacity fade), stagger ~120ms
- §6: tendrils draw via `stroke-dashoffset`; node labels fade in
  *after* their tendril completes
- §7: stat numerals count up and snap to integer (or 0.1 for `< 5s`)
- §5/§6 `<h2>`s: words rise from below the baseline
  (`yPercent: 110 → 0`), masked by the `.word` wrapper

Navigate away and back (in a SPA shell): `ScrollTrigger.getAll().length`
stays stable — no duplicate triggers, no leaks.

---

## Why GSAP, not Framer Motion

| Capability | Framer Motion | GSAP + ScrollTrigger |
|---|---|---|
| Scrub timelines (scroll progress drives animation) | Limited | First-class |
| Pin section while scrolling | No native equivalent | `pin: true` |
| SVG path-draw with `stroke-dashoffset` | Workable but manual | Trivial |
| `batch()` for stagger-on-enter without observers | No | Yes |
| `quickTo` for hover/press responsiveness | Equivalent (`useMotionValue`) | Equivalent |
| Bundle weight (this page) | Heavier (motion + framer + react) | ~30 KB gzip with tree-shaking |

GSAP also has the senior-level idioms (timeline labels, scrub catch-up,
scroll-driven SVG morph) that Mastra-style sites lean on. Framer
Motion is excellent for declarative React component animation; this
page is mostly scroll choreography, which is GSAP's home turf.
