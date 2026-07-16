import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ensureGsap } from '../../../lib/gsap-init'
import { observeOnce } from '../../../lib/use-reveal'
import { content } from '../../../lib/content'
import { LabelPill } from '../primitives/pill'
import { EscalationInbox } from '../simulated-ui/escalation-inbox'
import { TodayViewings } from '../simulated-ui/today-viewings'
import { SystemHealth } from '../simulated-ui/system-health'
import { PhoneFrame } from '../primitives/device-frame'

ensureGsap()

type CardConfig = {
  id: 'escalation' | 'viewings' | 'system-health' | 'telegram'
  label: string
  title: string
  body: string
  subcaption: string
  panel: ReactNode
  layout: 'text-left' | 'panel-left'
}

const cards: CardConfig[] = [
  {
    id: 'escalation',
    label: content.featureEscalation.label,
    title: content.featureEscalation.title,
    body: content.featureEscalation.body,
    subcaption: content.featureEscalation.subcaption,
    panel: <EscalationInbox />,
    layout: 'text-left',
  },
  {
    id: 'viewings',
    label: content.featureViewings.label,
    title: content.featureViewings.title,
    body: content.featureViewings.body,
    subcaption: content.featureViewings.subcaption,
    panel: <TodayViewings />,
    layout: 'panel-left',
  },
  {
    id: 'system-health',
    label: content.featureSystemHealth.label,
    title: content.featureSystemHealth.title,
    body: content.featureSystemHealth.body,
    subcaption: content.featureSystemHealth.subcaption,
    panel: <SystemHealth />,
    layout: 'text-left',
  },
  {
    id: 'telegram',
    label: content.featureTelegram.label,
    title: content.featureTelegram.title,
    body: content.featureTelegram.body,
    subcaption: content.featureTelegram.subcaption,
    panel: (
      <div className="flex justify-center">
        <PhoneFrame
          src={content.featureTelegram.video.src}
          poster={content.featureTelegram.video.poster}
          alt={content.featureTelegram.video.alt}
          className="w-[64%] max-w-[270px]"
        />
      </div>
    ),
    layout: 'text-left',
  },
]

export function FeatureStack() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const root = ref.current
      if (!root) return

      const cardEls = Array.from(root.querySelectorAll<HTMLElement>('.fs-card'))
      const titleWordEls = Array.from(
        root.querySelectorAll<HTMLElement>('.fs-title-word'),
      )

      if (reduce) {
        gsap.set([...cardEls, ...titleWordEls], { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(cardEls, { autoAlpha: 0, y: 28 })
      gsap.set(titleWordEls, { autoAlpha: 0, y: 14 })

      // IO-based reveal (not ScrollTrigger): stays correct through instant
      // anchor jumps, where scroll bookkeeping can leave cards invisible.
      observeOnce(
        cardEls,
        (el) => {
          const words = el.querySelectorAll<HTMLElement>('.fs-title-word')
          gsap
            .timeline()
            .to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            })
            .to(
              words,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: 'power2.out',
              },
              '<0.1',
            )
        },
        '0px 0px -18% 0px',
      )
    },
    { scope: ref as unknown as React.RefObject<HTMLElement> },
  )

  return (
    <section
      id="product"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-6 md:space-y-8"
    >
      {cards.map((card) => (
        <FeatureCardStacked key={card.id} card={card} />
      ))}
    </section>
  )
}

function FeatureCardStacked({ card }: { card: CardConfig }) {
  const panelLeft = card.layout === 'panel-left'
  const words = card.title.split(' ')

  return (
    <article
      data-thread-anchor
      className="fs-card relative bg-surface-1 border border-border-subtle rounded-[24px] md:rounded-[32px] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(43,203,141,0.07), transparent 65%)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        <div
          className={`relative p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center ${
            panelLeft ? 'lg:order-2' : ''
          }`}
        >
          <LabelPill className="self-start mb-5 text-primary border-primary/30 bg-primary-soft">
            {card.label}
          </LabelPill>

          <h3
            className="font-display text-[24px] sm:text-[28px] md:text-[40px] leading-[1.12] md:leading-[1.08] tracking-[-0.02em] font-semibold max-w-[20ch]"
            aria-label={card.title}
          >
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="fs-title-word inline-block"
                style={{ marginRight: '0.25em' }}
              >
                {w}
              </span>
            ))}
          </h3>

          <p className="mt-4 text-[14px] sm:text-[15px] md:text-[17px] text-text-secondary leading-[1.55] max-w-[44ch]">
            {card.body}
          </p>

          <p className="mt-6 font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
            {card.subcaption}
          </p>
        </div>

        <div
          className={`relative p-5 sm:p-6 md:p-10 lg:p-12 bg-canvas lg:border-l border-border-subtle ${
            panelLeft ? 'lg:order-1 lg:border-l-0 lg:border-r' : ''
          }`}
        >
          {card.panel}
        </div>
      </div>
    </article>
  )
}
