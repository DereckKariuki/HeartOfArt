import { contact } from '../data/site'

/**
 * Where an enquiry goes when someone presses send.
 *
 * This is the one place that decides. Both forms — contact and commission —
 * call `sendEnquiry` and nothing else knows how delivery works, the same way
 * `order.js` is the only seam between the cart and the studio.
 *
 * ---------------------------------------------------------------------------
 * WEB3FORMS
 * ---------------------------------------------------------------------------
 *
 * A browser cannot send email on its own. Web3Forms does it for you: the page
 * posts the enquiry to their endpoint, they email it to the address the key
 * belongs to, and the visitor never leaves the page.
 *
 * The access key is bound, at Web3Forms' end, to one email address. That is
 * the whole security model, and it is why the key is safe to ship in the page
 * the way a Firebase key is: someone who copies it can only cause mail to be
 * sent TO heartofart83@gmail.com. They cannot read a submission, change the
 * destination, or send as you. Never treat it as a secret that must not leak —
 * but do keep it out of the repo, so the address is not changed by a pull
 * request and so a scraper has to work for it.
 *
 * To set it up:
 *
 *   1. Go to web3forms.com, enter heartofart83@gmail.com, and they email you
 *      an access key. No account, no password.
 *   2. Put it in the build environment as VITE_WEB3FORMS_KEY — on Netlify:
 *      Site configuration → Environment variables. Locally, a .env.local file
 *      (git-ignored) does the same for `npm run dev`.
 *   3. Redeploy. That is all; nothing else in the site changes.
 *
 * ---------------------------------------------------------------------------
 * WITH NO KEY SET
 * ---------------------------------------------------------------------------
 *
 * The enquiry is handed to the visitor's own mail app, addressed to the studio
 * and already written out, and the form says exactly that rather than claiming
 * it has been sent. So the site is never quietly broken: before the key is
 * set, enquiries still reach you; after it, they arrive without the visitor
 * doing anything more.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? ''

const ENDPOINT = 'https://api.web3forms.com/submit'

/** True once a key is configured — the forms word their success note by this. */
export const isPosted = Boolean(ACCESS_KEY)

/**
 * Turns the form's values into readable lines, in the order given.
 *
 * `labels` decides both what is written and how: a field with no label is
 * left out. That is how the contact form keeps its subject out of the body —
 * it is already the subject line, and repeating it reads like a mistake.
 */
export function composeBody(fields, labels) {
  return Object.entries(fields)
    .filter(([key, value]) => labels[key] && value != null && value !== '')
    .map(([key, value]) => `${labels[key]}: ${value}`)
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
 * @param {object} enquiry.fields   field name -> value, as the email should list them
 * @param {object} enquiry.labels   field name -> how to write it in the email
 * @param {string} enquiry.subject  the subject line
 * @param {string} [enquiry.replyTo] the visitor's address, so Reply goes to them
 * @returns {Promise<'posted' | 'mail-client'>} how it actually went out
 * @throws when Web3Forms refuses the submission
 */
export async function sendEnquiry({ fields, labels = {}, subject, replyTo }) {
  const body = composeBody(fields, labels)

  if (!ACCESS_KEY) {
    openMailClient(subject, body)
    return 'mail-client'
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject,
      from_name: 'HeartOfArt website',
      // Hitting Reply in the inbox answers the visitor, not Web3Forms.
      ...(replyTo ? { replyto: replyTo } : {}),
      // The fields individually, so they are searchable in the inbox, and the
      // same thing written out, because that is what the email body shows.
      ...fields,
      message: body,
    }),
  })

  // Web3Forms answers 200 with { success: false } for a rejected key, so the
  // status alone is not enough to call this sent.
  const result = await response.json().catch(() => ({}))
  if (!response.ok || result.success === false) {
    throw new Error(result.message || `Web3Forms returned ${response.status}`)
  }

  return 'posted'
}

/**
 * A WhatsApp link carrying the same enquiry, for visitors who would rather
 * chat than write an email — and for anyone whose device has no mail app.
 *
 * Nothing sits in the middle: it opens WhatsApp with the message written out
 * and addressed to the studio, and the visitor presses send there. An empty
 * form still gets an opening line, because the whole point of this route is
 * that it asks less of people than the form does.
 */
export function whatsappLink({ subject, fields, labels = {} }) {
  const body = composeBody(fields, labels)
  const text = body ? `${subject}\n\n${body}` : `${subject}\n\nHello HeartOfArt —`
  return `${contact.whatsappHref}?text=${encodeURIComponent(text)}`
}
