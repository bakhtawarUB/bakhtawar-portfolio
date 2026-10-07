interface PointsProps {
  items: string[]
}

/**
 * Splits each sentence into a small-caps verb label + statement so long
 * bullet lists read as a ledger instead of a wall of text.
 */
export function Points({ items }: PointsProps) {
  return (
    <ul className="pts">
      {items.map((p) => {
        const sp = p.indexOf(' ')
        const verb = sp > 0 ? p.slice(0, sp) : p
        const rest = sp > 0 ? p.slice(sp + 1) : ''
        return (
          <li key={p}>
            <b>{verb}</b>
            <span>{rest}</span>
          </li>
        )
      })}
    </ul>
  )
}
