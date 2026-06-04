import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'
import { DemoCTA } from '../primitives/cta'

export function Statement() {
  const ref = useReveal<HTMLElement>()
  const c = content.band

  return (
    <section ref={ref} className="py-8 md:py-12">
      <div className="relative mx-2 sm:mx-4 md:mx-6 rounded-[28px] md:rounded-[40px] overflow-hidden border border-border-strong">
        <img
          src={c.img}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* cinematic scrim + emerald grade */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,12,0.78) 0%, rgba(10,15,12,0.62) 50%, rgba(10,15,12,0.86) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(120deg, rgba(43,203,141,0.45), transparent 60%)',
          }}
        />

        <div className="relative px-6 py-20 sm:py-24 md:py-32 text-center">
          <h2
            data-reveal
            className="font-display text-[30px] sm:text-[44px] md:text-[60px] leading-[1.05] tracking-[-0.02em] font-semibold text-white max-w-[18ch] mx-auto [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]"
          >
            {c.quote}
          </h2>
          <p
            data-reveal
            className="mt-6 text-[15px] md:text-[18px] text-white/75 leading-[1.6] max-w-2xl mx-auto"
          >
            {c.sub}
          </p>
          <div data-reveal className="mt-8 flex justify-center">
            <DemoCTA variant="primary" size="lg" location="statement-band">
              {c.cta}
              <span aria-hidden className="ml-2 -mr-0.5">
                →
              </span>
            </DemoCTA>
          </div>
        </div>
      </div>
    </section>
  )
}
