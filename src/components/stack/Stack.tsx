import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { stackItems, stackFilters, softSkills } from '../../data/stack'
import type { StackCategory } from '../../data/types'
import { StackIcon } from '../ui/Icon'

type Filter = 'all' | StackCategory

export function Stack() {
  const [filter, setFilter] = useState<Filter>('all')
  const reduced = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced || !gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.t', {
        opacity: 0,
        scale: 0.55,
        y: 30,
        duration: 0.8,
        ease: 'back.out(1.6)',
        stagger: { amount: 0.9 },
        clearProps: 'all',
        scrollTrigger: { trigger: '#grid', start: 'top 85%' },
      })
    })
    return () => ctx.revert()
  }, [reduced])

  const visible = useMemo(
    () => stackItems.filter((s) => filter === 'all' || s.cat === filter),
    [filter],
  )

  return (
    <section className="stack" id="stack">
      <div className="wrap">
        <h2 className="section-h2">My stack</h2>
        <p className="sub">The tools I use every day.</p>
        <div className="chips" role="group" aria-label="Filter stack">
          {stackFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id as Filter)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid" id="grid" ref={gridRef}>
          {visible.map((item, i) => (
            <div
              key={item.key}
              className={`t${i === 0 && filter === 'all' ? ' hero-t' : ''}`}
              tabIndex={0}
              title={item.name}
            >
              <StackIcon k={item.key} name={item.name} size={i === 0 && filter === 'all' ? 64 : 28} />
              <em>{item.name}</em>
            </div>
          ))}
        </div>
        <p className="soft">
          Also:{' '}
          {softSkills.map((s, i) => (
            <span key={s}>
              {s}
              {i < softSkills.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}