import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LanguageToggle } from '@/components/LanguageToggle'
import i18n from '@/i18n'
import { renderWithProviders } from '@/test/render'

describe('selector de idioma', () => {
  it('marca el idioma activo con aria-pressed', () => {
    renderWithProviders(<LanguageToggle />)

    expect(
      screen.getByRole('button', { name: 'ES - Español' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'EN - Inglés' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('al elegir inglés cambia el idioma, <html lang> y guarda la elección', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LanguageToggle />)

    await user.click(screen.getByRole('button', { name: 'EN - Inglés' }))

    expect(i18n.resolvedLanguage).toBe('en')
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')
    expect(
      screen.getByRole('button', { name: 'EN - English' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })
})
