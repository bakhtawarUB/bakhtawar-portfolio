import { projects, caseStudies } from '../../data/projects'
import { StackIcon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

export function Projects() {
  return (
    <section className="proj" id="projects">
      <div className="wrap">
        <h2 className="section-h2" style={{ marginBottom: 44 }}>
          Projects
        </h2>
        <Reveal>
          {projects.map((p) => (
            <div className="row" key={p.title} tabIndex={0}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div className="ico">
                {p.tech.map((k) => (
                  <span key={k} title={k}>
                    <StackIcon k={k} name={k} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export function CaseStudies() {
  return (
    <section className="cases" aria-label="Case studies">
      <div className="wrap">
        <span className="eyebrow">Selected work</span>
        <h2 className="section-h2">How the work holds up</h2>
        <div style={{ marginTop: 40 }}>
          {caseStudies.map((c, i) => (
            <Reveal className="case" key={c.title} start="top 88%">
              <div>
                <span className="case-idx">
                  {String(i + 1).padStart(2, '0')} — {c.context}
                </span>
                <h3>{c.title}</h3>
                <div className="impact">
                  {c.impact.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
              <div className="pai">
                <div>
                  <strong>Problem</strong>
                  <p>{c.problem}</p>
                </div>
                <div>
                  <strong>Approach</strong>
                  <p>{c.approach}</p>
                </div>
                <div className="ico" style={{ gridColumn: 'auto', gridRow: 'auto' }}>
                  {c.tech.map((k) => (
                    <span key={k} title={k}>
                      <StackIcon k={k} name={k} />
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}