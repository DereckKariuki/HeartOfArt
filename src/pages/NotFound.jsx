import { usePageMeta } from '../hooks/usePageMeta'
import Button from '../components/ui/Button'

export default function NotFound() {
  usePageMeta({
    title: 'Page not found',
    description: 'That page does not exist. Return to the portfolio or the shop.',
  })

  return (
    <section className="mx-auto max-w-2xl px-6 py-40 text-center md:px-12">
      <p className="label mb-6">404</p>
      <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-light leading-tight text-ink">
        Nothing hangs here
      </h1>
      <p className="mx-auto mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
        The page you were after has moved or never existed. The work is all still
        where you left it.
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-5">
        <Button to="/portfolio">View the collection</Button>
        <Button to="/" variant="quiet">
          Home
        </Button>
      </div>
    </section>
  )
}
