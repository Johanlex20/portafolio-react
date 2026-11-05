import { useEffect } from 'react'
import { getLenis } from '@/lib/lenis'

// Bloquea el scroll de la página mientras `locked` sea true (menú móvil abierto).
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    getLenis()?.stop()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // La función que devuelve el efecto se ejecuta al desbloquear
    // o al desmontar el componente: deja todo como estaba.
    return () => {
      getLenis()?.start()
      document.body.style.overflow = previous
    }
  }, [locked])
}
