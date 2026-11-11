import type { ReactNode } from 'react'

/**
 * External link to an organisation's site. Renders plain text when no href is
 * given, so content can stay optional. Styled to inherit the surrounding type.
 */
export function OrgLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <>{children}</>
  return (
    <a className="org-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}