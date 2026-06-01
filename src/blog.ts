import { type Episode } from './episodes'
import { articleMetas, type ArticleMeta } from './blogMeta'

export type { ArticleMeta }
export { articleMetas }

// Non-eager glob: each article body is its own chunk, fetched only when the
// article is opened. The metadata (titles/decks) lives in the main bundle via
// the generated blogMeta.ts, so the index and episode links stay lightweight.
const loaders = import.meta.glob('/blogs/*.md', { as: 'raw' }) as Record<string, () => Promise<string>>

const loaderBySlug = new Map<string, () => Promise<string>>(
  Object.entries(loaders).map(([path, load]) => [path.split('/').pop()!.replace(/\.md$/, ''), load]),
)

export function getArticleMeta(slug: string): ArticleMeta | undefined {
  return articleMetas.find((a) => a.slug === slug)
}

/** Loads and returns the markdown body (after the title/deck/`---` header). */
export async function loadArticleBody(slug: string): Promise<string> {
  const load = loaderBySlug.get(slug)
  if (!load) return ''
  const raw = await load()
  const sep = raw.search(/^---\s*$/m)
  return (sep >= 0 ? raw.slice(raw.indexOf('\n', sep) + 1) : raw).trim()
}

/** Derive [season, episode] from an episode title prefix (`Ep. 1 -`, `S2E3 -`). */
export function seasonEpisode(ep: Episode): [number, number] | null {
  let m = ep.title.match(/^\s*Ep\.?\s*(\d+)/i)
  if (m) return [1, Number(m[1])]
  m = ep.title.match(/^\s*S(\d+)\s*E(\d+)/i)
  if (m) return [Number(m[1]), Number(m[2])]
  return null
}

const metaByKey = new Map(articleMetas.map((a) => [`${a.season}-${a.episode}`, a]))

/** The companion article for a podcast episode, if one exists. */
export function articleMetaForEpisode(ep: Episode): ArticleMeta | null {
  const se = seasonEpisode(ep)
  return se ? metaByKey.get(`${se[0]}-${se[1]}`) ?? null : null
}

/** The podcast episode an article accompanies, if present in the feed. */
export function episodeForArticle(article: ArticleMeta, episodes: Episode[]): Episode | null {
  return (
    episodes.find((ep) => {
      const se = seasonEpisode(ep)
      return se?.[0] === article.season && se?.[1] === article.episode
    }) ?? null
  )
}
