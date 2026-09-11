import { useMemo } from 'react'
import { deliveryMethods, getDeliveryMethod, orderWhatsappLink } from '../lib/order'
import { useCart } from '../context/cart-store'
import { useCurrency } from '../context/currency-store'
import { usePageMeta } from '../hooks/usePageMeta'
import { useForm } from '../hooks/useForm'
import { phone, required } from '../lib/validation'
import { Whatsapp } from '../components/ui/SocialIcons'
import { Field, TextArea } from '../components/ui/Field'
import ArtImage from '../components/ui/ArtImage'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

// Only what the studio needs before the conversation starts. Where the piece
// is going is easier to settle in the chat than in a form, so there is no
// address block: a full postal address asked for before anyone has spoken is
// the surest way to lose an order for a small drawing.
const rules = {
  name: required('Name'),
  phone,
  method: required('Delivery method'),
}

const initialValues = {
  name: '',
  phone: '',
  method: 'local',
  deliverTo: '',
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
        Priced in Kenyan shillings. Any USD figure shown is a conversion for reference.
      </p>
    </div>
  )
}

export default function Order() {
  usePageMeta({
    title: 'Place an order',
    description:
      'Send your order to the studio on WhatsApp. Nothing is charged on the site.',
  })

  const { items, subtotal } = useCart()
  const { price } = useCurrency()

  const form = useForm({
    initialValues,
    rules,
    // Nothing is posted from this page. The order leaves as a WhatsApp
    // message, so there is no submit handler — fields validate on blur so a
    // buyer is corrected while filling it in.
  })

  const delivery = useMemo(() => getDeliveryMethod(form.values.method), [form.values.method])
  const total = subtotal + delivery.fee

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center md:px-12">
        <p className="label mb-6">Place an order</p>
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
        <p className="label mb-6">Place an order</p>
        <h1 className="max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.15] text-ink">
          A few details and the studio takes it from here
        </h1>
        <p className="mt-7 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
          Nothing is charged on this page. Your order goes to the studio on WhatsApp,
          and payment and delivery are arranged there.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-20">
        <form
          onSubmit={(event) => event.preventDefault()}
          noValidate
          className="space-y-14 lg:col-span-7"
          aria-label="Place an order"
        >
          <fieldset className="space-y-8">
            <legend className="label mb-4">Who the studio is talking to</legend>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Name" autoComplete="name" {...form.field('name')} />
              <Field
                label="Phone"
                type="tel"
                autoComplete="tel"
                hint="The number the studio should reply on."
                {...form.field('phone')}
              />
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
            <Field
              label="Deliver to"
              required={false}
              placeholder="Town or area — the details can wait for the chat"
              {...form.field('deliverTo')}
            />
            <TextArea
              label="Anything else"
              required={false}
              rows={3}
              placeholder="A preferred day, a question about framing, anything the studio should know."
              {...form.field('notes')}
            />
          </fieldset>

          <div>
            <Button
              href={orderWhatsappLink({
                items,
                subtotal,
                delivery,
                buyer: form.values,
                format: price,
              })}
              target="_blank"
              rel="noreferrer"
              size="full"
            >
              <Whatsapp aria-hidden="true" size={16} strokeWidth={1.4} />
              Send on WhatsApp — {price(total)}
            </Button>
            <p className="mt-4 text-base leading-relaxed text-muted">
              This opens WhatsApp with your order written out and addressed to the
              studio. Press send there and you will get a reply with payment and
              delivery details.
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
