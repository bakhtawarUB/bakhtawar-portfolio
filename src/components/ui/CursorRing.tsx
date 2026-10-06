import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePointerFine } from '../../hooks/usePointerFine'

/** Difference-blend cursor ring with a magnetic pull on CTA buttons. */
export function CursorRing() {
  const reduced = useReducedMotion()
  const fine = usePointerFine()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !fine || !ref.current) return
    const el = ref.current
    let shown = false

    const qx = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const qy = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = (e: PointerEvent) => {
      qx(e.clientX)
      qy(e.clientY)
      if (!shown) {
        shown = true
        el.style.opacity = '1'
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const targets = document.querySelectorAll('a,button,summary,.row,.t')
    const grow = () => gsap.to(el, { scale: 1.8, duration: 0.3 })
    const shrink = () => gsap.to(el, { scale: 1, duration: 0.3 })
    targets.forEach((t) => {
      t.addEventListener('pointerenter', grow)
      t.addEventListener('pointerleave', shrink)
    })

    const magnetics = document.querySelectorAll<HTMLElement>('.cta a')
    const cleanups: Array<() => void> = []
    magnetics.forEach((m) => {
      const x = gsap.quickTo(m, 'x', { duration: 0.5, ease: 'power3' })
      const y = gsap.quickTo(m, 'y', { duration: 0.5, ease: 'power3' })
      const move = (e: PointerEvent) => {
        const b = m.getBoundingClientRect()
        x((e.clientX - b.left - b.width / 2) * 0.3)
        y((e.clientY - b.top - b.height / 2) * 0.4)
      }
      const leave = () => {
        x(0)
        y(0)
      }
      m.addEventListener('pointermove', move)
      m.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        m.removeEventListener('pointermove', move)
        m.removeEventListener('pointerleave', leave)
      })
    })

    return () => {
      window.removeEventListener('pointermove', onMove)
      targets.forEach((t) => {
        t.removeEventListener('pointerenter', grow)
        t.removeEventListener('pointerleave', shrink)
      })
      cleanups.forEach((fn) => fn())
    }
  }, [reduced, fine])

  if (reduced || !fine) return null
  return <div className="ring-c" ref={ref} aria-hidden="true" />
}