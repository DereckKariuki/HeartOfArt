import { useMemo } from 'react'
import { email, minLength, required } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'
import { Field, FormSuccess, TextArea } from '../ui/Field'
import Button from '../ui/Button'

const rules = {
  name: required('Name'),
  email,
  subject: required('Subject'),
  message: minLength('Your message', 20),
}

export default function ContactForm({ presetSubject = '' }) {
  const initialValues = useMemo(
    () => ({ name: '', email: '', subject: presetSubject, message: '' }),
    [presetSubject],
  )

  const form = useForm({
    initialValues,
    rules,
    // Placeholder: no live submission. Post `values` to your endpoint here.
    onSubmit: () => new Promise((resolve) => setTimeout(resolve, 800)),
  })

  if (form.status === 'success') {
    return (
      <FormSuccess
        title="Message sent"
        body="Thank you. The studio answers within two working days — sooner if it is about a piece that is available."
      >
        <Button type="button" variant="outline" size="small" onClick={form.reset}>
          Write another
        </Button>
      </FormSuccess>
    )
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-9" aria-label="Contact">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Name" autoComplete="name" {...form.field('name')} />
        <Field label="Email" type="email" autoComplete="email" {...form.field('email')} />
      </div>
      <Field label="Subject" placeholder="What is this about?" {...form.field('subject')} />
      <TextArea
        label="Message"
        rows={6}
        hint="Twenty characters or more."
        {...form.field('message')}
      />
      <Button type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
