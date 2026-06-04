import { useEffect, useState } from 'react'
import { content } from '../../../lib/content'
import { Logo } from '../primitives/logo'
import { DemoCTA, WhatsAppCTA } from '../primitives/cta'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled || open
          ? 'backdrop-blur-md bg-canvas/80 border-b border-border-subtle'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1280px] mx-auto px-3 sm:px-5 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        <a
          href="#top"
          aria-label={content.nav.wordmark}
          className="inline-flex items-center shrink-0 text-text-primary"
        >
          <Logo className="h-7 sm:h-8 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-1 text-[13px] text-text-secondary">
          {content.nav.items.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 rounded-full hover:text-text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DemoCTA variant="primary" size="sm" location="nav">
            {content.nav.cta}
          </DemoCTA>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-1 rounded-full text-text-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border-subtle bg-canvas/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col">
            {content.nav.items.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setOpen(false)}
                className="px-3 py-3 min-h-[44px] flex items-center text-[15px] text-text-secondary hover:text-text-primary border-b border-border-subtle"
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <DemoCTA
                variant="primary"
                size="lg"
                location="nav-drawer"
                className="w-full"
              >
                {content.nav.cta}
              </DemoCTA>
              <WhatsAppCTA
                variant="ghost"
                size="lg"
                location="nav-drawer"
                className="w-full"
              >
                {content.nav.secondaryCta}
              </WhatsAppCTA>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
