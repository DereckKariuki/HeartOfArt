import { useEffect } from 'react'
import { site } from '../data/site'

function upsertMeta(selector, attrs) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    for (const [key, value] of Object.entries(attrs)) tag.setAttribute(key, value)
    document.head.appendChild(tag)
    return tag
  }
  return tag
}

/**
 * Per-route <title>, meta description and canonical URL. Client-side
 * routing means these have to be set as each page mounts.
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : site.name
    document.title = fullTitle

    const description_ = description ?? site.description
    const descriptionTag = upsertMeta('meta[name="description"]', { name: 'description' })
    descriptionTag.setAttribute('content', description_)

    const ogTitle = upsertMeta('meta[property="og:title"]', { property: 'og:title' })
    ogTitle.setAttribute('content', fullTitle)

    const ogDescription = upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
    })
    ogDescription.setAttribute('content', description_)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname)
  }, [title, description])
}
