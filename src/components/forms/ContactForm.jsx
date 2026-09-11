import { useMemo, useState } from 'react'
import { email, minLength, required } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'
import { FORMS, sendEnquiry, whatsappLink } from '../../lib/enquiry'
import { contact } from '../../data/site'
import { Field, FormError, FormSuccess, TextArea } from '../ui/Field'
import { Whatsapp } from '../ui/SocialIcons'
import Button from '../ui/Button'

const rules = {
  name: required('Name'),
  email,
  subject: required('Subject'),
  message: minLength('Your message', 20),
}

export default function ContactForm({ presetSubject = '' }) {
  /**
 * The enquiry, described once. The form posts it and the WhatsApp link
 * carries it, so neither route can drift from the other.
 *
 * Keys are the field names Netlify registered; labels are how each reads
 * when the enquiry travels as a written message instead.
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

const initialValues = useMemo(
    () => ({ name: '', email: '', subject: presetSubject, message: '' }),
    [presetSubject],
  )

  // How the last send actually went out — the success note has to say which.
  const [route, setRoute] = useState(null)

  const form = useForm({
    initialValues,
    rules,
    onSubmit: async (values) => {
      setRoute(await sendEnquiry({ form: FORMS.contact, ...enquiryFrom(values) }))
    },
  })

  if (form.status === 'success') {
    return (
      <FormSuccess
        title={route === 'posted' ? 'Message sent' : 'One more step'}
        body={
          route === 'posted'
            ? 'Thank you. The studio answers within two working days — sooner if it is about a piece that is available.'
            : `Your mail app should have opened with this enquiry written out and addressed to the studio — press send there and it is on its way. If nothing opened, write to ${contact.email}.`
        }
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
      {form.status === 'error' ? <FormError email={contact.email} /> : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={form.status === 'submitting'}>
          {form.status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        <Button
          href={whatsappLink(enquiryFrom(form.values))}
          target="_blank"
          rel="noreferrer"
          variant="outline"
        >
          <Whatsapp aria-hidden="true" size={16} strokeWidth={1.4} />
          Send on WhatsApp
        </Button>
      </div>
    </form>
  )
}
