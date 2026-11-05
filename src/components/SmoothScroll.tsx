import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { setLenis } from '@/lib/lenis'

export function SmoothScroll() {
  useEffect(() => {
    // Accesibilidad: si el usuario pidió menos movimiento, scroll nativo.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // autoRaf: false => nosotros le damos el "latido" desde el ticker de GSAP,
    // así Lenis y ScrollTrigger siempre están sincronizados.
    // anchors: true => los enlaces #id se desplazan suavemente. Lenis respeta el
    // `scroll-margin-top` de cada sección (scroll-mt-20), que deja espacio al header.
    const lenis = new Lenis({ autoRaf: false, anchors: true })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Limpieza: sin esto, en desarrollo (StrictMode monta dos veces)
    // quedarían dos Lenis peleando por el scroll.
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
