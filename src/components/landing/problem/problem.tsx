import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'

export function Problem() {
  const ref = useReveal<HTMLElement>()
  const c = content.problem

  return (
    <section
      id="problem"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-3xl mb-12 md:mb-16">
        <div
          data-reveal
          className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-accent-red/30 bg-accent-red-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-accent-red"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
          {c.eyebrow}
        </div>
        <h2
          data-reveal
          className="font-display text-[30px] sm:text-[40px] md:text-[52px] leading-[1.08] tracking-[-0.02em] font-semibold"
        >
          {c.title}{' '}
          <span className="text-text-muted">{c.titleAccent}</span>
        </h2>
        <p
          data-reveal
          className="mt-5 text-[16px] md:text-[18px] text-text-secondary leading-[1.55]"
        >
          {c.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {c.cards.map((card) => (
          <div
            key={card.tag}
            data-reveal
            className="relative bg-surface-1 border border-border-subtle rounded-[20px] md:rounded-[24px] p-6 md:p-8 flex flex-col"
          >
            <span className="font-mono uppercase tracking-[0.14em] text-[10.5px] text-accent-red">
              {card.tag}
            </span>
            <h3 className="mt-4 font-display text-[20px] md:text-[24px] leading-[1.2] font-semibold tracking-[-0.01em]">
              {card.title}
            </h3>
            <p className="mt-3 text-[14px] md:text-[15px] text-text-secondary leading-[1.6]">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      <div
        data-reveal
        className="mt-8 md:mt-10 rounded-[20px] md:rounded-[24px] border border-primary-line bg-primary-soft p-6 md:p-8"
      >
        <p className="text-[15px] md:text-[18px] text-text-primary leading-[1.55] max-w-4xl">
          {c.kicker}
        </p>
      </div>
    </section>
  )
}
