import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getEmail } from '@/data/contact'

export function CopyEmailButton() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  // Vuelve al estado normal 2 s después. La limpieza cancela el temporizador
  // si el componente se desmonta o si se pulsa otra vez antes de tiempo.
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(getEmail())
      setCopied(true)
    } catch {
      // Sin permiso de portapapeles: el enlace mailto sigue disponible.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void copy()}
        className="rounded-full border-2 border-content px-6 py-3 text-sm font-bold uppercase transition-colors hover:bg-content hover:text-surface"
      >
        {copied ? t('contact.copied') : t('contact.copy')}
      </button>
      {/* Región "viva": los lectores de pantalla anuncian el cambio sin mover el foco. */}
      <span role="status" className="sr-only">
        {copied ? t('contact.copied') : ''}
      </span>
    </>
  )
}
