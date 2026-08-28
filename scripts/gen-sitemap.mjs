#!/usr/bin/env node
// Generates public/sitemap.xml covering every real route: home, /blog, each
// /blog/<slug>, and each /episodes/<slug>. Reads the episode snapshot written
// by gen-episodes.mjs, so the feed is fetched once per build.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ORIGIN, readArticles, seasonEpisodeFromTitle } from './lib/content.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'sitemap.xml')
const snapshot = join(root, 'src', 'episodes.json')

const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const day = (d) => new Date(d).toISOString().slice(0, 10)

const episodes = existsSync(snapshot) ? JSON.parse(readFileSync(snapshot, 'utf8')) : []

const publishedFor = new Map()
for (const ep of episodes) {
  const se = seasonEpisodeFromTitle(ep.title)
  if (se) publishedFor.set(`${se[0]}-${se[1]}`, ep.published)
}

const articles = readArticles(root)

const urls = [
  { loc: `${ORIGIN}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${ORIGIN}/blog`, changefreq: 'weekly', priority: '0.9' },
  ...articles.map((a) => ({
    loc: `${ORIGIN}/blog/${a.slug}`,
    lastmod: a.date ?? publishedFor.get(`${a.season}-${a.episode}`) ?? null,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...episodes.map((e) => ({
    loc: `${ORIGIN}/episodes/${e.slug}`,
    lastmod: e.published ?? null,
    changefreq: 'monthly',
    priority: '0.7',
  })),
]

const body = urls
  .map((u) =>
    [
      '  <url>',
      `    <loc>${xmlEscape(u.loc)}</loc>`,
      u.lastmod ? `    <lastmod>${day(u.lastmod)}</lastmod>` : null,
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
