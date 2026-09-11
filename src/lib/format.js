/**
 * All prices are stored in KES. USD is a display convenience only —
 * orders are always quoted in KES.
 *
 * REPLACE: keep `KES_PER_USD` current, or swap this for a live rate.
 */
export const KES_PER_USD = 129

export const CURRENCIES = {
  KES: { code: 'KES', symbol: 'KES', locale: 'en-KE' },
  USD: { code: 'USD', symbol: '$', locale: 'en-US' },
}

export function convert(amountKes, currency) {
  if (currency === 'USD') return amountKes / KES_PER_USD
  return amountKes
}

/** `KES 148,000` / `$1,147` — no decimals; art prices are round. */
export function formatPrice(amountKes, currency = 'KES') {
  if (amountKes == null) return null
  const value = convert(amountKes, currency)
  const rounded = Math.round(value)
  const grouped = new Intl.NumberFormat(CURRENCIES[currency].locale, {
    maximumFractionDigits: 0,
  }).format(rounded)
  return currency === 'USD' ? `$${grouped}` : `KES ${grouped}`
}

/** "from KES 45,000" figures on the commissions page. */
export function formatFrom(amountKes, currency = 'KES') {
  return `from ${formatPrice(amountKes, currency)}`
}

/** "KES 1,000 – 3,500" / "$8 – 27" — the unit is stated once, not twice. */
export function formatRange(lowKes, highKes, currency = 'KES') {
  const low = formatPrice(lowKes, currency)
  if (highKes == null || highKes === lowKes) return low
  const high = formatPrice(highKes, currency)
  // Strip the repeated unit off the upper figure: "KES 1,000" -> "1,000".
  const bare = high.replace(/^KES\s|^\$/, '')
  return `${low} – ${bare}`
}
