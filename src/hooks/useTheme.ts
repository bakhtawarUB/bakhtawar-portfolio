import { useLayoutEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

export type Theme = 'light' | 'dark'

/** Applies `data-theme` to <html> and fades the app in once motion is ready. */
export function useTheme(theme: Theme) {
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    if (!reduced) root.classList.add('motion-ready')
    return () => root.classList.remove('motion-ready')
  }, [theme, reduced])
}