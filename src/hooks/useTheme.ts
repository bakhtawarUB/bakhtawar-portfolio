import { useLayoutEffect } from 'react'

export type Theme = 'light' | 'dark'

/** Applies `data-theme` to <html>. */
export function useTheme(theme: Theme) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
}