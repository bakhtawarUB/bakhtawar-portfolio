import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Smooth scrolling via Lenis, wired into the GSAP ticker and ScrollTrigger.
 * Disabled entirely when the user prefers reduced motion.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

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
      gsap.ticker.remove(raf)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [enabled])
}