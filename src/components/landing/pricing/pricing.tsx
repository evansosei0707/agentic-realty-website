import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '../../../lib/gsap-init'
import { content } from '../../../lib/content'
import { DemoCTA } from '../primitives/cta'

ensureGsap()

export function Pricing() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (reduce) return
      const root = ref.current
      if (!root) return
      const cards = root.querySelectorAll<HTMLElement>('.price-card')
      gsap.set(cards, { autoAlpha: 0, y: 24, clipPath: 'inset(8% 0 0 0)' })
      ScrollTrigger.batch(cards, {
        start: 'top 82%',
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            stagger: 0.12,
            duration: 0.7,
          }),
      })
    },
    { scope: ref as unknown as React.RefObject<HTMLElement> },
  )

  const c = content.pricing

  return (
    <section
      id="pricing"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24"
    >
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-primary/30 bg-primary-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {c.eyebrow}
        </div>
        <h2 className="font-display text-[28px] sm:text-[34px] md:text-[56px] leading-[1.08] md:leading-[1.04] tracking-[-0.02em] font-semibold">
          {c.title} <span className="text-primary">{c.titleAccent}</span>
        </h2>
        <p className="mt-5 text-[16px] md:text-[17px] text-text-secondary leading-[1.55]">
          {c.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {c.tiers.map((tier) => (
          <div
            key={tier.name}
            {...(tier.recommended ? { 'data-thread-anchor': true } : {})}
            className={`price-card relative bg-surface-1 rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 flex flex-col overflow-hidden transition-colors ${
              tier.recommended
                ? 'border border-primary md:-translate-y-3 md:py-10 shadow-[0_0_0_1px_rgba(43,203,141,0.25),0_30px_60px_-20px_rgba(43,203,141,0.22)]'
                : 'border border-border-subtle hover:border-border-strong'
            }`}
          >
            {tier.recommended && (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 -right-32 w-[360px] h-[360px] rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(43,203,141,0.12), transparent 65%)',
                  }}
                />
                <div className="absolute top-5 right-5 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary text-primary-foreground font-mono uppercase tracking-[0.1em] text-[10px] font-medium">
                  Recommended
                </div>
              </>
            )}

            <div
              className={`font-mono uppercase tracking-[0.12em] text-[11px] ${
                tier.recommended ? 'text-primary' : 'text-text-muted'
              }`}
            >
              {tier.name}
            </div>

            <div className="mt-5 flex items-baseline gap-1">
              <span
                className={`text-[40px] md:text-[44px] font-semibold tracking-[-0.02em] ${
                  tier.recommended ? 'text-text-primary' : 'text-text-primary'
                }`}
              >
                {tier.price}
              </span>
              {tier.period && (
                <span className="text-text-muted text-[14px] font-mono">
                  {tier.period}
                </span>
              )}
            </div>

            <p className="mt-3 text-[14px] text-text-secondary leading-[1.5]">
              {tier.tagline}
            </p>

            <div className="my-7 h-px bg-border-subtle" />

            <ul className="space-y-3 flex-1">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[14px] text-text-primary leading-[1.5]"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary-soft text-primary text-[11px] shrink-0"
                  >
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <DemoCTA
                variant={tier.recommended ? 'primary' : 'ghost'}
                size="lg"
                location={`pricing-${tier.name}`}
                className="w-full"
              >
                {tier.cta}
              </DemoCTA>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 font-mono text-[11px] text-text-muted text-center max-w-2xl mx-auto">
        {c.footnote}
      </p>
    </section>
  )
}
