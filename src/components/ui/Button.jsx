import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 font-sans text-[0.78rem] font-medium uppercase tracking-label transition-colors duration-500 ease-gallery disabled:cursor-not-allowed disabled:opacity-45'

const variants = {
  primary: 'bg-ink text-canvas px-8 py-4 hover:bg-accentDeep',
  outline:
    'border border-ink/25 text-ink px-8 py-4 hover:border-accent hover:text-accentDeep',
  light:
    'border border-canvas/40 text-canvas px-8 py-4 hover:border-canvas hover:bg-canvas hover:text-ink',
  quiet: 'text-ink hover:text-accentDeep',
  // For dark grounds. A caller cannot simply pass `text-canvas` to `quiet`:
  // both colour utilities have the same specificity and Tailwind's stylesheet
  // order, not the class string, would pick the winner.
  quietLight: 'text-canvas hover:text-accent',
}

const sizes = {
  default: '',
  small: 'px-6 py-3 text-[0.72rem]',
  full: 'w-full',
}

/**
 * One button, three weights. Routes use <Link>, external targets use <a>,
 * everything else is a real <button> so keyboard behaviour comes free.
 */
export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  const Tag = as ?? 'button'
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
