import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'
import { Logo } from '../primitives/logo'

export function Founder() {
  const ref = useReveal<HTMLElement>()
  const c = content.founder

  return (
    <section
      id="why-us"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] border border-border-subtle bg-surface-1 p-7 sm:p-10 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(232,194,117,0.08), transparent 62%)',
          }}
        />
        <div className="relative max-w-3xl">
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
            {c.title}
          </h2>
          <p
            data-reveal
            className="mt-6 text-[16px] md:text-[19px] text-text-secondary leading-[1.65]"
          >
            {c.body}
          </p>
          <div data-reveal className="mt-8 flex items-center gap-4">
            <Logo className="h-7 w-auto text-text-primary" />
            <span aria-hidden className="w-px h-6 bg-border-strong" />
            <span className="font-display italic text-[18px] text-accent-gold">
              {c.signature}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
