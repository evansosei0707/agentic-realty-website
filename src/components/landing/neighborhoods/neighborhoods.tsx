import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'

export function Neighborhoods() {
  const ref = useReveal<HTMLElement>()
  const c = content.areas

  return (
    <section
      id="areas"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-2xl mb-10 md:mb-14">
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
          <span className="text-primary italic">{c.titleAccent}</span>
        </h2>
        <p data-reveal className="mt-4 text-[16px] md:text-[18px] text-text-secondary leading-[1.55]">
          {c.subhead}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {c.items.map((a) => (
          <div
            key={a.name}
            data-reveal
            className="group relative aspect-[3/4] rounded-[20px] overflow-hidden border border-border-subtle"
          >
            <img
              src={a.img}
              alt={`${a.name}, Accra`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,15,12,0.1) 0%, rgba(10,15,12,0.15) 45%, rgba(10,15,12,0.88) 100%)',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-primary/0 group-hover:bg-primary/70 transition-colors"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <div className="font-display text-[18px] md:text-[21px] font-semibold leading-tight text-white">
                {a.name}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
                {a.tag}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p data-reveal className="mt-6 font-mono text-[11.5px] text-text-muted">
        {c.footnote}
      </p>
    </section>
  )
}
