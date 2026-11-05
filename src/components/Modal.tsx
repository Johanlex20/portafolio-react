import { useEffect, useRef, type ReactNode } from 'react'
import { useScrollLock } from '@/hooks/useScrollLock'

type ModalProps = {
  label: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
}

// Modal basado en el elemento nativo <dialog>: el navegador se encarga de
// atrapar el foco, cerrar con Escape y oscurecer el fondo (::backdrop).
export function Modal({ label, closeLabel, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useScrollLock(true)

  useEffect(() => {
    const dialog = dialogRef.current
    // StrictMode ejecuta este efecto dos veces en desarrollo:
    // showModal() sobre un diálogo ya abierto lanzaría un error.
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      // 'close' se dispara al pulsar Escape o al llamar a close().
      onClose={onClose}
      // Un clic sobre el fondo oscuro llega al <dialog> mismo, no a un hijo.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="m-auto max-h-[92vh] w-[min(92vw,70rem)] overflow-hidden rounded-3xl border-2 border-content/20 bg-surface p-0 text-content backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full border-2 border-content bg-surface px-4 py-2 text-xs font-bold uppercase transition-colors hover:bg-content hover:text-surface"
      >
        {closeLabel}
      </button>
      {children}
    </dialog>
  )
}
