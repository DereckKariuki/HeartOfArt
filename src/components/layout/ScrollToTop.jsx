import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** New route, top of the page — unless the browser is restoring a position. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
