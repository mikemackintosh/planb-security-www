#!/usr/bin/env node
// Snapshots the podcast feed into src/episodes.json at build time.
//
// Previously src/App.tsx did a top-level `await getAllEpisodes(FEED)`, which
// blocked module evaluation — and therefore all rendering — on an 83KB
// cross-origin request. Every visitor paid for it, and a crawler rendering the
// page had to complete a third-party fetch before any content existed.
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchEpisodes, FEED } from './lib/content.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'src', 'episodes.json')

const episodes = await fetchEpisodes(FEED)

if (episodes && episodes.length) {
  writeFileSync(out, JSON.stringify(episodes, null, 2) + '\n')
  console.log(`gen-episodes: wrote ${episodes.length} episodes to src/episodes.json`)
} else if (existsSync(out)) {
  // Keep the previous snapshot rather than shipping an empty site.
  const kept = JSON.parse(readFileSync(out, 'utf8'))
  console.warn(`gen-episodes: feed failed; keeping existing snapshot (${kept.length} episodes)`)
} else {
  console.error('gen-episodes: feed failed and no snapshot exists — refusing to build an empty site')
  process.exit(1)
}
