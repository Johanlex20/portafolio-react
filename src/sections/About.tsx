import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { GradientButton } from '@/components/GradientButton'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { Sparkle } from '@/components/Sparkle'
import { useTheme } from '@/hooks/useTheme'
import { gsap, useGSAP } from '@/lib/gsap'

export function About() {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()
  const container = useRef<HTMLElement>(null)
  const words = t('about.text').split(/\s+/).filter(Boolean)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const styles = getComputedStyle(container.current as HTMLElement)
        const dim = styles.getPropertyValue('--muted').trim()
        const bright = styles.getPropertyValue('--content').trim()

        gsap.fromTo(
          '.about-word',
          { color: dim },
          {
            color: bright,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.about-text',
              start: 'top 80%',
              end: 'bottom 50%',
              scrub: true,
            },
          },
        )

        // 2) Parallax: cada forma se desplaza a distinta velocidad y sentido.
        gsap.utils
          .toArray<HTMLElement>('.about-shape')
          .forEach((shape, index) => {
            gsap.to(shape, {
              yPercent: (index % 2 ? -1 : 1) * (35 + index * 15),
              ease: 'none',
              scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
          })

        // 3) Flotación continua e independiente del scroll.
        gsap.to('.about-float', {
          y: -14,
          duration: 2.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.5, from: 'random' },
        })
      })
    },
    // Al cambiar de idioma cambian las palabras, y al cambiar de tema cambian
    // los colores leídos arriba: en ambos casos se rehacen las animaciones.
    {
      scope: container,
      dependencies: [i18n.language, theme],
      revertOnUpdate: true,
    },
  )

  return (
    <Section
      id="about"
      ref={container}
      className="relative flex flex-col items-center justify-center overflow-hidden text-center"
    >
      <div aria-hidden="true">
        <div className="about-shape absolute top-[12%] left-[7%]">
          <div className="about-float">
            <Sparkle className="size-12 text-violet md:size-24" />
          </div>
        </div>
        <div className="about-shape absolute top-[16%] right-[9%]">
          <div className="about-float">
            <div className="size-14 rounded-full bg-linear-to-br from-pink to-orange md:size-28" />
          </div>
        </div>
        <div className="about-shape absolute bottom-[14%] left-[10%]">
          <div className="about-float">
            <div className="size-12 rotate-12 rounded-2xl border-4 border-lime md:size-24 md:rounded-3xl" />
          </div>
        </div>
        <div className="about-shape absolute right-[7%] bottom-[18%]">
          <div className="about-float">
            <div className="h-8 w-20 rounded-full bg-sun md:h-14 md:w-36" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <SectionTitle>{t('nav.about')}</SectionTitle>
        <p className="about-text mx-auto max-w-5xl text-2xl leading-snug font-bold md:text-5xl">
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span className="about-word">{word}</span>{' '}
            </span>
          ))}
        </p>
        <GradientButton href="#contact" className="mt-14">
          {t('about.cta')}
        </GradientButton>
      </div>
    </Section>
  )
}
