import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { flowSteps } from '../../data/flow'

const ICONS: Record<string, JSX.Element> = {
  capture: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7l1.5-3h5L16 7" />
    </svg>
  ),
  verify: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.5-2 5.5-2 6 0M14 10h4M14 14h3" />
    </svg>
  ),
  screen: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  ),
  decide: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </svg>
  ),
}

export function BuildFlow() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [hold, setHold] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // auto-advance
  useLayoutEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setHold((h) => {
        if (!h) setIndex((i) => (i + 1) % flowSteps.length)
        return h
      })
    }, 2600)
    return () => window.clearInterval(id)
  }, [reduced])

  // desktop scroll-pin steps through the flow
  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return
    const mq = window.matchMedia('(min-width: 761px) and (min-height: 680px)')
    if (!mq.matches) return
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1400',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setHold(true)
        setIndex(Math.min(flowSteps.length - 1, Math.floor(self.progress * flowSteps.length)))
      },
    })
    return () => st.kill()
  }, [reduced])

  const select = (i: number) => {
    setHold(true)
    setIndex(i)
  }

  return (
    <section className="build" ref={sectionRef} aria-label="How I build">
      <div className="wrap">
        <h2 className="section-h2">What I build</h2>
        <p className="bs">
          The flow behind the products I work on, from first tap to final decision. Click a step.
        </p>
        <div className="flow">
          <div className="rail" aria-hidden="true">
            <i style={{ width: `${(index / (flowSteps.length - 1)) * 100}%` }} />
          </div>
          {flowSteps.map((step, i) => (
            <button
              key={step.title}
              type="button"
              className={`stp${i === index ? ' on' : ''}${i < index ? ' done' : ''}`}
              onClick={() => select(i)}
              aria-current={i === index ? 'step' : undefined}
            >
              <span className="dot">{ICONS[step.icon]}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}