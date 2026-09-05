import { useSearchParams } from 'react-router-dom'
import { Camera, Mail, MessageCircle, Phone } from 'lucide-react'
import { contact } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/forms/ContactForm'

const channels = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
  { label: 'Phone', value: contact.phone, href: contact.phoneHref, Icon: Phone },
  { label: 'WhatsApp', value: contact.whatsapp, href: contact.whatsappHref, Icon: MessageCircle },
  { label: 'Instagram', value: contact.instagram, href: contact.instagramHref, Icon: Camera },
]

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description:
      'Enquire about a painting, a print or a commission. HeartOfArt studio, Riverside Drive, Nairobi. Viewings by appointment.',
  })

  const [searchParams] = useSearchParams()
  const piece = searchParams.get('piece')

  return (
    <section className="mx-auto max-w-shell px-6 pb-28 pt-20 md:px-12 md:pt-28 lg:px-16">
      <Reveal>
        <p className="label mb-6">Contact</p>
        <h1 className="max-w-3xl text-[clamp(2.2rem,5.6vw,4rem)] font-light leading-[1.08] text-ink">
          {piece ? `Enquiring about ${piece}` : 'Say hello'}
        </h1>
        <p className="mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
          {piece
            ? 'The details are filled in below — add anything you would like to know about the piece, its condition or delivery.'
            : 'About a piece, a print, a commission, or a visit to the studio. Whichever it is, this reaches the studio directly.'}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <ContactForm presetSubject={piece ? `Enquiry: ${piece}` : ''} />
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <Reveal>
            <h2 className="label mb-6">The studio</h2>
            <address className="not-italic text-[1.0625rem] leading-[1.8] text-ink">
              {contact.studio.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-muted">
              {contact.studio.note}
            </p>
          </Reveal>

          <Reveal delay={110}>
            <hr className="hairline my-10" />
            <h2 className="label mb-6">Direct</h2>
            <ul className="space-y-5">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label} className="flex items-start gap-4">
                  <Icon
                    aria-hidden="true"
                    className="mt-1 h-[1.05rem] w-[1.05rem] shrink-0 text-accentDeep"
                    strokeWidth={1.25}
                  />
                  <span>
                    <span className="block text-base text-muted">{label}</span>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className="link-underline text-[1.0625rem] text-ink"
                    >
                      {value}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <hr className="hairline my-10" />
            <h2 className="label mb-4">Response time</h2>
            <p className="max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
              {contact.responseTime}
            </p>
          </Reveal>
        </aside>
      </div>
    </section>
  )
}
