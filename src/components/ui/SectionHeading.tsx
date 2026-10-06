import { type ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, children, className }: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-h2">{children}</h2>
    </Reveal>
  )
}