import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Smooth scrolling via Lenis (own rAF loop), so gsap never has to load for
 * the base page. Disabled entirely when the user prefers reduced motion.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time * 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const navOffset = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      return -(parseInt(raw, 10) || 72) - 8
    }

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: navOffset() })
      // keep the URL in sync (the native anchor jump is prevented above)
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled])
}