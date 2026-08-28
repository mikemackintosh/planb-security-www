import episodesSnapshot from './episodes.json'

export interface Episode {
  id: number
  title: string
  slug: string
  /** ISO 8601 string in the build-time snapshot; components wrap it in Date(). */
  published: string
  description: string
  content: string
  itunes_duration: string
  audio: {
    src: string
    type: string
  }
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '')           // Remove apostrophes
    .replace(/[^a-z0-9\s-]/g, '')   // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens with single
    .replace(/^-|-$/g, '')          // Remove leading/trailing hyphens
    .slice(0, 80)                   // Limit length
}

/**
 * Episodes come from a build-time snapshot of the podcast feed
 * (scripts/gen-episodes.mjs), not a runtime fetch.
 *
 * This used to be `await getAllEpisodes(FEED)` at the top level of App.tsx,
 * which blocked module evaluation — and therefore all rendering — on an 83KB
 * cross-origin request. Every visitor paid that latency, and a crawler
 * rendering the page had to complete a third-party fetch before any content
 * existed at all. The snapshot is refreshed on every deploy.
 */
export const episodes: Episode[] = episodesSnapshot as Episode[]
