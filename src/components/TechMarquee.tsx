import { useTranslation } from 'react-i18next'
import { Sparkle } from '@/components/Sparkle'
import { marqueeTech } from '@/data/skills'

const sparkleColors = [
  'text-violet',
  'text-pink',
  'text-orange',
  'text-lime',
  'text-sun',
]

export function TechMarquee() {
  const { t } = useTranslation()

  return (
    <div
      role="region"
      aria-label={t('marquee.label')}
      className="overflow-hidden border-y-2 border-content/15 py-6 motion-reduce:overflow-x-auto"
    >
      {/* Dos copias idénticas: al desplazar 50 % el bucle es continuo.
          La segunda se oculta a lectores de pantalla para no repetir el contenido. */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
            className="flex shrink-0 items-center gap-10 pr-10"
          >
            {marqueeTech.map((name, index) => (
              <li key={name} className="flex items-center gap-10">
                <span className="title-display text-4xl md:text-6xl">
                  {name}
                </span>
                <Sparkle
                  className={`size-7 ${sparkleColors[index % sparkleColors.length]}`}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
