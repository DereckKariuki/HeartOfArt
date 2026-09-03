import { useCallback, useMemo, useState } from 'react'
import { formatPrice, formatFrom } from '../lib/format'
import { CurrencyContext } from './currency-store'

/**
 * Display currency only. Prices are stored and charged in KES;
 * USD is a courtesy for overseas collectors.
 */
export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('KES')

  const toggle = useCallback(() => {
    setCurrency((current) => (current === 'KES' ? 'USD' : 'KES'))
  }, [])

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      toggle,
      price: (amount) => formatPrice(amount, currency),
      from: (amount) => formatFrom(amount, currency),
    }),
    [currency, toggle],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
