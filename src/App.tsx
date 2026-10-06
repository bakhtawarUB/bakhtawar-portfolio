import { useCallback, useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Band } from './components/layout/Band'
import { ProgressBar } from './components/layout/ProgressBar'
import { Hero } from './components/hero/Hero'
import { About } from './components/about/About'
import { BuildFlow } from './components/flow/BuildFlow'
import { Journey } from './components/journey/Journey'
import { Stack } from './components/stack/Stack'
import { Work } from './components/work/Work'
import { Projects, CaseStudies } from './components/projects/Projects'
import { Certificates } from './components/certs/Certificates'
import { Contact } from './components/contact/Contact'
import { Preloader } from './components/ui/Preloader'
import { CursorRing } from './components/ui/CursorRing'
import { Atmosphere } from './components/ui/Atmosphere'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme, type Theme } from './hooks/useTheme'

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const reduced = useReducedMotion()
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useTheme(theme)
  useSmoothScroll(!reduced)

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem('theme', next)
      } catch {
        /* ignore private-mode failures */
      }
      return next
    })
  }, [])

  return (
    <>
      <Preloader />
      <Atmosphere />
      <ProgressBar />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <CursorRing />
      <main>
        <Hero />
        <Band />
        <About />
        <BuildFlow />
        <Journey />
        <Stack />
        <Work />
        <Projects />
        <CaseStudies />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}