import { contactLinks, profile } from '../../data/profile'
import { useResume } from '../../hooks/useResume'

export function Contact() {
  const resume = useResume()
  const links = contactLinks.map((l) => (l.download ? { ...l, href: resume.href } : l))

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2 className="section-h2">Let's talk</h2>
        <a className="go" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(l.download ? { download: true } : {})}
            >
              {l.label}
            </a>
          ))}
        </div>
        {resume.label ? <p className="resume-for">Resume tailored for {resume.label}</p> : null}
      </div>
    </section>
  )
}