import { certificates } from '../../data/profile'

export function Certificates() {
  return (
    <section className="certs" aria-label="Certificates and awards">
      <div className="wrap">
        <h2 className="section-h2">Certificates and awards</h2>
        <ul className="list">
          {certificates.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}