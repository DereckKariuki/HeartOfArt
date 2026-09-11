import { useMemo } from 'react'
import { email, minLength, required } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'
import { whatsappLink } from '../../lib/enquiry'
import { Field, TextArea } from '../ui/Field'
import { Whatsapp } from '../ui/SocialIcons'
import Button from '../ui/Button'

const rules = {
  name: required('Name'),
  email,
  subject: required('Subject'),
  message: minLength('Your message', 20),
}

/**
 * The enquiry as WhatsApp will carry it. `labels` decides what gets written
 * and how — the subject heads the message, so it has no label and is not
 * repeated in the body.
 */
function enquiryFrom(values) {
  return {
    subject: values.subject || 'Enquiry from the website',
    fields: {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    },
    labels: { name: 'Name', email: 'Email', message: 'Message' },
  }
}

export default function ContactForm({ presetSubject = '' }) {
  const initialValues = useMemo(
    () => ({ name: '', email: '', subject: presetSubject, message: '' }),
    [presetSubject],
  )

  const form = useForm({
    initialValues,
    rules,
    // This form has no send button: WhatsApp is its only route out. Fields
    // still validate on blur, so the visitor is corrected while filling it
    // in, but nothing is posted and there is nothing to submit.
  })

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      noValidate
      className="space-y-9"
      aria-label="Contact"
    >
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
      <Button
        href={whatsappLink(enquiryFrom(form.values))}
        target="_blank"
        rel="noreferrer"
      >
        <Whatsapp aria-hidden="true" size={16} strokeWidth={1.4} />
        Send on WhatsApp
      </Button>
    </form>
  )
}
