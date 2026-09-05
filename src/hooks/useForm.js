import { useCallback, useRef, useState } from 'react'
import { hasErrors, validate } from '../lib/validation'

/**
 * Inline-validating form state.
 *
 * Fields validate on blur, and on every keystroke once a submit has been
 * attempted — so a visitor is corrected while they type only after they
 * have asked to send. No form on this site posts anywhere; `onSubmit`
 * stands in for a real endpoint.
 */
export function useForm({ initialValues, rules = {}, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const attempted = useRef(false)

  const revalidate = useCallback(
    (nextValues) => {
      const next = validate(nextValues, rules)
      setErrors(next)
      return next
    },
    [rules],
  )

  const setValue = useCallback(
    (name, value) => {
      setValues((current) => {
        const next = { ...current, [name]: value }
        if (attempted.current) revalidate(next)
        return next
      })
    },
    [revalidate],
  )

  const handleChange = useCallback(
    (event) => {
      const { name, type, value, checked, files } = event.target
      if (type === 'file') return setValue(name, files?.[0] ?? null)
      return setValue(name, type === 'checkbox' ? checked : value)
    },
    [setValue],
  )

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target
      setTouched((current) => ({ ...current, [name]: true }))
      setValues((current) => {
        revalidate(current)
        return current
      })
    },
    [revalidate],
  )

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const form = event.currentTarget
      attempted.current = true
      const next = revalidate(values)
      setTouched(Object.fromEntries(Object.keys(rules).map((key) => [key, true])))

      if (hasErrors(next)) {
        setStatus('idle')
        // Move the visitor to the first thing that needs fixing. Errors are
        // keyed by field name, so ask the DOM for that control directly
        // rather than for state React has not re-rendered yet.
        const firstInvalid = Object.keys(rules).find((key) => next[key])
        form.querySelector(`[name="${firstInvalid}"]`)?.focus()
        return
      }

      setStatus('submitting')
      try {
        await onSubmit?.(values)
        setStatus('success')
      } catch {
        setStatus('error')
      }
    },
    [onSubmit, revalidate, rules, values],
  )

  const reset = useCallback(() => {
    attempted.current = false
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }, [initialValues])

  /** Spread onto an input to wire value, handlers and error state at once. */
  const field = useCallback(
    (name) => ({
      name,
      value: values[name] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[name] ? errors[name] : '',
    }),
    [values, handleChange, handleBlur, touched, errors],
  )

  return {
    values,
    errors,
    touched,
    status,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    field,
  }
}
