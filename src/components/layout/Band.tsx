import { marquee } from '../../data/profile'

/** Infinite marquee. */
export function Band() {
  const items = (
    <span>
      {marquee.map((m) => `${m} / `).join('')}
    </span>
  )

  return (
    <div className="band" aria-hidden="true">
      <div className="track">
        {items}
        {items}
      </div>
    </div>
  )
}