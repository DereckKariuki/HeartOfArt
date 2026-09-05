import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { nav } from '../../data/site'
import { useCart } from '../../context/cart-store'
import { useCurrency } from '../../context/currency-store'
import { useScrolled } from '../../hooks/useScrolled'
import Logo from '../ui/Logo'
import Wordmark from '../ui/Wordmark'

/**
 * Fixed nav. Over a full-bleed hero it starts transparent with light type
 * and settles to solid canvas on scroll; on every other route it is solid
 * from the first paint.
 */
export default function Header({ overHero = false }) {
  const scrolled = useScrolled(40)
  const { count, openCart } = useCart()
  const { currency, toggle } = useCurrency()
  const { pathname } = useLocation()
  // The mobile menu is held open *for a route*, so navigating closes it on
  // the same render as the new page — no effect, no flash of an open menu.
  const [menuOpenFor, setMenuOpenFor] = useState(null)
  const menuOpen = menuOpenFor === pathname
  const setMenuOpen = (open) => setMenuOpenFor(open ? pathname : null)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpenFor(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const solid = scrolled || !overHero || menuOpen
  const tone = solid ? 'text-ink' : 'text-canvas'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-700 ease-gallery ${
        solid
          ? 'border-b border-taupe/40 bg-canvas/95'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.72rem] focus:uppercase focus:tracking-label focus:text-canvas"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-4 md:px-12 lg:px-16">
        <Link
          to="/"
          className={`flex items-center ${tone} transition-colors duration-700`}
          aria-label="HeartOfArt — home"
        >
          <Logo
            size={48}
            className="h-10 w-10 md:h-12 md:w-12"
            fallback={
              <Wordmark className="text-[1.4rem] md:text-[1.55rem]" tone={solid ? 'ink' : 'light'} />
            }
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `link-underline font-sans text-[0.74rem] uppercase tracking-label transition-colors duration-500 ${tone} ${
                      isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`flex items-center gap-2 md:gap-5 ${tone}`}>
          <button
            type="button"
            onClick={toggle}
            className="font-sans text-[0.72rem] uppercase tracking-label opacity-70 transition-opacity duration-500 hover:opacity-100"
            aria-label={`Display prices in ${currency === 'KES' ? 'US dollars' : 'Kenyan shillings'}`}
          >
            <span aria-hidden="true">{currency === 'KES' ? 'KES / usd' : 'kes / USD'}</span>
          </button>

          <button
            type="button"
            onClick={openCart}
            className="relative p-2 transition-opacity duration-500 hover:opacity-70"
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} />
            {count > 0 ? (
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-accentDeep px-1 font-sans text-[0.6rem] font-medium text-canvas"
              >
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.25} />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.25} />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-taupe/40 bg-canvas lg:hidden"
      >
        <nav aria-label="Primary, mobile">
          <ul className="mx-auto max-w-shell px-6 py-4">
            {nav.map((item) => (
              <li key={item.to} className="border-b border-taupe/30 last:border-0">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block py-4 font-serif text-2xl font-light ${
                      isActive ? 'text-accentDeep' : 'text-ink'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
