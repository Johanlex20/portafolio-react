import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

// ScrollTrigger calcula UNA vez en qué posición del scroll empieza cada animación.
// Si después la página cambia de altura (una imagen con carga diferida termina
// de cargar, una fuente cambia el tamaño del texto), esas posiciones quedan
// desactualizadas y las animaciones no se disparan. Este hook las recalcula.
export function useScrollTriggerRefresh() {
  useEffect(() => {
    let frame = 0
    let lastHeight = document.body.scrollHeight

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const height = document.body.scrollHeight
        if (height !== lastHeight) {
          lastHeight = height
          ScrollTrigger.refresh()
        }
      })
    })
    observer.observe(document.body)

    void document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])
}
