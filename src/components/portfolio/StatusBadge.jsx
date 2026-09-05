const TONE = {
  available: 'text-accentDeep border-accent/60',
  sold: 'text-muted border-taupe',
  'print-only': 'text-muted border-taupe',
}

const TEXT = {
  available: 'Available',
  sold: 'Sold',
  'print-only': 'Print only',
}

/** A statement of fact, never a nudge. */
export default function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-block border px-2.5 py-1 font-sans text-[0.62rem] uppercase tracking-label ${TONE[status]} ${className}`}
    >
      {TEXT[status]}
    </span>
  )
}
