import { describe, expect, it } from 'vitest'
import { education } from '@/data/education'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { skillGroups } from '@/data/skills'
import { navItems } from '@/data/nav'
import i18n from '@/i18n'
import en from '@/i18n/locales/en.json'
import es from '@/i18n/locales/es.json'

// Convierte { a: { b: 'x' } } en ['a.b'] para comparar la estructura de ambos idiomas.
function flatten(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'object' && value !== null
      ? flatten(value as Record<string, unknown>, path)
      : [path]
  })
}

describe('traducciones', () => {
  it('español e inglés tienen exactamente las mismas claves', () => {
    expect(flatten(en).sort()).toEqual(flatten(es).sort())
  })

  it('ninguna traducción está vacía', () => {
    for (const locale of [es, en]) {
      const values = flatten(locale).map((key) =>
        key
          .split('.')
          .reduce<unknown>((acc, part) => (acc as never)[part], locale),
      )
      expect(
        values.every((v) => typeof v === 'string' && v.trim() !== ''),
      ).toBe(true)
    }
  })

  it.each(['es', 'en'] as const)(
    'cada proyecto, servicio, estudio y experiencia tiene su texto en %s',
    (lng) => {
      const keys = [
        ...projects.map((p) => `projects.${p.id}.description`),
        ...services.flatMap((id) => [
          `services.items.${id}.title`,
          `services.items.${id}.description`,
        ]),
        ...skillGroups.map((g) => `skills.groups.${g.id}`),
        ...education.map((e) => `education.${e.id}.title`),
        ...experience.flatMap((e) => [
          `experience.items.${e.id}.title`,
          `experience.items.${e.id}.description`,
        ]),
        ...navItems.map((id) => `nav.${id}`),
      ]
      const missing = keys.filter((key) => !i18n.exists(key, { lng }))
      expect(missing).toEqual([])
    },
  )
})
