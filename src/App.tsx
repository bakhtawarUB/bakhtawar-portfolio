import { lazy, Suspense, useCallback, useState } from 'react'
import { Header } from './components/layout/Header'
import { Hero } from './components/hero/Hero'
import { Preloader } from './components/ui/Preloader'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme, type Theme } from './hooks/useTheme'
import { Band } from './components/layout/Band'

// Below-fold sections are lazy so the hero paints and becomes interactive first.
const About = lazy(() => import('./components/about/About').then((m) => ({ default: m.About })))
const BuildFlow = lazy(() => import('./components/flow/BuildFlow').then((m) => ({ default: m.BuildFlow })))
const Journey = lazy(() => import('./components/journey/Journey').then((m) => ({ default: m.Journey })))
const Stack = lazy(() => import('./components/stack/Stack').then((m) => ({ default: m.Stack })))
const SdkDemo = lazy(() => import('./components/sdk/SdkDemo').then((m) => ({ default: m.SdkDemo })))
const Work = lazy(() => import('./components/work/Work').then((m) => ({ default: m.Work })))
const Projects = lazy(() => import('./components/projects/Projects').then((m) => ({ default: m.Projects })))
const Certificates = lazy(() => import('./components/certs/Certificates').then((m) => ({ default: m.Certificates })))
const Contact = lazy(() => import('./components/contact/Contact').then((m) => ({ default: m.Contact })))
const Footer = lazy(() => import('./components/layout/Footer').then((m) => ({ default: m.Footer })))
const Atmosphere = lazy(() => import('./components/ui/Atmosphere').then((m) => ({ default: m.Atmosphere })))
const ProgressBar = lazy(() => import('./components/layout/ProgressBar').then((m) => ({ default: m.ProgressBar })))

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
      <Suspense fallback={null}>
        <Atmosphere />
        <ProgressBar />
      </Suspense>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Band />
        <Suspense fallback={null}>
          <About />
          <BuildFlow />
          <Journey />
          <Stack />
          <SdkDemo />
          <Work />
          <Projects />
          <Certificates />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}