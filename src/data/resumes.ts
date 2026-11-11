import { profile } from './profile'

/**
 * Tailored resumes
 * ----------------
 * Drop a PDF in `public/cv/` named after the job slug, e.g.
 * `public/cv/shufti-frontend.pdf`, then share your portfolio with
 * `?cv=shufti-frontend` appended:
 *
 *   https://bakhtawar-portfolio-theta.vercel.app/?cv=shufti-frontend
 *
 * The "View resume" / "Download CV" links on the site then serve that file,
 * and a small note tells the visitor which role it was tailored for.
 * Without `?cv=`, the default CV is served.
 */
export const resumeLabels: Record<string, string> = {
  // Add pretty labels for the slugs you share. Unlisted slugs are title-cased.
  // 'shufti-frontend': 'Shufti Pro — Frontend Engineer',
}

export interface ActiveResume {
  /** href used by the view/download controls */
  href: string
  /** role label when a tailored resume is active, otherwise null */
  label: string | null
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const titleCase = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

/** Resolve `?cv=<slug>` into a tailored resume (falls back to the default CV). */
export function resolveResume(slug: string | null | undefined): ActiveResume {
  if (!slug || slug === 'default' || !SLUG.test(slug)) {
    return { href: profile.cv, label: null }
  }
  return {
    href: `/cv/${slug}.pdf`,
    label: resumeLabels[slug] ?? titleCase(slug),
  }
}