import { useReveal } from '../../hooks/useReveal'

/**
 * Fade-and-rise as the element enters the viewport, with an optional
 * stagger for grid children. Reduced motion is handled inside useReveal:
 * the content is simply there.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const { ref, revealed } = useReveal()

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: revealed ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-[900ms] ease-gallery motion-reduce:transition-none ${
        revealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
