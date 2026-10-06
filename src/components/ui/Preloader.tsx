import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Full-screen intro that counts to 100 then slides away. Skipped on reduced motion. */
export function Preloader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(reduced)
  const ref = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLElement>(null)

  // lock scroll only while the intro is visible
  useEffect(() => {
    if (done) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [done])

  useLayoutEffect(() => {
    if (reduced || !ref.current || done) return
    const el = ref.current
    const num = numRef.current
    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            setDone(true)
          },
        })
        .to(counter, {
          v: 100,
          duration: 1.1,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (num) num.textContent = String(Math.round(counter.v))
          },
        })
        .to(el, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' })
    })
    return () => ctx.revert()
    // `done` intentionally excluded: we only want to run the timeline once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  if (reduced || done) return null

  return (
    <div className="pre" ref={ref} aria-hidden="true">
      <span>Verifying profile</span>
      <b ref={numRef}>0</b>
    </div>
  )
}