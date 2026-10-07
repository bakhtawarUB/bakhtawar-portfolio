export type StackCategory = 'f' | 'b' | 'd' | 't'

export interface StackItem {
  /** devicon key, or a custom id handled by the icon registry */
  key: string
  name: string
  cat: StackCategory
  /** false → use an inline SVG component instead of a CDN image */
  remote?: boolean
}

export interface Stat {
  n: number
  /** decimals to render, e.g. 2 for 3.53 */
  d?: number
  /** suffix, e.g. "+" */
  s?: string
  label: string
}

export interface FlowStep {
  title: string
  body: string
  /** icon id handled by the flow icon map */
  icon: 'capture' | 'verify' | 'screen' | 'decide'
}

export interface ExperienceItem {
  company: string
  meta: string
  points: string[]
  /** stack keys */
  tech: string[]
  /** optional free-text chip (e.g. "Claude Code Action") */
  chip?: string
  open?: boolean
}

export interface SmallRole {
  title: string
  org: string
  body: string
}

export interface FeaturedProject {
  title: string
  context: string
  problem: string
  role: string
  result: string[]
  tech: string[]
}

export interface OtherProject {
  title: string
  blurb: string
  tech: string[]
}

export interface JourneyLane {
  label: string
  /** fractional start position 0..1 */
  start: number
  /** fractional width 0..1 */
  width: number
  variant: 'b1' | 'b2' | 'b3'
}

export interface ContactLink {
  label: string
  href: string
  external?: boolean
  download?: boolean
}