#!/usr/bin/env node
// Generates public/sitemap.xml covering every real route: home, /blog, each
// /blog/<slug>, and each /episodes/<slug>. Runs as a `prebuild` step so the
// sitemap ships with the static assets.
//
// Episode slugs come from the podcast feed and must match src/episodes.ts
// exactly. If the feed is unreachable the build still succeeds — the sitemap
// is emitted without episode URLs rather than failing the deploy.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const blogsDir = join(root, 'blogs')
const out = join(root, 'public', 'sitemap.xml')

const ORIGIN = 'https://planb.security'
const FEED = 'https://anchor.fm/s/e741494c/podcast/rss'

/** Must stay identical to slugify() in src/episodes.ts. */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function seasonEpisode(slug) {
  let m = slug.match(/^ep-(\d+)/)
  if (m) return [1, Number(m[1])]
  m = slug.match(/^s(\d+)e(\d+)/)
  if (m) return [Number(m[1]), Number(m[2])]
  return [0, 0]
}

const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const day = (d) => new Date(d).toISOString().slice(0, 10)

// ---- episodes from the feed (best effort) ----
let episodes = []
try {
  // rss-to-json is CJS; under ESM the export may land on the namespace or on
  // `.default` depending on the interop path.
  const mod = await import('rss-to-json')
  const parse = mod.parse ?? mod.default?.parse ?? mod.default
  if (typeof parse !== 'function') throw new Error('rss-to-json: no parse export')
  const feed = await parse(FEED)
  episodes = (feed.items ?? []).map((item) => ({
    slug: slugify(item.title),
    published: item.published,
    se: (() => {
      let m = item.title.match(/^\s*Ep\.?\s*(\d+)/i)
      if (m) return [1, Number(m[1])]
      m = item.title.match(/^\s*S(\d+)\s*E(\d+)/i)
      if (m) return [Number(m[1]), Number(m[2])]
      return null
    })(),
  }))
  console.log(`gen-sitemap: fetched ${episodes.length} episodes from the feed`)
} catch (err) {
  console.warn(`gen-sitemap: feed unavailable (${err.message}); emitting without episode URLs`)
}

const publishedFor = new Map(
  episodes.filter((e) => e.se).map((e) => [`${e.se[0]}-${e.se[1]}`, e.published]),
)

// ---- articles ----
const articles = readdirSync(blogsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const slug = f.replace(/\.md$/, '')
    const [season, episode] = seasonEpisode(slug)
    return { slug, lastmod: publishedFor.get(`${season}-${episode}`) ?? null }
  })

const urls = [
  { loc: `${ORIGIN}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${ORIGIN}/blog`, changefreq: 'weekly', priority: '0.9' },
  ...articles.map((a) => ({
    loc: `${ORIGIN}/blog/${a.slug}`,
    lastmod: a.lastmod ? day(a.lastmod) : null,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...episodes.map((e) => ({
    loc: `${ORIGIN}/episodes/${e.slug}`,
    lastmod: e.published ? day(e.published) : null,
    changefreq: 'monthly',
    priority: '0.7',
  })),
]

const body = urls
  .map((u) =>
    [
      '  <url>',
      `    <loc>${xmlEscape(u.loc)}</loc>`,
      u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')

writeFileSync(
  out,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
)
console.log(`gen-sitemap: wrote ${urls.length} URLs to public/sitemap.xml`)
