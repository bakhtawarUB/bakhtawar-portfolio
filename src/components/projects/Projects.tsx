import { useState } from 'react'
import { featured, others } from '../../data/projects'
import type { FeaturedProject } from '../../data/types'

export function Projects() {
  return (
    <section className="proj" id="projects">
      <div className="wrap">
        <h2 className="section-h2" style={{ marginBottom: 36 }}>
          Projects
        </h2>
        <p className="proj-sub">
          Work is easier to judge with the story around it. Open any project to read the problem, my
          part in it, and what it produced.
        </p>

        <ul className="prs">
          {featured.map((p, i) => (
            <FeaturedRow key={p.title} project={p} defaultOpen={i === 0} />
          ))}
        </ul>

        <h3 className="other-h">Other projects</h3>
        <ul className="other">
          {others.map((p) => (
            <li key={p.title}>
              <h3 className="ot">{p.title}</h3>
              <p className="ob">{p.blurb}</p>
              <p className="tch">{p.tech.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FeaturedRow({
  project,
  defaultOpen,
}: {
  project: FeaturedProject
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(!!defaultOpen)

  return (
    <li className={open ? 'pr open' : 'pr'}>
      <button
        type="button"
        className="pr-head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="pr-title">
          {project.title}
          <span className="pr-ctx">{project.context}</span>
        </span>
        <span className="pr-mark" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path
              d="M8 2v12M2 8h12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div className="pr-wrap">
        <div className="pr-inner">
          <div className="pr-grid">
            <div className="pr-k">
              <b>Problem</b>
              <p>{project.problem}</p>
            </div>
            <div className="pr-k">
              <b>My role</b>
              <p>{project.role}</p>
            </div>
            <div className="pr-k wide">
              <b>Result</b>
              <ul className="pr-res">
                {project.result.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}