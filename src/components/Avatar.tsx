type AvatarProps = {
  // Ruta de la imagen final (PNG/WebP recortado, con fondo transparente).
  // Mientras no exista, se muestra un marcador de posición con tu inicial.
  src?: string
  alt?: string
}

export function Avatar({ src, alt = '' }: AvatarProps) {
  if (src) {
    return <img src={src} alt={alt} className="h-auto w-full" />
  }

  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-square w-full items-center justify-center rounded-[38%_62%_55%_45%/50%_42%_58%_50%] bg-linear-to-br from-violet via-pink to-orange shadow-2xl shadow-pink/30"
    >
      <span className="title-display text-[clamp(5rem,14vw,9rem)] text-ink">
        J
      </span>
    </div>
  )
}
