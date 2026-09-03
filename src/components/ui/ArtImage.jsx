import { useImageSrc } from '../../hooks/useImageSrc'

/**
 * Every artwork image on the site goes through here.
 *
 * - Holds a fixed aspect ratio so grids never reflow as images arrive.
 * - Falls back to a generated stand-in when the real file is not there yet,
 *   so the layout is honest about scale before the photography exists.
 * - Lazy by default; pass `priority` for a hero, which is above the fold.
 * - `alt` is required — there is no decorative artwork on this site.
 */
export default function ArtImage({
  src,
  alt,
  ratio = '4/5',
  className = '',
  imgClassName = '',
  seed,
  label,
  priority = false,
  zoomOnHover = false,
}) {
  const image = useImageSrc(src, { seed, label: label ?? alt, ratio })

  return (
    <div
      className={`relative overflow-hidden bg-bone ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={image.src}
        onError={image.onError}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${
          zoomOnHover
            ? 'transition-transform duration-[600ms] ease-gallery motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]'
            : ''
        } ${imgClassName}`}
      />
    </div>
  )
}
