import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/Modal'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { education } from '@/data/education'
import { experience } from '@/data/experience'
import type { Education as EducationItem } from '@/data/types'
import { useReveal } from '@/hooks/useReveal'

export function Education() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)
  const [diploma, setDiploma] = useState<EducationItem | null>(null)

  useReveal(container, '.reveal-row')

  return (
    <Section id="education" ref={container}>
      <SectionTitle>{t('education.title')}</SectionTitle>

      <ul>
        {education.map((item) => {
          const title = t(`education.${item.id}.title`)
          return (
            <li
              key={item.id}
              className="reveal-row grid gap-4 border-t-2 border-content/20 py-8 md:grid-cols-[13rem_1fr_auto] md:items-center md:gap-8"
            >
              <span className="title-display text-xl whitespace-nowrap text-muted">
                {item.period ?? ''}
              </span>
              <div>
                <h3 className="title-display text-2xl md:text-3xl">{title}</h3>
                <p className="mt-2 text-muted">
                  {item.institution} · {t(`education.status.${item.status}`)}
                </p>
              </div>
              {item.diploma && (
                <button
                  type="button"
                  onClick={() => setDiploma(item)}
                  className="justify-self-start rounded-full border-2 border-content px-5 py-2 text-xs font-bold uppercase transition-colors hover:bg-content hover:text-surface md:justify-self-end"
                >
                  {t('education.viewDiploma')}
                  <span className="sr-only"> — {title}</span>
                </button>
              )}
            </li>
          )
        })}
      </ul>

      <h3 className="mt-24 mb-8 title-display text-[min(7vw,5rem)]">
        {t('experience.title')}
      </h3>
      <ul>
        {experience.map((item) => (
          <li
            key={item.id}
            className="reveal-row grid gap-4 border-t-2 border-content/20 py-8 md:grid-cols-[13rem_1fr_1.2fr] md:gap-8"
          >
            <span className="title-display text-xl whitespace-nowrap text-muted">
              {item.period}
            </span>
            <div>
              <h4 className="title-display text-2xl md:text-3xl">
                {/* "Full-Stack" se mantiene junto: el guion es un punto de corte de línea. */}
                {t(`experience.items.${item.id}.title`)
                  .split(/(Full-Stack)/)
                  .map((part, index) =>
                    part === 'Full-Stack' ? (
                      <span key={index} className="whitespace-nowrap">
                        {part}
                      </span>
                    ) : (
                      part
                    ),
                  )}
              </h4>
              {item.organization && (
                <p className="mt-2 text-muted">{item.organization}</p>
              )}
            </div>
            <div className="max-w-2xl text-muted">
              <p className="text-lg">
                {t(`experience.items.${item.id}.description`)}
              </p>
              {/* returnObjects: true devuelve el arreglo completo de la traducción. */}
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {t(`experience.items.${item.id}.points`, {
                  returnObjects: true,
                }).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {diploma?.diploma && (
        <Modal
          label={t('education.diplomaLabel', {
            title: t(`education.${diploma.id}.title`),
          })}
          closeLabel={t('projects.close')}
          onClose={() => setDiploma(null)}
        >
          <img
            src={diploma.diploma}
            alt={t('education.diplomaLabel', {
              title: t(`education.${diploma.id}.title`),
            })}
            className="max-h-[92vh] w-full bg-white object-contain"
          />
        </Modal>
      )}
    </Section>
  )
}
