import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Section } from '@/components/Section'
import { ThemeToggle } from '@/components/ThemeToggle'
import { renderWithProviders } from '@/test/render'

describe('tema oscuro / claro', () => {
  it('empieza en oscuro y ofrece cambiar a claro', () => {
    renderWithProviders(<ThemeToggle />)

    expect(
      screen.getByRole('button', { name: 'Cambiar a tema claro' }),
    ).toBeInTheDocument()
  })

  it('al hacer clic cambia data-theme, el texto del botón y guarda la elección', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ThemeToggle />)

    await user.click(screen.getByRole('button'))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(
      screen.getByRole('button', { name: 'Cambiar a tema oscuro' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('una sección invertida usa el tema contrario al del sitio', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <ThemeToggle />
        <Section id="demo" inverted>
          contenido
        </Section>
      </>,
    )
    const section = document.getElementById('demo')

    expect(section).toHaveAttribute('data-theme', 'light') // sitio oscuro -> sección clara

    await user.click(screen.getByRole('button'))
    expect(section).toHaveAttribute('data-theme', 'dark') // sitio claro -> sección oscura
  })
})
