import {
  commissionHero,
  commissionSteps,
  commissionTerms,
  commissionTiers,
  progressGallery,
} from '../data/commissions'
import { useCurrency } from '../context/currency-store'
import { usePageMeta } from '../hooks/usePageMeta'
import { useImageSrc } from '../hooks/useImageSrc'
import ArtImage from '../components/ui/ArtImage'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import CommissionForm from '../components/forms/CommissionForm'

function Hero() {
  const image = useImageSrc(commissionHero.image, {
    seed: 'commission-hero',
    label: '',
    ratio: '16/9',
  })

  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink">
      <img
        src={image.src}
        onError={image.onError}
        alt={commissionHero.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(26,25,24,0.92) 0%, rgba(26,25,24,0.62) 40%, rgba(26,25,24,0.16) 74%, rgba(26,25,24,0.05) 100%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-shell px-6 pb-20 pt-40 md:px-12 md:pb-24 lg:px-16">
        <div className="max-w-2xl animate-riseIn">
          <p className="label mb-6 text-taupe">Commissions</p>
          <h1 className="text-[clamp(2.2rem,6vw,4.25rem)] font-light leading-[1.08] text-canvas">
            Something made for your wall
          </h1>
          <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.8] text-canvas/75">
            Four commissions run at a time, so each one gets the same attention as
            work made for a show. It begins with a conversation about the room.
          </p>
        </div>
      </div>
      <p className="label absolute bottom-8 right-6 hidden max-w-[16rem] text-right leading-relaxed text-canvas/60 md:block lg:right-16">
        {commissionHero.caption}
      </p>
    </section>
  )
}

function Process() {
  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <SectionHeading
        eyebrow="The process"
        title="Four steps, start to hung"
        standfirst="No surprises, and nothing you have to chase."
      />
      <ol className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {commissionSteps.map((step, index) => (
          <Reveal as="li" key={step.n} delay={index * 110}>
            <p className="font-serif text-[2.75rem] font-light leading-none text-accentDeep">
              {step.n}
            </p>
            <hr className="hairline my-6" />
            <h3 className="font-serif text-[1.5rem] font-light text-ink">{step.title}</h3>
            <p className="mt-4 text-[1.0625rem] leading-[1.8] text-muted">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Tiers() {
  const { from } = useCurrency()

  return (
    <section className="border-y border-taupe/50 bg-bone/40">
      <div className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
        <SectionHeading
          eyebrow="Pricing"
          title="Three sizes, and what each includes"
          standfirst="Figures are starting points. The quote you receive is fixed and itemised."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {commissionTiers.map((tier, index) => (
            <Reveal
              key={tier.id}
              delay={index * 120}
              className={`flex flex-col border bg-canvas px-8 py-10 ${
                tier.highlight ? 'border-accent shadow-piece' : 'border-taupe/60'
              }`}
            >
              <h3 className="font-serif text-[1.9rem] font-light text-ink">{tier.name}</h3>
              <p className="mt-3 text-base leading-snug text-muted">{tier.sizes}</p>
              <p className="mt-8 font-serif text-[2.1rem] font-light tabular-nums text-ink">
                {from(tier.from)}
              </p>
              <p className="label mt-3">{tier.lead}</p>
              <hr className="hairline my-8" />
              <ul className="flex-1 space-y-3">
                {tier.includes.map((line) => (
                  <li key={line} className="flex gap-3 text-[1.0625rem] leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              <Button href="#enquiry" variant="outline" size="small" className="mt-10">
                Enquire about {tier.name}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgressGallery() {
  // Empty the `progressGallery` array in src/data/commissions.js and this
  // whole section disappears until you have photography for it.
  if (progressGallery.length === 0) return null

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <SectionHeading
        eyebrow="In progress"
        title="A commission, week by week"
        standfirst="From the underpainting to the wall it was made for. Nine weeks, two panels."
      />
      <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {progressGallery.map((shot, index) => (
          <Reveal as="li" key={shot.src} delay={index * 100}>
            <ArtImage
              src={shot.src}
              alt={shot.alt}
              ratio="4/5"
              seed={shot.src}
              label={shot.caption}
              className="shadow-piece"
            />
            <p className="label mt-4">{shot.caption}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Terms() {
  return (
    <section className="border-t border-taupe/50">
      <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-28 lg:px-16">
        <SectionHeading eyebrow="Plainly" title="What to expect" as="h2" />
        <dl className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {commissionTerms.map((item, index) => (
            <Reveal key={item.term} delay={index * 90}>
              <dt className="label mb-3">{item.term}</dt>
              <dd className="max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
                {item.detail}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Enquiry() {
  return (
    <section id="enquiry" className="scroll-mt-28 border-t border-taupe/50 bg-bone/40">
      <div className="mx-auto max-w-shell px-6 py-28 md:px-12 md:py-36 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <p className="label mb-6">Enquiry</p>
            <h2 className="font-serif text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.15] text-ink">
              Tell me about the room
            </h2>
            <p className="mt-7 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
              The more you can say about where the piece will live, the better the first
              quote will be. If you are not sure of the size, describe the wall and I
              will work it out.
            </p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <CommissionForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Commissions() {
  usePageMeta({
    title: 'Commissions',
    description:
      'Commission an original charcoal or painted work from Amani Wachira in Nairobi. Three size tiers from KES 45,000, four to sixteen weeks, framing and delivery included.',
  })

  return (
    <>
      <Hero />
      <Process />
      <Tiers />
      <ProgressGallery />
      <Terms />
      <Enquiry />
    </>
  )
}
