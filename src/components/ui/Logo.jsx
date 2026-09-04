import { useState } from 'react'
import { site } from '../../data/site'

/**
 * The circular brand mark, standing alone as the site's identity.
 *
 * The source artwork is a square with the medallion inscribed in it, so the
 * corners are masked away in CSS rather than cropped in an editor — the file
 * can be re-exported without re-cropping and the gold ring survives.
 *
 * `className` owns the rendered size, so callers can size it per breakpoint.
 * `size` only sets the width/height attributes, which reserve the square before
 * the image decodes and stop the header shifting as it loads — it must not
 * become an inline style, or it would beat the responsive classes.
 *
 * `fallback` covers the window before the real file is in /public: the mark
 * cannot render, and a header with no brand in it at all is worse than a
 * temporary wordmark. Once the file exists the fallback never renders again.
 *
 * `alt` stays empty because every use sits inside an already-labelled link —
 * announcing the logo too would just repeat the studio name.
 */
export default function Logo({ size = 48, className = '', alt = '', fallback = null }) {
  const [failed, setFailed] = useState(false)
  if (failed || !site.logo) return fallback

  return (
    <img
      src={site.logo}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  )
}
