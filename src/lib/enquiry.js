import { contact } from '../data/site'

/**
 * Where an enquiry goes when someone presses send.
 *
 * This is the one place that decides. Both forms — the contact form and the
 * commission form — call `sendEnquiry` and nothing else knows how delivery
 * works, the same way `checkout.js` is the only file that knows about money.
 *
 * ---------------------------------------------------------------------------
 * TWO MODES
 * ---------------------------------------------------------------------------
 *
 * 1. POSTED (what you want in the end).
 *    Set `VITE_ENQUIRY_ENDPOINT` to a URL that accepts a JSON POST and emails
 *    the result to heartofart83@gmail.com. The visitor never leaves the page.
 *
 *    A browser cannot send email on its own, and it must never hold a mail
 *    provider's API key — anyone can read it in the page source and send mail
 *    as you. So the endpoint has to be something that keeps the key on a
 *    server. Any of these work; none needs you to run a server:
 *
 *      · Netlify Forms   — if you host on Netlify. Nothing to sign up for:
 *                          add `data-netlify="true"` to the form and set the
 *                          notification address in the Netlify dashboard.
 *      · Web3Forms       — free, gives you an access key by email in a minute.
 *                          Endpoint: https://api.web3forms.com/submit, and add
 *                          your key as `access_key` in the payload below.
 *      · Formspree       — free tier, endpoint looks like
 *                          https://formspree.io/f/xxxxxxxx
 *      · Your own function on Netlify / Vercel / Cloudflare, calling Resend
 *                          or SendGrid with the key in a server env var.
 *
 *    Whichever you pick, your visitors' names, emails and phone numbers pass
 *    through that company. Read what they do with them before you choose.
 *
 * 2. MAIL CLIENT (what happens until you set the endpoint).
 *    The enquiry is handed to the visitor's own mail app, addressed to you and
 *    already written out. They still have to press send there — so the form
 *    says exactly that rather than claiming the message is on its way. It
 *    reaches you with no setup at all, but some people have no mail app
 *    configured, and it cannot carry the reference image.
 *
 * ---------------------------------------------------------------------------
 */
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT ?? ''

/** True once an endpoint is configured — the forms word themselves by this. */
export const isPosted = Boolean(ENDPOINT)

/** Turns the form's values into the lines of an email, in a sensible order. */
function composeBody(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value != null && value !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

function openMailClient(subject, body) {
  const href = `mailto:${contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
  // `location.href` rather than window.open: a popup blocker will swallow the
  // second one, and there is no new page to show either way.
  window.location.href = href
}

/**
 * Send one enquiry.
 *
 * @param {object} enquiry
 * @param {string} enquiry.subject  what the email is titled
 * @param {object} enquiry.fields   label -> value, in the order to write them
 * @returns {Promise<'posted' | 'mail-client'>} how it actually went out
 * @throws when a configured endpoint refuses the request
 */
export async function sendEnquiry({ subject, fields }) {
  const body = composeBody(fields)

  if (!ENDPOINT) {
    openMailClient(subject, body)
    return 'mail-client'
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      // Most form services read these two by name for the notification email.
      subject,
      to: contact.email,
      // If you use Web3Forms, add your key here:
      // access_key: import.meta.env.VITE_ENQUIRY_KEY,
      ...fields,
      message: body,
    }),
  })

  if (!response.ok) {
    throw new Error(`Enquiry endpoint returned ${response.status}`)
  }

  return 'posted'
}
