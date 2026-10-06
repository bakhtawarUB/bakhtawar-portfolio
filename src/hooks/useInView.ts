import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Observe an element and report when it enters the viewport.
 * Returns a **callback ref** (`setRef`) so it composes with other refs.
 * `once: true` unobserves after the first hit (used for count-ins / lazy mounts).
 */
export function useInView<T extends HTMLElement>(
  options: { threshold?: number; once?: boolean; rootMargin?: string } = {},
) {
  const { threshold = 0.35, once = true, rootMargin = '0px' } = options
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)
  const ioRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback((el: T | null) => setNode(el), [])

  useEffect(() => {
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) io.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, rootMargin },
    )
    io.observe(node)
    ioRef.current = io
    return () => io.disconnect()
  }, [node, threshold, once, rootMargin])

  return { setRef, inView }
}