import { useState } from 'react'
import {
  budgetRanges,
  commissionSizeOptions,
  pieceTypes,
  timelines,
} from '../../data/commissions'
import { email, minLength, phone, required } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'
import { sendEnquiry } from '../../lib/enquiry'
import { contact } from '../../data/site'
import { Field, FileField, FormError, FormSuccess, Select, TextArea } from '../ui/Field'
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
      setRoute(
        await sendEnquiry({
          subject: `Commission enquiry: ${values.size}`,
          fields: {
            Name: values.name,
            Email: values.email,
            Phone: values.phone,
            'Type of piece': values.pieceType,
            Size: values.size,
            Budget: values.budget,
            Timeline: values.timeline,
            Brief: values.description,
            // The file itself cannot travel in an email the browser composes,
            // so name it and ask for it in the reply rather than lose it.
            'Reference image': values.reference
              ? `${values.reference.name} — please attach when you reply`
              : '',
          },
        }),
      )
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

      <Button type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </Button>
    </form>
  )
}
