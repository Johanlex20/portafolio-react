import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/Avatar'
import { GradientButton } from '@/components/GradientButton'
import { Section } from '@/components/Section'
import { gsap, useGSAP } from '@/lib/gsap'

export function Hero() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)
  // /\s+/ + filter: tolera espacios dobles o al borde del texto (si no, quedarían "palabras" vacías).
  const words = t('hero.title').split(/\s+/).filter(Boolean)

  useGSAP(
    () => {
      // matchMedia ejecuta las animaciones solo si el usuario NO pidió menos movimiento.
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from('.hero-word', { yPercent: 115, duration: 1.1, stagger: 0.12 })
          .from(
            '.hero-avatar',
            { scale: 0.6, opacity: 0, duration: 1.1 },
            '-=0.8',
          )
          .from(
            '.hero-fade',
            { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 },
            '-=0.6',
          )

        // Parallax: el avatar sube más despacio que la página al hacer scroll.
        gsap.to('.hero-parallax', {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: container },
  )

  return (
    <Section
      id="home"
      ref={container}
      className="relative flex flex-col justify-between gap-10 overflow-hidden pt-28 pb-12"
    >
      <h1 className="flex flex-col title-display text-[19vw] md:flex-row md:flex-wrap md:gap-x-[0.22em] md:text-[min(6.8vw,7rem)]">
        {words.map((word, index) => (
          // El span exterior recorta ("máscara"); el interior es el que sube.
          <span
            key={`${word}-${index}`}
            className="mb-[-0.12em] inline-block overflow-hidden pb-[0.12em]"
          >
            <span className="hero-word inline-block">{word}</span>
          </span>
        ))}
      </h1>

      <div className="hero-avatar mx-auto w-56 md:absolute md:top-[19%] md:left-1/2 md:w-[min(26vw,22rem)] md:-translate-x-1/2">
        <div className="hero-parallax">
          <Avatar />
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <p className="hero-fade max-w-xs text-sm font-bold text-muted uppercase">
          {t('hero.tagline')}
        </p>
        <GradientButton href="#contact" className="hero-fade">
          {t('hero.cta')}
        </GradientButton>
      </div>
    </Section>
  )
}
