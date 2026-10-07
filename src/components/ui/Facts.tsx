import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface Fact {
  tag: string
  text: string
}

interface FactsProps {
  items: readonly Fact[]
  className?: string
}

/**
 * A definition list that breaks one long paragraph into scannable
 * tag + statement rows (used by the About section).
 */
export function Facts({ items, className = '' }: FactsProps) {
  const ref = useRef<HTMLDListElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.from('.fact', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    }, el)
    return () => ctx.revert()
  }, [reduced, items])

  return (
    <dl ref={ref} className={`facts ${className}`.trim()}>
      {items.map((f) => (
        <div className="fact" key={f.tag}>
          <dt>{f.tag}</dt>
          <dd>{f.text}</dd>
        </div>
      ))}
    </dl>
  )
}
