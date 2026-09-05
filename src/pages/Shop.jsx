import { useState } from 'react'
import { originals, prints, priceFloor } from '../data/products'
import { artist } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import ProductCard from '../components/shop/ProductCard'
import Reveal from '../components/ui/Reveal'

const TABS = [
  { id: 'originals', label: 'Originals', items: originals },
  { id: 'prints', label: 'Prints', items: prints },
]

export default function Shop() {
  usePageMeta({
    title: 'Shop — originals and limited prints',
    description: `Original charcoal and paint works and signed limited-edition giclée prints by ${artist.name}, from KES ${priceFloor.toLocaleString('en-KE')}. Delivered in Nairobi, countrywide and internationally.`,
  })

  const [active, setActive] = useState('originals')
  const current = TABS.find((tab) => tab.id === active)

  return (
    <>
      <section className="mx-auto max-w-shell px-6 pb-14 pt-20 md:px-12 md:pt-28 lg:px-16">
        <Reveal>
          <p className="label mb-6">Shop</p>
          <h1 className="max-w-3xl text-[clamp(2.2rem,5.6vw,4rem)] font-light leading-[1.1] text-ink">
            Originals, and prints of the work that has gone
          </h1>
          <p className="mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
            Every original is one of one, signed on the reverse and supplied with a
            certificate. Prints are made from a hundred-megapixel capture on cotton
            rag, signed in the margin.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-shell px-6 md:px-12 lg:px-16">
        <div
          role="tablist"
          aria-label="Shop sections"
          className="flex items-center gap-10 border-b border-taupe/50"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`-mb-px border-b pb-4 pt-2 font-sans text-[0.78rem] uppercase tracking-label transition-colors duration-500 ease-gallery ${
                active === tab.id
                  ? 'border-accent text-ink'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {tab.label}
              <span className="ml-2 normal-case tracking-normal text-muted">
                ({tab.items.length})
              </span>
            </button>
          ))}
        </div>

        {TABS.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={active !== tab.id}
          >
            <ul className="grid grid-cols-1 gap-x-8 gap-y-16 py-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
              {tab.items.map((product, index) => (
                <li key={product.id}>
                  <ProductCard product={product} index={index} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="border-t border-taupe/50 py-12 text-base leading-relaxed text-muted">
          {current.id === 'originals'
            ? 'Sold originals stay listed. If one of them is what you wanted, a similar piece can usually be commissioned.'
            : 'Print editions are numbered as they sell. When an edition closes it stays on this page, marked sold.'}
        </p>
      </section>
    </>
  )
}
