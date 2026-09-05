import { Link } from 'react-router-dom'
import { useCurrency } from '../../context/currency-store'
import ArtImage from '../ui/ArtImage'
import Reveal from '../ui/Reveal'
import StatusBadge from '../portfolio/StatusBadge'

/** Image, title, size, price, availability. Nothing else on the card. */
export default function ProductCard({ product, index = 0 }) {
  const { price, from } = useCurrency()
  const sold = product.status === 'sold'
  const lowest = product.sizes ? Math.min(...product.sizes.map((size) => size.price)) : null

  const sizeLine = product.sizes
    ? `${product.sizes.length} sizes · ${product.sizes[0].label.split(' — ')[1] ?? product.sizes[0].label}` 
    : product.dimensions

  return (
    <Reveal delay={Math.min(index, 5) * 90}>
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="relative">
          <ArtImage
            src={product.images[0].src}
            alt={product.images[0].alt}
            ratio="4/5"
            seed={product.id}
            label={product.title}
            zoomOnHover
            className={`shadow-piece transition-shadow duration-[600ms] ease-gallery group-hover:shadow-lift ${
              sold ? 'opacity-90' : ''
            }`}
          />
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-[1.35rem] font-light leading-tight text-ink">
              {product.title}
            </h3>
            <p className="mt-2 text-base leading-snug text-muted">{sizeLine}</p>
            <p className="mt-1 text-base leading-snug text-muted">{product.medium}</p>
          </div>
          <div className="shrink-0 text-right">
            <StatusBadge status={product.status} />
            <p className="mt-2 font-sans text-base tabular-nums text-ink">
              {sold ? '—' : lowest != null ? from(lowest) : price(product.price)}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
