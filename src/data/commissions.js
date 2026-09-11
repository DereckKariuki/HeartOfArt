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

// Every commission is offered in the same three mediums, whatever the size.
export const commissionMediums = [
  'Paint on canvas',
  'Charcoal on paper',
  'Coloured pencil on paper',
]

// Six paper sizes, A5 up to A0. `from`/`to` bracket the quote for that size:
// where a piece lands inside its range depends on the medium, the subject and
// how much is in the frame.
export const commissionTiers = [
  { id: 'a5', name: 'A5', dimensions: '14.8 × 21.0 cm', from: 1000, to: 3500, lead: '1 – 2 weeks' },
  { id: 'a4', name: 'A4', dimensions: '21.0 × 29.7 cm', from: 3500, to: 5000, lead: '1 – 2 weeks' },
  { id: 'a3', name: 'A3', dimensions: '29.7 × 42.0 cm', from: 5000, to: 7000, lead: '2 – 3 weeks' },
  { id: 'a2', name: 'A2', dimensions: '42.0 × 59.4 cm', from: 7000, to: 10000, lead: '2 – 4 weeks' },
  { id: 'a1', name: 'A1', dimensions: '59.4 × 84.1 cm', from: 10000, to: 15000, lead: '3 – 5 weeks' },
  { id: 'a0', name: 'A0', dimensions: '84.1 × 118.9 cm', from: 15000, to: 25000, lead: '4 – 7 weeks' },
]

// The enquiry form's size dropdown. Values are the plain size codes so the
// "Enquire about A3" buttons can preselect one by name.
export const commissionSizeOptions = [
  ...commissionTiers.map((tier) => ({
    value: tier.name,
    label: `${tier.name} — ${tier.dimensions}`,
  })),
  { value: 'Not sure yet', label: 'Not sure yet' },
]

// The home page teaser quotes an entry price and a lead time. Both are read
// off the tiers rather than written out again, so the two pages cannot drift
// apart the way they did when the figures were kept in two places.
export const commissionEntry = {
  from: Math.min(...commissionTiers.map((tier) => tier.from)),
  lead: 'one to seven weeks',
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

// The four stages of "Forgotten" (charcoal on paper, 2026), photographed in
// the studio as it was made. Empty this array and the section drops out of
// the page.
export const progressGallery = [
  {
    src: '/images/commission-progress/commission-01-first-marks.jpg',
    alt: 'The outline of a child at a doorway drawn in light pencil on white paper, before any shading',
    caption: 'First marks',
  },
  {
    src: '/images/commission-progress/commission-02-building-up.jpg',
    alt: 'The same drawing with the face and shoulder shaded in charcoal, the doorway and clothing still bare outline',
    caption: 'Building up',
  },
  {
    src: '/images/commission-progress/commission-03-working-back.jpg',
    alt: 'The drawing nearly finished: the shirt, the wall and its rough texture worked in around the child',
    caption: 'Working back',
  },
  {
    src: '/images/commission-progress/commission-04-installed.jpg',
    alt: 'The finished drawing behind glass in a dark wood frame, hung on a plain wall',
    caption: 'Framed',
  },
]

export const commissionTerms = [
  { term: 'Turnaround', detail: 'One to seven weeks from deposit, depending on size. I take four commissions at a time and will tell you honestly where the queue stands.' },
  { term: 'Deposit', detail: '50% on acceptance of the quote, non-refundable once materials are cut. The balance is due before delivery.' },
  { term: 'Revisions', detail: 'Revisions happen at sketch and underpainting stage, where changes are still cheap. Once the final layers are on, the piece is what it is.' },
  { term: 'If it is not right', detail: 'You are not obliged to take a piece you do not love. In that case the deposit stands, the work returns to me, and I may sell it on.' },
]

// Bands follow the size bands above: A5 / A4 – A3 / A2 – A1 / A0.
export const budgetRanges = [
  'KES 1,000 – 3,500',
  'KES 3,500 – 7,000',
  'KES 7,000 – 15,000',
  'KES 15,000 – 25,000',
  'Not sure yet',
]

export const timelines = [
  'No fixed date',
  'Within one week',
  'Within three weeks',
  'Within a month',
  'Within one and a half months',
  'Within two months',
  'A specific date — I will explain',
]

export const pieceTypes = [
  'Painting on canvas',
  'Work on paper',
  'Diptych or triptych',
  'Portrait',
  'Not sure — advise me',
]
