import { useState } from 'react'
import {
  budgetRanges,
  commissionSizeOptions,
  pieceTypes,
  timelines,
} from '../../data/commissions'
import { email, minLength, phone, required } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'
import { FORMS, sendEnquiry, whatsappLink } from '../../lib/enquiry'
import { contact } from '../../data/site'
import { Field, FileField, FormError, FormSuccess, Select, TextArea } from '../ui/Field'
import { Whatsapp } from '../ui/SocialIcons'
import Button from '../ui/Button'

const rules = {
  name: required('Name'),
  email,
  phone,
  pieceType: required('Type of piece'),
  size: required('Size'),
  budget: required('Budget range'),
  timeline: required('Timeline'),
  description: minLength('A short description', 30),
}

/**
 * The enquiry, described once. The form posts it and the WhatsApp link
 * carries it, so neither route can drift from the other.
 *
 * Keys are the field names Netlify registered; labels are how each reads
 * when the enquiry travels as a written message instead.
 */
function enquiryFrom(values) {
  return {
    subject: values.size ? `Commission enquiry: ${values.size}` : 'Commission enquiry',
    fields: {
      name: values.name,
      email: values.email,
      phone: values.phone,
      pieceType: values.pieceType,
      size: values.size,
      budget: values.budget,
      timeline: values.timeline,
      description: values.description,
      // The file travels by no route, so name it and ask for it in the reply
      // rather than lose it silently.
      reference: values.reference
        ? `${values.reference.name} — please attach when you reply`
        : '',
    },
    labels: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      pieceType: 'Type of piece',
      size: 'Size',
      budget: 'Budget',
      timeline: 'Timeline',
      description: 'Brief',
      reference: 'Reference image',
    },
  }
}

const initialValues = {
  name: '',
  email: '',
  phone: '',
  pieceType: '',
  size: '',
  budget: '',
  timeline: '',
  description: '',
  reference: null,
}

export default function CommissionForm() {
  // How the last send actually went out — the success note has to say which.
  const [route, setRoute] = useState(null)

  const form = useForm({
    initialValues,
    rules,
    onSubmit: async (values) => {
      setRoute(await sendEnquiry({ form: FORMS.commission, ...enquiryFrom(values) }))
    },
  })

  if (form.status === 'success') {
    return (
      <FormSuccess
        title={route === 'posted' ? 'Your enquiry is in' : 'One more step'}
        body={
          route === 'posted'
            ? 'The studio will come back to you within two working days with questions, a direction and a written quote. Nothing is committed until you accept it.'
            : `Your mail app should have opened with this enquiry written out and addressed to the studio — press send there and it is on its way. If nothing opened, write to ${contact.email}.`
        }
      >
        <Button type="button" variant="outline" size="small" onClick={form.reset}>
          Send another enquiry
        </Button>
      </FormSuccess>
    )
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-9" aria-label="Commission enquiry">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Name" autoComplete="name" {...form.field('name')} />
        <Field label="Email" type="email" autoComplete="email" {...form.field('email')} />
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Phone" type="tel" autoComplete="tel" {...form.field('phone')} />
        <Select
          label="Type of piece"
          placeholder="Choose one"
          options={pieceTypes}
          {...form.field('pieceType')}
        />
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <Select
          label="Size"
          placeholder="Choose one"
          options={commissionSizeOptions}
          {...form.field('size')}
        />
        <Select
          label="Budget range"
          placeholder="Choose one"
          options={budgetRanges}
          {...form.field('budget')}
        />
      </div>

      <Select
        label="Desired timeline"
        placeholder="Choose one"
        options={timelines}
        {...form.field('timeline')}
      />

      <TextArea
        label="What do you have in mind?"
        rows={6}
        placeholder="The room, the light in it, what the piece should feel like. Anything you already know."
        hint="Thirty characters or more — enough to start a conversation."
        {...form.field('description')}
      />

      <FileField
        label="Reference image"
        accept="image/*"
        hint="A photograph of the wall, or a piece of mine you are drawn to. The file is not sent with the form — name it here and attach it to your reply."
        fileName={form.values.reference?.name}
        name="reference"
        onChange={form.handleChange}
      />

      {form.status === 'error' ? <FormError email={contact.email} /> : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={form.status === 'submitting'}>
          {form.status === 'submitting' ? 'Sending…' : 'Send enquiry'}
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
