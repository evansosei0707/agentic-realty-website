import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '../../../lib/gsap-init'
import { content } from '../../../lib/content'
import { LabelPill } from '../primitives/pill'
import { Diagram } from './diagram'

ensureGsap()

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const root = ref.current
      if (!root) return

      const titleWords = Array.from(
        root.querySelectorAll<HTMLSpanElement>('.hiw-title .word'),
      )
      const stepTitleWords = Array.from(
        root.querySelectorAll<HTMLSpanElement>('.hiw-step-title .word'),
      )
      const stepBodies = Array.from(
        root.querySelectorAll<HTMLElement>('.hiw-step-body'),
      )

      if (reduce) {
        gsap.set([...titleWords, ...stepTitleWords, ...stepBodies], {
          autoAlpha: 1,
          y: 0,
        })
        return
      }

      gsap.set([...titleWords, ...stepTitleWords], { autoAlpha: 0, y: 18 })
      gsap.set(stepBodies, { autoAlpha: 0, y: 14 })

      ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(titleWords, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.6,
          })
        },
      })

      const steps = Array.from(
        root.querySelectorAll<HTMLElement>('.hiw-step'),
      )
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const words = step.querySelectorAll<HTMLElement>(
              '.hiw-step-title .word',
            )
            const body = step.querySelector<HTMLElement>('.hiw-step-body')
            gsap.to(words, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.45,
            })
            if (body)
              gsap.to(body, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                delay: 0.15,
              })
          },
        })
      })
    },
    { scope: ref as unknown as React.RefObject<HTMLElement> },
  )

  const c = content.howItWorks
  const titleWords = c.title.split(' ')
  const accentWords = c.titleAccent.split(' ')

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24"
    >
      <div className="max-w-2xl mb-12 md:mb-16">
        <LabelPill className="mb-6">{c.eyebrow}</LabelPill>
        <h2
          className="hiw-title font-display text-[32px] md:text-[48px] leading-[1.08] tracking-[-0.02em] font-semibold"
          aria-label={`${c.title} ${c.titleAccent}`}
        >
          {titleWords.map((w, i) => (
            <span
              key={`t-${w}-${i}`}
              className="word inline-block"
              style={{ marginRight: '0.25em' }}
            >
              {w}
            </span>
          ))}
          {accentWords.map((w, i) => (
            <span
              key={`a-${w}-${i}`}
              className="word inline-block text-primary"
              style={{ marginRight: '0.25em' }}
            >
              {w}
            </span>
          ))}
        </h2>
        <p className="mt-5 text-[16px] md:text-[18px] text-text-secondary leading-[1.55]">
          {c.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
        <ol className="space-y-8 md:space-y-10">
          {c.steps.map((step, i) => {
            const stepWords = step.title.split(' ')
            return (
              <li
                key={step.title}
                className="hiw-step grid grid-cols-[auto_1fr] gap-5 sm:gap-6"
              >
                <div className="flex items-start pt-1">
                  <span className="font-mono text-[18px] sm:text-[22px] text-primary font-medium tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3
                    className="hiw-step-title text-[20px] sm:text-[24px] md:text-[28px] leading-[1.15] font-semibold tracking-[-0.01em]"
                    aria-label={step.title}
                  >
                    {stepWords.map((w, j) => (
                      <span
                        key={`${w}-${j}`}
                        className="word inline-block"
                        style={{ marginRight: '0.22em' }}
                      >
                        {w}
                      </span>
                    ))}
                  </h3>
                  <p className="hiw-step-body mt-2 text-[14px] sm:text-[15px] md:text-[16px] text-text-secondary leading-[1.6] max-w-[52ch]">
                    {step.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <div
          data-thread-anchor
          className="hidden lg:flex flex-col items-center justify-start lg:sticky lg:top-32"
        >
          <Diagram />
          <p className="text-center font-mono text-[11px] tracking-[0.06em] text-text-muted mt-5 max-w-[26ch]">
            {c.diagramCaption}
          </p>
        </div>
      </div>

      <div className="lg:hidden mt-10">
        <Diagram />
        <p className="text-center font-mono text-[11px] tracking-[0.06em] text-text-muted mt-5">
          {c.diagramCaption}
        </p>
      </div>
    </section>
  )
}
