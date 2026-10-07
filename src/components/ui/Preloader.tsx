import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Full-screen intro that counts to 100 then slides away. Skipped on reduced motion. */
export function Preloader() {
  const reduced = useReducedMotion()
  const [gone, setGone] = useState(reduced)
  const [leaving, setLeaving] = useState(false)
  const numRef = useRef<HTMLElement>(null)

  // lock scroll only while the intro is visible
  useEffect(() => {
    if (gone) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [gone])

  useLayoutEffect(() => {
    if (reduced) return
    const num = numRef.current
    const start = performance.now()
    const dur = 1100
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      if (num) num.textContent = String(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
        return
      }
      setLeaving(true)
      window.setTimeout(() => setGone(true), 850)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  if (reduced || gone) return null

  return (
    <div className={leaving ? 'pre pre-leave' : 'pre'} aria-hidden="true">
      <span>Verifying profile</span>
      <b ref={numRef}>0</b>
    </div>
  )
}