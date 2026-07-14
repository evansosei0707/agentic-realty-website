import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ensureGsap } from '../../../lib/gsap-init'
import { content, type Service } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'
import { MediaFrame } from '../primitives/media-frame'
import { whatsappUrl } from '../../../lib/site'
import { trackEvent } from '../../../lib/analytics'

ensureGsap()

/**
 * The nine systems, presented as an editorial index. Desktop reads like a
 * table of contents on the left with a sticky "plate" on the right; mobile
 * collapses to an exclusive accordion. Media slots come from content.ts.
 */
export function Services() {
  const ref = useReveal<HTMLElement>()
  const c = content.services

  return (
    <section
      id="services"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-28 scroll-mt-20"
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
          className="font-display text-[30px] sm:text-[40px] md:text-[54px] leading-[1.06] tracking-[-0.02em] font-semibold"
        >
          {c.title}{' '}
          <span className="text-primary italic">{c.titleAccent}</span>
        </h2>
        <p
          data-reveal
          className="mt-4 text-[15px] md:text-[17px] text-text-secondary leading-[1.6]"
        >
          {c.subhead}
        </p>
      </div>

      <div data-reveal>
        <ServicesDesktop items={c.items} detailCta={c.detailCta} />
        <ServicesMobile items={c.items} detailCta={c.detailCta} />
      </div>

      <p
        data-reveal
        className="mt-8 font-mono text-[11.5px] tracking-[0.04em] text-text-muted"
      >
        {c.footnote}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: index list + sticky plate                                  */
/* ------------------------------------------------------------------ */

function ServicesDesktop({
  items,
  detailCta,
}: {
  items: readonly Service[]
  detailCta: string
}) {
  const [active, setActive] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const svc = items[active]

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (reduce || !panelRef.current) return
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' },
      )
    },
    { dependencies: [active] },
  )

  return (
    <div className="hidden lg:grid grid-cols-[0.92fr_1.08fr] gap-14 items-start">
      {/* Index */}
      <div role="tablist" aria-label="Our systems" className="border-t border-border-subtle">
        {items.map((s, i) => {
          const isActive = i === active
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`svc-tab-${s.id}`}
              aria-selected={isActive}
              aria-controls="svc-panel"
              onClick={() => {
                setActive(i)
                trackEvent('services.select', { service: s.id })
              }}
              className={`group w-full text-left flex items-baseline gap-5 py-[18px] px-2 border-b border-border-subtle transition-colors ${
                isActive ? '' : 'hover:bg-surface-1/60'
              }`}
            >
              <span
                className={`font-mono text-[11px] tabular-nums tracking-[0.1em] transition-colors ${
                  isActive ? 'text-primary' : 'text-text-disabled group-hover:text-text-muted'
                }`}
              >
                {s.num}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`font-display text-[21px] leading-tight font-medium tracking-[-0.01em] transition-colors ${
                      isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                    }`}
                  >
                    {s.name}
                  </span>
                  {s.badge && <Badge tone={s.badge.startsWith('FREE') ? 'gold' : 'green'}>{s.badge}</Badge>}
                </span>
                <span
                  className={`block mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors ${
                    isActive ? 'text-text-muted' : 'text-text-disabled'
                  }`}
                >
                  {s.tag}
                </span>
              </span>
              <span
                aria-hidden
                className={`self-center text-[15px] transition-all ${
                  isActive
                    ? 'text-primary translate-x-0 opacity-100'
                    : 'text-text-muted -translate-x-1.5 opacity-0 group-hover:opacity-60 group-hover:translate-x-0'
                }`}
              >
                →
              </span>
            </button>
          )
        })}
      </div>

      {/* Plate */}
      <div className="sticky top-24">
        <div
          ref={panelRef}
          id="svc-panel"
          role="tabpanel"
          aria-labelledby={`svc-tab-${svc.id}`}
          className="relative"
        >
          <span
            aria-hidden
            className="absolute -top-12 right-0 font-display italic font-semibold text-[120px] leading-none text-text-primary opacity-[0.05] select-none pointer-events-none"
          >
            {svc.num}
          </span>

          <MediaFrame media={svc.media} num={svc.num} icon={<ServiceIcon id={svc.id} />} />

          <div className="mt-7">
            <h3 className="font-display text-[26px] md:text-[30px] leading-[1.12] tracking-[-0.015em] font-semibold">
              {svc.title}
            </h3>
            <p className="mt-3 text-[15px] text-text-secondary leading-[1.6] max-w-[52ch]">
              {svc.body}
            </p>
            <ul className="mt-5 space-y-2.5">
              {svc.deliverables.map((d) => (
                <Deliverable key={d}>{d}</Deliverable>
              ))}
            </ul>
            <ServiceLink service={svc} label={detailCta} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile: exclusive accordion                                         */
/* ------------------------------------------------------------------ */

function ServicesMobile({
  items,
  detailCta,
}: {
  items: readonly Service[]
  detailCta: string
}) {
  return (
    <div className="lg:hidden border-t border-border-subtle">
      {items.map((s, i) => (
        <details
          key={s.id}
          name="ar-services"
          className="faq-item group border-b border-border-subtle"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex items-baseline gap-4 py-4 px-1">
            <span className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-text-muted">
              {s.num}
            </span>
            <span className="flex-1 min-w-0">
              <span className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-[19px] leading-tight font-medium text-text-primary">
                  {s.name}
                </span>
                {s.badge && <Badge tone={s.badge.startsWith('FREE') ? 'gold' : 'green'}>{s.badge}</Badge>}
              </span>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="faq-chevron self-center w-4 h-4 shrink-0 text-text-muted"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="pb-7 px-1">
            <MediaFrame media={s.media} num={s.num} icon={<ServiceIcon id={s.id} />} />
            <p className="mt-5 text-[14.5px] text-text-secondary leading-[1.6]">
              {s.body}
            </p>
            <ul className="mt-4 space-y-2.5">
              {s.deliverables.map((d) => (
                <Deliverable key={d}>{d}</Deliverable>
              ))}
            </ul>
            <ServiceLink service={s} label={detailCta} />
          </div>
        </details>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Badge({ children, tone }: { children: string; tone: 'green' | 'gold' }) {
  const cls =
    tone === 'gold'
      ? 'text-accent-gold border-accent-gold/40 bg-accent-gold-soft'
      : 'text-primary border-primary/40 bg-primary-soft'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border font-mono text-[9px] uppercase tracking-[0.16em] font-medium ${cls}`}
    >
      {children}
    </span>
  )
}

function Deliverable({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3 text-[14px] text-text-secondary leading-[1.5]">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="w-3.5 h-3.5 mt-[3px] shrink-0 text-primary">
        <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  )
}

function ServiceLink({ service, label }: { service: Service; label: string }) {
  const text = `Hi Agentic Realty, I'd like to talk about the ${service.name} for my agency.`
  return (
    <a
      href={whatsappUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('services.inquire', { service: service.id })}
      className="group/link mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:opacity-85 transition-opacity"
    >
      {label}
      <span aria-hidden className="transition-transform group-hover/link:translate-x-0.5">→</span>
    </a>
  )
}

/** Hand-set stroke icons, one per system. 24px grid, 1.5 stroke. */
export function ServiceIcon({ id, className = 'w-5 h-5' }: { id: string; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    className,
    'aria-hidden': true as const,
  }
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (id) {
    case 'whatsapp-sales-agent':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 4.5a7.5 7.5 0 0 1 0 15H6.6l-2.1 1.6.7-3A7.5 7.5 0 0 1 12 4.5Z" />
          <path {...stroke} d="M8.6 12h.01M12 12h.01M15.4 12h.01" strokeWidth={2.2} />
        </svg>
      )
    case 'property-recommendations':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" />
          <path {...stroke} d="M12 9.2 12.9 11l1.9.9-1.9.9L12 14.8 11.1 12.9 9.2 12l1.9-.9L12 9.2Z" />
        </svg>
      )
    case '3d-walkthroughs':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 3.8 19 7.7v8.6L12 20.2 5 16.3V7.7L12 3.8Z" />
          <path {...stroke} d="M5 7.7l7 3.9 7-3.9M12 11.6v8.6" />
        </svg>
      )
    case 'lead-harvesting':
      return (
        <svg {...common}>
          <path {...stroke} d="M4.5 5.5h15L14 12.4v5.3l-4 2.3v-7.6L4.5 5.5Z" />
        </svg>
      )
    case 'social-autopilot':
      return (
        <svg {...common}>
          <path {...stroke} d="M14.5 7.5 6 10.2v3.6l8.5 2.7V7.5Z" />
          <path {...stroke} d="M14.5 7v10M17.5 9.8a3.6 3.6 0 0 1 0 4.4M8 14v3.5" />
        </svg>
      )
    case 'review-harvesting':
      return (
        <svg {...common}>
          <path {...stroke} d="m12 4.8 2.1 4.4 4.9.6-3.6 3.3.9 4.8L12 15.6l-4.3 2.3.9-4.8L5 9.8l4.9-.6L12 4.8Z" />
        </svg>
      )
    case 'document-automation':
      return (
        <svg {...common}>
          <path {...stroke} d="M7 3.8h7l3.5 3.5v12.9H7V3.8Z" />
          <path {...stroke} d="M14 3.8v3.5h3.5M9.8 12h4.4M9.8 15.2h2.6" />
        </svg>
      )
    case 'property-management':
      return (
        <svg {...common}>
          <path {...stroke} d="M5.5 20V6.8L12 4l6.5 2.8V20" />
          <path {...stroke} d="M3.8 20h16.4M9.4 9.5h.01M14.6 9.5h.01M9.4 13h.01M14.6 13h.01M10.5 20v-3.4h3V20" />
        </svg>
      )
    case 'workflow-audit':
      return (
        <svg {...common}>
          <circle {...stroke} cx="12" cy="12" r="8" />
          <path {...stroke} d="m14.8 9.2-1.7 4-4 1.7 1.7-4 4-1.7Z" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle {...stroke} cx="12" cy="12" r="7.5" />
        </svg>
      )
  }
}
