import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'
import { TelegramThread } from '../simulated-ui/telegram-thread'

export function CrmSpotlight() {
  const ref = useReveal<HTMLElement>()
  const c = content.crmSpotlight

  return (
    <section
      id="crm"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <div
            data-reveal
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-accent-gold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
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
            className="mt-5 text-[16px] md:text-[18px] text-text-secondary leading-[1.6]"
          >
            {c.body}
          </p>
          <ul className="mt-7 space-y-3.5">
            {c.points.map((p) => (
              <li key={p} data-reveal className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-soft text-primary text-[11px] shrink-0"
                >
                  ✓
                </span>
                <span className="text-[14.5px] md:text-[15px] text-text-primary leading-[1.5]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-thread-anchor className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[40px]"
            style={{
              background:
                'radial-gradient(circle at 60% 30%, rgba(43,203,141,0.10), transparent 65%)',
            }}
          />
          <div className="relative bg-surface-1 border border-border-subtle rounded-[28px] p-4 sm:p-6">
            <TelegramThread />
          </div>
        </div>
      </div>
    </section>
  )
}
