import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getEmail } from '@/data/contact'

type RevealEmailProps = {
  className?: string
}

// Muestra un botón "Mostrar correo". Solo al hacer clic aparece el correo (como enlace
// mailto). Antes del clic, ni la pantalla ni el HTML contienen la dirección.
export function RevealEmail({ className = '' }: RevealEmailProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState<string | null>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  // Al revelarse, el foco pasa al enlace: quien usa teclado o lector de pantalla
  // se entera de que apareció algo nuevo.
  useEffect(() => {
    if (email) linkRef.current?.focus()
  }, [email])

  if (!email) {
    return (
      <button
        type="button"
        onClick={() => setEmail(getEmail())}
        className={className}
      >
        {t('contact.reveal')}
      </button>
    )
  }

  return (
    <a ref={linkRef} href={`mailto:${email}`} className={className}>
      {email}
    </a>
  )
}
