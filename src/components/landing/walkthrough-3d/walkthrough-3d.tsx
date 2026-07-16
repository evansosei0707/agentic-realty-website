import { useState } from 'react'
import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'
import { LazyVideo } from '../primitives/device-frame'
import { trackEvent } from '../../../lib/analytics'

/**
 * The Gaussian-splatting showcase. A recorded splat tour plays as the
 * facade; one click swaps in the live SuperSplat viewer so buyers can
 * actually walk the room. The iframe never loads until asked — it is a
 * heavy WebGL scene and has no business in the critical path.
 */
export function Walkthrough3D() {
  const ref = useReveal<HTMLElement>()
  const c = content.walkthrough3d

  return (
    <section id="3d-tours" ref={ref} className="relative scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-28">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <div
            data-reveal
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary/30 bg-primary-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {c.eyebrow}
          </div>
          <h2
            data-reveal
            className="font-display text-[30px] sm:text-[40px] md:text-[54px] leading-[1.06] tracking-[-0.02em] font-semibold"
          >
            {c.title}{' '}
            <span className="text-accent-gold italic">{c.titleAccent}</span>
          </h2>
          <p
            data-reveal
            className="mt-5 text-[15px] md:text-[17px] text-text-secondary leading-[1.6]"
          >
            {c.subhead}
          </p>
        </div>

        <div data-reveal data-thread-anchor className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-[56px]"
            style={{
              background:
                'radial-gradient(55% 60% at 50% 40%, rgba(43,203,141,0.1), transparent 70%)',
            }}
          />
          <SplatStage />
        </div>

        <div
          data-reveal
          className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-[980px] mx-auto"
        >
          {c.points.map((p) => (
            <div
              key={p.title}
              className="rounded-[18px] border border-border-subtle bg-surface-1 px-5 py-4"
            >
              <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-primary">
                {p.title}
              </div>
              <p className="mt-1.5 text-[13.5px] text-text-secondary leading-[1.5]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SplatStage() {
  const c = content.walkthrough3d
  const [live, setLive] = useState(false)

  return (
    <div className="relative rounded-[24px] md:rounded-[32px] border border-border-strong overflow-hidden bg-black shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
      <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9]">
        {live ? (
          <iframe
            title={c.iframeTitle}
            src={c.iframeSrc}
            className="absolute inset-0 w-full h-full border-0"
            allow="fullscreen; xr-spatial-tracking"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            {/* recorded tour as the living poster */}
            <LazyVideo
              src="/media/splat-walkthrough.mp4"
              poster="/media/splat-walkthrough.jpg"
              alt={content.services.items[2].media.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* scrim for button legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.15), transparent 35%, transparent 60%, rgba(0,0,0,0.55))',
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-10 px-6">
              <button
                type="button"
                onClick={() => {
                  setLive(true)
                  trackEvent('walkthrough3d.load', {})
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-4 pr-6 py-3 text-[15px] font-semibold shadow-[0_20px_50px_-16px_rgba(43,203,141,0.6)] hover:scale-[1.03] active:scale-[0.99] transition-transform"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/15">
                  <CubeIcon />
                </span>
                {c.loadCta}
              </button>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                {c.loadHint}
              </span>
            </div>
          </>
        )}
      </div>

      {/* status strip */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-surface-1 border-t border-border-subtle">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.16em] text-text-muted">
          <span
            className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-primary animate-pulse' : 'bg-accent-gold'}`}
          />
          {live ? 'Live 3D scene · rendered in your browser' : c.videoLabel}
        </span>
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.16em] text-text-disabled">
          superspl.at
        </span>
      </div>
    </div>
  )
}

function CubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden>
      <path
        d="M12 3.8 19 7.7v8.6L12 20.2 5 16.3V7.7L12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 7.7l7 3.9 7-3.9M12 11.6v8.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
