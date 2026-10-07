import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Phase = 'idle' | 'scan' | 'check' | 'done'

const CHECKS = ['Document is authentic', 'Face matches the photo', 'Liveness confirmed']

export function VerifyDemo() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [scanPct, setScanPct] = useState(0)
  const [checkIdx, setCheckIdx] = useState(0)
  const timers = useRef<number[]>([])
  const raf = useRef(0)

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    window.cancelAnimationFrame(raf.current)
  }

  useEffect(() => clearTimers, [])

  // auto-run once on mount so the hero is alive without a click
  useEffect(() => {
    const id = window.setTimeout(run, reduced ? 500 : 2400)
    return () => {
      window.clearTimeout(id)
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function run() {
    clearTimers()
    setPhase('scan')
    setScanPct(0)
    setCheckIdx(0)

    const ms = (v: number) => (reduced ? 0 : v)

    const t0 = performance.now()
    const dur = ms(1150)
    const frame = (t: number) => {
      const p = dur === 0 ? 1 : Math.min((t - t0) / dur, 1)
      setScanPct(Math.round(p * 100))
      if (p < 1) raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)

    timers.current.push(window.setTimeout(() => setPhase('check'), ms(1250)))
    timers.current.push(window.setTimeout(() => setCheckIdx(1), ms(1800)))
    timers.current.push(window.setTimeout(() => setCheckIdx(2), ms(2350)))
    timers.current.push(window.setTimeout(() => setPhase('done'), ms(2950)))
  }

  const busy = phase === 'scan' || phase === 'check'

  return (
    <div className="verify" role="group" aria-label="Live identity verification demo">
      <p className="vc-tick">
        <span className="vc-dot" aria-hidden="true" />
        Live demo
      </p>

      <div className="vc-stage" aria-hidden="true">
        <span className="vc-c c-tl" />
        <span className="vc-c c-tr" />
        <span className="vc-c c-bl" />
        <span className="vc-c c-br" />
        <div className={phase === 'done' ? 'vc-doc vc-doc-ok' : 'vc-doc'}>
          <span className="vc-photo">
            <span className="vc-photo-in" />
          </span>
          <span className="vc-line w70" />
          <span className="vc-line w50" />
          <span className="vc-line w80" />
          <span className="vc-line w60" />
          <span className="vc-line w40" />
        </div>
        {phase === 'scan' ? <span className="vc-scanline" /> : null}
        {phase === 'done' ? (
          <span className="vc-stamp">
            <b>VERIFIED</b>
          </span>
        ) : null}
      </div>

      <div className="vc-body">
        <div className="vc-state" aria-live="polite">
          {phase === 'idle' ? (
            <p className="vc-hint">
              This is the flow my SDK drops into a client page. Watch it, or run it yourself.
            </p>
          ) : null}
          {phase === 'scan' ? (
            <p className="vc-scan-txt">
              Scanning document… <b>{scanPct}%</b>
              <span className="vc-bar">
                <span style={{ width: `${scanPct}%` }} />
              </span>
            </p>
          ) : null}
          {phase === 'check' ? (
            <ul className="vc-checks">
              {CHECKS.map((label, i) => (
                <li key={label} className={i < checkIdx ? 'on' : i === checkIdx ? 'run' : ''}>
                  {label}
                </li>
              ))}
            </ul>
          ) : null}
          {phase === 'done' ? (
            <p className="vc-done">
              <strong>Identity verified</strong>
              <span className="vc-meta">Match 99.8% · 1.2s</span>
            </p>
          ) : null}
        </div>

        <button type="button" className="vc-btn" onClick={run} disabled={busy}>
          {phase === 'idle' ? 'Run verification' : phase === 'done' ? 'Run again' : 'Checking…'}
        </button>
      </div>
    </div>
  )
}