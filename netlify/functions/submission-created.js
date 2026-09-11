/**
 * Texts the studio when an enquiry comes in.
 *
 * Netlify calls this automatically on every verified form submission, purely
 * because of the file name — `submission-created` is one of its event hooks,
 * so there is nothing to wire up in the dashboard for the trigger itself.
 *
 * This is a NOTIFICATION, not the delivery. The full enquiry still goes to
 * heartofart83@gmail.com and is stored in Netlify under Forms. The text is a
 * short "someone is asking, here is who and how to reach them", because every
 * 160 characters is another SMS you pay for.
 *
 * ---------------------------------------------------------------------------
 * WHAT YOU HAVE TO SET UP
 * ---------------------------------------------------------------------------
 *
 * 1. An Africa's Talking account (africastalking.com). It bills in KES and
 *    sends local Kenyan numbers cheaply — roughly a shilling a text. Top it
 *    up with a small amount and set a spend cap while you are in there.
 *
 * 2. In Netlify: Site configuration → Environment variables. Add:
 *
 *      AT_USERNAME    your Africa's Talking username ("sandbox" to test)
 *      AT_API_KEY     the API key from their dashboard
 *      SMS_TO         +254110025232
 *      AT_SENDER_ID   optional — your approved sender ID or short code.
 *                     Without it the text arrives from a shared number.
 *
 *    The key lives here, on the server, and never reaches the browser.
 *
 * With nothing set, this does nothing at all and says so in the function log.
 * The enquiry still reaches your email — SMS is the part that stays off.
 *
 * ---------------------------------------------------------------------------
 * SWAPPING PROVIDER
 * ---------------------------------------------------------------------------
 *
 * Only `sendSms` below knows about Africa's Talking. For Twilio, replace its
 * body with a POST to their Messages endpoint and change the three variable
 * names. Nothing else in this file, or on the site, has to change.
 */

/** Trims a value and cuts it to length, so one long answer is not three texts. */
function brief(value, max) {
  const text = (value ?? '').trim().replace(/\s+/g, ' ')
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

/**
 * What the studio is told, per form. Kept short: 160 characters is one SMS.
 *
 * Fields are joined with a dash rather than wrapped in punctuation of their
 * own — a name ending in a full stop or a subject already in quotation marks
 * would otherwise read as "Amina W.." and ""Forgotten"".
 */
function compose(formName, data) {
  const name = brief(data.name, 30) || 'Someone'
  const reply = brief(data.phone, 20) || brief(data.email, 40) || 'no contact given'

  if (formName === 'commission') {
    const size = brief(data.size, 20) || 'size not given'
    const budget = brief(data.budget, 30) || 'budget not given'
    return `HeartOfArt: commission enquiry from ${name} - ${size}, ${budget}. Reply to ${reply}. Full details in your email.`
  }

  const subject = brief(data.subject, 60) || 'no subject'
  return `HeartOfArt: enquiry from ${name} - ${subject}. Reply to ${reply}. Full details in your email.`
}

/**
 * Flattens the site's typographic characters to plain ASCII.
 *
 * This matters for money, not neatness. A text made only of GSM-7 characters
 * fits 160 per message; one curly quote or em dash — and the site's copy is
 * full of both — switches the whole thing to UCS-2, where a message is 70
 * characters. The same enquiry silently costs three texts instead of one.
 */
function toGsm(text) {
  return text
    .replace(/[‒-―−]/g, '-')
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/ /g, ' ')
    .replace(/[^\x20-\x7E\n]/g, '')
}

/** The only part that knows which SMS company you use. */
async function sendSms({ to, message, username, apiKey, senderId }) {
  const body = new URLSearchParams({ username, to, message })
  if (senderId) body.append('from', senderId)

  const response = await fetch('https://api.africastalking.com/version1/messaging', {
    method: 'POST',
    headers: {
      apiKey,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  const text = await response.text()
  if (!response.ok) throw new Error(`Africa's Talking ${response.status}: ${text}`)
  return text
}

export async function handler(event) {
  const { AT_USERNAME, AT_API_KEY, SMS_TO, AT_SENDER_ID } = process.env

  if (!AT_USERNAME || !AT_API_KEY || !SMS_TO) {
    console.log('SMS not configured (AT_USERNAME, AT_API_KEY, SMS_TO) — skipping.')
    return { statusCode: 200, body: 'sms disabled' }
  }

  let payload
  try {
    payload = JSON.parse(event.body ?? '{}').payload
  } catch {
    console.warn('Unparseable body — ignoring.')
    return { statusCode: 200, body: 'ignored' }
  }

  // Only shapes Netlify actually sends. Anything else is someone poking the
  // function's URL, and every text it sends costs real money.
  const data = payload?.data
  const formName = payload?.form_name
  if (!data || typeof data !== 'object' || !['contact', 'commission'].includes(formName)) {
    console.warn('Not a recognised form submission — ignoring.')
    return { statusCode: 200, body: 'ignored' }
  }

  // A filled honeypot means a bot. Netlify usually catches these first.
  if (data['bot-field']) {
    console.log('Honeypot filled — not texting.')
    return { statusCode: 200, body: 'spam' }
  }

  const message = toGsm(compose(formName, data)).slice(0, 300)

  try {
    await sendSms({
      to: SMS_TO,
      message,
      username: AT_USERNAME,
      apiKey: AT_API_KEY,
      senderId: AT_SENDER_ID,
    })
    console.log(`Texted ${SMS_TO} about a ${formName} enquiry.`)
  } catch (error) {
    // Never fail the submission over this. The enquiry is already saved and
    // emailed; a failed text must not look to anyone like a lost enquiry.
    console.error('SMS failed:', error.message)
  }

  return { statusCode: 200, body: 'ok' }
}
