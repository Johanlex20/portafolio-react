import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { skillGroups } from '@/data/skills'
import { useReveal } from '@/hooks/useReveal'

export function Skills() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)

  useReveal(container, '.skill-group')

  return (
    <Section id="skills" ref={container} inverted>
      <SectionTitle>{t('nav.skills')}</SectionTitle>
      <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <article key={group.id} className="skill-group">
            <h3 className="mb-6 flex items-baseline gap-4 border-b-2 border-content/20 pb-4">
              <span className="title-display text-2xl text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="title-display text-3xl md:text-4xl">
                {t(`skills.groups.${group.id}`)}
              </span>
            </h3>
            <ul className="flex flex-wrap gap-3">
              {/* Narrowing: según group.id, TypeScript sabe si los items son
                  nombres técnicos (texto fijo) o habilidades blandas (traducibles). */}
              {group.id === 'soft'
                ? group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border-2 border-content px-4 py-2 text-sm font-bold transition-colors hover:bg-content hover:text-surface"
                    >
                      {t(`skills.soft.${item}`)}
                    </li>
                  ))
                : group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border-2 border-content px-4 py-2 text-sm font-bold transition-colors hover:bg-content hover:text-surface"
                    >
                      {item}
                    </li>
                  ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
