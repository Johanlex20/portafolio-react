import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'
import { IntroVideo } from '@/components/IntroVideo'
import { renderWithProviders } from '@/test/render'

beforeAll(() => {
  // jsdom no implementa <dialog>.showModal(): se simula marcando el diálogo como abierto.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})

describe('video de presentación', () => {
  it('el botón abre una ventana modal con el video del idioma actual', async () => {
    const user = userEvent.setup()
    renderWithProviders(<IntroVideo />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Conóceme en 10 s/ }))

    const dialog = screen.getByRole('dialog', {
      name: 'Video de presentación de Johan',
    })
    expect(dialog.querySelector('video')).toHaveAttribute(
      'src',
      '/videos/intro-es.mp4',
    )
  })

  it('si el archivo del video no existe, muestra un aviso en vez de un reproductor roto', async () => {
    const user = userEvent.setup()
    renderWithProviders(<IntroVideo />)
    await user.click(screen.getByRole('button', { name: /Conóceme en 10 s/ }))

    const video = screen
      .getByRole('dialog', { name: 'Video de presentación de Johan' })
      .querySelector('video')
    fireEvent.error(video!)

    expect(
      screen.getByText(
        'El video de presentación estará disponible muy pronto.',
      ),
    ).toBeInTheDocument()
    expect(document.querySelector('video')).toBeNull()
  })

  it('el botón Cerrar cierra el modal', async () => {
    const user = userEvent.setup()
    renderWithProviders(<IntroVideo />)
    await user.click(screen.getByRole('button', { name: /Conóceme en 10 s/ }))
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
