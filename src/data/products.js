import { artworks, artworkAlt } from './artworks'

/**
 * REPLACE: shop copy, prices and framing costs.
 *
 * Originals are generated from the portfolio so a piece is never
 * described twice. Sold originals stay listed — purchase is disabled,
 * the work stays visible.
 */

// REPLACE: framing options and their surcharges (whole KES).
export const framingOptions = [
  { id: 'unframed', label: 'Unframed', surcharge: 0, note: 'Originals arrive stretched and ready to hang; prints ship flat with their margin intact.' },
  { id: 'oak', label: 'Natural oak float frame', surcharge: 14000, note: 'Hand-finished to order. Adds 3 cm on each side.' },
  { id: 'ash', label: 'Blackened ash frame', surcharge: 16000, note: 'Matte black, museum glass on works on paper.' },
]

// REPLACE: your real shipping terms.
export const shippingNote =
  'Originals ship rolled or crated depending on size. Local delivery is hand-carried by the studio; countrywide and international orders go by insured courier. Framed work is packed flat in a custom crate.'

const inSituAlt = (piece) =>
  `${piece.title} hung above a low sideboard in a sunlit room, showing scale`

const framedAlt = (piece) =>
  `${piece.title} in a natural oak float frame against a pale wall`

const originalSource = artworks.filter((piece) => piece.status !== 'print-only')

export const originals = originalSource.map((piece) => ({
  id: `original-${piece.id}`,
  kind: 'original',
  artworkId: piece.id,
  title: piece.title,
  year: piece.year,
  collection: piece.collection,
  medium: piece.medium,
  dimensions: piece.dimensions,
  ratio: piece.ratio,
  status: piece.status,
  price: piece.price ?? null,
  description: piece.note,
  edition: 'Original, one of one. Signed on the reverse and supplied with a certificate of authenticity.',
  images: [
    { src: piece.image, alt: artworkAlt(piece), caption: 'The work' },
    {
      src: piece.image.replace('/artwork/', '/artwork-framed/').replace('.jpg', '-framed-oak.jpg'),
      alt: framedAlt(piece),
      caption: 'Framed in oak',
    },
    {
      src: piece.image.replace('/artwork/', '/artwork-in-situ/').replace('.jpg', '-in-situ.jpg'),
      alt: inSituAlt(piece),
      caption: 'In a room',
    },
  ],
}))

// REPLACE: the print catalogue, edition sizes and per-size prices.
export const prints = [
  {
    id: 'print-ocean-view',
    kind: 'print',
    artworkId: 'ocean-view',
    title: 'Ocean View',
    year: 2026,
    collection: 'Landscapes',
    medium: 'Giclée on 310gsm cotton rag',
    ratio: '3/2',
    status: 'available',
    edition: 'Limited edition of 50 per size. Numbered and signed in pencil in the margin.',
    description:
      'Printed from a 100-megapixel capture of the original, so the charcoal grain and the tooth of the paper stay legible. A 4 cm unprinted margin is left on every size for framing.',
    sizes: [
      { id: 'a3', label: 'A3 — 42 × 30 cm', price: 8000 },
      { id: 'a2', label: 'A2 — 59 × 42 cm', price: 14000 },
      { id: 'a1', label: 'A1 — 84 × 59 cm', price: 24000 },
    ],
    images: [
      {
        src: '/images/print/ocean-view-giclee-print-on-cotton-rag.jpg',
        alt: 'Ocean View giclée print on cotton rag paper, showing the unprinted margin',
        caption: 'The print',
      },
      {
        src: '/images/print/ocean-view-giclee-print-framed-oak.jpg',
        alt: 'Ocean View print in a natural oak frame against a pale wall',
        caption: 'Framed in oak',
      },
      {
        src: '/images/print/ocean-view-giclee-print-in-situ.jpg',
        alt: 'Ocean View print hung above a desk in a sunlit room, showing scale',
        caption: 'In a room',
      },
    ],
  },
]

export const allProducts = [...originals, ...prints]

export const getProduct = (id) => allProducts.find((product) => product.id === id)

/**
 * Lowest purchasable price across the catalogue, for "from" copy.
 *
 * Originals count too. This used to read prints only, which held while the
 * cheapest print undercut every original — the moment one did not, the site
 * advertised a floor above its own cheapest work. Sold originals are excluded
 * because they carry no price and cannot be bought.
 */
export const priceFloor = Math.min(
  ...originals.filter((o) => o.price != null).map((o) => o.price),
  ...prints.flatMap((p) => p.sizes.map((s) => s.price)),
)
