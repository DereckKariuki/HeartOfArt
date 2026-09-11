import { contact } from '../data/site'

/**
 * How an order leaves the site.
 *
 * Nothing is charged here. The shop takes no card details, holds no payment
 * provider's key and never touches money: a buyer fills in the cart, presses
 * "Send on WhatsApp", and the whole order arrives in the studio's chat as a
 * written message. Payment is arranged there, person to person.
 *
 * If you later want to take payment on the site instead, this file is where
 * that goes — it is the only place that knows what happens after the cart.
 * The M-Pesa (Daraja STK push) and Paystack notes that used to live here are
 * in the git history; the rule they carried still holds: a browser must never
 * hold a payment key, so the charge itself has to happen on a server.
 */

/** REPLACE: real delivery methods and fees (whole KES). */
export const deliveryMethods = [
  {
    id: 'local',
    label: 'Local delivery',
    detail: 'Hand-carried by the studio, 2 – 4 working days. Hanging on request.',
    fee: 0,
  },
  {
    id: 'countrywide',
    label: 'Countrywide courier',
    detail: 'Insured, 3 – 7 working days countrywide.',
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

/**
 * Writes the order out as a WhatsApp message, addressed to the studio.
 *
 * Everything the studio needs to reply with a total and a payment request:
 * what was ordered, at what price, where it is going and who to call back.
 */
export function orderWhatsappLink({ items, subtotal, delivery, buyer, format }) {
  const lines = ['New order from heartofart.com', '']

  for (const item of items) {
    const variant = item.variantLabel
    const quantity = item.quantity > 1 ? ` x${item.quantity}` : ''
    lines.push(
      `- ${item.title}${variant ? ` (${variant})` : ''}${quantity} — ${format(
        item.unitPrice * item.quantity,
      )}`,
    )
  }

  lines.push('', `Subtotal: ${format(subtotal)}`)
  lines.push(`Delivery: ${delivery.label}${delivery.fee ? ` — ${format(delivery.fee)}` : ' — included'}`)
  lines.push(`Total: ${format(subtotal + delivery.fee)}`)

  const details = [
    ['Name', buyer.name],
    ['Phone', buyer.phone],
    ['Deliver to', buyer.deliverTo],
    ['Notes', buyer.notes],
  ].filter(([, value]) => value?.trim())

  if (details.length) {
    lines.push('')
    for (const [label, value] of details) lines.push(`${label}: ${value.trim()}`)
  }

  return `${contact.whatsappHref}?text=${encodeURIComponent(lines.join('\n'))}`
}
