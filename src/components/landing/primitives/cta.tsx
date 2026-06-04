import type { ReactNode } from 'react'
import { buttonClass, type Size, type Variant } from './button'
import { site, whatsappUrl } from '../../../lib/site'
import { trackEvent } from '../../../lib/analytics'

type Common = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** where on the page this CTA lives, for funnel attribution */
  location?: string
}

/**
 * Primary conversion action: "Book a 15-min demo". No separate booking page
 * yet, so it opens WhatsApp with a demo-request message (on-brand for a
 * WhatsApp-first product). If a Cal.com/Calendly link is added to site.ts
 * as bookDemoUrl, point this at it instead.
 */
export function DemoCTA({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  location,
  event = 'demo.booking.start',
}: Common & { event?: string }) {
  return (
    <a
      href={whatsappUrl(site.demoText)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(event, { location })}
      className={buttonClass(variant, size, className)}
    >
      {children}
    </a>
  )
}

/** Low-friction secondary action: opens WhatsApp with a general message. */
export function WhatsAppCTA({
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  location,
}: Common) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp.click', { location })}
      className={buttonClass(variant, size, className)}
    >
      {children}
    </a>
  )
}
