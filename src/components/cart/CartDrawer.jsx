import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../../context/cart-store'
import { useCurrency } from '../../context/currency-store'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import ArtImage from '../ui/ArtImage'
import Button from '../ui/Button'

const CLOSE_MS = 450

/**
 * Slide-out cart. Traps focus, closes on Esc or on the scrim, restores
 * focus to the control that opened it, and holds full width on phones
 * where a fixed panel width would clip the quantity controls.
 */
export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, removeItem, setQuantity } = useCart()
  const { price } = useCurrency()
  const containerRef = useFocusTrap(isOpen)

  // `entered` lags `isOpen` at both ends: it goes true a frame after opening
  // so the panel has a closed position to slide out of, and stays true through
  // the closing transition so the drawer is still mounted while it slides away.
  const [entered, setEntered] = useState(false)
  const mounted = isOpen || entered
  const shown = isOpen && entered

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(frame)
    }
    const timer = setTimeout(() => setEntered(false), CLOSE_MS)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        closeCart()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeCart])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-[450ms] ease-gallery ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full max-w-full flex-col bg-canvas shadow-drawer transition-transform duration-[450ms] ease-gallery sm:max-w-md ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-taupe/50 px-6 py-5 sm:px-8">
          <h2 className="label">Your cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="-mr-2 p-2 text-ink transition-colors duration-500 hover:text-accentDeep"
            aria-label="Close cart"
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <p className="font-serif text-2xl font-light text-ink">Nothing here yet</p>
            <p className="max-w-xs text-[1.0625rem] leading-relaxed text-muted">
              Originals and limited prints are in the shop.
            </p>
            <Button to="/shop" variant="outline" size="small" onClick={closeCart}>
              Browse the shop
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-taupe/40 overflow-y-auto overscroll-contain px-6 sm:px-8">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-6">
                  <Link
                    to={`/shop/${item.productId}`}
                    onClick={closeCart}
                    className="w-20 shrink-0 sm:w-24"
                  >
                    <ArtImage
                      src={item.image}
                      alt={item.alt}
                      ratio="4/5"
                      seed={item.productId}
                      label={item.title}
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to={`/shop/${item.productId}`}
                          onClick={closeCart}
                          className="link-underline block truncate font-serif text-lg text-ink"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-base leading-snug text-muted">
                          {item.variantLabel}
                          {item.framingLabel ? ` · ${item.framingLabel}` : ''}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-base text-muted underline underline-offset-4 transition-colors duration-500 hover:text-accentDeep"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      {item.maxQuantity === 1 ? (
                        <span className="label">One of one</span>
                      ) : (
                        <div className="flex items-center border border-taupe/70">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            className="p-2.5 text-ink transition-colors duration-500 hover:text-accentDeep"
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            <Minus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </button>
                          <span
                            className="min-w-8 text-center font-sans text-base tabular-nums"
                            aria-live="polite"
                            aria-label={`Quantity, ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            className="p-2.5 text-ink transition-colors duration-500 hover:text-accentDeep"
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            <Plus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      )}
                      <span className="font-sans text-base tabular-nums text-ink">
                        {price(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-taupe/50 px-6 py-6 sm:px-8">
              <div className="flex items-baseline justify-between">
                <span className="label">Subtotal</span>
                <span className="font-serif text-2xl font-light tabular-nums text-ink">
                  {price(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-base text-muted">
                Delivery is calculated at checkout. Charged in Kenyan shillings.
              </p>
              <Button
                to="/checkout"
                onClick={closeCart}
                variant="primary"
                size="full"
                className="mt-6"
              >
                Checkout
              </Button>
              <button
                type="button"
                onClick={closeCart}
                className="mt-4 w-full text-center font-sans text-[0.78rem] uppercase tracking-label text-muted transition-colors duration-500 hover:text-accentDeep"
              >
                Continue looking
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
