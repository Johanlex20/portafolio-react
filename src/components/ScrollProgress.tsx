import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

// Barra de progreso de lectura: demuestra GSAP + ScrollTrigger + Lenis juntos.
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  // useGSAP es useEffect con limpieza automática de animaciones y triggers.
  useGSAP(
    () => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true, // el progreso de la animación = progreso del scroll
          },
        },
      )
    },
    { scope: barRef },
  )

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-violet via-pink to-orange"
    />
  )
}
