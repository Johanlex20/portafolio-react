import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CopyEmailButton } from '@/components/CopyEmailButton'
import { getEmail } from '@/data/contact'

describe('botón copiar correo', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('copia el correo al portapapeles y avisa "¡Copiado!"', async () => {
    const user = userEvent.setup() // instala un portapapeles simulado
    render(<CopyEmailButton />)

    await user.click(screen.getByRole('button', { name: 'Copiar correo' }))

    expect(await navigator.clipboard.readText()).toBe(getEmail())
    expect(screen.getByRole('button')).toHaveTextContent('¡Copiado!')
    expect(screen.getByRole('status')).toHaveTextContent('¡Copiado!')
  })

  it('vuelve al texto original a los 2 segundos', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    vi.useFakeTimers({ shouldAdvanceTime: true })
    render(<CopyEmailButton />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('¡Copiado!')

    await act(async () => {
      vi.advanceTimersByTime(2100)
    })
    expect(screen.getByRole('button')).toHaveTextContent('Copiar correo')
  })
})
