import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { services } from '@/data/services'
import { useReveal } from '@/hooks/useReveal'

export function Services() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)

  useReveal(container, '.service-row')

  return (
    <Section id="services" ref={container} inverted>
      <SectionTitle>{t('services.title')}</SectionTitle>
      <ol>
        {services.map((id, index) => (
          <li
            key={id}
            className="service-row grid gap-4 border-t-2 border-content/20 py-8 md:grid-cols-[8rem_1fr_1.2fr] md:items-baseline md:gap-8 md:py-10"
          >
            <span className="title-display text-5xl text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="title-display text-2xl md:text-4xl">
              {t(`services.items.${id}.title`)}
            </h3>
            <p className="max-w-xl text-lg text-muted">
              {t(`services.items.${id}.description`)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
