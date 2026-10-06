import { experience, smallRoles } from '../../data/experience'
import { StackIcon } from '../ui/Icon'

export function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="head">
          <h2 className="section-h2">Experience</h2>
          <p>Frontend and Full Stack Developer at Programmers Force, 2024 to 2026.</p>
        </div>

        {experience.map((job) => (
          <details className="xp" key={job.company} open={job.open}>
            <summary>
              <h3>{job.company}</h3>
              <span className="meta">
                {job.meta.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 ? <br /> : null}
                  </span>
                ))}
              </span>
              <span className="pl" aria-hidden="true" />
            </summary>
            <div className="body">
              <ul>
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="ico">
                {job.tech.map((k) => (
                  <span key={k} title={k}>
                    <StackIcon k={k} name={k} />
                  </span>
                ))}
                {job.chip ? <span className="tx">{job.chip}</span> : null}
              </div>
            </div>
          </details>
        ))}

        <div className="small">
          {smallRoles.map((r) => (
            <div key={r.title}>
              <h4>{r.title}</h4>
              <small>{r.org}</small>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}