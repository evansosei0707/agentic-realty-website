import { content } from '../../../lib/content'

export function FAQ() {
  const c = content.faq
  return (
    <section
      id="faq"
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-primary/30 bg-primary-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {c.eyebrow}
          </div>
          <h2 className="font-display text-[28px] sm:text-[34px] md:text-[48px] leading-[1.12] md:leading-[1.06] tracking-[-0.02em] font-semibold">
            Frequently
            <br className="hidden md:block" />{' '}
            <span className="text-primary">asked questions</span>
          </h2>
          <p className="mt-5 text-[15px] text-text-secondary leading-[1.55] max-w-[360px]">
            {c.title}
          </p>
        </div>

        <div>
          {c.items.map((item) => (
            <details
              key={item.q}
              className="faq-item group border-b border-border-subtle"
            >
              <summary className="flex items-center justify-between gap-4 sm:gap-6 cursor-pointer list-none py-5 min-h-[44px]">
                <span className="text-[17px] sm:text-[18px] md:text-[20px] font-medium text-text-primary leading-[1.3]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="faq-plus shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-border-strong bg-surface-2 text-text-secondary group-open:bg-primary group-open:border-primary group-open:text-black transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1.5v11M1.5 7h11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 text-[14.5px] md:text-[15.5px] text-text-secondary leading-[1.6] pr-2 md:pr-12">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
