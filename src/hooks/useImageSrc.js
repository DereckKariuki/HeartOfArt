import { useMemo, useState } from 'react'
import { placeholderImage } from '../lib/placeholder'

/**
 * Resolves an image path to something renderable: the real file when it
 * exists in /public, otherwise a generated stand-in. Returns the src and
 * the onError handler that performs the swap.
 *
 * The choice is derived during render — only the identity of the path that
 * failed is stored — so pointing this at a new image needs no effect to
 * clear the last one's failure.
 */
export function useImageSrc(src, { seed, label, ratio } = {}) {
  const fallback = useMemo(
    () => placeholderImage({ seed: seed ?? src ?? label, label, ratio }),
    [seed, src, label, ratio],
  )
  const [failedSrc, setFailedSrc] = useState(null)

  const usable = src && failedSrc !== src
  return {
    src: usable ? src : fallback,
    onError: () => setFailedSrc(src),
  }
}
