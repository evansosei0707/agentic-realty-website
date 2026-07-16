import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Real product footage, framed as hardware.
 *
 * LazyVideo only attaches its `src` when the element approaches the
 * viewport, then plays/pauses as it enters and leaves, so the page never
 * downloads four videos up front. PhoneFrame and BrowserFrame wrap that
 * footage in device chrome so screen recordings read as product shots
 * rather than raw clips.
 */

export function LazyVideo({
  src,
  poster,
  alt,
  className = '',
  rounded = '',
}: {
  src: string
  poster?: string
  alt: string
  className?: string
  rounded?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setLoaded(true)
            // play() only resolves once src is attached; retry on next tick
            // after the state flip mounts the source.
            requestAnimationFrame(() => {
              el.play().catch(() => {})
            })
          } else {
            el.pause()
          }
        }
      },
      { rootMargin: '240px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={`${className} ${rounded}`}
      src={loaded ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    />
  )
}

/**
 * Portrait phone bezel around real screen-recorded footage.
 * Sized by its parent: give the wrapper a width (or height) and the
 * 9:19.5 screen follows.
 */
export function PhoneFrame({
  src,
  poster,
  alt,
  className = '',
  badge,
}: {
  src: string
  poster?: string
  alt: string
  className?: string
  badge?: ReactNode
}) {
  return (
    <div className={`relative ${className}`}>
      {/* bezel */}
      <div className="relative rounded-[42px] border border-border-strong bg-[#0b0d0c] p-[7px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04),0_0_90px_-40px_rgba(43,203,141,0.35)]">
        {/* side buttons */}
        <span aria-hidden className="absolute -left-[2px] top-[18%] w-[3px] h-9 rounded-l bg-border-strong" />
        <span aria-hidden className="absolute -left-[2px] top-[30%] w-[3px] h-14 rounded-l bg-border-strong" />
        <span aria-hidden className="absolute -right-[2px] top-[22%] w-[3px] h-16 rounded-r bg-border-strong" />

        <div className="relative aspect-[9/19.5] rounded-[35px] overflow-hidden bg-black">
          <LazyVideo
            src={src}
            poster={poster}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* punch-hole camera */}
          <span
            aria-hidden
            className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[74px] h-[22px] rounded-full bg-black/90 ring-1 ring-white/5"
          />
        </div>
      </div>

      {badge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
          {badge}
        </div>
      )}
    </div>
  )
}

/**
 * Desktop browser chrome around real screen-recorded footage.
 * The video keeps its natural aspect so no UI gets cropped away.
 */
export function BrowserFrame({
  src,
  poster,
  alt,
  url = 'crm.agenticrealty.com',
  className = '',
}: {
  src: string
  poster?: string
  alt: string
  url?: string
  className?: string
}) {
  return (
    <div
      className={`rounded-[18px] sm:rounded-[22px] border border-border-strong bg-surface-1 overflow-hidden shadow-[0_60px_120px_-50px_rgba(0,0,0,0.85),0_0_100px_-50px_rgba(43,203,141,0.3)] ${className}`}
    >
      {/* chrome bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface-2 border-b border-border-subtle">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-accent-red/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent-gold/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
        </div>
        <div className="flex-1 flex justify-center min-w-0">
          <span className="inline-flex items-center gap-1.5 max-w-full truncate px-3 sm:px-5 py-1 rounded-full bg-surface-1 border border-border-subtle font-mono text-[10px] sm:text-[10.5px] tracking-[0.04em] text-text-muted">
            <LockIcon />
            {url}
          </span>
        </div>
        <span className="w-9" aria-hidden />
      </div>

      <LazyVideo src={src} poster={poster} alt={alt} className="block w-full h-auto" />
    </div>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5 shrink-0" aria-hidden>
      <rect x="2.5" y="5" width="7" height="4.8" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.2 5V3.9a1.8 1.8 0 0 1 3.6 0V5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}
