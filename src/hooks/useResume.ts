import { useState } from 'react'
import { resolveResume, type ActiveResume } from '../data/resumes'

/**
 * Reads the `?cv=<slug>` query once and returns the resume to serve.
 * Static site, so this never changes during a session.
 */
export function useResume(): ActiveResume {
  const [slug] = useState(() =>
    typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('cv'),
  )
  return resolveResume(slug)
}