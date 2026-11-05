import es from './locales/es.json'
import en from './locales/en.json'

export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const

export const supportedLanguages = ['es', 'en'] as const

export type Language = (typeof supportedLanguages)[number]
