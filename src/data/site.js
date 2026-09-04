/**
 * ─────────────────────────────────────────────────────────────
 * EVERYTHING YOU NEED TO REPLACE LIVES IN THIS FOLDER.
 * Each `REPLACE:` note says what real content belongs there.
 * Nothing in src/components or src/pages needs editing to
 * change copy, prices, contact details or artwork.
 * ─────────────────────────────────────────────────────────────
 */

// REPLACE: brand line, artist name and bio copy.
export const site = {
  name: 'HeartOfArt',
  // The wordmark is split so "Heart" and "Art" can be weighted differently.
  wordmark: { first: 'Heart', middle: 'Of', last: 'Art' },
  tagline: 'Art is not art if it makes you feel nothing',
  heroLine:
    'Charcoal on paper, paint on canvas, all this to capture emotions, feelings, and stories that connect with the Heart.',
  description:
    'HeartOfArt is the studio of Dereck Kariuki, working in charcoal on paper and paint on canvas in Nairobi. Original work, limited prints and commissions.',
  founded: 2016,
  city: 'Nairobi, Kenya',
  // REPLACE: the full-bleed image behind the top of the home page.
  // Deliberately an in-situ photograph rather than a flat shot of the work: a
  // room reads at full bleed and gives a visitor the scale straight away,
  // where a flat shot belongs in the portfolio grid. Landscape, 1600px wide or
  // more. The credit line in the corner is taken from the hero artwork in
  // artworks.js, so keep the two describing the same piece.
  heroImage: '/images/artwork/ocean-view-paint-on-canvas.jpg',
  heroImageAlt:
    'Ocean View, 2026 — a small seascape in paint on canvas, hung on a plaster wall in a Nairobi interior',
  // REPLACE: the circular brand mark. Save the file as
  // public/heartofart-logo.png and it appears in the header, the footer and
  // the browser tab. Square source with the medallion centred — the circle is
  // masked in CSS, so do not pre-crop it. 512×512 or larger.
  logo: '/heartofart-logo.png',
}

// The name, portrait and statement here are real. The process steps further
// down are still invented — REPLACE those.
export const artist = {
  name: 'Dereck Kariuki',
  role: 'Charcoal on paper, paint on canvas',
  location: 'Nairobi, Kenya',
  portrait: '/images/artist/dereck-kariuki-portrait-nairobi.jpg',
  portraitAlt: 'Dereck Kariuki, photographed outdoors in Nairobi',
  // The opening of the statement. The home page shows this much and links
  // through to About, which carries the whole thing — so the two are not the
  // same words twice and "Read the full story" leads somewhere.
  shortBio:
    'Artist behind HeartOfArt. Sharp, creative, and driven by quality — every piece is made with intention, never for its own sake.',
  // The statement in full. The first entry is set large; the rest follow it.
  story: [
    'Artist behind HeartOfArt. Sharp, creative, and driven by quality — every piece is made with intention, never for its own sake.',
    'I work from the heart, with the kind of passion and focus that turns an idea into something you feel before you understand it. Because the true measure of a piece isn’t how it looks. It’s what stays with you long after you’ve walked away.',
  ],
  // REPLACE: your own process steps and detail shots.
  process: [
    {
      title: 'Drawing',
      body: 'Everything begins in charcoal on paper, from life or from memory. Many pieces never go further than this, and are the better for it.',
      image: '/images/process/charcoal-drawing-on-paper-from-life.jpg',
      alt: 'A charcoal drawing in progress on paper, pinned to a studio wall',
    },
    {
      title: 'Ground',
      body: 'A warm underpainting is laid across the whole canvas and left to dry for two days, so the colour that follows never sits on white.',
      image: '/images/process/warm-underpainting-on-raw-canvas.jpg',
      alt: 'A warm ochre underpainting drying on raw stretched canvas',
    },
    {
      title: 'Building',
      body: 'The drawing goes down onto that ground in charcoal, then paint over it, then charcoal again. A piece may go through the cycle a dozen times.',
      image: '/images/process/charcoal-drawn-over-wet-paint-on-canvas.jpg',
      alt: 'Hands drawing in charcoal over a wet layer of paint on canvas',
    },
    {
      title: 'Finishing',
      body: 'The last marks are charcoal, worked in by hand and fixed. The piece rests facing the wall for a week before I decide it is done.',
      image: '/images/process/charcoal-detail-worked-by-hand.jpg',
      alt: 'Close detail of charcoal marks worked over a painted surface',
    },
  ],
}

// REPLACE: your real contact details and handles.
export const contact = {
  email: 'studio@heartofart.co.ke',
  phone: '+254 700 000 000',
  phoneHref: 'tel:+254700000000',
  whatsapp: '+254 700 000 000',
  whatsappHref: 'https://wa.me/254700000000',
  instagram: '@heartofart.ke',
  instagramHref: 'https://instagram.com/heartofart.ke',
  studio: {
    lines: ['HeartOfArt Studio', '3rd Floor, Riverside Court', 'Riverside Drive, Nairobi'],
    note: 'Viewings by appointment only, Tuesday to Saturday, 10:00 – 17:00.',
  },
  responseTime: 'Enquiries are answered within two working days.',
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/shop', label: 'Shop' },
  { to: '/commissions', label: 'Commissions' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// REPLACE: your real exhibitions, press and collections.
//
// These lists ship empty on purpose. They previously held invented entries
// naming real galleries, publications and museums, which was harmless while
// the artist was fictional — attached to a real name and face they would be
// false claims about real institutions, and the kind a collector checks.
// Each list hides its own column until it has entries, and the whole Record
// section disappears while all three are empty.
//
// Shape: { year: '2025', title: 'Show title', detail: 'Solo show, venue, city' }
export const exhibitions = []

// Shape: { year: '2025', title: 'Article headline', detail: 'Publication' }
export const press = []

// Shape: { year: '—', title: 'Collection name', detail: 'Permanent collection' }
export const collections = []
