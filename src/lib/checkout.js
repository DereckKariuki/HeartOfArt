/**
 * ═══════════════════════════════════════════════════════════════════
 *  PLACEHOLDER CHECKOUT — THIS IS THE ONLY FILE TO REPLACE FOR PAYMENT
 * ═══════════════════════════════════════════════════════════════════
 *
 *  `submitOrder` is the single seam between the storefront and a payment
 *  provider. Nothing else in the app talks to money. Replace the body of
 *  this function with a real call and the rest of the site is unchanged.
 *
 *  It receives:
 *    order.items      [{ id, productId, title, variantLabel, framingLabel,
 *                        unitPrice, quantity, image, alt }]
 *    order.subtotal   whole KES
 *    order.customer   { firstName, lastName, email, phone }
 *    order.shipping   { address, city, country, method, methodLabel, notes }
 *    order.delivery   { id, label, fee }   fee in whole KES
 *    order.total      subtotal + delivery fee, whole KES
 *
 *  It must resolve to:
 *    { ok: true,  reference }              on success
 *    { ok: false, error }                  on failure
 *
 *  ─── M-PESA (Daraja STK push) ────────────────────────────────────
 *  Never call Daraja from the browser: the consumer secret and the
 *  passkey must stay server-side. POST this order to your own endpoint,
 *  have it request an OAuth token, fire `/mpesa/stkpush/v1/processrequest`
 *  with the customer's phone in 2547XXXXXXXX form, then poll or wait on
 *  your callback URL for the result before resolving.
 *
 *    const res = await fetch('/api/checkout/mpesa', {
 *      method: 'POST',
 *      headers: { 'Content-Type': 'application/json' },
 *      body: JSON.stringify(order),
 *    })
 *    const data = await res.json()
 *    return res.ok ? { ok: true, reference: data.receipt }
 *                  : { ok: false, error: data.message }
 *
 *  ─── PAYSTACK ────────────────────────────────────────────────────
 *  Initialise the transaction server-side (amount in cents, KES), then
 *  either redirect to `data.authorization_url` or open Paystack Inline
 *  with the returned access code. Verify the reference server-side
 *  before you treat an order as paid — never trust the browser callback.
 *
 *  Whichever you choose: mark sold originals as sold in your own data
 *  the moment payment verifies, because each one is a single item.
 */

const REFERENCE_PREFIX = 'HOA'

function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6)
  const noise = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `${REFERENCE_PREFIX}-${stamp}${noise}`
}

export async function submitOrder(order) {
  // ── PLACEHOLDER ── stands in for the network round-trip.
  await new Promise((resolve) => setTimeout(resolve, 900))

  if (!order?.items?.length) {
    return { ok: false, error: 'Your cart is empty.' }
  }

  // A real provider would confirm the charge here.
  return { ok: true, reference: makeReference() }
}

/** REPLACE: real delivery methods and fees (whole KES). */
export const deliveryMethods = [
  {
    id: 'nairobi',
    label: 'Nairobi delivery',
    detail: 'Hand-carried by the studio, 2 – 4 working days. Hanging on request.',
    fee: 0,
  },
  {
    id: 'countrywide',
    label: 'Countrywide courier',
    detail: 'Insured, 3 – 7 working days anywhere in Kenya.',
    fee: 2500,
  },
  {
    id: 'international',
    label: 'International shipping',
    detail: 'Insured and tracked, 7 – 21 working days. Duties are the buyer’s responsibility.',
    fee: 18000,
  },
]

export const getDeliveryMethod = (id) =>
  deliveryMethods.find((method) => method.id === id) ?? deliveryMethods[0]
