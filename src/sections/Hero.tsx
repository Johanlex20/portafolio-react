import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/Avatar'
import { GradientButton } from '@/components/GradientButton'
import { IntroVideo } from '@/components/IntroVideo'
import { Section } from '@/components/Section'
import { gsap, useGSAP } from '@/lib/gsap'

// Dónde cae la "O" del título (px, medidos desde la esquina de la zona título+manito).
type Anchor = { x: number; y: number; size: number; below: number }

export function Hero() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const mark = useRef<HTMLSpanElement>(null)
  const [anchor, setAnchor] = useState<Anchor | null>(null)

  // /\s+/ + filter: tolera espacios dobles o al borde del texto (si no, quedarían "palabras" vacías).
  const titleText = t('hero.title')
  const words = titleText.split(/\s+/).filter(Boolean)
  // La "O" que se vuelve botón de play: la de la palabra del centro ("SOY"), que cae en el eje de la
  // pantalla. Si esa palabra no tiene O, la de la palabra que tenga una más cerca del centro.
  const withO = words.flatMap((word, index) => (/o/i.test(word) ? [index] : []))
  const middle = (words.length - 1) / 2
  const markWord =
    withO.length === 0
      ? -1
      : withO.reduce((best, index) =>
          Math.abs(index - middle) <= Math.abs(best - middle) ? index : best,
        )
  const oAt = markWord >= 0 ? words[markWord].search(/o/i) : -1
  // Con 3 palabras: columna izquierda (pegada al centro) | palabra central (en el eje) | columna derecha (pegada al centro).
  const symmetric = words.length === 3

  // Mide dónde quedó la "O" para poner encima el disco ▶ y debajo la manito.
  const measure = useCallback(() => {
    const wrap = wrapper.current
    const o = mark.current
    const head = title.current
    if (!wrap || !o || !head) return
    const w = wrap.getBoundingClientRect()
    const m = o.getBoundingClientRect()
    const h = head.getBoundingClientRect()
    const em = o.offsetHeight // line-height: 1 → el alto de la "O" es 1 em
    const size = Math.round(em * 0.84)
    const x = Math.round(m.left + m.width / 2 - w.left)
    const y = Math.round(m.top + m.height / 2 - w.top)
    // Distancia desde la parte baja del disco hasta la parte baja del título.
    const below = Math.round(h.bottom - w.top - (y + size / 2))
    setAnchor((prev) =>
      prev &&
      prev.x === x &&
      prev.y === y &&
      prev.size === size &&
      prev.below === below
        ? prev
        : { x, y, size, below },
    )
  }, [])

  useLayoutEffect(() => {
    const wrap = wrapper.current
    if (!wrap) return
    measure()
    // Se vuelve a medir si cambia el tamaño de la pantalla, termina de cargar la tipografía
    // o cambia el texto del título (al cambiar de idioma la "O" cae en otro lugar).
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    void document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [measure, titleText, markWord])

  useGSAP(
    () => {
      // matchMedia ejecuta las animaciones solo si el usuario NO pidió menos movimiento.
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from('.hero-word', { yPercent: 115, duration: 1.1, stagger: 0.12 })
          // Cuando las palabras terminan de subir, la "O" ya está en su sitio definitivo: se mide.
          .add(measure)
          .from(
            '.hero-avatar',
            { scale: 0.6, opacity: 0, duration: 1.1 },
            '-=0.2',
          )
          .from(
            '.hero-play',
            { scale: 0.3, opacity: 0, duration: 0.8, ease: 'back.out(2.2)' },
            '-=0.6',
          )
          .from(
            '.hero-fade',
            { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 },
            '-=0.6',
          )

        // Parallax: la manito sube más despacio que la página al hacer scroll.
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

  // Variables CSS que usa la manito para colocarse: su dedo largo (32 % de su ancho) queda bajo la "O".
  const vars = anchor
    ? ({
        '--below': `${anchor.below}px`,
      } as CSSProperties)
    : undefined

  return (
    <Section
      id="home"
      ref={container}
      className="relative flex flex-col gap-8 overflow-hidden pt-28 pb-10"
    >
      <div
        ref={wrapper}
        style={vars}
        className="relative flex flex-1 flex-col justify-center [--hand:min(66vw,16rem)] md:[--hand:min(30vw,28rem,44vh)]"
      >
        <h1
          ref={title}
          // Cada palabra va en su propio span; el aria-label asegura que se lea "Hi, I'm Johan" completo.
          aria-label={titleText}
          className={`relative z-10 flex flex-col items-center title-display text-[19vw] md:text-[min(7vw,8rem)] ${
            symmetric
              ? 'md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-[0.3em]'
              : 'md:flex-row md:flex-wrap md:justify-center md:gap-x-[0.22em]'
          }`}
        >
          {words.map((word, index) => (
            // El span exterior recorta ("máscara"); el interior es el que sube.
            <span
              key={`${word}-${index}`}
              className={`mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] ${
                symmetric
                  ? index === 0
                    ? 'md:justify-self-end'
                    : index === 2
                      ? 'md:justify-self-start'
                      : 'md:justify-self-center'
                  : ''
              }`}
            >
              <span className="hero-word inline-block whitespace-nowrap">
                {index === markWord ? (
                  <>
                    {word.slice(0, oAt)}
                    {/* La letra sigue en el texto (lectores de pantalla, SEO), pero invisible: encima va el disco ▶. */}
                    <span ref={mark} className="inline-block text-transparent">
                      {word[oAt]}
                    </span>
                    {word.slice(oAt + 1)}
                  </>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* Disco ▶: se coloca justo encima de la "O" (hasta que se mide, queda oculto). */}
        <IntroVideo
          className="hero-play absolute z-20"
          style={
            anchor
              ? {
                  left: anchor.x - anchor.size / 2,
                  top: anchor.y - anchor.size / 2,
                  width: anchor.size,
                  height: anchor.size,
                }
              : { visibility: 'hidden', width: 0, height: 0 }
          }
        />

        {/* Escenario de la manito: queda debajo de la "O" y salta hacia ella. */}
        <div className="relative h-[calc(var(--hand)*1.32)]">
          <div className="hero-avatar absolute top-[calc(var(--hand)*0.27-var(--below,0px))] left-1/2 w-[var(--hand)] -translate-x-1/2">
            <div className="hero-parallax">
              <Avatar />
            </div>
          </div>
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
