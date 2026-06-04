import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from './gsap-init'

ensureGsap()

/**
 * Shared scroll-reveal for the conversion sections. Any descendant with a
 * `data-reveal` attribute fades + rises in on scroll, with a stagger.
 * Honors prefers-reduced-motion (sets the final state and bails), matching
 * the contract every other animated section follows.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)
  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const root = ref.current
      if (!root) return
      const items = Array.from(
        root.querySelectorAll<HTMLElement>('[data-reveal]'),
      )
      if (!items.length) return

      if (reduce) {
        gsap.set(items, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(items, { autoAlpha: 0, y: 24 })
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          }),
      })
    },
    { scope: ref },
  )
  return ref
}
