import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Fade-and-rise on first entry into the viewport. Reveals once and then
 * disconnects. With reduced motion the element is simply visible from the
 * start — no transition, no delay.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  // Without IntersectionObserver there is nothing to observe with, so the
  // content starts revealed rather than never arriving.
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') return undefined
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced, threshold, rootMargin])

  return { ref, revealed: reduced || seen }
}
