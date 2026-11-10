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

      // EFECTO DE TARJETAS APILADAS. La tarjeta de abajo empieza totalmente CLARA y, desde que la
      // siguiente EMPIEZA A TAPARLA, se oscurece (y se encoge un poco) EN PROPORCIÓN a cuánto la tapa.
      // Solo en pantallas anchas, que es donde las tarjetas se pegan arriba (md:sticky).
      //
      // Se calcula en CADA CUADRO con la posición real de las tarjetas en pantalla, en vez de con
      // posiciones de scroll calculadas una sola vez (ScrollTrigger). Así nunca se desfasa si cambia el
      // tamaño de la ventana, el idioma o una imagen termina de cargar, y funciona igual en cualquier
      // navegador.
      const REST = 0.3 // brillo con el que queda cuando está cubierta del todo
      const SHRINK = 0.07 // cuánto se encoge (7 %) cuando está cubierta del todo

      mm.add(
        {
          wide: '(min-width: 768px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { wide, reduce } = context.conditions as {
            wide: boolean
            reduce: boolean
          }
          if (!wide) return

          const cards = gsap.utils.toArray<HTMLElement>('.project-card')
          const inners = cards.map((card) =>
            card.querySelector<HTMLElement>('.project-inner'),
          )

          const update = () => {
            const section = container.current
            if (!section) return
            const box = section.getBoundingClientRect()
            if (box.bottom < 0 || box.top > window.innerHeight) return // fuera de pantalla: nada que hacer

            // Cada tarjeta se pega a (6rem + posición × 1.5rem) del borde de arriba (md:top-[calc(6rem+var(--i)*1.5rem)]).
            const rem =
              parseFloat(getComputedStyle(document.documentElement).fontSize) ||
              16
            const stuck = (i: number) => (6 + 1.5 * i) * rem
            const rects = cards.map((card) => card.getBoundingClientRect())

            cards.forEach((_, i) => {
              const inner = inners[i]
              const next = rects[i + 1]
              if (!inner || !next) return
              // La siguiente empieza a tapar a esta cuando su borde de arriba llega al borde de abajo de esta
              // YA PEGADA (stuck + alto) y termina cuando queda pegada en su sitio (stuck de la siguiente).
              // Se mide contra esas posiciones FIJAS (no contra el borde actual de esta tarjeta): al final de la
              // sección la pila se suelta y sube junta, y así la tarjeta cubierta no se vuelve a aclarar.
              const from = stuck(i) + rects[i].height
              const to = stuck(i + 1)
              const progress = Math.min(
                1,
                Math.max(0, (from - next.top) / (from - to)),
              )

              inner.style.filter =
                progress > 0 ? `brightness(${1 - (1 - REST) * progress})` : ''
              // Con "reducir movimiento" no se encoge (eso sí es movimiento) pero SÍ se oscurece.
              inner.style.transform =
                progress > 0 && !reduce ? `scale(${1 - SHRINK * progress})` : ''
            })
          }

          gsap.ticker.add(update)
          return () => {
            gsap.ticker.remove(update)
            inners.forEach((inner) => {
              if (inner) {
                inner.style.filter = ''
                inner.style.transform = ''
              }
            })
          }
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
          // Enlace principal de la tarjeta: la demo en vivo y, si no existe (extensiones), la descarga.
          const primary = project.links.demo
            ? { href: project.links.demo, label: t('projects.live') }
            : project.links.download
              ? { href: project.links.download, label: t('projects.download') }
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
