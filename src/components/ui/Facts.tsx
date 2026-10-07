export interface Fact {
  tag: string
  text: string
}

interface FactsProps {
  items: readonly Fact[]
  className?: string
}

/** A definition list that breaks one long paragraph into scannable tag + statement rows. */
export function Facts({ items, className = '' }: FactsProps) {
  return (
    <dl className={`facts ${className}`.trim()}>
      {items.map((f) => (
        <div className="fact" key={f.tag}>
          <dt>{f.tag}</dt>
          <dd>{f.text}</dd>
        </div>
      ))}
    </dl>
  )
}
