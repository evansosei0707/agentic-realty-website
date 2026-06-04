import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'

export function Timeline() {
  const ref = useReveal<HTMLElement>()
  const c = content.timeline

  return (
    <section
      id="timeline"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-2xl mb-12 md:mb-16">
        <div
          data-reveal
          className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary/30 bg-primary-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {c.eyebrow}
        </div>
        <h2
          data-reveal
          className="font-display text-[28px] sm:text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] font-semibold"
        >
          {c.title}
        </h2>
        <p data-reveal className="mt-4 text-[16px] md:text-[18px] text-text-secondary leading-[1.55]">
          {c.subhead}
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          className="hidden md:block absolute top-3 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10"
        />
        {c.days.map((d, i) => (
          <div key={d.day} data-reveal className="relative">
            <div className="flex items-center gap-3 md:block">
              <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-mono text-[11px] font-semibold shrink-0">
                {i + 1}
              </span>
              <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-primary md:block md:mt-4">
                {d.day}
              </span>
            </div>
            <h3 className="mt-3 md:mt-2 font-display text-[18px] md:text-[20px] font-semibold tracking-[-0.01em]">
              {d.title}
            </h3>
            <p className="mt-2 text-[14px] text-text-secondary leading-[1.55] max-w-[30ch]">
              {d.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
