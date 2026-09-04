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
    'HeartOfArt is the studio of Amani Wachira, working in charcoal on paper and paint on canvas in Nairobi. Original work, limited prints and commissions.',
  founded: 2016,
  city: 'Nairobi, Kenya',
  // REPLACE: the circular brand mark. Save the file as
  // public/heartofart-logo.png and it appears in the header, the footer and
  // the browser tab. Square source with the medallion centred — the circle is
  // masked in CSS, so do not pre-crop it. 512×512 or larger.
  logo: '/heartofart-logo.png',
}

// REPLACE: artist name, portrait and first-person story.
export const artist = {
  name: 'Amani Wachira',
  role: 'Charcoal on paper, paint on canvas',
  location: 'Nairobi, Kenya',
  portrait: '/images/artist/amani-wachira-portrait-studio-nairobi.jpg',
  portraitAlt:
    'Amani Wachira in the Nairobi studio, standing beside an unfinished canvas',
  shortBio:
    'I have worked from the same third-floor room in Nairobi for nine years. Every piece starts in charcoal and most of them end in paint — the drawing underneath is what holds the feeling, and the colour is what lets anyone else see it.',
  story: [
    'I did not set out to be a painter. I trained as an architect, and for four years I drew buildings that were never built. What stayed with me from that time was light: how it falls across a room at four in the afternoon, how it changes the colour of a wall you have walked past a thousand times.',
    'I started drawing on the floor of a rented room in Ngara because I wanted to keep that light somewhere. Charcoal came first, because charcoal was what I could afford — and it turned out to be the honest material, the one where a bad line has nowhere to hide. The paint came later, when the drawing alone stopped being enough to hold the colour of an afternoon.',
    'What I am after is not a likeness of a place. It is the feeling of standing in one — the warmth still coming off a wall after the sun has gone, the particular quiet of a room where someone has just left.',
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

// REPLACE: exhibitions, press and collections — year and title only.
export const exhibitions = [
  { year: '2025', title: 'Afternoon Rooms', detail: 'Solo exhibition, Circle Art Gallery, Nairobi' },
  { year: '2024', title: 'Paper Weather', detail: 'Two-person show with Nia Mutiso, The Attic, Nairobi' },
  { year: '2024', title: 'East African Contemporary', detail: 'Group show, Kampala Art Biennale' },
  { year: '2022', title: 'Ngara Notes', detail: 'Solo exhibition, Alliance Française, Nairobi' },
  { year: '2019', title: 'First Light', detail: 'Group show, Kuona Trust, Nairobi' },
]

export const press = [
  { year: '2025', title: 'The quiet maximalism of Amani Wachira', detail: 'Nation Weekend' },
  { year: '2024', title: 'Twelve East African artists to watch', detail: 'Contemporary And (C&)' },
  { year: '2023', title: 'Studio visit: Riverside Drive', detail: 'Design Kenya' },
]

export const collections = [
  { year: '—', title: 'Nairobi National Museum', detail: 'Permanent collection' },
  { year: '—', title: 'Sarova Group', detail: 'Corporate collection, Nairobi' },
  { year: '—', title: 'Private collections', detail: 'Kenya, Uganda, United Kingdom, United States' },
]
