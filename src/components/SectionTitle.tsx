import type { ReactNode } from 'react'

type SectionTitleProps = {
  children: ReactNode
  className?: string
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`mb-12 title-display text-[min(9vw,8rem)] ${className}`}>
      {children}
    </h2>
  )
}
