import type { ReactNode, Ref } from 'react'
import { useTheme } from '@/hooks/useTheme'

type SectionProps = {
  id: string
  className?: string
  children: ReactNode
  // Si es true, la sección usa el tema CONTRARIO al del sitio
  // (oscuro -> clara, claro -> oscura), con esquinas superiores redondeadas.
  inverted?: boolean
  // En React 19 `ref` se recibe como una prop normal (ya no hace falta forwardRef).
  ref?: Ref<HTMLElement>
}

export function Section({
  id,
  className = '',
  children,
  inverted = false,
  ref,
}: SectionProps) {
  const { theme } = useTheme()

  // data-theme redefine las variables --surface y --content solo dentro de esta
  // sección; bg-surface y text-content las vuelven a leer aquí.
  const invertedProps = inverted
    ? {
        'data-theme': theme === 'dark' ? 'light' : 'dark',
      }
    : undefined
  const invertedClasses = inverted
    ? 'relative z-10 -mt-10 rounded-t-[2.5rem] bg-surface text-content'
    : ''

  return (
    <section
      id={id}
      ref={ref}
      {...invertedProps}
      className={`min-h-screen scroll-mt-20 px-6 py-32 md:px-10 ${invertedClasses} ${className}`}
    >
      {children}
    </section>
  )
}
