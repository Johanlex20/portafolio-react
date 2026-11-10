import { fireEvent, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { VideoModal } from '@/components/VideoModal'
import { projects } from '@/data/projects'
import { renderWithProviders } from '@/test/render'

beforeAll(() => {
  // jsdom no implementa <dialog>.showModal(): se simula marcando el diálogo como abierto.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
})

describe('modal de video de un proyecto', () => {
  it('si el archivo del video no existe (tutorial de Doblin pendiente), avisa en vez de mostrar un reproductor roto', () => {
    const doblin = projects.find((project) => project.id === 'doblin')!
    renderWithProviders(<VideoModal project={doblin} onClose={() => {}} />)

    const video = document.querySelector('video')
    expect(video).toHaveAttribute('src', '/videos/doblin-tutorial.mp4')

    fireEvent.error(video!)

    expect(
      screen.getByText('El video estará disponible muy pronto.'),
    ).toBeInTheDocument()
    expect(document.querySelector('video')).toBeNull()
  })
})
