import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CartDrawer from '../cart/CartDrawer'

// Routes that open on a full-bleed dark hero, where the nav starts transparent.
const HERO_ROUTES = new Set(['/', '/commissions'])

export default function Layout() {
  const { pathname } = useLocation()
  const overHero = HERO_ROUTES.has(pathname)

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <ScrollToTop />
      <Header overHero={overHero} />
      <main id="main" className={`flex-1 ${overHero ? '' : 'pt-[4.75rem] md:pt-[5.25rem]'}`}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
