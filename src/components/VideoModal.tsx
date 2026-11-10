import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/Modal'
import type { Project } from '@/data/types'

type VideoModalProps = {
  project: Project
  onClose: () => void
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  const { t } = useTranslation()
  // Si el archivo del video no existe todavía (o falla al cargar), se muestra un aviso.
  const [failed, setFailed] = useState(false)
  const { video } = project
  if (!video) return null

  return (
    <Modal
      label={t('projects.videoTitle', { name: project.name })}
      closeLabel={t('projects.close')}
      onClose={onClose}
    >
      <div className="aspect-video w-full bg-black">
        {video.kind === 'youtube' ? (
          // El iframe solo existe mientras el modal está abierto: no se carga
          // YouTube (ni sus cookies) hasta que alguien pide ver el video.
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={t('projects.videoTitle', { name: project.name })}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            className="h-full w-full"
          />
        ) : failed ? (
          <p className="grid h-full place-items-center p-8 text-center text-base text-white/80">
            {t('projects.videoMissing')}
          </p>
        ) : (
          <video
            onError={() => setFailed(true)}
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full"
          />
        )}
      </div>
    </Modal>
  )
}
