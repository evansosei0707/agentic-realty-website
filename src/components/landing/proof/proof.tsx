import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'

export function Proof() {
  const ref = useReveal<HTMLElement>()
  const c = content.proof

  return (
    <section
      id="proof"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] border border-border-subtle bg-surface-1">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-24 w-[560px] h-[560px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(43,203,141,0.10), transparent 62%)',
          }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <div className="p-7 sm:p-10 md:p-14">
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
              {c.title}{' '}
              <span className="text-primary">{c.titleAccent}</span>
            </h2>
            <p
              data-reveal
              className="mt-5 text-[15px] md:text-[17px] text-text-secondary leading-[1.6] max-w-[56ch]"
            >
              {c.body}
            </p>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-border-subtle grid grid-cols-2">
            {c.stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                className={`p-6 sm:p-8 md:p-10 flex flex-col justify-center ${
                  i % 2 === 0 ? 'border-r' : ''
                } ${i < 2 ? 'border-b' : ''} border-border-subtle`}
              >
                <div className="font-display text-[36px] sm:text-[44px] md:text-[52px] leading-none font-semibold tracking-[-0.02em] text-primary tabular-nums">
                  {s.value}
                </div>
                <p className="mt-3 text-[12.5px] md:text-[13.5px] text-text-secondary leading-[1.45]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
