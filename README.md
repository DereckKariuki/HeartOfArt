# HeartOfArt

The gallery, shop and commissions site for HeartOfArt — charcoal on paper,
paint on canvas. React 19, Vite, Tailwind, `react-router-dom`, `lucide-react`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run lint
```

Client-side routing needs a catch-all rewrite on static hosts.
`public/_redirects` covers Netlify; on Vercel, Cloudflare Pages or nginx,
point every unmatched path at `index.html`.

---

## Where things live

```
src/
  data/          ← ALL replaceable copy, prices and image paths
    site.js         brand, artist story, contact details, exhibitions, press
    artworks.js     the portfolio — one entry per piece
    products.js     shop: originals (derived from artworks) + print editions
    commissions.js  process steps, pricing tiers, terms, form options
  lib/
    order.js        ← delivery methods, and the order-to-WhatsApp message
    format.js       KES/USD formatting and the exchange rate
    validation.js   form rules
    placeholder.js  generates the stand-in images
  context/       cart and currency (session-only; no localStorage)
  hooks/         reveal-on-scroll, focus trap, per-route meta, forms
  components/    layout · ui · portfolio · shop · cart · forms
  pages/         Home Portfolio Shop ProductDetail Commissions About
                 Contact Order NotFound
```

Nothing in `components/` or `pages/` needs editing to change copy, prices,
contact details or artwork. It all comes out of `src/data/`.

## Where orders and enquiries go

Everything leaves on WhatsApp. No form on this site posts anywhere, nothing
is charged here, and the site holds no payment or mail provider key.

**Orders.** The cart's "Place an order" leads to `/order`, which asks for a
name, a phone number and a delivery choice, then hands the whole basket to
WhatsApp as a written message: each line with its price, the subtotal, the
delivery fee and the total. Payment and the delivery address are settled in
the chat. `src/lib/order.js` is the only file that knows any of this — it
holds the delivery methods and `orderWhatsappLink`.

**Enquiries.** The contact and commission forms carry a single "Send on
WhatsApp" button. Fields still validate as you leave them, so a visitor is
corrected before the message is written, but nothing is submitted: neither
form has a send button, and both block their own submission so that pressing
Enter in a field cannot fire an invisible send. `src/lib/enquiry.js` builds
those messages.

Every route ends the same way: WhatsApp opens with the message written out
and addressed to the studio, and the visitor presses send there. That press
cannot be skipped — WhatsApp requires it, and no website can send on a
visitor's behalf.

### Currently unused

The site used to send by email, and the wiring is still in the repo but now
reaches nothing:

- the two hidden forms in `index.html` that Netlify reads at deploy time,
  and the `__NETLIFY_FORMS__` flag in `vite.config.js`
- the posted branch of `sendEnquiry` in `src/lib/enquiry.js`
- `netlify/functions/submission-created.js`, which texts the studio on a form
  submission — there are no submissions, so it never runs

Delete them if WhatsApp is the settled answer; restore the send buttons and
they work again.

### Taking payment later

`src/lib/order.js` is where that would go. The M-Pesa (Daraja STK push) and
Paystack notes that used to live there are in the git history, and the rule
they carried still holds: a browser must never hold a payment key, so the
charge itself has to happen on a server.

## Design system

| Role | Token | Value |
|---|---|---|
| Base | `canvas` | `#FAF8F5` |
| Ink | `ink` | `#1A1918` |
| Neutrals | `bone` / `taupe` / `stone` | bone, soft taupe, muted stone |
| Metadata text | `muted` | `#6E6860` (5.2:1 on canvas) |
| Accent | `accent` | `#B8945F` — hairlines, hovers, marks |
| Accent, for text | `accentDeep` | `#8A6B3C` (4.7:1 on canvas) |

One accent hue, in two tones: `accent` is decorative only — at `#B8945F` it is
2.7:1 on the base and cannot legally carry text. Anything the accent colour has
to *say* uses `accentDeep`. There is no second accent.

Type is Cormorant Garamond (headings) over Inter (body), with the small-caps
`.label` class as the third voice for metadata. **Body text never goes below
16px**; only the uppercase, wide-tracked label voice sits smaller.

## Accessibility

Verified in-browser across every route: zero WCAG AA contrast failures, one
`<h1>` per page, no prose under 16px. The lightbox and cart drawer trap focus,
close on Esc and restore focus to whatever opened them; the lightbox moves with
arrow keys. Every artwork image carries alt text built from title, year, medium
and dimensions, so no piece can ship without it. `prefers-reduced-motion` is
honoured — reveals resolve instantly and the hover zoom is disabled.

---

## What you need to supply

### 1. The logo — 1 file, needed first

Save the circular HeartOfArt mark as:

```
public/heartofart-logo.png
```

Export it **square**, with the medallion centred and at least 512×512 — do not
pre-crop it to a circle. The page masks it round in CSS (`Logo.jsx`), so the
square file keeps working if the shape ever changes, and the gold ring survives
the mask.

The committed file is 512×512 and palette-quantised, 164 KB. It renders at
48px at most (88px in the footer), so a full-resolution master is many times
larger than anything the browser can use — and the logo loads on every page,
which on a metered Kenyan mobile connection is the wrong place to spend
megabytes. If you replace it, downscale to 512 and optimise first. The
original 1254×1254 upload is preserved in git history at commit `62d516a`.

Once that file exists it appears in three places automatically: the header
(40px on phones, 48px from `md` up), the footer (88px), and the browser tab.

**The mark stands alone — there is no wordmark beside it.** The typographic
wordmark now only ever renders as a fallback while the logo file is missing,
so the header is never empty; add the file and the wordmark disappears from
the site entirely.

Header height is tuned to the mark: `Logo`'s `className` owns the rendered
size and `size` only sets the width/height attributes, which reserve the
square so the bar does not shift as the image decodes. If you change the
header size, re-check it against `main`'s `pt-*` in `Layout.jsx` — that
offset clears the fixed nav and there is only ~3px of slack.

### 2. Artwork and photography

Every one of the 16 pieces in the portfolio is now a real photograph — there
are no generated stand-ins left anywhere on the site. What is still missing is
the information around them.

**Titles.** Eleven pieces carry working titles that describe the subject
(`Newborn`, `Caged`, `Lion on the Rock`, `Man in a Suit`, …). They are marked
`REPLACE` in `artworks.js`. A title is the first thing a visitor reads, and
these are not names you gave.

**Prices and sizes.** Ten pieces have `price: null` and `dimensions: null`.
That is a deliberate state, not missing data: the site says "price on request"
and the product page offers an enquiry instead of a cart. Set a number and the
piece becomes buyable; leave it and nothing is misrepresented. `isPurchasable()`
in `artworks.js` is the single answer to whether a piece can be bought.

**Notes.** Every piece's `note` is a `REPLACE` placeholder. It is the paragraph
in the lightbox and on the product page.

Photography that would still improve the site:

| What | Where the paths are | Shoot at |
|---|---|---|
| Flat, straight-on shots of each piece | `artworks.js` → `image` | The supplied photographs are in-situ, so the 4:5 grid crop trims wall on portrait pieces and clips the edges of landscape ones |
| Each original framed, and in a room | `products.js` (derived from the artwork path) | 4:3 — these feed the shop's second and third gallery tabs |
| The print edition — flat, framed, in a room | `products.js` → `prints[].images` | Only one print edition remains; its three photographs are still stand-ins |
| Four commission progress shots | `commissions.js` → `progressGallery` | 4:5. Empty the array and that section disappears |
| Four studio process shots | `site.js` → `artist.process` | 1:1 — and that copy is still invented, see below |

### 3. Copy and details

Everything below is currently placeholder and marked `REPLACE:` in the data files.

- **The four process steps** in `site.js` → `artist.process` are still
  invented, and they make specific claims about how you work — a warm
  underpainting left to dry for two days, a dozen cycles of charcoal over
  paint. Under a real name those read as fact. Rewrite or delete them; the
  name, portrait and statement above them are already real.
- **Exhibitions, press and collections** ship empty. They held invented entries
  naming real galleries and museums, which under a real name would be false
  claims a collector could check. Add real ones and the Record section
  reappears on its own.
- **Tagline and hero line** — `site.js`.
- **The story** — three first-person paragraphs in `site.js` → `artist.story`.
- **Process descriptions** — four short entries.
- **Contact details** — email, phone, WhatsApp number, Instagram handle, studio
  address, viewing hours, response time. All in `site.js` → `contact`. The
  WhatsApp link needs the number in `wa.me/2547XXXXXXXX` form.
- **Exhibitions, press, collections** — year-and-title lists in `site.js`.
- **The 12 pieces** — title, year, collection, medium, dimensions, true aspect
  ratio, availability, price, and the short note that shows in the lightbox.
- **Print editions** — edition sizes, per-size prices, paper description.
- **Framing options and surcharges**, and the **shipping note** — `products.js`.
- **Commission tiers** — the "from" figure, lead time and what each includes;
  plus the four process steps and the terms (turnaround, deposit %, revisions).
- **Delivery methods and fees** — `lib/order.js`.
- **Exchange rate** — `KES_PER_USD` in `lib/format.js` is hard-coded at 129.

### 4. Decisions I made that you may want to change

- **Accent colour** is antique gold `#B8945F`, the first of your three options.
  Changing it means editing two values in `tailwind.config.js` — and picking a
  darker second tone that clears 4.5:1 on `#FAF8F5`, or text set in it will
  fail contrast.
- **The wordmark** distinguishes "Heart" (light) from "Art" (semibold) by
  weight, and additionally sets "Of" in the accent. If you want the stricter
  reading of one distinction only, drop the accent span in
  `components/ui/Wordmark.jsx`.
- **Collection names** — *Afternoon Rooms*, *Market Mornings*, *Paper Weather* —
  are invented and drive the portfolio filter.
- **Nothing is charged on the site and no form posts anywhere** — every route
  ends in WhatsApp. See *Where orders and enquiries go* above. The commission
  form's reference-image field accepts a file and shows its name, but the file
  is not transmitted; the enquiry names it and asks for it in the reply.
- **The cart is session-only**, per the brief's no-storage rule: it survives
  navigation between pages but not a browser refresh.
