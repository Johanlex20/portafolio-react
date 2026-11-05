import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'

// Renderiza un componente dentro de los mismos proveedores que usa la app real.
export function renderWithProviders(ui: ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}
