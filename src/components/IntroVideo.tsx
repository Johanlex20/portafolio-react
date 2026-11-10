import { useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/Modal'
import { introVideo } from '@/data/intro'

type IntroVideoProps = {
  className?: string
  // Posición y tamaño del disco (lo calcula el Hero para que caiga justo sobre la "O" del título).
  style?: CSSProperties
}

// Disco ▶ + ventana modal con el video de presentación (~10 s).
export function IntroVideo({ className = '', style }: IntroVideoProps) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  // Si el archivo del video no existe todavía (o falla), se muestra un aviso.
  const [failed, setFailed] = useState(false)
  const lang = i18n.resolvedLanguage === 'en' ? 'en' : 'es'

  return (
    <>
      <div style={style} className={className}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="group relative block size-full rounded-full transition-transform duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pink"
        >
          {/* Anillo que se expande: llama la atención sin ser agresivo. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ring rounded-full bg-pink motion-reduce:hidden"
          />
          <span className="relative grid size-full animate-beat place-items-center rounded-full bg-linear-to-br from-violet via-pink to-orange text-ink shadow-xl shadow-pink/40 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-pink/80 group-focus-visible:shadow-2xl group-focus-visible:shadow-pink/80 motion-reduce:animate-none">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-[44%] translate-x-[7%] fill-current transition-[color,scale,filter] duration-200 group-hover:scale-125 group-hover:text-white group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] group-focus-visible:scale-125 group-focus-visible:text-white group-focus-visible:drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
            >
              <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
          </span>
          {/* Sin rótulo visible: el disco ▶ se entiende solo. Para lectores de pantalla sí hay texto. */}
          <span className="sr-only">
            {' '}
            {t('hero.play')} {t('hero.playSr')}
          </span>
        </button>
      </div>

      {open && (
        <Modal
          label={t('hero.videoTitle')}
          closeLabel={t('hero.close')}
          onClose={() => setOpen(false)}
        >
          <div className="aspect-video w-full bg-black">
            {failed ? (
              <p className="grid h-full place-items-center p-8 text-center text-base text-white/80">
                {t('hero.videoMissing')}
              </p>
            ) : (
              <video
                key={lang}
                src={introVideo.src[lang]}
                poster={introVideo.poster}
                title={t('hero.videoTitle')}
                controls
                autoPlay
                playsInline
                onError={() => setFailed(true)}
                className="h-full w-full"
              />
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
