import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '../../../lib/gsap-init'
import { architecture_nodes } from '../../../lib/fixtures'

ensureGsap()

const colorMap = {
  green: '#2bcb8d',
  orange: '#ff9f40',
  pink: '#ff4dd9',
} as const

const positions: Record<
  (typeof architecture_nodes)[number]['position'],
  { x: number; y: number; labelX: number; labelY: number; align: 'start' | 'end' }
> = {
  'top-right': { x: 600, y: 90, labelX: 615, labelY: 80, align: 'start' },
  right: { x: 660, y: 240, labelX: 675, labelY: 245, align: 'start' },
  'bottom-right': { x: 600, y: 390, labelX: 615, labelY: 395, align: 'start' },
  'bottom-left': { x: 200, y: 390, labelX: 185, labelY: 395, align: 'end' },
  left: { x: 140, y: 240, labelX: 125, labelY: 245, align: 'end' },
}

function tendrilPath(p: { x: number; y: number }, cx = 400, cy = 240) {
  const mx = (cx + p.x) / 2
  const my = (cy + p.y) / 2 - 20
  return `M ${cx} ${cy} Q ${mx} ${my} ${p.x} ${p.y}`
}

export function Diagram() {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const root = ref.current
      if (!root) return

      const tendrils = Array.from(
        root.querySelectorAll<SVGPathElement>('.diagram-tendril'),
      )
      const labels = Array.from(
        root.querySelectorAll<SVGGElement>('.diagram-node'),
      )

      // Set initial dash state
      tendrils.forEach((p) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = String(len)
        p.style.strokeDashoffset = String(len)
      })

      if (reduce) {
        tendrils.forEach((p) => (p.style.strokeDashoffset = '0'))
        labels.forEach((l) => gsap.set(l, { autoAlpha: 1 }))
        return
      }

      gsap.set(labels, { autoAlpha: 0 })

      ScrollTrigger.create({
        trigger: root,
        start: 'top 75%',
        end: 'bottom 30%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress
          tendrils.forEach((path, i) => {
            const len = path.getTotalLength()
            const stepStart = i / tendrils.length
            const stepEnd = (i + 1) / tendrils.length
            const localP = Math.max(
              0,
              Math.min(1, (p - stepStart) / (stepEnd - stepStart)),
            )
            path.style.strokeDashoffset = String(len * (1 - localP))
            gsap.set(labels[i], { autoAlpha: localP > 0.8 ? 1 : localP })
          })
        },
      })
    },
    { scope: ref as unknown as React.RefObject<HTMLElement> },
  )

  return (
    <>
      <ul className="md:hidden grid grid-cols-1 gap-2 max-w-md mx-auto" aria-label="Agentic Realty architecture nodes">
        {architecture_nodes.map((n) => (
          <li
            key={n.id}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border-subtle bg-surface-2"
          >
            <span
              aria-hidden
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: colorMap[n.color] }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-medium text-text-primary leading-tight">
                {n.label}
              </div>
              <div className="font-mono text-[11px] text-text-muted leading-tight mt-0.5">
                {n.sublabel}
              </div>
            </div>
          </li>
        ))}
      </ul>
    <svg
      ref={ref}
      viewBox="0 0 800 480"
      className="hidden md:block w-full max-w-3xl mx-auto"
      role="img"
      aria-label="Agentic Realty architecture diagram"
    >
      <defs>
        <radialGradient id="diagram-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2bcb8d" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#2bcb8d" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#2bcb8d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* outer ring */}
      <circle
        cx="400"
        cy="240"
        r="180"
        stroke="#2bcb8d"
        strokeOpacity="0.18"
        strokeDasharray="3 6"
        fill="none"
      />

      {/* tendrils */}
      {architecture_nodes.map((n) => {
        const pos = positions[n.position]
        return (
          <path
            key={n.id}
            className="diagram-tendril"
            d={tendrilPath(pos)}
            stroke={colorMap[n.color]}
            strokeOpacity={n.dashed ? 0.5 : 0.8}
            strokeWidth="1.5"
            strokeDasharray={n.dashed ? '4 6' : undefined}
            fill="none"
          />
        )
      })}

      {/* Central brand blob */}
      <g transform="translate(400 240)">
        <circle r="80" fill="url(#diagram-core)" />
        <path
          d="M0,-60 C30,-65 55,-40 50,-10 C70,5 65,40 35,50 C30,75 -5,80 -25,60 C-55,65 -75,40 -65,15 C-80,-5 -65,-40 -35,-50 C-20,-70 5,-70 0,-60 Z"
          fill="#0f1712"
          stroke="#2bcb8d"
          strokeWidth="1.5"
        />
        <text
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="600"
          fill="#edf2ee"
        >
          <tspan x="0" y="-1" fontSize="16">Agentic</tspan>
          <tspan x="0" y="18" fontSize="16">Realty</tspan>
        </text>
      </g>

      {/* Node labels */}
      {architecture_nodes.map((n) => {
        const pos = positions[n.position]
        const dim = n.dashed
        return (
          <g key={`label-${n.id}`} className="diagram-node">
            <circle
              cx={pos.x}
              cy={pos.y}
              r="6"
              fill={colorMap[n.color]}
              opacity={dim ? 0.5 : 0.9}
            />
            <text
              x={pos.labelX}
              y={pos.labelY}
              textAnchor={pos.align}
              fill={dim ? '#9fb3a8' : '#edf2ee'}
              fontSize="13"
              fontFamily="ui-sans-serif, sans-serif"
              fontWeight="500"
            >
              {n.label}
            </text>
            <text
              x={pos.labelX}
              y={pos.labelY + 14}
              textAnchor={pos.align}
              fill={dim ? '#54625a' : '#67786e'}
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              {n.sublabel}
            </text>
          </g>
        )
      })}
    </svg>
    </>
  )
}
