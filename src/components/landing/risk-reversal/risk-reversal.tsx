import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'

export function RiskReversal() {
  const ref = useReveal<HTMLElement>()
  const c = content.riskReversal

  return (
    <section
      id="guarantee"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] border border-primary-line bg-primary-soft p-7 sm:p-10 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(43,203,141,0.12), transparent 62%)',
          }}
        />
        <div className="relative max-w-3xl">
          <div
            data-reveal
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary/40 bg-canvas/40 font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary"
          >
            <ShieldIcon />
            {c.eyebrow}
          </div>
          <h2
            data-reveal
            className="font-display text-[28px] sm:text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] font-semibold"
          >
            {c.title}
          </h2>
        </div>

        <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {c.items.map((item) => (
            <div key={item.title} data-reveal className="flex items-start gap-4">
              <span
                aria-hidden
                className="mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground shrink-0"
              >
                <CheckIcon />
              </span>
              <div>
                <h3 className="text-[16px] md:text-[18px] font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14px] md:text-[15px] text-text-secondary leading-[1.55]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden>
      <path
        d="M3 8.5 6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
