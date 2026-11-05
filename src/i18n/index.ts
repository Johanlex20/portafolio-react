import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { resources, supportedLanguages } from '@/i18n/resources'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: supportedLanguages,
    // 'es-CO' o 'en-US' del navegador se resuelven a 'es' / 'en'.
    nonExplicitSupportedLngs: true,
    fallbackLng: 'es',
    interpolation: { escapeValue: false }, // React ya escapa el texto
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

// Mantiene <html lang="..."> al día: lo usan lectores de pantalla y buscadores.
function syncHtmlLang() {
  document.documentElement.lang = i18n.resolvedLanguage ?? 'es'
}
syncHtmlLang()
i18n.on('languageChanged', syncHtmlLang)

export default i18n
