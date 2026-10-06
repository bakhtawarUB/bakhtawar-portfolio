import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** element to render — defaults to a div */
  as?: ElementType
  y?: number
  delay?: number
  start?: string
}

/**
 * Fade + rise a block into view on scroll. Fully skipped under reduced motion
 * (the content is simply visible), and reverted on unmount.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  y = 40,
  delay = 0,
  start = 'top 90%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        scrollTrigger: { trigger: el, start },
      })
    })
    return () => ctx.revert()
  }, [reduced, y, delay, start])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}