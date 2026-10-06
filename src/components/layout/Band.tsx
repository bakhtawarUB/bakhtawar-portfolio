import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { marquee } from '../../data/profile'

/** Infinite marquee with a scroll-velocity skew. */
export function Band() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.max(-12, Math.min(12, self.getVelocity() / -220))
        gsap.to(el, { skewX: v, duration: 0.4, ease: 'power3.out', overwrite: true })
      },
    })
    return () => st.kill()
  }, [reduced])

  const items = (
    <span>
      {marquee.map((m) => `${m} / `).join('')}
    </span>
  )

  return (
    <div className="band" ref={ref} aria-hidden="true">
      <div className="track">
        {items}
        {items}
      </div>
    </div>
  )
}