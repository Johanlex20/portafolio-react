import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Mantiene <title> y <meta name="description"> en el idioma activo.
export function useDocumentMeta() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('meta.title')
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t('meta.description'))
    // `t` cambia de identidad cuando cambia el idioma, y eso re-ejecuta el efecto.
  }, [t, i18n.resolvedLanguage])
}
