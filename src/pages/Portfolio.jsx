import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { artworks, COLLECTIONS, MEDIUMS, STATUSES } from '../data/artworks'
import { artist } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import ArtworkCard from '../components/portfolio/ArtworkCard'
import FilterBar from '../components/portfolio/FilterBar'
import Lightbox from '../components/portfolio/Lightbox'
import Reveal from '../components/ui/Reveal'

const INITIAL_FILTERS = { collection: 'all', medium: 'all', status: 'all' }

export default function Portfolio() {
  usePageMeta({
    title: 'Portfolio',
    description:
      `Paintings and works on paper by ${artist.name}, filterable by collection, medium and availability. Nairobi, Kenya.`,
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  // A link such as /portfolio?piece=kariokor-blue opens straight into that
  // piece. Nothing is filtered on first render, so the index is the position
  // in the full set.
  const [openIndex, setOpenIndex] = useState(() => {
    const requested = searchParams.get('piece')
    return requested ? artworks.findIndex((piece) => piece.id === requested) : -1
  })

  const visible = useMemo(
    () =>
      artworks.filter(
        (piece) =>
          (filters.collection === 'all' || piece.collection === filters.collection) &&
          (filters.medium === 'all' || piece.medium === filters.medium) &&
          (filters.status === 'all' || piece.status === filters.status),
      ),
    [filters],
  )

  // The deep link has done its work; take it back out of the address bar so a
  // refresh or a share does not reopen the lightbox unexpectedly.
  useEffect(() => {
    if (searchParams.get('piece')) setSearchParams({}, { replace: true })
  }, [searchParams, setSearchParams])

  // Filtering while the lightbox is open could leave it pointing past the end
  // of the set, so the index is clamped as it is read rather than stored dirty.
  const activeIndex = openIndex >= visible.length ? -1 : openIndex

  const navigate = useCallback(
    (delta) => {
      setOpenIndex((current) => {
        if (current < 0 || visible.length === 0) return current
        return (current + delta + visible.length) % visible.length
      })
    },
    [visible.length],
  )

  const openPiece = useCallback(
    (piece) => setOpenIndex(visible.findIndex((item) => item.id === piece.id)),
    [visible],
  )

  return (
    <>
      <section className="mx-auto max-w-shell px-6 pb-16 pt-20 md:px-12 md:pt-28 lg:px-16">
        <Reveal>
          <p className="label mb-6">Portfolio</p>
          <h1 className="max-w-3xl text-[clamp(2.2rem,5.6vw,4rem)] font-light leading-[1.1] text-ink">
            Every piece, in one place
          </h1>
          <p className="mt-8 max-w-prose text-[1.0625rem] leading-[1.8] text-muted">
            Three ongoing series and the studies that sit between them. Sold work
            stays here — it is part of how the studio reads, and prints of some
            pieces remain available.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-shell px-6 md:px-12 lg:px-16">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          collections={COLLECTIONS}
          mediums={MEDIUMS}
          statuses={STATUSES}
          count={visible.length}
        />

        {visible.length === 0 ? (
          <p className="py-32 text-center font-serif text-2xl font-light text-muted">
            Nothing matches that combination just yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-8 gap-y-16 py-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-24">
            {visible.map((piece, index) => (
              <li key={piece.id}>
                <ArtworkCard
                  piece={piece}
                  index={index}
                  onOpen={openPiece}
                  offset={index % 3 === 1}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {activeIndex >= 0 ? (
        <Lightbox
          pieces={visible}
          index={activeIndex}
          onClose={() => setOpenIndex(-1)}
          onNavigate={navigate}
        />
      ) : null}
    </>
  )
}
