import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '@/i18n/resources'

export function LanguageToggle() {
  const { t, i18n } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="flex overflow-hidden rounded-full border-2 border-content text-sm font-bold uppercase"
    >
      {supportedLanguages.map((lang) => {
        const isActive = i18n.resolvedLanguage === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => void i18n.changeLanguage(lang)}
            aria-pressed={isActive}
            // El nombre accesible debe CONTENER el texto visible ("es"/"en") para
            // que funcione el control por voz (WCAG 2.5.3, etiqueta en el nombre).
            aria-label={`${lang.toUpperCase()} - ${t(`language.${lang}`)}`}
            className={`px-4 py-2 transition-colors ${
              isActive ? 'bg-content text-surface' : 'hover:bg-content/10'
            }`}
          >
            {lang}
          </button>
        )
      })}
    </div>
  )
}
