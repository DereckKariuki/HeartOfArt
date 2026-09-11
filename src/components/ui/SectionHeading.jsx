import Reveal from './Reveal'

/**
 * The recurring section header: small-caps eyebrow, a light serif line,
 * an optional standfirst, and an optional action pinned to the right on
 * wide screens.
 */
export default function SectionHeading({
  eyebrow,
  title,
  standfirst,
  action,
  as = 'h2',
  align = 'left',
  className = '',
}) {
  const Tag = as
  return (
    <Reveal
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        align === 'center' ? 'md:flex-col md:items-center md:text-center' : ''
      } ${className}`}
    >
      <div className={align === 'center' ? 'max-w-prose' : 'max-w-prose'}>
        {eyebrow ? <p className="label mb-5">{eyebrow}</p> : null}
        <Tag className="text-[clamp(1.9rem,4.4vw,3.15rem)] leading-[1.15] text-ink">
          {title}
        </Tag>
        {standfirst ? (
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted">{standfirst}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  )
}
