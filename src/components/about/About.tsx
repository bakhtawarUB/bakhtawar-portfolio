import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInView'
import { profile, stats } from '../../data/profile'
import type { Stat } from '../../data/types'

function StatItem({ stat }: { stat: Stat }) {
  const reduced = useReducedMotion()
  const { setRef, inView } = useInView<HTMLDivElement>({ threshold: 0.4, once: true })
  const num = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = num.current
    if (!el || !inView) return
    const d = stat.d ?? 0
    const sfx = stat.s ?? ''
    const fmt = (v: number) => v.toFixed(d) + sfx
    if (reduced) {
      el.textContent = fmt(stat.n)
      return
    }
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1300, 1)
      el.textContent = fmt(stat.n * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, stat])

  return (
    <div ref={setRef}>
      <b ref={num}>0</b>
      <span>{stat.label}</span>
    </div>
  )
}

export function Portrait() {
  return (
    <figure className="portrait">
      <div className="ph" role="img" aria-label={`Portrait of ${profile.name}`}>
        B
      </div>
      <i className="cn tl" aria-hidden="true" />
      <i className="cn tr" aria-hidden="true" />
      <i className="cn bl" aria-hidden="true" />
      <i className="cn br" aria-hidden="true" />
      <figcaption>
        <b>{profile.name}</b>
        <span>Verified</span>
      </figcaption>
    </figure>
  )
}

export function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div>
          <p className="lede">{profile.about.lede}</p>
          <p className="s">{profile.about.body}</p>
          <div className="stats">
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>
        </div>
        <Portrait />
      </div>
    </section>
  )
}