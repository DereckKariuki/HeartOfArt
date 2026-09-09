import { artist } from './site'

/**
 * REPLACE: the portfolio. One entry per piece.
 *
 * `image`  — drop the real file at this exact path in /public and the
 *            placeholder disappears. Keep the descriptive filename:
 *            it is what image search reads.
 * `ratio`  — the aspect ratio of the supplied photograph, so containers
 *            fit it exactly. The grid still crops every card to a shared
 *            4:5 so the page reads as curated; the lightbox shows the
 *            whole frame.
 * `status` — 'available' | 'sold' | 'print-only'
 * `price`  — whole KES. Omit for sold pieces.
 */

export const artworks = [
  {
    id: 'ocean-view',
    title: 'Ocean View',
    year: 2026,
    collection: 'Landscapes',
    medium: 'Paint on canvas',
    dimensions: '30 × 20 cm',
    ratio: '3/2',
    status: 'available',
    price: 3000,
    // REPLACE: a note in the artist's voice about this piece.
    note: 'Surf coming in over red sand, painted small and close. The horizon sits high on purpose — most of the canvas is given to the water rather than the sky.',
    image: '/images/artwork/ocean-view-paint-on-canvas.jpg',
    featured: true,
    hero: true,
  },
  {
    id: 'newborn',
    // REPLACE: working titles. These describe the subject — they are not
    // titles you gave, and they are the first thing a visitor reads.
    title: 'Newborn',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE: shows "Price on request" until this is a number.
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/newborn-charcoal-on-paper.jpg',
  },
  {
    id: 'portrait-with-glasses',
    title: 'Portrait with Glasses',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/portrait-with-glasses-charcoal-on-paper.jpg',
  },
  {
    id: 'caged',
    title: 'Caged',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/caged-charcoal-on-paper.jpg',
  },
  {
    id: 'horse',
    title: 'Horse',
    year: 2026,
    collection: 'Studies',
    medium: 'Coloured pencil on paper',
    dimensions: null, // REPLACE
    ratio: '4/3',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/horse-coloured-pencil-on-paper.jpg',
  },
  {
    id: 'portrait-of-a-man',
    title: 'Portrait of a Man',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/portrait-of-a-man-charcoal-on-paper.jpg',
  },
  // ── Photographed work. Everything above this line is still placeholder. ──
  {
    id: 'come-to-the-father',
    title: 'Come to the Father',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: '30 × 40 cm',
    ratio: '3/4',
    status: 'available',
    price: 35000, // REPLACE: placeholder price.
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/come-to-the-father-charcoal-on-paper.jpg',
    featured: true,
  },
  {
    id: 'quiet-sail',
    title: 'Quiet Sail',
    year: 2026,
    collection: 'Landscapes',
    medium: 'Paint on canvas',
    // The photograph shows a portrait canvas, so this reads 20 wide by 30 tall.
    dimensions: '20 × 30 cm',
    ratio: '3/4',
    status: 'available',
    price: 30000, // REPLACE: placeholder price.
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/quiet-sail-paint-on-canvas.jpg',
    featured: true,
  },
  {
    id: 'sunset',
    title: 'Sunset',
    year: 2026,
    collection: 'Landscapes',
    medium: 'Paint on canvas',
    dimensions: '30 × 20 cm',
    ratio: '4/3',
    status: 'available',
    price: 30000, // REPLACE: placeholder price.
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/sunset-paint-on-canvas.jpg',
    featured: true,
  },
  {
    id: 'graduand-portrait',
    title: 'Graduand Portrait',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: '30 × 40 cm',
    ratio: '3/4',
    status: 'available',
    price: 35000, // REPLACE: placeholder price.
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/graduand-portrait-charcoal-on-paper.jpg',
    featured: true,
  },
  {
    id: 'couple',
    title: 'Couple',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: '40 × 30 cm',
    ratio: '4/3',
    status: 'available',
    price: 45000, // REPLACE: placeholder price.
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/couple-charcoal-on-paper.jpg',
    featured: true,
  },
  {
    id: 'child-at-the-wall',
    title: 'Child at the Wall',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/child-at-the-wall-charcoal-on-paper.jpg',
  },
  {
    id: 'santa-and-sleeping-child',
    title: 'Santa and Sleeping Child',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/santa-and-sleeping-child-charcoal-on-paper.jpg',
  },
  {
    id: 'lion',
    title: 'Lion',
    year: 2026,
    collection: 'Studies',
    medium: 'Coloured pencil on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/lion-coloured-pencil-on-paper.jpg',
  },
  {
    id: 'lion-on-the-rock',
    title: 'Lion on the Rock',
    year: 2026,
    collection: 'Studies',
    medium: 'Coloured pencil on paper',
    dimensions: null, // REPLACE
    ratio: '4/3',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/lion-on-the-rock-coloured-pencil-on-paper.jpg',
  },
  {
    id: 'man-in-a-suit',
    title: 'Man in a Suit',
    year: 2026,
    collection: 'Portraits',
    medium: 'Charcoal on paper',
    dimensions: null, // REPLACE
    ratio: '3/4',
    status: 'available',
    price: null, // REPLACE
    note: 'REPLACE: a note in the artist’s voice about this piece.',
    image: '/images/artwork/man-in-a-suit-charcoal-on-paper.jpg',
  },
]

/**
 * Filter options are derived from the work, not maintained beside it. Listing
 * them by hand meant a deleted piece could leave a collection or a medium in
 * the filter bar that matched nothing — a control that looks broken when a
 * visitor uses it.
 */
export const COLLECTIONS = [...new Set(artworks.map((piece) => piece.collection))]

export const MEDIUMS = [...new Set(artworks.map((piece) => piece.medium))]

const STATUS_LABELS = {
  available: 'Available',
  sold: 'Sold',
  'print-only': 'Print only',
}

/** Only the states some piece is actually in. */
export const STATUSES = Object.entries(STATUS_LABELS)
  .filter(([value]) => artworks.some((piece) => piece.status === value))
  .map(([value, label]) => ({ value, label }))

export const getArtwork = (id) => artworks.find((piece) => piece.id === id)

/**
 * A piece is buyable only when it is for sale AND carries a price. A real
 * work whose figure is not set yet is not free — the site says "price on
 * request" and routes to an enquiry rather than adding KES 0 to a cart.
 */
export const isPurchasable = (piece) =>
  piece.status !== 'sold' && piece.price != null

/** Alt text is derived so no piece can ship without it: title, medium, artist. */
export const artworkAlt = (piece) =>
  `${piece.title}, ${piece.year} — ${piece.medium}, ${piece.dimensions}, by ${artist.name}`

export const featuredArtworks = artworks.filter((piece) => piece.featured)

export const heroArtwork = artworks.find((piece) => piece.hero) ?? artworks[0]
