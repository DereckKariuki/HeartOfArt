import { site } from '../../data/site'

/**
 * The wordmark. One typeface throughout — "Heart" carries a lighter weight
 * than "Art", and the joining "Of" drops to the accent. No second face.
 */
export default function Wordmark({ className = '', tone = 'ink' }) {
  const { first, middle, last } = site.wordmark
  const accent = tone === 'light' ? 'text-accent' : 'text-accentDeep'

  return (
    <span
      className={`font-serif tracking-wordmark leading-none ${className}`}
      aria-label={site.name}
    >
      <span className="font-light">{first}</span>
      <span className={`font-normal ${accent}`}>{middle}</span>
      <span className="font-semibold">{last}</span>
    </span>
  )
}
