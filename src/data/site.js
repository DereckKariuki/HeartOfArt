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
  tagline: 'Paintings that hold the light of a Nairobi afternoon.',
  heroLine:
    'Layered acrylic and paper on canvas — quiet interiors, market mornings, and the people who move through them.',
  description:
    'HeartOfArt is the studio of Amani Wachira, a mixed-media painter in Nairobi. Original paintings, limited prints and commissioned work.',
  founded: 2016,
  city: 'Nairobi, Kenya',
}

// REPLACE: artist name, portrait and first-person story.
export const artist = {
  name: 'Amani Wachira',
  role: 'Painter — acrylic, oil pastel and paper collage on canvas',
  location: 'Nairobi, Kenya',
  portrait: '/images/artist/amani-wachira-portrait-studio-nairobi.jpg',
  portraitAlt:
    'Amani Wachira in the Nairobi studio, standing beside an unfinished canvas',
  shortBio:
    'I have painted from the same third-floor room in Nairobi for nine years. The work begins with paper — receipts, kanga offcuts, newsprint — pressed into acrylic until the surface holds a memory of the street it came from.',
  story: [
    'I did not set out to be a painter. I trained as an architect, and for four years I drew buildings that were never built. What stayed with me from that time was light: how it falls across a room at four in the afternoon, how it changes the colour of a wall you have walked past a thousand times.',
    'I started painting on the floor of a rented room in Ngara because I wanted to keep that light somewhere. The collage came later, almost by accident — I ran out of white and reached for a newspaper. Now every piece begins with paper gathered close to home: matatu tickets, fabric offcuts from Kariokor, pages from books I could not finish.',
    'What I am after is not a likeness of a place. It is the feeling of standing in one — the warmth still coming off a wall after the sun has gone, the particular quiet of a room where someone has just left.',
  ],
  // REPLACE: your own process steps and detail shots.
  process: [
    {
      title: 'Gathering',
      body: 'Paper is collected over weeks — ticket stubs, fabric offcuts, printed pages. Nothing is bought for the purpose.',
      image: '/images/process/collected-paper-and-fabric-offcuts.jpg',
      alt: 'Collected paper, tickets and fabric offcuts laid out on a studio table',
    },
    {
      title: 'Ground',
      body: 'A warm underpainting is laid across the whole canvas and left to dry for two days, so the colour that follows never sits on white.',
      image: '/images/process/warm-underpainting-on-raw-canvas.jpg',
      alt: 'A warm ochre underpainting drying on raw stretched canvas',
    },
    {
      title: 'Building',
      body: 'Paper is pressed into wet acrylic, sanded back, then painted over. A piece may go through this cycle a dozen times.',
      image: '/images/process/paper-collage-pressed-into-wet-acrylic.jpg',
      alt: 'Hands pressing torn paper into a wet layer of acrylic paint',
    },
    {
      title: 'Finishing',
      body: 'Oil pastel goes on last, worked in by hand. The piece rests facing the wall for a week before I decide it is done.',
      image: '/images/process/oil-pastel-detail-worked-by-hand.jpg',
      alt: 'Close detail of oil pastel marks worked over a painted surface',
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
