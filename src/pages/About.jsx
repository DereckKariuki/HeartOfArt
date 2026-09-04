import { ArrowRight } from 'lucide-react'
import { artist, collections, exhibitions, press } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useImageSrc } from '../hooks/useImageSrc'
import ArtImage from '../components/ui/ArtImage'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

function Portrait() {
  const image = useImageSrc(artist.portrait, {
    seed: 'artist-portrait-wide',
    label: '',
    ratio: '16/9',
  })

  return (
    <section className="relative">
      <img
        src={image.src}
        onError={image.onError}
        alt={artist.portraitAlt}
        fetchPriority="high"
        className="h-[52vh] w-full object-cover md:h-[68vh]"
      />
      <div className="mx-auto max-w-shell px-6 md:px-12 lg:px-16">
        <div className="-mt-16 max-w-3xl bg-canvas pr-0 pt-10 md:-mt-24 md:pr-16 md:pt-14">
          <p className="label mb-6">About</p>
          <h1 className="text-[clamp(2.2rem,5.6vw,4rem)] font-light leading-[1.08] text-ink">
            {artist.name}
          </h1>
          <p className="mt-5 text-[1.0625rem] text-muted">
            {artist.role} · {artist.location}
          </p>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <h2 className="label sticky top-28">The story</h2>
        </Reveal>
        <div className="md:col-span-8 md:col-start-5">
          {artist.story.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 90}>
              <p
                className={`max-w-prose leading-[1.85] text-ink ${
                  index === 0
                    ? 'font-serif text-[clamp(1.35rem,2.4vw,1.75rem)] font-light'
                    : 'mt-8 text-[1.0625rem] text-muted'
                }`}
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="border-y border-taupe/50 bg-bone/40">
      <div className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
        <SectionHeading
          eyebrow="Process"
          title="How a piece comes together"
          standfirst="Four stages, ten to sixteen weeks. The middle two are where most of it happens."
        />
        <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {artist.process.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 110}>
              <ArtImage
                src={step.image}
                alt={step.alt}
                ratio="1/1"
                seed={step.title}
                label={step.title}
                className="shadow-piece"
              />
              <h3 className="mt-6 font-serif text-[1.5rem] font-light text-ink">{step.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.75] text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function RecordList({ heading, items }) {
  return (
    <div>
      <h3 className="label mb-8">{heading}</h3>
      <dl className="divide-y divide-taupe/40 border-t border-taupe/40">
        {items.map((item) => (
          <div key={`${item.year}-${item.title}`} className="flex gap-6 py-5">
            <dt className="w-14 shrink-0 font-sans text-base tabular-nums text-muted">
              {item.year}
            </dt>
            <dd>
              <span className="block text-[1.0625rem] leading-snug text-ink">{item.title}</span>
              <span className="mt-1 block text-base leading-snug text-muted">
                {item.detail}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Record() {
  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <SectionHeading eyebrow="Record" title="Exhibitions, press and collections" />
      <div className="mt-16 grid gap-14 lg:grid-cols-3">
        <Reveal>
          <RecordList heading="Exhibitions" items={exhibitions} />
        </Reveal>
        <Reveal delay={110}>
          <RecordList heading="Press" items={press} />
        </Reveal>
        <Reveal delay={220}>
          <RecordList heading="Collections" items={collections} />
        </Reveal>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="border-t border-taupe/50">
      <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-28 lg:px-16">
        <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-xl font-serif text-[clamp(1.8rem,3.8vw,2.75rem)] font-light leading-[1.2] text-ink">
              Take something home, or have something made
            </h2>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
              Originals and prints are in the shop. If what you want does not exist yet,
              that is what commissions are for.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-5">
            <Button to="/shop">Visit the shop</Button>
            <Button to="/commissions" variant="quiet" className="gap-3">
              Commissions
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  usePageMeta({
    title: `About — ${artist.name}`,
    description: `${artist.name} works in charcoal on paper and paint on canvas in Nairobi, Kenya. The story behind the work, the studio process, exhibitions and press.`,
  })

  return (
    <>
      <Portrait />
      <Story />
      <Process />
      <Record />
      <Close />
    </>
  )
}
