/**
 * REPLACE: the portfolio. One entry per piece.
 *
 * `image`  — drop the real file at this exact path in /public and the
 *            placeholder disappears. Keep the descriptive filename:
 *            it is what image search reads.
 * `ratio`  — the piece's true aspect ratio, used by the lightbox.
 *            The grid crops every card to a shared 4:5 so the page
 *            reads as curated.
 * `status` — 'available' | 'sold' | 'print-only'
 * `price`  — whole KES. Omit for sold pieces.
 */

export const COLLECTIONS = ['Afternoon Rooms', 'Market Mornings', 'Paper Weather']

export const MEDIUMS = [
  'Acrylic and paper collage on canvas',
  'Oil pastel and acrylic on board',
  'Mixed media on paper',
]

export const STATUSES = [
  { value: 'available', label: 'Available' },
  { value: 'sold', label: 'Sold' },
  { value: 'print-only', label: 'Print only' },
]

export const artworks = [
  {
    id: 'four-oclock-wall',
    title: 'Four O’Clock Wall',
    year: 2025,
    collection: 'Afternoon Rooms',
    medium: 'Acrylic and paper collage on canvas',
    dimensions: '120 × 90 cm',
    ratio: '4/3',
    status: 'available',
    price: 148000,
    note: 'The east wall of the studio at the hour the light gives up. Built over eleven layers; the newsprint underneath is from the week I moved in.',
    image: '/images/artwork/four-oclock-wall-acrylic-paper-collage-on-canvas.jpg',
    featured: true,
    hero: true,
  },
  {
    id: 'ngara-window',
    title: 'Ngara Window',
    year: 2024,
    collection: 'Afternoon Rooms',
    medium: 'Acrylic and paper collage on canvas',
    dimensions: '100 × 80 cm',
    ratio: '5/4',
    status: 'sold',
    note: 'Painted from memory of a rented room I lived in for two years. The frame of the window is a folded bus ticket.',
    image: '/images/artwork/ngara-window-acrylic-paper-collage-on-canvas.jpg',
    featured: true,
  },
  {
    id: 'woman-carrying-morning',
    title: 'Woman Carrying Morning',
    year: 2025,
    collection: 'Market Mornings',
    medium: 'Acrylic and paper collage on canvas',
    dimensions: '150 × 110 cm',
    ratio: '4/5',
    status: 'available',
    price: 150000,
    note: 'The largest piece in the series. She is not one person — she is composited from four mornings at Kariokor, sketched from the far side of the road.',
    image: '/images/artwork/woman-carrying-morning-acrylic-paper-collage-on-canvas.jpg',
    featured: true,
  },
  {
    id: 'kariokor-blue',
    title: 'Kariokor Blue',
    year: 2024,
    collection: 'Market Mornings',
    medium: 'Oil pastel and acrylic on board',
    dimensions: '90 × 70 cm',
    ratio: '9/7',
    status: 'available',
    price: 96000,
    note: 'One colour carried the whole piece — a blue tarpaulin that shaded half a row of stalls.',
    image: '/images/artwork/kariokor-blue-oil-pastel-acrylic-on-board.jpg',
    featured: true,
  },
  {
    id: 'the-quiet-after',
    title: 'The Quiet After',
    year: 2023,
    collection: 'Afternoon Rooms',
    medium: 'Acrylic and paper collage on canvas',
    dimensions: '80 × 80 cm',
    ratio: '1/1',
    status: 'sold',
    note: 'A room ten minutes after everyone has left it. The chair is the only thing I painted from life.',
    image: '/images/artwork/the-quiet-after-acrylic-paper-collage-on-canvas.jpg',
  },
  {
    id: 'paper-weather-i',
    title: 'Paper Weather I',
    year: 2024,
    collection: 'Paper Weather',
    medium: 'Mixed media on paper',
    dimensions: '56 × 42 cm',
    ratio: '4/3',
    status: 'print-only',
    note: 'The first of nine studies made during a long rainy season. The originals are held together as a set.',
    image: '/images/artwork/paper-weather-i-mixed-media-on-paper.jpg',
    featured: true,
  },
  {
    id: 'paper-weather-iv',
    title: 'Paper Weather IV',
    year: 2024,
    collection: 'Paper Weather',
    medium: 'Mixed media on paper',
    dimensions: '56 × 42 cm',
    ratio: '4/3',
    status: 'available',
    price: 42000,
    note: 'Rain on the fourth day. Sugar paper, ink and a great deal of water.',
    image: '/images/artwork/paper-weather-iv-mixed-media-on-paper.jpg',
  },
  {
    id: 'three-chairs-riverside',
    title: 'Three Chairs, Riverside',
    year: 2025,
    collection: 'Afternoon Rooms',
    medium: 'Oil pastel and acrylic on board',
    dimensions: '70 × 100 cm',
    ratio: '10/7',
    status: 'available',
    price: 88000,
    note: 'Painted in one week, which is unusual for me. The chairs belong to the café below the studio.',
    image: '/images/artwork/three-chairs-riverside-oil-pastel-acrylic-on-board.jpg',
  },
  {
    id: 'mama-mboga',
    title: 'Mama Mboga',
    year: 2023,
    collection: 'Market Mornings',
    medium: 'Acrylic and paper collage on canvas',
    dimensions: '110 × 85 cm',
    ratio: '13/10',
    status: 'sold',
    note: 'Sixteen years in the same spot on the same corner. I asked before I painted her.',
    image: '/images/artwork/mama-mboga-acrylic-paper-collage-on-canvas.jpg',
  },
  {
    id: 'hot-tin-roof',
    title: 'Hot Tin Roof',
    year: 2022,
    collection: 'Market Mornings',
    medium: 'Oil pastel and acrylic on board',
    dimensions: '60 × 60 cm',
    ratio: '1/1',
    status: 'available',
    price: 54000,
    note: 'An early piece, and still the closest I have come to painting heat rather than light.',
    image: '/images/artwork/hot-tin-roof-oil-pastel-acrylic-on-board.jpg',
  },
  {
    id: 'unfinished-letter',
    title: 'Unfinished Letter',
    year: 2025,
    collection: 'Paper Weather',
    medium: 'Mixed media on paper',
    dimensions: '42 × 30 cm',
    ratio: '7/5',
    status: 'available',
    price: 28000,
    note: 'Built around a page I could not send. It is face down in the collage; only the edge of it shows.',
    image: '/images/artwork/unfinished-letter-mixed-media-on-paper.jpg',
  },
  {
    id: 'study-for-four-oclock',
    title: 'Study for Four O’Clock',
    year: 2024,
    collection: 'Paper Weather',
    medium: 'Mixed media on paper',
    dimensions: '30 × 24 cm',
    ratio: '5/4',
    status: 'available',
    price: 18000,
    note: 'One of five studies for the larger canvas. Small, and the one I nearly kept.',
    image: '/images/artwork/study-for-four-oclock-mixed-media-on-paper.jpg',
  },
]

export const getArtwork = (id) => artworks.find((piece) => piece.id === id)

/** Alt text is derived so no piece can ship without it: title, medium, artist. */
export const artworkAlt = (piece) =>
  `${piece.title}, ${piece.year} — ${piece.medium}, ${piece.dimensions}, by Amani Wachira`

export const featuredArtworks = artworks.filter((piece) => piece.featured)

export const heroArtwork = artworks.find((piece) => piece.hero) ?? artworks[0]
