import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { deliveryMethods, getDeliveryMethod, submitOrder } from '../lib/checkout'
import { useCart } from '../context/cart-store'
import { useCurrency } from '../context/currency-store'
import { usePageMeta } from '../hooks/usePageMeta'
import { useForm } from '../hooks/useForm'
import { email, phone, required } from '../lib/validation'
import { Field, TextArea } from '../components/ui/Field'
import ArtImage from '../components/ui/ArtImage'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

const rules = {
  firstName: required('First name'),
  lastName: required('Last name'),
  email,
  phone,
  address: required('Street address'),
  city: required('City or town'),
  country: required('Country'),
  method: required('Delivery method'),
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'Kenya',
  method: 'nairobi',
  notes: '',
}

function OrderSummary({ items, subtotal, deliveryFee, total }) {
  const { price } = useCurrency()

  return (
    <div className="border border-taupe/60 bg-bone/40 px-6 py-8 sm:px-8">
      <h2 className="label mb-6">Order summary</h2>
      <ul className="divide-y divide-taupe/40">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-4 first:pt-0">
            <div className="w-16 shrink-0">
              <ArtImage
                src={item.image}
                alt={item.alt}
                ratio="4/5"
                seed={item.productId}
                label={item.title}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-[1.15rem] leading-tight text-ink">{item.title}</p>
              <p className="mt-1 text-base leading-snug text-muted">
                {item.variantLabel}
                {item.framingLabel ? ` · ${item.framingLabel}` : ''}
                {item.quantity > 1 ? ` · ×${item.quantity}` : ''}
              </p>
            </div>
            <p className="shrink-0 font-sans text-base tabular-nums text-ink">
              {price(item.unitPrice * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-3 border-t border-taupe/50 pt-6 text-base">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums text-ink">{price(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Delivery</dt>
          <dd className="tabular-nums text-ink">
            {deliveryFee === 0 ? 'Included' : price(deliveryFee)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-taupe/50 pt-4">
          <dt className="label">Total</dt>
          <dd className="font-serif text-2xl font-light tabular-nums text-ink">{price(total)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Charged in Kenyan shillings. Any USD figure shown is a conversion for reference.
      </p>
    </div>
  )
}

export default function Checkout() {
  usePageMeta({
    title: 'Checkout',
    description: 'Complete your order of original work or limited prints from HeartOfArt, Nairobi.',
  })

  const { items, subtotal, clearCart } = useCart()
  const { price } = useCurrency()
  const [reference, setReference] = useState(null)
  const [failure, setFailure] = useState('')

  const form = useForm({
    initialValues,
    rules,
    onSubmit: async (values) => {
      setFailure('')
      const delivery = getDeliveryMethod(values.method)
      // The single seam to a payment provider — see src/lib/checkout.js.
      const result = await submitOrder({
        items,
        subtotal,
        customer: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
        },
        shipping: {
          address: values.address,
          city: values.city,
          country: values.country,
          method: delivery.id,
          methodLabel: delivery.label,
          notes: values.notes,
        },
        delivery: { id: delivery.id, label: delivery.label, fee: delivery.fee },
        total: subtotal + delivery.fee,
      })

      if (!result.ok) {
        setFailure(result.error)
        throw new Error(result.error)
      }
      setReference(result.reference)
      clearCart()
    },
  })

  const delivery = useMemo(() => getDeliveryMethod(form.values.method), [form.values.method])
  const total = subtotal + delivery.fee

  if (reference) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center md:px-12">
        <p className="label mb-6">Order received</p>
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-light leading-tight text-ink">
          Thank you
        </h1>
        <p className="mx-auto mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
          Your reference is <span className="font-medium text-ink">{reference}</span>. The
          studio will email you within one working day to confirm payment and arrange
          delivery. Nothing has been charged yet.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Button to="/shop" variant="outline">
            Back to the shop
          </Button>
          <Button to="/" variant="quiet">
            Home
          </Button>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center md:px-12">
        <p className="label mb-6">Checkout</p>
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-light leading-tight text-ink">
          Your cart is empty
        </h1>
        <p className="mx-auto mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
          Originals and limited prints are in the shop. If you are after something that
          does not exist yet, commissions are open.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Button to="/shop">Browse the shop</Button>
          <Button to="/commissions" variant="quiet">
            Commission a piece
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-shell px-6 pb-28 pt-16 md:px-12 lg:px-16">
      <Reveal>
        <p className="label mb-6">Checkout</p>
        <h1 className="max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.15] text-ink">
          A few details and the studio takes it from here
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-20">
        <form
          onSubmit={form.handleSubmit}
          noValidate
          className="space-y-14 lg:col-span-7"
          aria-label="Checkout"
        >
          <fieldset className="space-y-8">
            <legend className="label mb-4">Contact details</legend>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="First name" autoComplete="given-name" {...form.field('firstName')} />
              <Field label="Last name" autoComplete="family-name" {...form.field('lastName')} />
            </div>
            <Field label="Email" type="email" autoComplete="email" {...form.field('email')} />
            <Field
              label="Phone"
              type="tel"
              autoComplete="tel"
              hint="Used for delivery, and for M-Pesa if you pay that way."
              {...form.field('phone')}
            />
          </fieldset>

          <fieldset className="space-y-8">
            <legend className="label mb-4">Shipping address</legend>
            <Field label="Street address" autoComplete="street-address" {...form.field('address')} />
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="City or town" autoComplete="address-level2" {...form.field('city')} />
              <Field label="Country" autoComplete="country-name" {...form.field('country')} />
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <legend className="label mb-4">Delivery method</legend>
            <div className="space-y-3">
              {deliveryMethods.map((method) => {
                const selected = form.values.method === method.id
                return (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-start justify-between gap-5 border px-5 py-5 transition-colors duration-500 ease-gallery ${
                      selected
                        ? 'border-accent bg-bone/60'
                        : 'border-taupe/70 hover:border-ink/40'
                    }`}
                  >
                    <span className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="method"
                        value={method.id}
                        checked={selected}
                        onChange={form.handleChange}
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 accent-[#8A6B3C]"
                      />
                      <span>
                        <span className="block text-[1.0625rem] text-ink">{method.label}</span>
                        <span className="mt-1 block text-base leading-relaxed text-muted">
                          {method.detail}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 font-sans text-base tabular-nums text-ink">
                      {method.fee === 0 ? 'Included' : price(method.fee)}
                    </span>
                  </label>
                )
              })}
            </div>
            <TextArea
              label="Delivery notes"
              required={false}
              rows={3}
              placeholder="Gate code, preferred day, anything the courier should know."
              {...form.field('notes')}
            />
          </fieldset>

          {failure ? (
            <p role="alert" className="border border-[#8C2F2F]/40 px-5 py-4 text-base text-[#8C2F2F]">
              {failure}
            </p>
          ) : null}

          <div>
            <Button type="submit" size="full" disabled={form.status === 'submitting'}>
              {form.status === 'submitting' ? 'Placing order…' : `Place order — ${price(total)}`}
            </Button>
            <p className="mt-4 text-base leading-relaxed text-muted">
              No card details are taken here. The studio confirms availability and sends
              an M-Pesa or bank request once your order is received. See our{' '}
              <Link to="/contact" className="link-underline text-ink">
                contact page
              </Link>{' '}
              if you would rather arrange it by phone.
            </p>
          </div>
        </form>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={delivery.fee}
              total={total}
            />
          </div>
        </aside>
      </div>
    </section>
  )
}
