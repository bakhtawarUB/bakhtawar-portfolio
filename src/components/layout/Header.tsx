import { useEffect, useState } from 'react'
import { navLinks, profile } from '../../data/profile'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // once the page scrolls, switch from the transparent hero-blend nav to a solid bar
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // lock scroll + escape-to-close while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site${open ? ' nav-open' : ''}${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap">
        <nav aria-label="Main">
          <a className="brand" href="#top" onClick={close}>
            {profile.brand}
          </a>
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              type="button"
              className="theme-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round">
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5Z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </div>

      <div id="mobile-menu" className={`menu${open ? ' open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="menu-links">
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}>
                <a href={l.href} onClick={close} tabIndex={open ? 0 : -1}>
                  <i aria-hidden="true">{String(i + 1).padStart(2, '0')}</i>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-foot">
            <a
              className="menu-cta"
              href={`mailto:${profile.email}`}
              onClick={close}
              tabIndex={open ? 0 : -1}
            >
              {profile.email}
            </a>
            <a href={profile.cv} download onClick={close} tabIndex={open ? 0 : -1}>
              Download CV
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
