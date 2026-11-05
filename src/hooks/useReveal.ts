import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

// Hace que cada elemento que coincida con `selector` (dentro de `scope`)
// entre desde abajo cuando llega a la pantalla. Respeta prefers-reduced-motion.
export function useReveal(
  scope: RefObject<HTMLElement | null>,
  selector: string,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      })
    },
    { scope },
  )
}
