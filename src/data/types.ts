export type StackCategory = 'f' | 'b' | 'd' | 't'

/** A named organisation (or project context) with an optional external link. */
export interface OrgLink {
  label: string
  href?: string
  /** separator rendered before this entry (defaults to " & ") */
  sep?: string
}

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
  /** organisation site */
  url?: string
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
  url?: string
  body: string
}

export interface FeaturedProject {
  title: string
  context: string
  /** linked version of `context`; rendered instead of the plain string */
  contextLinks?: OrgLink[]
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
  /** organisation site for the lane label */
  url?: string
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