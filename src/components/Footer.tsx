import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { RevealEmail } from '@/components/RevealEmail'
import { contact, socials } from '@/data/contact'
import { gsap, useGSAP } from '@/lib/gsap'

// Cada letra del nombre con un color de la paleta, como en la referencia.
const letters = [
  { char: 'J', color: 'text-lime' },
  { char: 'O', color: 'text-violet' },
  { char: 'H', color: 'text-orange' },
  { char: 'A', color: 'text-pink' },
  { char: 'N', color: 'text-sun' },
]

export function Footer() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Las letras suben desde detrás de su "máscara" al llegar al footer.
        gsap.from('.footer-letter', {
          yPercent: 110,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.footer-letters', start: 'top 90%' },
        })
      })
    },
    { scope: container },
  )

  return (
    <footer
      ref={container}
      className="relative z-20 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-surface px-6 pt-20 pb-8 text-content md:px-10"
    >
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-sm font-bold text-muted uppercase">
            {t('footer.social')}
          </h2>
          <ul className="flex flex-col gap-2 text-xl font-bold">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-60"
                >
                  {social.label}
                  <span className="sr-only"> {t('projects.newTab')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-muted uppercase">
            {t('footer.contact')}
          </h2>
          <ul className="flex flex-col gap-2 text-xl font-bold">
            <li>
              <RevealEmail className="text-left font-bold transition-opacity hover:opacity-60" />
            </li>
            <li className="font-normal text-muted">{contact.location}</li>
          </ul>
        </div>
      </div>

      {/* Nombre gigante. Las letras sueltas se ocultan a lectores de pantalla y se
          lee la palabra completa desde un texto solo-visible-para-lectores (sr-only):
          aria-label no está permitido en un <p>. */}
      <p className="footer-letters mt-20 flex justify-between title-display text-[min(21vw,24rem)]">
        <span className="sr-only">Johan</span>
        {letters.map(({ char, color }) => (
          <span
            key={char}
            aria-hidden="true"
            className="mb-[-0.1em] block overflow-hidden pb-[0.1em]"
          >
            <span
              className={`footer-letter inline-block transition-[translate] duration-300 hover:-translate-y-3 ${color}`}
            >
              {char}
            </span>
          </span>
        ))}
      </p>

      <div className="mt-10 flex flex-col justify-between gap-4 border-t-2 border-content/20 pt-6 text-sm text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} Johan Rodríguez · {t('footer.rights')}
        </p>
        <p>{t('footer.built')}</p>
        <a
          href="#home"
          className="font-bold text-content uppercase transition-opacity hover:opacity-60"
        >
          {t('footer.backToTop')}
        </a>
      </div>
    </footer>
  )
}
