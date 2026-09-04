import { useState } from 'react'
import { site } from '../../data/site'

/**
 * The circular brand mark.
 *
 * The source artwork is a square with the medallion inscribed in it, so the
 * corners are masked away rather than cropped in an editor — swap the file and
 * the shape holds. Until that file exists the mark renders nothing at all and
 * the wordmark stands alone, so the header never shows a broken image.
 *
 * `alt` defaults to empty: every place this is used sits beside the wordmark or
 * inside an already-labelled link, so announcing the logo again would just
 * repeat the brand name to a screen reader.
 */
export default function Logo({ size = 40, className = '', alt = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed || !site.logo) return null

  return (
    <img
      src={site.logo}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  )
}
