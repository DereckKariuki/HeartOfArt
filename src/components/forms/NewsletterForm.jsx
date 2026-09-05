import { email as emailRule } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'
import { Field } from '../ui/Field'
import Button from '../ui/Button'

// Defined outside the component so the rules object is stable across renders.
const rules = { email: emailRule }
const initialValues = { email: '' }

/** Email field only. No popup, no modal, no second ask. */
export default function NewsletterForm({ tone = 'dark' }) {
  const form = useForm({
    initialValues,
    rules,
    // Placeholder: wire to your list provider here.
    onSubmit: () => new Promise((resolve) => setTimeout(resolve, 700)),
  })

  if (form.status === 'success') {
    return (
      <p role="status" className={`animate-fadeIn text-[1.0625rem] ${tone === 'light' ? 'text-canvas/80' : 'text-muted'}`}>
        Thank you — you are on the list. Expect a note when new work is released,
        and nothing else.
      </p>
    )
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="flex flex-col gap-5 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Field
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          {...form.field('email')}
        />
      </div>
      <Button type="submit" variant={tone === 'light' ? 'light' : 'primary'} disabled={form.status === 'submitting'}>
        {form.status === 'submitting' ? 'Adding…' : 'Subscribe'}
      </Button>
    </form>
  )
}
