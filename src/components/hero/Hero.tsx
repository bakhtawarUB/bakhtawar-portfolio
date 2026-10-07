import { useReducedMotion } from '../../hooks/useReducedMotion'
import { profile } from '../../data/profile'
import { VerifyDemo } from './VerifyDemo'

export function Hero() {
  const reduced = useReducedMotion()
  void reduced

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero-ghost" aria-hidden="true">
        {profile.first}
      </div>

      <div className="wrap hero-grid">
        <div className="hero-main">
          <h1 className="name" aria-label={profile.name}>
            <span>
              <i>{profile.first}</i>
            </span>
            <span>
              <i>{profile.last}</i>
            </span>
          </h1>

          <div className="hero-foot">
            <p className="big">{profile.tagline}</p>
            <div className="hero-meta">
              <p className="avail">{profile.availability}</p>
              <div className="cta">
                <a className="y" href={`mailto:${profile.email}`}>
                  Email me
                </a>
                <a href={profile.cv} download>
                  View resume
                </a>
              </div>
              <p className="hero-social">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <span>{profile.company}</span>
              </p>
              <p className="hero-note">{profile.heroNote}</p>
            </div>
          </div>
        </div>

        <VerifyDemo />
      </div>
    </section>
  )
}