import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '../../../lib/gsap-init'
import { content } from '../../../lib/content'

ensureGsap()

export function Stats() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const root = ref.current
      if (!root) return

      const numerals = Array.from(
        root.querySelectorAll<HTMLElement>('[data-counter]'),
      )
      const arcEls = Array.from(
        root.querySelectorAll<SVGPathElement>('.arc-stroke'),
      )
      const stars = Array.from(
        root.querySelectorAll<SVGGElement>('.arc-star'),
      )
      const labels = Array.from(
        root.querySelectorAll<SVGTextElement>('.arc-label'),
      )
      const spokes = Array.from(root.querySelectorAll<SVGGElement>('.spoke'))

      if (reduce) {
        numerals.forEach((el) => {
          el.textContent = el.dataset.counter || ''
        })
        return
      }

      numerals.forEach((el) => {
        el.textContent = '0'
      })

      const lengths = arcEls.map((p) => p.getTotalLength())
      arcEls.forEach((p, i) => {
        p.style.strokeDasharray = `${lengths[i]}`
        p.style.strokeDashoffset = `${lengths[i]}`
      })
      gsap.set([...stars, ...labels, ...spokes], { autoAlpha: 0 })

      ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress
          numerals.forEach((el) => {
            const target = parseInt(el.dataset.counter || '0', 10)
            const v = Math.round(target * p)
            el.textContent = String(v)
          })
        },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.8,
        },
      })
      arcEls.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: 1 }, i * 0.25)
      })
      tl.to(spokes, { autoAlpha: 1, stagger: 0.05, duration: 0.4 }, 0.4)
        .to(labels, { autoAlpha: 1, stagger: 0.1, duration: 0.4 }, 0.7)
        .to(stars, { autoAlpha: 1, stagger: 0.1, duration: 0.35 }, 0.9)
    },
    { scope: ref as unknown as React.RefObject<HTMLElement> },
  )

  const c = content.stats

  return (
    <section ref={ref} className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-20">
      <div className="relative bg-surface-1 border border-border-subtle rounded-[24px] md:rounded-[28px] overflow-hidden">
        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary-soft text-primary font-medium text-[12px]">
            {c.eyebrow}
          </span>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(43,203,141,0.10), transparent 60%)',
          }}
        />

        <div className="relative pt-20 px-6 sm:px-8 md:px-12 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-10">
            {c.items.map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                {item.value === null ? (
                  <div className="text-[34px] sm:text-[44px] md:text-[56px] leading-none font-semibold tracking-[-0.02em] text-primary tabular-nums">
                    {item.display}
                  </div>
                ) : (
                  <div
                    className="text-[34px] sm:text-[44px] md:text-[56px] leading-none font-semibold tracking-[-0.02em] text-primary tabular-nums"
                    data-counter={String(item.value)}
                  >
                    0
                  </div>
                )}
                <p className="text-[12.5px] text-text-secondary leading-[1.5] max-w-[220px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div
            data-thread-anchor
            className="relative w-full max-w-[560px] mx-auto"
          >
            <ArcVisual tiers={content.pricing.tiers} />
          </div>
        </div>

        <div className="relative px-6 sm:px-8 md:px-12 pb-10 md:pb-12 pt-4 border-t border-border-subtle">
          <h2 className="font-display text-[24px] sm:text-[28px] md:text-[40px] leading-[1.1] md:leading-[1.05] tracking-[-0.02em] font-semibold max-w-2xl">
            <span className="text-primary">Numbers</span> from the live system.
          </h2>
          <p className="mt-3 font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
            {c.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}

function ArcStar({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g className="arc-star" transform={`translate(${x} ${y})`}>
      {[0, 45].map((rot) => (
        <rect
          key={rot}
          x="-2.5"
          y="-11"
          width="5"
          height="22"
          rx="2.5"
          fill={color}
          transform={`rotate(${rot})`}
        />
      ))}
    </g>
  )
}

type ArcTier = { name: string; arcMeta: string }

function ArcVisual({ tiers }: { tiers: ReadonlyArray<ArcTier> }) {
  const arcStrokes = ['#e8c275', '#e8c275', '#2bcb8d']
  const radii = [110, 160, 210]
  const arcs = tiers.map((t, i) => ({
    r: radii[i] ?? 210,
    stroke: arcStrokes[i] ?? '#2bcb8d',
    label: `${t.name.toUpperCase()} · ${t.arcMeta}`,
  }))

  const SPOKE_LEN = 250
  const spokes: Array<{
    angle: number
    label: string
    anchor: 'start' | 'middle' | 'end'
  }> = [
    { angle: 210, label: 'DAY 0', anchor: 'end' },
    { angle: 130, label: 'DAY 30', anchor: 'middle' },
    { angle: 50, label: 'DAY 60', anchor: 'middle' },
    { angle: -30, label: 'DAY 90', anchor: 'start' },
  ]

  return (
    <svg viewBox="-310 -250 620 420" className="w-full">
      <defs>
        <linearGradient id="arc-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2bcb8d" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#2bcb8d" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="arc-orange" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8c275" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#e8c275" stopOpacity="1" />
        </linearGradient>
      </defs>

      {spokes.map((s) => {
        const rad = (s.angle * Math.PI) / 180
        const x2 = SPOKE_LEN * Math.cos(rad)
        const y2 = -SPOKE_LEN * Math.sin(rad)
        const lx = (SPOKE_LEN + 22) * Math.cos(rad)
        const ly = -(SPOKE_LEN + 22) * Math.sin(rad)
        return (
          <g key={s.label} className="spoke">
            <line
              x1="0"
              y1="0"
              x2={x2}
              y2={y2}
              stroke="#2e4038"
              strokeWidth="1"
              strokeDasharray="2 5"
              opacity="0.7"
            />
            <text
              x={lx}
              y={ly}
              textAnchor={s.anchor}
              fontFamily="Geist Mono, ui-monospace"
              fontSize="11"
              letterSpacing="0.12em"
              fill="#67786e"
              dominantBaseline="middle"
            >
              {s.label}
            </text>
          </g>
        )
      })}

      {arcs.map((arc, i) => {
        const startX = -0.866 * arc.r
        const startY = 0.5 * arc.r
        const endX = 0.866 * arc.r
        const endY = 0.5 * arc.r
        const pathId = `arc-path-${i}`
        const gradId = arc.stroke === '#2bcb8d' ? 'arc-green' : 'arc-orange'
        return (
          <g key={i}>
            <path
              id={pathId}
              className="arc-stroke"
              d={`M ${startX} ${startY} A ${arc.r} ${arc.r} 0 1 1 ${endX} ${endY}`}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="2.25"
              strokeLinecap="round"
            />
            <text
              className="arc-label"
              fontFamily="Geist Mono, ui-monospace"
              fontSize="11"
              letterSpacing="0.18em"
              fill={arc.stroke}
            >
              <textPath
                href={`#${pathId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {arc.label}
              </textPath>
            </text>
            <ArcStar x={endX} y={endY} color={arc.stroke} />
          </g>
        )
      })}
    </svg>
  )
}
