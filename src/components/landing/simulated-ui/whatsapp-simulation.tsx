import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '../../../lib/gsap-init'
import { content } from '../../../lib/content'
import { ConversationThread } from './conversation-thread'
import { StatusPills } from './status-pills'
import { LabelPill } from '../primitives/pill'

ensureGsap()

export function WhatsAppSimulation() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const root = ref.current!
      const msgs = root.querySelectorAll<HTMLElement>('.msg')
      const pairFor = (id: string) =>
        Array.from(
          root.querySelectorAll<HTMLElement>(
            `[data-pill="${id}"], [data-pill-label="${id}"]`,
          ),
        )
      const pillEls = {
        qualified: pairFor('pill-qualified'),
        viewing: pairFor('pill-viewing'),
        paused: pairFor('pill-paused'),
      }

      const setFinal = () => {
        gsap.set(msgs, { autoAlpha: 1, y: 0 })
        Object.values(pillEls).forEach(
          (els) =>
            els.length && gsap.set(els, { '--lit': 1 } as gsap.TweenVars),
        )
      }

      if (reduce) {
        setFinal()
        return
      }

      gsap.set(msgs, { autoAlpha: 0, y: 16 })

      ScrollTrigger.batch(msgs, {
        start: 'top 88%',
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.55,
            ease: 'power2.out',
          }),
      })

      ScrollTrigger.create({
        trigger: root,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          const order = [pillEls.qualified, pillEls.viewing, pillEls.paused]
          order.forEach((els, i) => {
            if (!els.length) return
            gsap.to(els, {
              '--lit': 1,
              duration: 0.9,
              ease: 'power2.out',
              delay: i * 0.22,
            } as gsap.TweenVars)
          })
        },
      })
    },
    { scope: ref },
  )

  return (
    <section id="see-it-work" ref={ref} className="relative scroll-mt-20">
      <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-20 bg-surface-1 rounded-b-[28px] sm:rounded-b-[40px] md:rounded-b-[56px] overflow-hidden">
        <div className="max-w-[1180px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <LabelPill
            data-thread-anchor
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary"
          >
            {content.whatsappSim.eyebrow}
          </LabelPill>
          <h2 className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] tracking-[-0.02em] font-semibold leading-[1.12] md:leading-[1.06]">
            {content.whatsappSim.title}{' '}
            <span className="text-accent-gold italic">
              {content.whatsappSim.titleAccent}
            </span>
          </h2>
          <p className="mt-5 text-[15px] sm:text-[16px] md:text-[17px] text-text-secondary leading-[1.55]">
            {content.whatsappSim.subhead}
          </p>
        </div>

        <div
          className="liquid-panel relative bg-surface-1 overflow-hidden p-5 sm:p-7 md:p-10 lg:p-12"
          style={{
            borderRadius:
              '40px 120px 60px 60px / 40px 160px 60px 60px',
          }}
        >
          <div
            aria-hidden
            className="liquid-panel-glow pointer-events-none absolute -top-32 -right-32 w-[440px] h-[440px] rounded-full"
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div className="[perspective:1200px]">
              <ConversationThread />
            </div>
            <div>
              <StatusPills />
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  )
}
