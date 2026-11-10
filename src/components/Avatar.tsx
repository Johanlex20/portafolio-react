import logo from '@/assets/logo.webp'

type AvatarProps = {
  // Ruta de la imagen. Si no se pasa, se usa la manito (logo) animada.
  // Cuando haya foto definitiva: <Avatar src="..." alt="..." />
  src?: string
  alt?: string
}

export function Avatar({ src = logo, alt = '' }: AvatarProps) {
  return (
    <div className="relative w-full">
      <img
        src={src}
        alt={alt}
        width={640}
        height={640}
        className="h-auto w-full origin-bottom animate-hop motion-reduce:animate-none"
      />
      {/* Sombra en el piso: se encoge cuando la manito sube. */}
      <div
        aria-hidden="true"
        className="absolute bottom-[3%] left-1/2 h-[4%] w-[55%] -translate-x-1/2 animate-hop-shadow rounded-full bg-content blur-md motion-reduce:animate-none"
      />
    </div>
  )
}
