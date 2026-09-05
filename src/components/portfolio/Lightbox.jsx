import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { artworkAlt } from '../../data/artworks'
import { useCurrency } from '../../context/currency-store'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useImageSrc } from '../../hooks/useImageSrc'
import StatusBadge from './StatusBadge'

/**
 * Full-piece view. Arrow keys move through the filtered set, Esc closes,
 * focus is trapped and returned to the card that opened it.
 */
export default function Lightbox({ pieces, index, onClose, onNavigate }) {
  const piece = pieces[index]
  const containerRef = useFocusTrap(Boolean(piece))
  const { price } = useCurrency()
  const image = useImageSrc(piece?.image, {
    seed: piece?.id,
    label: piece?.title,
    ratio: piece?.ratio,
  })

  useEffect(() => {
    if (!piece) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate(-1)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [piece, onClose, onNavigate])

  if (!piece) return null

  const multiple = pieces.length > 1

  return (
    <div className="fixed inset-0 z-50 animate-fadeIn" role="presentation">
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-ink" />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${piece.title}, ${piece.year}`}
        tabIndex={-1}
        className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain"
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
          <p className="label text-taupe">
            {index + 1} / {pieces.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 p-2 text-canvas transition-colors duration-500 hover:text-accent"
            aria-label="Close"
          >
            <X aria-hidden="true" className="h-6 w-6" strokeWidth={1.25} />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center gap-10 px-5 pb-16 md:flex-row md:items-center md:justify-center md:gap-14 md:px-8 lg:gap-20">
          {multiple ? (
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="order-2 hidden shrink-0 p-3 text-canvas/70 transition-colors duration-500 hover:text-accent md:order-none md:block"
              aria-label="Previous piece"
            >
              <ChevronLeft aria-hidden="true" className="h-7 w-7" strokeWidth={1} />
            </button>
          ) : null}

          <figure className="flex min-w-0 max-w-4xl flex-col items-center">
            <img
              key={piece.id}
              src={image.src}
              onError={image.onError}
              alt={artworkAlt(piece)}
              className="max-h-[58vh] w-auto max-w-full animate-fadeIn object-contain shadow-lift md:max-h-[72vh]"
            />
          </figure>

          {multiple ? (
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="order-3 hidden shrink-0 p-3 text-canvas/70 transition-colors duration-500 hover:text-accent md:order-none md:block"
              aria-label="Next piece"
            >
              <ChevronRight aria-hidden="true" className="h-7 w-7" strokeWidth={1} />
            </button>
          ) : null}

          <div className="w-full max-w-sm shrink-0 text-canvas md:order-last">
            <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight">
              {piece.title}
            </h2>
            <p className="label mt-3 text-taupe">
              {piece.year} · {piece.collection}
            </p>

            <dl className="mt-8 space-y-3 text-[1.0625rem] leading-relaxed">
              <div className="flex gap-4">
                <dt className="label w-24 shrink-0 pt-1 text-taupe">Medium</dt>
                <dd className="text-canvas/90">{piece.medium}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="label w-24 shrink-0 pt-1 text-taupe">Size</dt>
                <dd className="text-canvas/90">{piece.dimensions}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="label w-24 shrink-0 pt-1 text-taupe">Price</dt>
                <dd className="text-canvas/90">
                  {piece.status === 'sold'
                    ? 'Sold'
                    : piece.price
                      ? price(piece.price)
                      : 'Available as a print'}
                </dd>
              </div>
            </dl>

            <p className="mt-8 border-t border-canvas/15 pt-8 text-[1.0625rem] leading-[1.8] text-canvas/80">
              {piece.note}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StatusBadge status={piece.status} className="border-canvas/30 text-taupe" />
              <Link
                to={`/contact?piece=${encodeURIComponent(piece.title)}`}
                onClick={onClose}
                className="inline-flex items-center border border-canvas/40 px-6 py-3 font-sans text-[0.72rem] uppercase tracking-label text-canvas transition-colors duration-500 hover:border-canvas hover:bg-canvas hover:text-ink"
              >
                Enquire about this piece
              </Link>
            </div>
          </div>
        </div>

        {multiple ? (
          <div className="sticky bottom-0 flex items-center justify-center gap-10 border-t border-canvas/15 bg-ink/95 py-4 md:hidden">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="p-2 text-canvas"
              aria-label="Previous piece"
            >
              <ChevronLeft aria-hidden="true" className="h-6 w-6" strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="p-2 text-canvas"
              aria-label="Next piece"
            >
              <ChevronRight aria-hidden="true" className="h-6 w-6" strokeWidth={1} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
