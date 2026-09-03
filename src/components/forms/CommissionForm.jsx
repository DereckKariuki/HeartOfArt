import { budgetRanges, pieceTypes, timelines } from '../../data/commissions'
import { email, minLength, phone, required } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'
import { Field, FileField, FormSuccess, Select, TextArea } from '../ui/Field'
import Button from '../ui/Button'

const rules = {
  name: required('Name'),
  email,
  phone,
  pieceType: required('Type of piece'),
  size: required('Approximate size'),
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
  const form = useForm({
    initialValues,
    rules,
    // Placeholder: no live submission. Post `values` to your endpoint here.
    onSubmit: () => new Promise((resolve) => setTimeout(resolve, 900)),
  })

  if (form.status === 'success') {
    return (
      <FormSuccess
        title="Your enquiry is in"
        body="The studio will come back to you within two working days with questions, a direction and a written quote. Nothing is committed until you accept it."
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
        <Field
          label="Approximate size"
          placeholder="e.g. 120 × 90 cm, or the wall is 3 m wide"
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
        hint="A photograph of the wall, or a piece of mine you are drawn to. Nothing is uploaded from this demo."
        fileName={form.values.reference?.name}
        name="reference"
        onChange={form.handleChange}
      />

      <Button type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </Button>
    </form>
  )
}
