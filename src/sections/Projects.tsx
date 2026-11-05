import { useRef, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { VideoModal } from '@/components/VideoModal'
import { projects } from '@/data/projects'
import type { Project } from '@/data/types'
import { gsap, useGSAP } from '@/lib/gsap'

const pillClasses =
  'inline-block rounded-full border-2 border-content px-5 py-2 text-xs font-bold uppercase transition-colors hover:bg-content hover:text-surface'

export function Projects() {
  const { t } = useTranslation()
  const container = useRef<HTMLElement>(null)
  const [videoProject, setVideoProject] = useState<Project | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Solo en pantallas anchas (donde las tarjetas se apilan) y con movimiento permitido.
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const cards = gsap.utils.toArray<HTMLElement>('.project-card')

          cards.forEach((card, index) => {
            const next = cards[index + 1]
            if (!next) return

            // Mientras la tarjeta siguiente sube a cubrirla, esta se encoge y se oscurece.
            gsap.to(card.querySelector('.project-inner'), {
              scale: 0.93,
              filter: 'brightness(0.55)',
              ease: 'none',
              scrollTrigger: {
                trigger: next,
                start: 'top 85%',
                end: 'top 20%',
                scrub: true,
              },
            })
          })
        },
      )
    },
    { scope: container },
  )

  return (
    <Section id="projects" ref={container} className="pb-40">
      <SectionTitle>{t('nav.projects')}</SectionTitle>
      <p className="-mt-6 mb-16 max-w-2xl text-lg text-muted">
        {t('projects.intro')}
      </p>

      <ol>
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, '0')
          const primary = project.links.demo
            ? { href: project.links.demo, label: t('projects.live') }
            : null

          return (
            <li
              key={project.id}
              // --i desplaza el punto donde se "pega" cada tarjeta: así asoma el borde de las anteriores.
              style={{ '--i': index } as CSSProperties}
              className="project-card mb-8 md:sticky md:top-[calc(6rem+var(--i)*1.5rem)] md:mb-[14vh]"
            >
              <article className="project-inner relative origin-top overflow-hidden rounded-3xl border-2 border-content/20 bg-surface">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-content/5"
                />

                <div className="relative flex flex-col gap-8 p-6 md:p-10">
                  {/* En móvil el botón baja debajo del título (antes se cortaba por el borde). */}
                  <header className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="title-display text-3xl text-muted md:text-5xl">
                        {number}
                      </span>
                      <h3 className="title-display text-2xl md:text-5xl">
                        {project.name}
                      </h3>
                    </div>
                    {primary && (
                      <a
                        href={primary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${pillClasses} shrink-0`}
                      >
                        {primary.label}
                        <span className="sr-only"> {t('projects.newTab')}</span>
                      </a>
                    )}
                  </header>

                  <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
                    <div className="flex flex-col justify-between gap-8">
                      <div className="flex flex-col gap-6">
                        <p className="text-lg text-muted">
                          {t(`projects.${project.id}.description`)}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-full bg-content/10 px-3 py-1 text-xs font-bold"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {project.links.repo && (
                          <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={pillClasses}
                          >
                            {t('projects.code')}
                            <span className="sr-only">
                              {' '}
                              {t('projects.newTab')}
                            </span>
                          </a>
                        )}
                        {project.video && (
                          <button
                            type="button"
                            onClick={() => setVideoProject(project)}
                            className={pillClasses}
                          >
                            {t('projects.video')}
                          </button>
                        )}
                      </div>
                    </div>

                    <div
                      className={`grid gap-4 ${project.images.length > 1 ? 'sm:grid-cols-2' : ''}`}
                    >
                      {project.images.map((src) => (
                        <img
                          key={src}
                          src={src}
                          alt={t('projects.imageAlt', { name: project.name })}
                          loading="lazy"
                          decoding="async"
                          className="aspect-16/10 w-full rounded-2xl object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ol>

      {videoProject && (
        <VideoModal
          project={videoProject}
          onClose={() => setVideoProject(null)}
        />
      )}
    </Section>
  )
}
