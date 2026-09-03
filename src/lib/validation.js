/** Inline form validation. Every rule returns an error string, or '' when valid. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Permissive on purpose: +254…, 07…, spaces and dashes all pass.
const PHONE = /^[+()\d][\d\s\-()]{6,}$/

export const required = (label) => (value) =>
  String(value ?? '').trim() ? '' : `${label} is required.`

export const email = (value) => {
  const v = String(value ?? '').trim()
  if (!v) return 'Email address is required.'
  return EMAIL.test(v) ? '' : 'Enter a valid email address, e.g. name@example.com.'
}

export const phone = (value) => {
  const v = String(value ?? '').trim()
  if (!v) return 'Phone number is required.'
  return PHONE.test(v) ? '' : 'Enter a valid phone number, e.g. +254 700 000 000.'
}

export const minLength = (label, n) => (value) => {
  const v = String(value ?? '').trim()
  if (!v) return `${label} is required.`
  return v.length >= n ? '' : `${label} should be at least ${n} characters.`
}

/** Runs a { field: [rules] } map over values and returns { field: error }. */
export function validate(values, rules) {
  const errors = {}
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of [].concat(fieldRules)) {
      const message = rule(values[field])
      if (message) {
        errors[field] = message
        break
      }
    }
  }
  return errors
}

export const hasErrors = (errors) => Object.keys(errors).length > 0
