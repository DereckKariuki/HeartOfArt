/**
 * Generates the stand-in image shown until real photography is dropped
 * into /public. Deterministic, so a piece keeps the same stand-in on
 * every render, and quiet enough that the layout still reads correctly.
 *
 * Delete nothing here — once a real file exists at the image path, the
 * placeholder simply stops being used.
 */

const TONES = [
  ['#EFEAE3', '#DED6CA'],
  ['#E7E1D8', '#CFC5B6'],
  ['#F1ECE4', '#D6CCBE'],
  ['#E4DED4', '#C9BFB2'],
  ['#EDE7DE', '#D2C8B9'],
]

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function hash(seed) {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

/** `ratio` is a CSS ratio string such as '4/5'. */
function ratioToSize(ratio) {
  const [w, h] = String(ratio ?? '4/5').split('/').map(Number)
  const width = 1200
  const height = Math.round((width * (h || 5)) / (w || 4))
  return { width, height }
}

export function placeholderImage({ seed = 'HeartOfArt', label = '', ratio = '4/5' } = {}) {
  const { width, height } = ratioToSize(ratio)
  const n = hash(seed)
  const [base, block] = TONES[n % TONES.length]
  const offsetX = Math.round(width * (0.12 + ((n >> 3) % 7) / 100))
  const offsetY = Math.round(height * (0.14 + ((n >> 5) % 9) / 100))
  const blockW = Math.round(width * 0.58)
  const blockH = Math.round(height * 0.46)
  const caption = escapeXml(label).slice(0, 46)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${base}"/>
  <rect x="${offsetX}" y="${offsetY}" width="${blockW}" height="${blockH}" fill="${block}"/>
  <rect x="${offsetX}" y="${offsetY + blockH + Math.round(height * 0.05)}" width="${Math.round(blockW * 0.42)}" height="1.5" fill="#B8945F"/>
  <text x="${offsetX}" y="${offsetY + blockH + Math.round(height * 0.11)}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(width * 0.019)}" letter-spacing="${Math.round(width * 0.004)}" fill="#6E6860">${caption.toUpperCase()}</text>
</svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
