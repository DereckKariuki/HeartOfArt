import { artworkAlt } from '../../data/artworks'
import { useCurrency } from '../../context/currency-store'
import ArtImage from '../ui/ArtImage'
import Reveal from '../ui/Reveal'
import StatusBadge from './StatusBadge'

/**
 * One piece in the portfolio grid. Every card crops to the same 4:5 so
 * the grid reads as a hang, not a pile; the lightbox restores the piece's
 * true proportions.
 */
export default function ArtworkCard({ piece, index = 0, onOpen, offset = false }) {
  const { price } = useCurrency()

  return (
    <Reveal delay={Math.min(index, 5) * 90} className={offset ? 'lg:mt-16' : ''}>
      <button
        type="button"
        onClick={() => onOpen(piece)}
        className="group block w-full text-left"
        aria-label={`View ${piece.title} in detail`}
      >
        <ArtImage
          src={piece.image}
          alt={artworkAlt(piece)}
          ratio="4/5"
          seed={piece.id}
          label={piece.title}
          zoomOnHover
          className="shadow-piece transition-shadow duration-[600ms] ease-gallery group-hover:shadow-lift"
        />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-[1.35rem] font-light leading-tight text-ink">
              {piece.title}
              <span className="text-muted">, {piece.year}</span>
            </h3>
            <p className="mt-2 text-base leading-snug text-muted">{piece.medium}</p>
          </div>
          <div className="shrink-0 text-right">
            <StatusBadge status={piece.status} />
            {piece.price ? (
              <p className="mt-2 font-sans text-base tabular-nums text-ink">
                {price(piece.price)}
              </p>
            ) : null}
          </div>
        </div>
      </button>
    </Reveal>
  )
}
