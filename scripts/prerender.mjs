#!/usr/bin/env node
// Emits one HTML file per route with its <head> already correct.
//
// The app is client-rendered, so title/description/og tags are only set once
// useMeta() runs. Google executes JS and eventually sees them, but social
// unfurlers (Slack, LinkedIn, Facebook, most others) do not run JS at all —
// so every shared link showed the homepage card. This bakes the per-route head
// into static files. nginx already does `try_files $uri $uri/ /index.html` with
// `index index.html`, so dist/blog/<slug>/index.html is served with no config
// change, and the SPA still hydrates and takes over navigation.
//
// This is head-only: the <body> remains the SPA root. Full SSG would also put
// article text in the HTML; that is a separate, larger change.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ORIGIN, SITE_NAME, DEFAULT_TITLE, DEFAULT_IMAGE,
  readArticles, seasonEpisodeFromTitle, plainText,
} from './lib/content.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const setTitle = (h, v) => h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(v)}</title>`)
const setName = (h, n, v) =>
  h.replace(new RegExp(`(<meta name="${n}" content=")[^"]*(")`), `$1${esc(v)}$2`)
const setProp = (h, p, v) =>
  h.replace(new RegExp(`(<meta property="${p}" content=")[^"]*(")`), `$1${esc(v)}$2`)
const setCanonical = (h, v) => h.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${esc(v)}$2`)
const injectHead = (h, block) => h.replace('</head>', `${block}\n</head>`)

/** Build one route's HTML from the shared template. */
function render({ title, description, path, image, type = 'website', published, jsonLd, extraMeta = [] }) {
  const url = `${ORIGIN}${path}`
  const img = `${ORIGIN}${image ?? DEFAULT_IMAGE}`
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE

  let h = template
  h = setTitle(h, fullTitle)
  h = setName(h, 'description', description)
  h = setProp(h, 'og:title', fullTitle)
  h = setProp(h, 'og:description', description)
  h = setProp(h, 'og:url', url)
  h = setProp(h, 'og:image', img)
  h = setProp(h, 'og:type', type)
  h = setName(h, 'twitter:title', fullTitle)
  h = setName(h, 'twitter:description', description)
  h = setName(h, 'twitter:image', img)
  h = setCanonical(h, url)

  const extras = [...extraMeta]
  if (published) {
    extras.push(`<meta property="article:published_time" content="${esc(published)}" />`)
    extras.push(`<meta property="article:author" content="Mike Mackintosh" />`)
  }
  if (jsonLd) {
    extras.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return extras.length ? injectHead(h, '    ' + extras.join('\n    ')) : h
}

function write(path, html) {
  const dir = path === '/' ? dist : join(dist, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// ---------------------------------------------------------------- data
const articles = readArticles(root)
const snapshot = join(root, 'src', 'episodes.json')
const episodes = existsSync(snapshot) ? JSON.parse(readFileSync(snapshot, 'utf8')) : []

const publishedFor = new Map()
for (const ep of episodes) {
  const se = seasonEpisodeFromTitle(ep.title)
  if (se) publishedFor.set(`${se[0]}-${se[1]}`, ep.published)
}

const AUTHOR = { '@type': 'Person', name: 'Mike Mackintosh', url: 'https://x.com/mikemackintosh' }
const PUBLISHER = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: ORIGIN,
  logo: { '@type': 'ImageObject', url: `${ORIGIN}/logo.png` },
}

let count = 0

// ---------------------------------------------------------------- /blog
const blogDescription =
  'Companion essays to the PlanB Security podcast — deep dives on InfoSec leadership, AI risk, identity, and building a strong security program.'
write(
  '/blog',
  render({
    title: 'Writing',
    description: blogDescription,
    path: '/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${SITE_NAME} — Writing`,
      description: blogDescription,
      url: `${ORIGIN}/blog`,
      author: AUTHOR,
      publisher: PUBLISHER,
      blogPost: articles.slice(0, 20).map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        url: `${ORIGIN}/blog/${a.slug}`,
        datePublished: a.date ?? publishedFor.get(`${a.season}-${a.episode}`) ?? undefined,
      })),
    },
  }),
)
count += 1

// ---------------------------------------------------------------- articles
for (const a of articles) {
  const published = a.date ?? publishedFor.get(`${a.season}-${a.episode}`) ?? null
  write(
    `/blog/${a.slug}`,
    render({
      title: a.seoTitle,
      description: a.deck,
      path: `/blog/${a.slug}`,
      image: a.ogImage ?? DEFAULT_IMAGE,
      type: 'article',
      published,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.deck || undefined,
        url: `${ORIGIN}/blog/${a.slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${ORIGIN}/blog/${a.slug}` },
        datePublished: published ?? undefined,
        dateModified: published ?? undefined,
        timeRequired: `PT${a.minutes}M`,
        articleSection: `Season ${a.season}`,
        image: `${ORIGIN}${a.ogImage ?? '/logo.png'}`,
        author: AUTHOR,
        publisher: PUBLISHER,
      },
    }),
  )
  count += 1
}

// ---------------------------------------------------------------- episodes
for (const e of episodes) {
  const se = seasonEpisodeFromTitle(e.title)
  write(
    `/episodes/${e.slug}`,
    render({
      title: e.title,
      description: plainText(e.content || e.description),
      path: `/episodes/${e.slug}`,
      type: 'article',
      published: e.published,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'PodcastEpisode',
        name: e.title,
        description: plainText(e.content || e.description, 300),
        url: `${ORIGIN}/episodes/${e.slug}`,
        datePublished: e.published,
        ...(se
          ? { episodeNumber: se[1], partOfSeason: { '@type': 'PodcastSeason', seasonNumber: se[0] } }
          : {}),
        partOfSeries: { '@type': 'PodcastSeries', name: SITE_NAME, url: ORIGIN },
        associatedMedia: { '@type': 'MediaObject', contentUrl: e.audio?.src },
        author: AUTHOR,
        publisher: PUBLISHER,
      },
    }),
  )
  count += 1
}

console.log(`prerender: wrote ${count} route HTML files (plus the SPA fallback index.html)`)
