/**
 * Brand marks for the social links.
 *
 * lucide-react dropped its brand icons at v1, so Instagram was standing in as
 * a camera and there is nothing at all for YouTube or TikTok. A generic glyph
 * on a social link is worse than no icon: the mark is the whole affordance —
 * people recognise the shape and click it without reading the label.
 *
 * Drawn to match the lucide icons beside them: 24×24 box, currentColor,
 * stroke-based, round caps and joins, and the same strokeWidth passed in by
 * the caller. Props mirror a lucide icon so they are interchangeable.
 */
function Glyph({ size = 24, strokeWidth = 1.25, children, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  )
}

export function Instagram(props) {
  return (
    <Glyph {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </Glyph>
  )
}

export function Youtube(props) {
  return (
    <Glyph {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </Glyph>
  )
}

export function Tiktok(props) {
  return (
    <Glyph {...props}>
      {/* Stem, bowl and the flag that hooks off the top right. */}
      <path d="M13.5 3.5v11.5" />
      <path d="M13.5 15a4.25 4.25 0 1 1-4.25-4.25" />
      <path d="M13.5 3.5a6 6 0 0 0 6 6" />
    </Glyph>
  )
}
