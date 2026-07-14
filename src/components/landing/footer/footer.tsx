import { content } from '../../../lib/content'
import { Logo } from '../primitives/logo'
import { DemoCTA, WhatsAppCTA } from '../primitives/cta'
import { site } from '../../../lib/site'

export function Footer() {
  const c = content.footer
  return (
    <footer className="relative border-t border-border-subtle mt-10 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(43,203,141,0.07), transparent 65%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-12 border-b border-border-subtle">
          <div className="max-w-[420px]">
            <Logo className="h-7 w-auto text-text-primary" />
            <p className="mt-4 text-[14px] text-text-secondary leading-[1.55]">
              {c.tagline}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <DemoCTA variant="primary" size="lg" location="footer">
              Book a 15-min demo
            </DemoCTA>
            <WhatsAppCTA variant="ghost" size="lg" location="footer">
              WhatsApp us
            </WhatsAppCTA>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 py-10 sm:py-14">
          <div className="col-span-2 sm:col-span-1">
            <div className="font-mono uppercase tracking-[0.12em] text-[10.5px] text-text-muted mb-4">
              Contact
            </div>
            <a
              href={`mailto:${site.email}`}
              className="text-[13.5px] text-text-secondary hover:text-primary transition-colors break-all"
            >
              {site.email}
            </a>
          </div>

          {c.columns.map((col) => (
            <div key={col.heading}>
              <div className="font-mono uppercase tracking-[0.12em] text-[10.5px] text-text-muted mb-4">
                {col.heading}
              </div>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[13.5px] text-text-secondary hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Entity statement: the one paragraph search and answer engines
            should quote when asked who Agentic Realty is. */}
        <div className="pb-10">
          <div className="font-mono uppercase tracking-[0.12em] text-[10.5px] text-text-muted mb-3">
            About Agentic Realty
          </div>
          <p className="max-w-3xl text-[13px] text-text-muted leading-[1.65]">
            {c.about}
          </p>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
            {c.copyright}
          </div>
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="flex items-center gap-2">
              {c.socials.map((s) => (
                <a
                  key={s}
                  href={s === 'Email' ? `mailto:${site.email}` : '#'}
                  aria-label={s}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle text-text-muted hover:border-primary hover:text-primary transition-colors font-mono text-[11px]"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="mt-10 sm:mt-14 select-none text-center font-display font-semibold tracking-[-0.03em] text-[40px] sm:text-[80px] md:text-[140px] lg:text-[200px] leading-none text-primary/[0.06]"
        >
          {c.wordmark}
        </div>
      </div>
    </footer>
  )
}
