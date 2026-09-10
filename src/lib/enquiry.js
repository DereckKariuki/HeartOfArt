import { contact } from '../data/site'

/**
 * Where an enquiry goes when someone presses send.
 *
 * This is the one place that decides. Both forms — contact and commission —
 * call `sendEnquiry` and nothing else knows how delivery works, the same way
 * `checkout.js` is the only seam between the storefront and money.
 *
 * ---------------------------------------------------------------------------
 * NETLIFY FORMS
 * ---------------------------------------------------------------------------
 *
 * Netlify receives the submission and emails it on, so no mail provider's API
 * key ever reaches the browser. Three things make it work, and all three have
 * to agree:
 *
 * 1. Netlify finds forms by reading the HTML it is given at deploy time. This
 *    site renders its forms in JavaScript, which that reader never runs — so
 *    `index.html` carries a hidden copy of each form, listing every field by
 *    name. That copy is what Netlify registers. If you add a field to a form,
 *    add it there too or it arrives blank.
 *
 * 2. The React form posts the fields back as a normal form encoding, with
 *    `form-name` naming which of the two it is. The names below must match
 *    the hidden copies exactly.
 *
 * 3. The notification address is set in Netlify itself, not here:
 *    Site configuration → Forms → Form notifications → Add notification →
 *    Email notification, sent to heartofart83@gmail.com. Netlify holds the
 *    submissions either way; the notification is what puts them in the inbox.
 *
 * Spam: each form carries a honeypot field called `bot-field`. A person never
 * sees it, so anything that fills it in is discarded.
 *
 * ---------------------------------------------------------------------------
 * EVERYWHERE THAT IS NOT NETLIFY
 * ---------------------------------------------------------------------------
 *
 * Only the Netlify build can accept these posts. A local `npm run dev`, a
 * `vite preview`, a static copy opened from disk — none of them can, and a
 * post to any of them would either fail or, worse, return a page that looks
 * like success while the enquiry went nowhere.
 *
 * So the build decides. Netlify sets NETLIFY=true in its build environment,
 * and `vite.config.js` turns that into the flag below. Off it, the enquiry is
 * handed to the visitor's own mail app, addressed to the studio and written
 * out, and the form says exactly that rather than claiming it has been sent.
 */
const ON_NETLIFY = typeof __NETLIFY_FORMS__ !== 'undefined' && __NETLIFY_FORMS__

/** Netlify form names. The hidden copies in index.html use these too. */
export const FORMS = {
  contact: 'contact',
  commission: 'commission',
}

/** Turns the form's values into the lines of an email, in a readable order. */
function composeBody(fields, labels) {
  return Object.entries(fields)
    .filter(([, value]) => value != null && value !== '')
    .map(([key, value]) => `${labels[key] ?? key}: ${value}`)
    .join('\n')
}

function openMailClient(subject, body) {
  const href = `mailto:${contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
  // `location.href` rather than window.open: a popup blocker would swallow the
  // second one, and there is no new page to show either way.
  window.location.href = href
}

/**
 * Send one enquiry.
 *
 * @param {object} enquiry
 * @param {string} enquiry.form     which Netlify form — a value from FORMS
 * @param {object} enquiry.fields   field name -> value, as the hidden copy lists them
 * @param {object} enquiry.labels   field name -> how to write it in an email
 * @param {string} enquiry.subject  the subject line, for the mail-app route
 * @returns {Promise<'posted' | 'mail-client'>} how it actually went out
 * @throws when Netlify refuses the submission
 */
export async function sendEnquiry({ form, fields, labels = {}, subject }) {
  if (!ON_NETLIFY) {
    openMailClient(subject, composeBody(fields, labels))
    return 'mail-client'
  }

  const body = new URLSearchParams({ 'form-name': form })
  for (const [key, value] of Object.entries(fields)) {
    body.append(key, value ?? '')
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error(`Netlify returned ${response.status}`)
  }

  return 'posted'
}
