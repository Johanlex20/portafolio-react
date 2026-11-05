import 'i18next'
import type { resources } from '@/i18n/resources'

// Le enseña a TypeScript qué claves existen: t('greting') marca error.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: (typeof resources)['es']
  }
}
