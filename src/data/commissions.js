/** REPLACE: commission process copy, tiers and terms. */

// Shown at the top of the commissions page and again in the home page teaser,
// which reads it from here rather than repeating the path and the alt text.
export const commissionHero = {
  image: '/images/commission/commissioned-portrait-charcoal-on-paper.jpg',
  alt: 'A commissioned portrait in charcoal, framed and hung, lettered “Some people are captured in photographs — you were worth turning into art”',
  // REPLACE: add the real size, year and where it hangs when you have them.
  caption: 'Commissioned portrait, charcoal on paper, framed.',
  // Used as the stand-in caption while the photograph is missing.
  label: 'Commissioned art',
}

// REPLACE: the entry price and lead time quoted on the home page.
//
// The home page used to derive this from the cheapest tier below, so the two
// could not disagree. They are stated here instead because they no longer
// match — the tiers are still placeholder figures. Whatever the real tiers
// turn out to be, these two values have to agree with them: a visitor who
// clicks through from "from KES 3,500" and lands on a page starting at
// KES 45,000 has been misled, however unintentionally.
export const commissionEntry = {
  from: 3500,
  lead: 'one to four weeks',
}

export const commissionSteps = [
  {
    n: '01',
    title: 'Enquiry',
    body: 'Tell me the room, the size you have in mind and roughly what you want the piece to feel like. Reference images help but are not required.',
  },
  {
    n: '02',
    title: 'Consultation and quote',
    body: 'We talk — in the studio or on a call. I send a written quote, a palette direction and two composition sketches within a week.',
  },
  {
    n: '03',
    title: 'Deposit and creation',
    body: 'A 50% deposit reserves the slot and buys the materials. You see the work twice while it is in progress, at the underpainting and near the end.',
  },
  {
    n: '04',
    title: 'Delivery',
    body: 'The balance falls due on completion. Framed work is crated, and hung by the studio where that is possible; elsewhere it goes by insured courier.',
  },
]

export const commissionTiers = [
  {
    id: 'intimate',
    name: 'Intimate',
    sizes: 'Up to 60 × 60 cm',
    from: 45000,
    lead: '4 – 6 weeks',
    includes: [
      'Cotton canvas on a pine stretcher',
      'One composition sketch',
      'One round of revisions before the final layer',
      'Unframed, ready to hang',
      'Local delivery included',
    ],
  },
  {
    id: 'room',
    name: 'Room',
    sizes: 'Up to 120 × 90 cm',
    from: 95000,
    lead: '6 – 10 weeks',
    includes: [
      'Heavy cotton canvas on a hardwood stretcher',
      'Two composition sketches',
      'Two rounds of revisions',
      'Natural oak or blackened ash float frame',
      'Local delivery and hanging included',
    ],
    highlight: true,
  },
  {
    id: 'wall',
    name: 'Wall',
    sizes: 'Over 120 × 90 cm, including diptychs and triptychs',
    from: 180000,
    lead: '10 – 16 weeks',
    includes: [
      'Linen on a braced hardwood stretcher',
      'A call to read the room, its light and its colours, before anything is drawn',
      'Three composition sketches, unlimited revisions to sketch stage',
      'Frame of your choosing, or float-mounted',
      'Crating, countrywide delivery and hanging included',
    ],
  },
]

// REPLACE: swap in real progress photography when you have it.
// Leave `progressGallery` empty and the section drops out of the page.
export const progressGallery = [
  {
    src: '/images/commission-progress/commission-01-first-marks.jpg',
    alt: 'Commission in progress: the first marks going down',
    caption: 'First marks',
  },
  {
    src: '/images/commission-progress/commission-02-building-up.jpg',
    alt: 'Commission in progress: the work building up in layers',
    caption: 'Building up',
  },
  {
    src: '/images/commission-progress/commission-03-working-back.jpg',
    alt: 'Commission in progress: the surface worked back by hand',
    caption: 'Working back',
  },
  {
    src: '/images/commission-progress/commission-04-installed.jpg',
    alt: 'The finished commissioned piece framed and installed on the wall it was made for',
    caption: 'Installed',
  },
]

export const commissionTerms = [
  { term: 'Turnaround', detail: 'Four to sixteen weeks from deposit, depending on size. I take four commissions at a time and will tell you honestly where the queue stands.' },
  { term: 'Deposit', detail: '50% on acceptance of the quote, non-refundable once materials are cut. The balance is due before delivery.' },
  { term: 'Revisions', detail: 'Revisions happen at sketch and underpainting stage, where changes are still cheap. Once the final layers are on, the piece is what it is.' },
  { term: 'If it is not right', detail: 'You are not obliged to take a piece you do not love. In that case the deposit stands, the work returns to me, and I may sell it on.' },
]

export const budgetRanges = [
  'KES 8,000 – 45,000',
  'KES 45,000 – 95,000',
  'KES 95,000 – 180,000',
  'KES 180,000 and above',
  'Not sure yet',
]

export const timelines = [
  'No fixed date',
  'Within 6 weeks',
  'Within 3 months',
  'Within 6 months',
  'A specific date — I will explain',
]

export const pieceTypes = [
  'Painting on canvas',
  'Work on paper',
  'Diptych or triptych',
  'Portrait',
  'Not sure — advise me',
]
