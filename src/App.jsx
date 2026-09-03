import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { CartProvider } from './context/CartContext'
import { CurrencyProvider } from './context/CurrencyContext'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Commissions from './pages/Commissions'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

/**
 * Providers sit above the router so cart and currency survive every
 * navigation within the session.
 */
export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:productId" element={<ProductDetail />} />
              <Route path="commissions" element={<Commissions />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CurrencyProvider>
  )
}
