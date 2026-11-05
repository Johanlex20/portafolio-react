import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CopyEmailButton } from '@/components/CopyEmailButton'
import { CvLink } from '@/components/CvLink'
import { GradientButton } from '@/components/GradientButton'
import { Section } from '@/components/Section'
import { RevealEmail } from '@/components/RevealEmail'
import { SectionTitle } from '@/components/SectionTitle'
import { contact, getEmail, socials } from '@/data/contact'
import { useReveal } from '@/hooks/useReveal'

// Abre el programa de correo creando el enlace mailto SOLO en el momento del clic.
function openMailClient() {
  const link = document.createElement('a')
  link.href = `mailto:${getEmail()}`
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function Contact() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)

  useReveal(container, '.contact-reveal')

  return (
    <Section id="contact" ref={container} inverted className="pb-52">
      <SectionTitle>{t('contact.title')}</SectionTitle>

      <p className="contact-reveal max-w-2xl text-xl text-muted md:text-2xl">
        {t('contact.text')}
      </p>

      {/* El contenedor lo anima GSAP; el botón interior tiene su propio hover.
          El correo no se escribe aquí: se revela al hacer clic. */}
      <div className="contact-reveal mt-12">
        <RevealEmail className="block w-fit text-left text-[min(6vw,3.5rem)] font-black break-all underline decoration-4 underline-offset-8 transition-opacity hover:opacity-70" />
      </div>

      <div className="contact-reveal mt-10 flex flex-wrap items-center gap-4">
        <GradientButton onClick={openMailClient}>
          {t('contact.email')}
        </GradientButton>
        <GradientButton
          href={`https://wa.me/${contact.whatsapp}`}
          variant="solid"
        >
          WhatsApp
        </GradientButton>
        <CopyEmailButton />
        <CvLink />
      </div>

      <ul className="contact-reveal mt-16 flex flex-wrap gap-x-10 gap-y-4 text-sm font-bold uppercase">
        {socials.map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 underline-offset-4 transition-opacity hover:opacity-60"
            >
              {social.label}
              <span className="sr-only"> {t('projects.newTab')}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
