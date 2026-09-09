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

export const COLLECTIONS = ['Portraits', 'Studies', 'Landscapes', 'Afternoon Rooms', 'Market Mornings', 'Paper Weather']

export const MEDIUMS = [
  'Charcoal and paint on canvas',
  'Coloured pencil on paper',
  'Paint on canvas',
  'Charcoal on paper',
]

export const STATUSES = [
  { value: 'available', label: 'Available' },
  { value: 'sold', label: 'Sold' },
  { value: 'print-only', label: 'Print only' },
]

export const artworks = [
  {
    id: 'ocean-view',
    title: 'Ocean View',
    year: 2026,
    collection: 'Afternoon Rooms',
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
    id: 'ngara-window',
    title: 'Ngara Window',
    year: 2024,
    collection: 'Afternoon Rooms',
    medium: 'Charcoal and paint on canvas',
    dimensions: '100 × 80 cm',
    ratio: '5/4',
    status: 'sold',
    note: 'Painted from memory of a rented room I lived in for two years. The window frame is the one line I drew first and never corrected.',
    image: '/images/artwork/ngara-window-charcoal-and-paint-on-canvas.jpg',
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
    id: 'the-quiet-after',
    title: 'The Quiet After',
    year: 2023,
    collection: 'Afternoon Rooms',
    medium: 'Charcoal and paint on canvas',
    dimensions: '80 × 80 cm',
    ratio: '1/1',
    status: 'sold',
    note: 'A room ten minutes after everyone has left it. The chair is the only thing I painted from life.',
    image: '/images/artwork/the-quiet-after-charcoal-and-paint-on-canvas.jpg',
  },
  {
    id: 'paper-weather-i',
    title: 'Paper Weather I',
    year: 2024,
    collection: 'Paper Weather',
    medium: 'Charcoal on paper',
    dimensions: '56 × 42 cm',
    ratio: '4/3',
    status: 'print-only',
    note: 'The first of nine studies made during a long rainy season. The originals are held together as a set.',
    image: '/images/artwork/paper-weather-i-charcoal-on-paper.jpg',
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
    id: 'mama-mboga',
    title: 'Mama Mboga',
    year: 2023,
    collection: 'Market Mornings',
    medium: 'Charcoal and paint on canvas',
    dimensions: '110 × 85 cm',
    ratio: '13/10',
    status: 'sold',
    note: 'Sixteen years in the same spot on the same corner. I asked before I painted her.',
    image: '/images/artwork/mama-mboga-charcoal-and-paint-on-canvas.jpg',
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
  {
    id: 'unfinished-letter',
    title: 'Unfinished Letter',
    year: 2025,
    collection: 'Paper Weather',
    medium: 'Charcoal on paper',
    dimensions: '42 × 30 cm',
    ratio: '7/5',
    status: 'available',
    price: 28000,
    note: 'Drawn out of a letter I could not send. The words are under the charcoal now; only the ruled lines still show.',
    image: '/images/artwork/unfinished-letter-charcoal-on-paper.jpg',
  },
  {
    id: 'study-for-ocean-view',
    title: 'Study for Ocean View',
    year: 2024,
    collection: 'Paper Weather',
    medium: 'Charcoal on paper',
    dimensions: '30 × 24 cm',
    ratio: '5/4',
    status: 'available',
    price: 18000,
    note: 'One of five studies for the larger canvas. Small, and the one I nearly kept.',
    image: '/images/artwork/study-for-ocean-view-charcoal-on-paper.jpg',
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
]

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
