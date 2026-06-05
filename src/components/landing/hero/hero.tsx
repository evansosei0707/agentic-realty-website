import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '../../../lib/gsap-init'
import { content } from '../../../lib/content'
import { LabelPill } from '../primitives/pill'
import { DemoCTA } from '../primitives/cta'

ensureGsap()

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (reduce) return

      // Slow Ken-Burns drift + scale on the property image as you scroll.
      gsap.to('.hero-img', {
        yPercent: 9,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
      gsap.to('.hero-copy', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.from('.hero-anim', {
        y: 26,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.1,
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: ref },
  )

  const c = content.hero

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden min-h-[640px] lg:min-h-[88vh] flex items-center pt-28 pb-16 md:pt-32 md:pb-24"
    >
      {/* Full-bleed cinematic property image */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <img
          src="/img/hero-home.jpg"
          alt=""
          className="hero-img absolute inset-0 w-full h-full object-cover scale-105 will-change-transform"
        />
        {/* base darken for text legibility across the whole frame */}
        <div className="absolute inset-0 bg-[#0a0f0c]/60" />
        {/* left-weighted scrim so the copy side reads dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,15,12,0.94) 0%, rgba(10,15,12,0.74) 40%, rgba(10,15,12,0.28) 74%, rgba(10,15,12,0.12) 100%)',
          }}
        />
        {/* top scrim for the nav + bottom fade to canvas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,12,0.7) 0%, transparent 24%, transparent 60%, rgba(10,15,12,0.96) 100%)',
          }}
        />
        {/* emerald colour grade */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(120deg, rgba(43,203,141,0.4), transparent 58%)',
          }}
        />
      </div>

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-10 items-center">
        <div className="hero-copy">
          <LabelPill className="hero-anim inline-flex items-center gap-2.5 mb-7 px-3 py-1.5 bg-primary-soft border-primary-line font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {c.eyebrow}
          </LabelPill>

          <h1 className="hero-anim font-display text-[36px] sm:text-[52px] md:text-[72px] lg:text-[80px] leading-[1.03] sm:leading-[0.99] tracking-[-0.02em] font-semibold text-text-primary [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]">
            {c.headline}{' '}
            <span className="text-accent-gold italic">{c.headlineAccent}</span>
          </h1>

          <p className="hero-anim mt-5 sm:mt-7 text-[15px] sm:text-[17px] md:text-[19px] text-text-secondary max-w-[540px] leading-[1.55]">
            {c.subhead}
          </p>

          <div className="hero-anim mt-7 sm:mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
            <DemoCTA variant="primary" size="lg" location="hero">
              {c.primaryCta}
              <span aria-hidden className="ml-2 -mr-0.5">
                →
              </span>
            </DemoCTA>
            <a
              href="#see-it-work"
              className="group inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-[15px] font-medium transition-colors"
            >
              {c.secondaryCta}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>

          <p className="hero-anim mt-4 font-mono text-[11.5px] tracking-[0.04em] text-text-muted">
            {c.microCta}
          </p>

          <div className="hero-anim mt-9 sm:mt-11 flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-3">
            {c.metrics.map((m, i) => (
              <div key={m.label} className="flex items-center gap-x-4 sm:gap-x-8">
                {i > 0 && <Divider />}
                <Metric value={m.value} label={m.label} />
              </div>
            ))}
          </div>
        </div>

        {/* Ama's live activity, annotating the home (desktop) */}
        <div
          data-thread-anchor
          className="hero-anim relative hidden lg:block h-[440px]"
        >
          <AmaPill className="absolute top-1 right-2 ar-float-slow" />
          <Chip
            className="absolute top-[26%] right-[4%] ar-float"
            dot="bg-accent-gold"
            title="Viewing booked"
            sub="Sat 11:00 · East Legon"
          />
          <Chip
            className="absolute top-[54%] right-[40%] ar-float-slow"
            dot="bg-primary"
            title="Lead qualified"
          />
          <Chip
            className="absolute bottom-[8%] right-[14%] ar-float"
            dot="bg-primary"
            title="Replied in 4s"
          />
          <div className="absolute bottom-0 right-[2%] inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-1/75 backdrop-blur-md px-3.5 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
            <span className="font-mono text-[11px] tracking-[0.04em] text-text-secondary">
              East Legon · 2-bed · GHS 5,000/mo
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function AmaPill({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex items-center gap-2.5 rounded-full border border-border-strong bg-surface-1/80 backdrop-blur-md pl-1.5 pr-4 py-1.5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.85)]">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-display font-semibold text-[14px]">
          A
        </span>
        <div className="leading-tight">
          <div className="text-[12.5px] font-medium text-text-primary">Ama</div>
          <div className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              online
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Chip({
  className,
  dot,
  title,
  sub,
}: {
  className: string
  dot: string
  title: string
  sub?: ReactNode
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex items-center gap-2.5 rounded-2xl border border-border-strong bg-surface-1/80 backdrop-blur-md px-3.5 py-2.5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.85)]">
        <span className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
        <div className="leading-tight">
          <div className="text-[12px] font-medium text-text-primary whitespace-nowrap">
            {title}
          </div>
          {sub && (
            <div className="font-mono text-[10px] text-text-muted whitespace-nowrap">
              {sub}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-primary font-semibold text-[18px] tabular-nums">
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
        {label}
      </span>
    </div>
  )
}

function Divider() {
  return <span className="w-px h-4 bg-border-strong" aria-hidden />
}
