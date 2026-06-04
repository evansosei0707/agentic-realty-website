import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'
import { DemoCTA, WhatsAppCTA } from '../primitives/cta'

export function FinalCTA() {
  const ref = useReveal<HTMLElement>()
  const c = content.finalCta

  return (
    <section
      id="demo"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-primary-line bg-surface-1 px-6 py-14 sm:px-10 sm:py-20 md:py-24 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(43,203,141,0.14), transparent 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <h2
            data-reveal
            className="font-display text-[30px] sm:text-[44px] md:text-[60px] leading-[1.05] tracking-[-0.02em] font-semibold"
          >
            {c.title}{' '}
            <span className="text-primary">{c.titleAccent}</span>
          </h2>
          <p
            data-reveal
            className="mt-6 text-[16px] md:text-[18px] text-text-secondary leading-[1.6] max-w-2xl mx-auto"
          >
            {c.subhead}
          </p>
          <div
            data-reveal
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <DemoCTA variant="primary" size="lg" location="final-cta">
              {c.primaryCta}
              <span aria-hidden className="ml-2 -mr-0.5">
                →
              </span>
            </DemoCTA>
            <WhatsAppCTA variant="ghost" size="lg" location="final-cta">
              {c.secondaryCta}
            </WhatsAppCTA>
          </div>
          <p data-reveal className="mt-6 font-mono text-[11.5px] tracking-[0.04em] text-text-muted">
            {c.note}
          </p>
        </div>
      </div>
    </section>
  )
}
