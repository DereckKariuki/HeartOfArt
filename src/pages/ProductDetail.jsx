import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { framingOptions, getProduct, shippingNote } from '../data/products'
import { useCart } from '../context/cart-store'
import { useCurrency } from '../context/currency-store'
import { usePageMeta } from '../hooks/usePageMeta'
import ArtImage from '../components/ui/ArtImage'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import StatusBadge from '../components/portfolio/StatusBadge'
import NotFound from './NotFound'

/** A row of options rendered as radios, styled as hairline chips. */
function OptionGroup({ legend, name, options, value, onChange, renderMeta }) {
  return (
    <fieldset>
      <legend className="label mb-4">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const selected = value === option.id
          return (
            <label
              key={option.id}
              className={`cursor-pointer border px-5 py-3 text-base transition-colors duration-500 ease-gallery ${
                selected
                  ? 'border-accent bg-bone/60 text-ink'
                  : 'border-taupe/70 text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              <span className="block">{option.label}</span>
              {renderMeta ? (
                <span className="mt-1 block text-base text-muted">
                  {renderMeta(option)}
                </span>
              ) : null}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function ProductDetail() {
  const { productId } = useParams()
  const product = getProduct(productId)

  const [imageIndex, setImageIndex] = useState(0)
  const [sizeId, setSizeId] = useState(product?.sizes?.[0]?.id ?? null)
  const [framingId, setFramingId] = useState('unframed')
  const [added, setAdded] = useState(false)

  const { addItem } = useCart()
  const { price } = useCurrency()

  const size = product?.sizes?.find((option) => option.id === sizeId) ?? null
  const framing = framingOptions.find((option) => option.id === framingId)
  const basePrice = size ? size.price : (product?.price ?? 0)
  const unitPrice = basePrice + (framing?.surcharge ?? 0)
  const sold = product?.status === 'sold'

  usePageMeta({
    title: product ? `${product.title} — ${product.kind === 'print' ? 'limited print' : 'original painting'}` : 'Not found',
    description: product
      ? `${product.title} (${product.year}) — ${product.medium}${product.dimensions ? `, ${product.dimensions}` : ''}. ${product.description}`
      : undefined,
  })

  const lineId = useMemo(
    () => `${productId}__${sizeId ?? 'one'}__${framingId}`,
    [productId, sizeId, framingId],
  )

  if (!product) return <NotFound />

  const handleAdd = () => {
    addItem({
      id: lineId,
      productId: product.id,
      title: product.title,
      variantLabel: size ? size.label : product.dimensions,
      framingLabel: framing.id === 'unframed' ? null : framing.label,
      unitPrice,
      quantity: 1,
      maxQuantity: product.kind === 'original' ? 1 : 10,
      image: product.images[0].src,
      alt: product.images[0].alt,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2600)
  }

  return (
    <article className="mx-auto max-w-shell px-6 pb-28 pt-12 md:px-12 md:pt-16 lg:px-16">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 font-sans text-[0.72rem] uppercase tracking-label text-muted transition-colors duration-500 hover:text-accentDeep"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        Back to the shop
      </Link>

      <div className="mt-10 grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Gallery — stays in view while the detail column scrolls past it. */}
        <Reveal className="lg:sticky lg:top-28 lg:col-span-7">
          <ArtImage
            key={product.images[imageIndex].src}
            src={product.images[imageIndex].src}
            alt={product.images[imageIndex].alt}
            ratio={imageIndex === 0 ? product.ratio : '4/3'}
            seed={`${product.id}-${imageIndex}`}
            label={product.images[imageIndex].caption}
            priority
            className="shadow-piece"
          />
          <ul className="mt-5 flex gap-4">
            {product.images.map((image, index) => (
              <li key={image.src} className="w-24 sm:w-28">
                <button
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={`View: ${image.caption}`}
                  aria-current={imageIndex === index}
                  className={`block w-full border p-1 transition-colors duration-500 ${
                    imageIndex === index ? 'border-accent' : 'border-transparent hover:border-taupe'
                  }`}
                >
                  <ArtImage
                    src={image.src}
                    alt=""
                    ratio="1/1"
                    seed={`${product.id}-${index}`}
                    label={image.caption}
                  />
                  <span className="label mt-2 block leading-tight">{image.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Detail */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label mb-5">
              {product.kind === 'print' ? 'Limited print' : 'Original'} · {product.collection}
            </p>
            <h1 className="text-[clamp(2rem,4.4vw,3rem)] font-light leading-[1.15] text-ink">
              {product.title}
            </h1>
            <p className="mt-3 text-[1.0625rem] text-muted">{product.year}</p>

            <p className="mt-8 font-serif text-[2rem] font-light tabular-nums text-ink">
              {sold ? 'Sold' : price(unitPrice)}
            </p>
            {!sold && framing.surcharge > 0 ? (
              <p className="mt-1 text-base text-muted">
                Includes {price(framing.surcharge)} for framing.
              </p>
            ) : null}

            <p className="mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
              {product.description}
            </p>

            <dl className="mt-10 divide-y divide-taupe/40 border-y border-taupe/40">
              <div className="flex gap-6 py-4">
                <dt className="label w-28 shrink-0 pt-1">Medium</dt>
                <dd className="text-[1.0625rem] text-ink">{product.medium}</dd>
              </div>
              {product.dimensions ? (
                <div className="flex gap-6 py-4">
                  <dt className="label w-28 shrink-0 pt-1">Size</dt>
                  <dd className="text-[1.0625rem] text-ink">{product.dimensions}</dd>
                </div>
              ) : null}
              <div className="flex gap-6 py-4">
                <dt className="label w-28 shrink-0 pt-1">Edition</dt>
                <dd className="text-[1.0625rem] leading-relaxed text-ink">{product.edition}</dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="label w-28 shrink-0 pt-1">Status</dt>
                <dd>
                  <StatusBadge status={product.status} />
                </dd>
              </div>
            </dl>
          </Reveal>

          {sold ? (
            <div className="mt-10 border border-taupe/70 bg-bone/50 px-7 py-8">
              <h2 className="font-serif text-xl font-light text-ink">This one has gone</h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
                It is in a private collection now. A print may exist, and a piece in the
                same register can be commissioned.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button to="/commissions" variant="outline" size="small">
                  Commission something similar
                </Button>
                <Button
                  to={`/contact?piece=${encodeURIComponent(product.title)}`}
                  variant="quiet"
                  size="small"
                >
                  Ask about it
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-10 space-y-9">
              {product.sizes ? (
                <OptionGroup
                  legend="Size"
                  name="size"
                  options={product.sizes}
                  value={sizeId}
                  onChange={setSizeId}
                  renderMeta={(option) => price(option.price)}
                />
              ) : null}

              <OptionGroup
                legend="Framing"
                name="framing"
                options={framingOptions}
                value={framingId}
                onChange={setFramingId}
                renderMeta={(option) =>
                  option.surcharge === 0 ? 'No charge' : `+ ${price(option.surcharge)}`
                }
              />
              <p className="-mt-5 text-base leading-relaxed text-muted">{framing.note}</p>

              <div>
                <Button type="button" onClick={handleAdd} size="full">
                  {added ? (
                    <>
                      <Check aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                      Added to cart
                    </>
                  ) : (
                    `Add to cart — ${price(unitPrice)}`
                  )}
                </Button>
                <p role="status" className="sr-only">
                  {added ? `${product.title} added to your cart.` : ''}
                </p>
              </div>

              <div className="border-t border-taupe/40 pt-7">
                <h2 className="label mb-3">Shipping</h2>
                <p className="text-base leading-relaxed text-muted">{shippingNote}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
