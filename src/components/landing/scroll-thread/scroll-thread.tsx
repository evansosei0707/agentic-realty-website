import { useEffect, useRef } from 'react'

type Point = { x: number; y: number }
type Anchor = { el: HTMLElement; x: number; y: number }

function catmullRomPath(pts: Point[]): string {
  if (pts.length < 2) return ''
  const all = [pts[0], ...pts, pts[pts.length - 1]]
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 1; i < all.length - 2; i++) {
    const p0 = all[i - 1]
    const p1 = all[i]
    const p2 = all[i + 1]
    const p3 = all[i + 2]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

export function ScrollThread() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const guideRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const coreRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current
    const guide = guideRef.current
    const glow = glowRef.current
    const core = coreRef.current
    if (!svg || !path || !guide || !glow || !core) return

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const mouse: Point = { x: -9999, y: -9999 }
    let hasMouse = false
    let frame = 0
    const PULL_RADIUS = 280
    const PULL_STRENGTH = 36
    const LIT_RADIUS = 160
    const litSet = new Set<HTMLElement>()

    const setViewBox = () => {
      svg.setAttribute(
        'viewBox',
        `0 0 ${window.innerWidth} ${window.innerHeight}`,
      )
    }

    const collectAnchors = (): Anchor[] => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>('[data-thread-anchor]'),
      )
      const list: Anchor[] = []
      for (const el of els) {
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 && rect.height === 0) continue
        list.push({
          el,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }
      // Sort by document Y position so the thread weaves top to bottom.
      list.sort((a, b) => a.y - b.y)
      return list
    }

    const update = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const anchors = collectAnchors()

      // Entry above the top edge, exit below the bottom edge — gives a
      // proper "thread enters / exits the viewport" feel rather than
      // starting from nowhere.
      const headX = anchors[0]?.x ?? w / 2
      const tailX = anchors[anchors.length - 1]?.x ?? w / 2
      const pts: Point[] = [
        { x: headX, y: -80 },
        ...anchors.map((a) => ({ x: a.x, y: a.y })),
        { x: tailX, y: h + 80 },
      ]

      // Mouse magnet: pull each interior point toward the cursor by an
      // amount that falls off with distance. Endpoints stay anchored to
      // the viewport edges so the thread always reaches in from above
      // and exits below.
      if (hasMouse && !reduce) {
        for (let i = 1; i < pts.length - 1; i++) {
          const dx = mouse.x - pts[i].x
          const dy = mouse.y - pts[i].y
          const dist = Math.hypot(dx, dy)
          if (dist > PULL_RADIUS) continue
          const t = 1 - dist / PULL_RADIUS
          const pull = t * t * PULL_STRENGTH
          const n = dist || 1
          pts[i].x += (dx / n) * pull
          pts[i].y += (dy / n) * pull
        }
      }

      const d = catmullRomPath(pts)
      path.setAttribute('d', d)
      guide.setAttribute('d', d)

      const total = path.getTotalLength()
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      path.style.strokeDasharray = String(total)
      path.style.strokeDashoffset = reduce ? '0' : String(total * (1 - p))

      const tipPt = path.getPointAtLength(total * (reduce ? 1 : p))
      glow.setAttribute('cx', tipPt.x.toFixed(1))
      glow.setAttribute('cy', tipPt.y.toFixed(1))
      core.setAttribute('cx', tipPt.x.toFixed(1))
      core.setAttribute('cy', tipPt.y.toFixed(1))

      // Light up the anchor nearest the tip — and any within LIT_RADIUS.
      const nextLit = new Set<HTMLElement>()
      for (const a of anchors) {
        const dist = Math.hypot(a.x - tipPt.x, a.y - tipPt.y)
        if (dist < LIT_RADIUS) {
          const intensity = 1 - dist / LIT_RADIUS
          a.el.style.setProperty('--thread-lit', intensity.toFixed(3))
          nextLit.add(a.el)
        }
      }
      // Clear any that fell out of range.
      for (const el of litSet) {
        if (!nextLit.has(el)) el.style.setProperty('--thread-lit', '0')
      }
      litSet.clear()
      nextLit.forEach((el) => litSet.add(el))
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    const onScroll = () => schedule()
    const onResize = () => {
      setViewBox()
      schedule()
    }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      hasMouse = true
      schedule()
    }
    const onMouseLeave = () => {
      hasMouse = false
      schedule()
    }

    setViewBox()
    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      if (frame) cancelAnimationFrame(frame)
      litSet.forEach((el) => el.style.setProperty('--thread-lit', '0'))
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="hidden md:block pointer-events-none fixed inset-0 w-screen h-screen z-1"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="thread-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2bcb8d" stopOpacity="0" />
          <stop offset="15%" stopColor="#2bcb8d" stopOpacity="0.8" />
          <stop offset="85%" stopColor="#2bcb8d" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2bcb8d" stopOpacity="0" />
        </linearGradient>
        <filter id="thread-glow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <path
        ref={guideRef}
        stroke="#2bcb8d"
        strokeOpacity="0.07"
        strokeWidth="1"
        strokeDasharray="2 6"
      />

      <path
        ref={pathRef}
        stroke="url(#thread-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        ref={glowRef}
        r="18"
        fill="#2bcb8d"
        opacity="0.4"
        filter="url(#thread-glow)"
      />
      <circle ref={coreRef} r="3.5" fill="#2bcb8d" />
    </svg>
  )
}
