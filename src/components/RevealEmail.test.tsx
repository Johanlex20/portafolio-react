import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { RevealEmail } from '@/components/RevealEmail'
import { getEmail } from '@/data/contact'

describe('correo oculto', () => {
  it('antes del clic no hay correo ni en pantalla ni en ningún enlace', () => {
    const { container } = render(<RevealEmail />)

    expect(screen.getByRole('button', { name: 'Mostrar correo' })).toBeVisible()
    expect(container.innerHTML).not.toContain('@')
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull()
  })

  it('al hacer clic muestra el correo como enlace mailto y le da el foco', async () => {
    const user = userEvent.setup()
    render(<RevealEmail />)

    await user.click(screen.getByRole('button', { name: 'Mostrar correo' }))

    const link = screen.getByRole('link', { name: getEmail() })
    expect(link).toHaveAttribute('href', `mailto:${getEmail()}`)
    expect(link).toHaveFocus()
    expect(screen.queryByRole('button')).toBeNull()
  })
})
