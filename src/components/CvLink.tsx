import { useTranslation } from 'react-i18next'

// Descarga el CV en el idioma que el visitante tiene activo.
export function CvLink() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage === 'en' ? 'en' : 'es'

  return (
    <a
      href={`/cv/Johan-Rodriguez-CV-${lang}.pdf`}
      download
      className="rounded-full border-2 border-content px-6 py-3 text-sm font-bold uppercase transition-colors hover:bg-content hover:text-surface"
    >
      {t('contact.cv')}
      <span className="sr-only"> (PDF)</span>
    </a>
  )
}
