import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import i18n from '@/i18n'

// Cada prueba parte de cero: sin tema ni idioma guardados, en español.
beforeEach(async () => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  await i18n.changeLanguage('es')
})

afterEach(() => {
  cleanup()
})
