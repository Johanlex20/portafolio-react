import type Lenis from 'lenis'

// Lenis es una instancia única y vive fuera de React.
// Otros componentes (p. ej. el menú móvil) necesitan pausarla, por eso se comparte.
let instance: Lenis | null = null

export function getLenis() {
  return instance
}

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}
