import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { artist, site } from '../data/site'
import { artworkAlt, featuredArtworks, heroArtwork } from '../data/artworks'
import { priceFloor } from '../data/products'
import { commissionTiers } from '../data/commissions'
import { useCurrency } from '../context/currency-store'
import { usePageMeta } from '../hooks/usePageMeta'
import { useImageSrc } from '../hooks/useImageSrc'
import ArtImage from '../components/ui/ArtImage'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Wordmark from '../components/ui/Wordmark'
import NewsletterForm from '../components/forms/NewsletterForm'

function Hero() {
  // No caption on the stand-in: a full-bleed hero has type over it, and a
  // label baked into the placeholder would read as part of the design.
  const image = useImageSrc(heroArtwork.image, {
    seed: heroArtwork.id,
    label: '',
    ratio: '16/9',
  })

  return (
    <section className="relative flex min-h-[94vh] items-end overflow-hidden bg-ink">
      <img
        src={image.src}
        onError={image.onError}
        alt={artworkAlt(heroArtwork)}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      {/* Scrim: the type sits in the lower third, so the weight sits there too. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/30"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(26,25,24,0.92) 0%, rgba(26,25,24,0.66) 34%, rgba(26,25,24,0.18) 68%, rgba(26,25,24,0.05) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-shell px-6 pb-20 pt-40 md:px-12 md:pb-28 lg:px-16">
        {/* Off-centre: the block sits left and stops well short of the right margin. */}
        <div className="max-w-2xl animate-riseIn">
          <h1 className="text-canvas">
            <Wordmark className="text-[clamp(2.75rem,8vw,5.25rem)]" tone="light" />
          </h1>
          <p className="mt-8 max-w-xl font-serif text-[clamp(1.25rem,2.6vw,1.85rem)] font-light italic leading-[1.5] text-canvas/90">
            {site.tagline}
          </p>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-canvas/70">
            {site.heroLine}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button to="/portfolio" variant="light">
              View the collection
            </Button>
            <Button to="/commissions" variant="quietLight" className="sm:px-4 sm:py-4">
              Commission a piece
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>

      <p className="absolute bottom-8 right-6 hidden max-w-[14rem] text-right font-sans text-[0.7rem] uppercase leading-relaxed tracking-label text-canvas/55 md:block lg:right-16">
        {heroArtwork.title}, {heroArtwork.year}
        <span className="mt-1 block">{heroArtwork.dimensions}</span>
      </p>
    </section>
  )
}

function Featured() {
  const pieces = featuredArtworks.slice(0, 5)

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <SectionHeading
        eyebrow="A short selection"
        title="Work currently in the studio"
        standfirst="Five pieces from three ongoing series. The full collection runs to a little over forty."
        action={
          <Button to="/portfolio" variant="quiet" className="gap-3">
            All work
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        }
      />

      {/* Staggered on wide screens: the second column drops, the fifth piece
          runs wide beneath. Composed, not accidental. */}
      <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {pieces.map((piece, index) => (
          <Reveal
            key={piece.id}
            delay={index * 110}
            className={index % 3 === 1 ? 'lg:mt-24' : ''}
          >
            <Link
              to={`/portfolio?piece=${piece.id}`}
              className="group block"
              aria-label={`${piece.title}, ${piece.year} — view in the portfolio`}
            >
              <ArtImage
                src={piece.image}
                alt={artworkAlt(piece)}
                ratio="4/5"
                seed={piece.id}
                label={piece.title}
                zoomOnHover
                className="shadow-piece transition-shadow duration-[600ms] ease-gallery group-hover:shadow-lift"
              />
              <h3 className="mt-5 font-serif text-[1.35rem] font-light leading-tight text-ink">
                {piece.title}
                <span className="text-muted">, {piece.year}</span>
              </h3>
              <p className="mt-1.5 text-base text-muted">{piece.dimensions}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function AboutBand() {
  return (
    <section className="border-y border-taupe/50 bg-bone/45">
      <div className="mx-auto grid max-w-shell items-center gap-14 px-6 py-24 md:grid-cols-12 md:px-12 md:py-32 lg:px-16">
        <Reveal className="md:col-span-5">
          <ArtImage
            src={artist.portrait}
            alt={artist.portraitAlt}
            ratio="4/5"
            seed="artist-portrait"
            label={artist.name}
            className="shadow-piece"
          />
        </Reveal>
        <Reveal delay={120} className="md:col-span-6 md:col-start-7">
          <p className="label mb-6">The artist</p>
          <h2 className="font-serif text-[clamp(1.85rem,4vw,3rem)] font-light leading-[1.2] text-ink">
            {artist.name}
          </h2>
          <p className="mt-4 text-base text-muted">{artist.role}</p>
          <p className="mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
            {artist.shortBio}
          </p>
          <Button to="/about" variant="quiet" className="mt-10 gap-3">
            Read the full story
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

function CommissionsTeaser() {
  const { from } = useCurrency()
  const lowest = Math.min(...commissionTiers.map((tier) => tier.from))

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <div className="grid gap-14 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-6">
          <p className="label mb-6">Commissions</p>
          <h2 className="font-serif text-[clamp(1.9rem,4.4vw,3.15rem)] font-light leading-[1.15] text-ink">
            A piece made for one wall, in one room, for one person
          </h2>
          <p className="mt-7 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
            Four commissions are taken at a time. It starts with a conversation about
            the room and ends with the work hung — {from(lowest)}, four to sixteen
            weeks depending on scale.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button to="/commissions">Start an enquiry</Button>
            <Button to="/commissions" variant="quiet" className="gap-3">
              How it works
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={140} className="md:col-span-5 md:col-start-8">
          <ArtImage
            src="/images/commission/commissioned-diptych-for-private-residence-nairobi.jpg"
            alt="A commissioned two-panel painting hung above a stone fireplace in a Nairobi home"
            ratio="4/5"
            seed="commission-teaser"
            label="Commissioned diptych"
            className="shadow-piece"
          />
        </Reveal>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-28 lg:px-16">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <p className="label mb-6 text-taupe">Stay in touch</p>
            <h2 className="font-serif text-[clamp(1.7rem,3.4vw,2.5rem)] font-light leading-[1.2] text-canvas">
              New work, shown here first
            </h2>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-[1.8] text-canvas/70">
              A short letter when a series is finished or a show opens. Six or seven
              times a year, never more.
            </p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5 md:col-start-8">
            <div className="[&_label]:text-taupe [&_input]:text-canvas [&_input]:border-b-canvas/30 [&_input::placeholder]:text-canvas/40">
              <NewsletterForm tone="light" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  usePageMeta({
    title: 'Contemporary paintings from Nairobi',
    description: `${site.tagline} Original mixed-media paintings, limited prints and commissioned work by ${artist.name}, from ${priceFloor.toLocaleString('en-KE')} KES.`,
  })

  return (
    <>
      <Hero />
      <Featured />
      <AboutBand />
      <CommissionsTeaser />
      <Newsletter />
    </>
  )
}
