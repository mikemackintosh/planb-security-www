// Shared content derivation for every build-time generator.
//
// This exists because the same rules (slugs, season/episode parsing, em dashes,
// short titles) are needed by the blog index, the sitemap and the prerenderer.
// Duplicating them once already produced a mismatch, so they live in one place.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const ORIGIN = 'https://planb.security'
export const FEED = 'https://anchor.fm/s/e741494c/podcast/rss'
export const SITE_NAME = 'PlanB Security'
export const DEFAULT_TITLE = 'PlanB Security — The InfoSec Podcast'
export const DEFAULT_IMAGE = '/img/home-studio-og.jpg'

/** Must stay identical to slugify() in src/episodes.ts. */
export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

export function seasonEpisodeFromSlug(slug) {
  let m = slug.match(/^ep-(\d+)/)
  if (m) return [1, Number(m[1])]
  m = slug.match(/^s(\d+)e(\d+)/)
  if (m) return [Number(m[1]), Number(m[2])]
  return [0, 0]
}

/** Mirrors seasonEpisode() in src/blog.ts, which reads the episode title. */
export function seasonEpisodeFromTitle(title) {
  let m = title.match(/^\s*Ep\.?\s*(\d+)/i)
  if (m) return [1, Number(m[1])]
  m = title.match(/^\s*S(\d+)\s*E(\d+)/i)
  if (m) return [Number(m[1]), Number(m[2])]
  return null
}

/** Authors type ` -- ` as a subtitle separator; it renders as an em dash. */
export const emDash = (s) => s.replace(/ -- /g, ' — ')

/**
 * Google truncates <title> around 60 characters. Rather than rewrite headlines,
 * derive a short variant from the text before the subtitle separator; the page
 * still renders the full title as its H1.
 */
export const SEO_TITLE_MAX = 60
export function shortTitle(title) {
  if (title.length <= SEO_TITLE_MAX) return title
  for (const sep of [' — ', ': ']) {
    const head = title.split(sep)[0]
    if (head !== title && head.length <= SEO_TITLE_MAX) return head
  }
  return title
}

/**
 * Optional explicit publish date: `<!-- published: YYYY-MM-DD -->` in the
 * header block. Articles normally inherit the date of their podcast episode,
 * but a post can ship ahead of its episode (or without one), and a page with
 * no datePublished is a real SEO gap. Invisible to any markdown renderer, and
 * stripped along with the rest of the header before the body is loaded.
 */
export function explicitDate(raw) {
  const m = raw.match(/<!--\s*published:\s*(\d{4}-\d{2}-\d{2})\s*-->/)
  return m ? new Date(`${m[1]}T12:00:00Z`).toISOString() : null
}

/** Reading time over the body only, with SVG diagrams and code fences removed. */
export function readingMinutes(raw) {
  const sep = raw.search(/^---\s*$/m)
  const body = sep >= 0 ? raw.slice(raw.indexOf('\n', sep) + 1) : raw
  const prose = body
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|-]/g, ' ')
  return Math.max(1, Math.round(prose.split(/\s+/).filter(Boolean).length / 225))
}

/**
 * Social card by convention: drop public/img/<slug>-og.jpg beside a post and it
 * becomes that post's og:image. No per-article config needed.
 */
export function ogImageFor(root, slug) {
  const rel = `/img/${slug}-og.jpg`
  return existsSync(join(root, 'public', rel)) ? rel : null
}

/** Every article's metadata, sorted by filename (matches the previous order). */
export function readArticles(root) {
  const dir = join(root, 'blogs')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => {
      const raw = readFileSync(join(dir, file), 'utf8')
      const slug = file.replace(/\.md$/, '')
      const [season, episode] = seasonEpisodeFromSlug(slug)
      const title = emDash((raw.match(/^#\s+(.+)$/m)?.[1] ?? slug).trim())
      return {
        slug,
        season,
        episode,
        title,
        seoTitle: shortTitle(title),
        deck: emDash((raw.match(/^##\s+(.+)$/m)?.[1] ?? '').trim()),
        minutes: readingMinutes(raw),
        date: explicitDate(raw),
        ogImage: ogImageFor(root, slug),
      }
    })
}

/**
 * The podcast feed, normalized to the shape src/episodes.ts produces.
 * Best effort: returns null if the feed is unreachable so a build can still
 * succeed (degraded) rather than failing a deploy on a third-party outage.
 */
export async function fetchEpisodes(feedUrl = FEED) {
  try {
    // rss-to-json is CJS; under ESM the export may land on the namespace or
    // on `.default` depending on the interop path.
    const mod = await import('rss-to-json')
    const parse = mod.parse ?? mod.default?.parse ?? mod.default
    if (typeof parse !== 'function') throw new Error('rss-to-json: no parse export')
    const feed = await parse(feedUrl)
    return (feed.items ?? []).map((item) => ({
      id: item.id,
      title: `${item.title}`,
      slug: slugify(item.title),
      published: new Date(item.published).toISOString(),
      description: item.description ?? '',
      content: item.content ?? '',
      itunes_duration: item.itunes_duration ?? '',
      audio: {
        src: item.enclosures?.[0]?.url ?? '',
        type: item.enclosures?.[0]?.type ?? '',
      },
    }))
  } catch (err) {
    console.warn(`content: feed unavailable (${err.message})`)
    return null
  }
}

/** Strip HTML and collapse whitespace, for meta descriptions. */
export function plainText(html, max = 200) {
  const text = String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}
