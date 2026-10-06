import { useInView } from '../../hooks/useInView'
import { journey, journeyAxis } from '../../data/projects'

export function Journey() {
  const { setRef, inView } = useInView<HTMLDivElement>({ threshold: 0.35, once: true })

  return (
    <section className="jr" aria-label="Career journey">
      <div className="wrap">
        <h2 className="section-h2">Journey</h2>
        <div className="axis" aria-hidden="true">
          {journeyAxis.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
        <div className={`lanes${inView ? ' in' : ''}`} ref={setRef}>
          {journey.map((lane) => (
            <div className="lane" key={lane.label}>
              <span className="lt" style={{ left: `calc(${lane.start * 100}%)` }}>
                {lane.label}
              </span>
              <i
                className={`bar ${lane.variant}`}
                style={
                  {
                    '--l': `${lane.start * 100}%`,
                    '--w': `${lane.width * 100}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}