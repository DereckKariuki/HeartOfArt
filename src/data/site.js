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
    'HeartOfArt is the studio of Dereck Kariuki, working in charcoal on paper and paint on canvas. Original work, limited prints and commissions.',
  founded: 2016,
  city: 'Digital Studio',
  // REPLACE: the full-bleed image behind the top of the home page.
  // Deliberately an in-situ photograph rather than a flat shot of the work: a
  // room reads at full bleed and gives a visitor the scale straight away,
  // where a flat shot belongs in the portfolio grid. Landscape, 1600px wide or
  // more. The credit line in the corner is taken from the hero artwork in
  // artworks.js, so keep the two describing the same piece.
  heroImage: '/images/artwork/ocean-view-paint-on-canvas.jpg',
  heroImageAlt:
    'Ocean View, 2026 — a small seascape in paint on canvas, hung on a plaster wall',
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
  location: 'Digital Studio',
  portrait: '/images/artist/dereck-kariuki-portrait.jpg',
  portraitAlt: 'Dereck Kariuki, photographed outdoors',
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
  // REPLACE: the four stages in your own words. These describe only what the
  // photographs beside them show — the sequence is real, the wording is not
  // yours yet. They reuse the commission-progress photographs of "Forgotten"
  // rather than a second set.
  process: [
    {
      title: 'Drawing',
      body: 'It starts as an outline in light pencil. The whole composition is set down before a single tone goes anywhere.',
      image: '/images/commission-progress/commission-01-first-marks.jpg',
      alt: 'A composition drawn in light pencil outline on white paper, before any shading',
    },
    {
      title: 'Shading',
      body: 'Shading begins at the face, where the likeness is decided. The rest of the sheet stays bare outline until that is right.',
      image: '/images/commission-progress/commission-02-building-up.jpg',
      alt: 'The face and shoulder shaded in charcoal while the clothing and background remain outline',
    },
    {
      title: 'Surroundings',
      body: 'Then everything around the figure — the clothing, the doorway, the rough of the wall — until it sits inside the scene rather than on top of it.',
      image: '/images/commission-progress/commission-03-working-back.jpg',
      alt: 'The drawing nearly finished, with the clothing, doorway and wall texture worked in around the figure',
    },
    {
      title: 'Framing',
      body: 'Framed behind glass — the piece as it will hang.',
      image: '/images/commission-progress/commission-04-installed.jpg',
      alt: 'The finished drawing behind glass in a dark wood frame, hung on a plain wall',
    },
  ],
}

// REPLACE: your real contact details and handles.
export const contact = {
  email: 'heartofart83@gmail.com',
  // Shown in local form; the links carry the international form, because
  // tel: and wa.me both need a country code to work from outside Kenya, and
  // wa.me additionally refuses the leading zero.
  phone: '0110 025 232',
  phoneHref: 'tel:+254110025232',
  whatsapp: '0110 025 232',
  whatsappHref: 'https://wa.me/254110025232',
  instagram: '@heartofart_4d',
  instagramHref: 'https://www.instagram.com/heartofart_4d',
  youtube: '@HeartOfArt-4d',
  youtubeHref: 'https://www.youtube.com/@HeartOfArt-4d',
  tiktok: '@heart_of_art0',
  tiktokHref: 'https://www.tiktok.com/@heart_of_art0',
  studio: {
    lines: ['HeartOfArt', 'Digital Studio'],
    // REPLACE: how you actually want people to arrange a piece. The old line
    // offered in-person viewings on set days, which a digital studio cannot
    // honour — and an address a visitor cannot turn up to is worse than none.
    note: 'Everything is arranged online. Send an enquiry and you will get photographs, options and a delivery plan by reply.',
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
