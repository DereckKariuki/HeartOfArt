/**
 * Three independent filters. Each row scrolls horizontally on phones
 * rather than wrapping into a wall of controls.
 */
function FilterRow({ legend, options, value, onChange }) {
  return (
    <fieldset className="min-w-0">
      <legend className="label mb-3">{legend}</legend>
      <div className="-mx-6 flex gap-1 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {options.map((option) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={`whitespace-nowrap border-b px-3 py-2 font-sans text-[0.78rem] transition-colors duration-500 ease-gallery ${
                selected
                  ? 'border-accent text-ink'
                  : 'border-transparent text-muted hover:border-taupe hover:text-ink'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function FilterBar({ filters, setFilters, collections, mediums, statuses, count }) {
  const set = (key) => (value) => setFilters((current) => ({ ...current, [key]: value }))

  const withAll = (items, allLabel) => [
    { value: 'all', label: allLabel },
    ...items.map((item) =>
      typeof item === 'string' ? { value: item, label: item } : item,
    ),
  ]

  const active =
    filters.collection !== 'all' || filters.medium !== 'all' || filters.status !== 'all'

  return (
    <div className="border-y border-taupe/50 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <FilterRow
          legend="Collection"
          options={withAll(collections, 'All collections')}
          value={filters.collection}
          onChange={set('collection')}
        />
        <FilterRow
          legend="Medium"
          options={withAll(mediums, 'All media')}
          value={filters.medium}
          onChange={set('medium')}
        />
        <FilterRow
          legend="Availability"
          options={withAll(statuses, 'Everything')}
          value={filters.status}
          onChange={set('status')}
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="label" role="status" aria-live="polite">
          {count} {count === 1 ? 'piece' : 'pieces'}
        </p>
        {active ? (
          <button
            type="button"
            onClick={() => setFilters({ collection: 'all', medium: 'all', status: 'all' })}
            className="font-sans text-[0.78rem] uppercase tracking-label text-muted underline underline-offset-4 transition-colors duration-500 hover:text-accentDeep"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
