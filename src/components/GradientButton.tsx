import type { ReactNode } from 'react'

type GradientButtonProps = {
  children: ReactNode
  className?: string
  // 'gradient': degradado de la marca. 'solid': color sólido del tema actual.
  variant?: 'gradient' | 'solid'
} & (
  | { href: string; onClick?: never }
  // Sin href es un <button> (p. ej. abrir el correo sin dejar el mailto escrito en el HTML).
  | { href?: never; onClick: () => void }
)

const base =
  'inline-block rounded-full px-10 py-4 text-sm font-black uppercase duration-500'

// OJO: cada variante transiciona SOLO lo que no anima GSAP. El hero anima la
// opacidad y la posición de este botón; una transición CSS sobre esas
// propiedades pelearía con GSAP.
const variants = {
  // El fondo mide el doble de ancho y al pasar el mouse se desplaza:
  // así "se mueve" el degradado.
  gradient:
    'bg-linear-to-r from-violet via-pink to-orange bg-size-[200%_100%] text-ink transition-[background-position] hover:bg-position-[100%_0]',
  solid: 'bg-content text-surface transition-opacity hover:opacity-80',
}

export function GradientButton({
  children,
  className = '',
  variant = 'gradient',
  href,
  onClick,
}: GradientButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href !== undefined) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
