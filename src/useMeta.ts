import { useEffect } from 'react'

const SITE_NAME = 'PlanB Security'
const DEFAULT_TITLE = 'PlanB Security — The InfoSec Podcast'

interface Meta {
  title?: string
  description?: string
  /** Canonical/OG url path or absolute URL, e.g. `/episodes/foo`. */
  url?: string
}

function setTag(selector: string, attr: 'content', value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Sets the document title and updates the description/OG/Twitter tags that
 * already exist in index.html. Keeps SPA route changes in sync for crawlers
 * that execute JS and for nicer browser-tab/share behaviour.
 */
export function useMeta({ title, description, url }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE
    document.title = fullTitle
    setTag('meta[property="og:title"]', 'content', fullTitle)
    setTag('meta[name="twitter:title"]', 'content', fullTitle)

    if (description) {
      setTag('meta[name="description"]', 'content', description)
      setTag('meta[property="og:description"]', 'content', description)
      setTag('meta[name="twitter:description"]', 'content', description)
    }

    if (url) {
      const abs = url.startsWith('http') ? url : `https://planb.security${url}`
      setTag('meta[property="og:url"]', 'content', abs)
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (canonical) canonical.setAttribute('href', abs)
    }

    return () => {
      // Restore the default title on unmount so stale episode titles don't linger.
      document.title = DEFAULT_TITLE
    }
  }, [title, description, url])
}
