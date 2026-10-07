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
        <div className="case-list">
          {caseStudies.map((c, i) => (
            <Reveal className="case" key={c.title} start="top 88%">
              <span className="case-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="case-ctx">{c.context}</span>
              <h3>{c.title}</h3>
              <div className="case-steps">
                <div className="step" data-k="problem">
                  <span className="step-k">Problem</span>
                  <p>{c.problem}</p>
                </div>
                <div className="step" data-k="approach">
                  <span className="step-k">Approach</span>
                  <p>{c.approach}</p>
                </div>
              </div>
              <footer className="case-foot">
                <ul className="impact">
                  {c.impact.map((m) => (
                    <li key={m}>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path
                          d="M2.6 8.6 6.1 12 13.4 4.2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {m}
                    </li>
                  ))}
                </ul>
                <div className="ico">
                  {c.tech.map((k) => (
                    <span key={k} title={k}>
                      <StackIcon k={k} name={k} />
                    </span>
                  ))}
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}