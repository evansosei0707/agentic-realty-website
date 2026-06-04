import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

let registered = false

export function ensureGsap() {
  if (registered) return
  if (typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  gsap.defaults({ ease: 'power3.out', duration: 0.8 })
  ScrollTrigger.config({ ignoreMobileResize: true })
  registered = true
}
