import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Traps Tab inside `active` overlays, restores focus to whatever opened
 * them, and locks background scroll. Esc handling stays with the caller,
 * which usually has more to say about closing.
 */
export function useFocusTrap(active) {
  const containerRef = useRef(null)
  const returnFocusRef = useRef(null)

  useEffect(() => {
    if (!active) return undefined

    returnFocusRef.current = document.activeElement
    const container = containerRef.current

    const focusFirst = () => {
      if (!container) return
      const target = container.querySelector(FOCUSABLE) ?? container
      target.focus({ preventScroll: true })
    }
    // Wait a frame so the overlay has painted before focus moves into it.
    const frame = requestAnimationFrame(focusFirst)

    const onKeyDown = (event) => {
      if (event.key !== 'Tab' || !container) return
      const focusable = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)

    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown, true)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      const toRestore = returnFocusRef.current
      if (toRestore && typeof toRestore.focus === 'function') {
        toRestore.focus({ preventScroll: true })
      }
    }
  }, [active])

  return containerRef
}
