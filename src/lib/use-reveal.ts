import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ensureGsap } from './gsap-init'

ensureGsap()

/**
 * Fire `onVisible` exactly once per element, the first time it enters the
 * viewport. IntersectionObserver rather than ScrollTrigger: IO stays correct
 * through instant anchor jumps and late layout shifts, where scroll-position
 * bookkeeping can go stale and leave elements stuck invisible.
 *
 * `margin` mirrors ScrollTrigger's `start: 'top X%'` (e.g. -12% ≈ 'top 88%').
 */
export function observeOnce(
  elements: HTMLElement[],
  onVisible: (el: HTMLElement, index: number) => void,
  margin = '0px 0px -12% 0px',
): () => void {
  const indexOf = new Map(elements.map((el, i) => [el, i]))
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        io.unobserve(el)
        onVisible(el, indexOf.get(el) ?? 0)
      }
    },
    { rootMargin: margin },
  )
  elements.forEach((el) => io.observe(el))
  return () => io.disconnect()
}

/**
 * Shared scroll-reveal for the conversion sections. Any descendant with a
 * `data-reveal` attribute fades + rises in on first sight, with a small
 * sibling cascade. Honors prefers-reduced-motion (sets the final state and
 * bails), matching the contract every other animated section follows.
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
      return observeOnce(items, (el, i) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: (i % 5) * 0.07,
          ease: 'power2.out',
        })
      })
    },
    { scope: ref },
  )
  return ref
}
