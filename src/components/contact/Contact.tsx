import { contactLinks, profile } from '../../data/profile'

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2 className="section-h2">Let's talk</h2>
        <a className="go" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="links">
          {contactLinks.map((l) => (
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
      </div>
    </section>
  )
}