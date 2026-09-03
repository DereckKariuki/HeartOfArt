import { Link } from 'react-router-dom'
import { Camera, Mail, MessageCircle, Phone } from 'lucide-react'
import { contact, nav, site } from '../../data/site'
import Wordmark from '../ui/Wordmark'

const socials = [
  { href: contact.instagramHref, label: `Instagram, ${contact.instagram}`, Icon: Camera },
  { href: contact.whatsappHref, label: `WhatsApp, ${contact.whatsapp}`, Icon: MessageCircle },
  { href: `mailto:${contact.email}`, label: `Email, ${contact.email}`, Icon: Mail },
  { href: contact.phoneHref, label: `Telephone, ${contact.phone}`, Icon: Phone },
]

export default function Footer() {
  return (
    <footer className="border-t border-taupe/50 bg-canvas">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-12 lg:px-16">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-[1.75rem]" />
            <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="label mt-8">{site.city}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="label mb-6">Explore</h2>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-underline text-[1.0625rem] text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="label mb-6">Studio</h2>
            <address className="not-italic text-[1.0625rem] leading-relaxed text-muted">
              {contact.studio.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={`mailto:${contact.email}`} className="link-underline text-[1.0625rem] text-ink">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="link-underline text-[1.0625rem] text-ink">
                  {contact.phone}
                </a>
              </li>
            </ul>

            <ul className="mt-8 flex items-center gap-5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex text-muted transition-colors duration-500 hover:text-accentDeep"
                  >
                    <Icon aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="hairline my-14" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-muted">
            © {new Date().getFullYear()} {site.name}. All works copyright the artist.
          </p>
          <p className="text-base text-muted">
            Prices in Kenyan shillings. USD shown for reference only.
          </p>
        </div>
      </div>
    </footer>
  )
}
