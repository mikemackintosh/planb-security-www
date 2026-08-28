import { Link } from 'react-router-dom'
import { type Episode } from '../episodes'
import { articleMetas, episodeForArticle, type ArticleMeta } from '../blog'
import { FormattedDate } from '../FormattedDate'
import { useMeta } from '../useMeta'

interface BlogPageProps {
  episodes: Episode[]
}

interface Entry {
  article: ArticleMeta
  episode: Episode | null
}

/** Newest first: season desc, then episode desc. */
function byRecency(a: Entry, b: Entry) {
  return b.article.season - a.article.season || b.article.episode - a.article.episode
}

export function BlogPage({ episodes }: BlogPageProps) {
  useMeta({
    title: 'Writing',
    description:
      'Companion essays to the PlanB Security podcast — deep dives on InfoSec leadership, AI risk, identity, and building a strong security program.',
    url: '/blog',
  })

  const entries: Entry[] = articleMetas
    .map((article) => ({ article, episode: episodeForArticle(article, episodes) }))
    .sort(byRecency)

  const [lead, ...rest] = entries

  // A 2-column card grid can't carry 37 essays — it forces uniform height,
  // truncates every deck, and hides the arc across seasons. Group instead.
  const seasons = new Map<number, Entry[]>()
  for (const entry of rest) {
    const list = seasons.get(entry.article.season)
    if (list) list.push(entry)
    else seasons.set(entry.article.season, [entry])
  }
  const seasonNumbers = [...seasons.keys()].sort((a, b) => b - a)

  function seasonYears(list: Entry[]) {
    const years = list
      .map((e) => (e.episode ? new Date(e.episode.published).getFullYear() : null))
      .filter((y): y is number => y !== null)
    if (!years.length) return null
    const lo = Math.min(...years)
    const hi = Math.max(...years)
    return lo === hi ? String(lo) : `${lo}–${String(hi).slice(-2)}`
  }

  return (
    <div className="mx-auto max-w-6xl">
      <section className="animate-fade-up px-4 pt-12 sm:px-6">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
          Companion Essays
        </div>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.88] text-ink">
          Every episode,
          <br />
          written down.
        </h1>
        <p className="mt-5 max-w-[58ch] text-ink-dim">
          The ideas, frameworks and arguments from the show — expanded, sourced, and permanent.
          One essay per episode, back to the first.
        </p>
      </section>

      {/* Lead: the newest piece as a typographic block, not a card. */}
      {lead && (
        <Link
          to={`/blog/${lead.article.slug}`}
          className="group mx-4 mt-12 block border-b border-rule border-t-2 border-t-brand-purple pb-8 pt-6 sm:mx-6"
        >
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            <span className="font-bold text-brand-amber">◆ Newest</span>
            <span>
              S{lead.article.season}E{String(lead.article.episode).padStart(2, '0')}
            </span>
            {lead.episode && <FormattedDate date={new Date(lead.episode.published)} short />}
            <span>{lead.article.minutes} min read</span>
          </div>
          <h2 className="mt-4 max-w-[22ch] font-headline text-[clamp(1.6rem,3.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.022em] text-ink transition group-hover:text-brand-violet">
            {lead.article.title}
          </h2>
          {lead.article.deck && (
            <p className="mt-3.5 max-w-[60ch] text-ink-dim">{lead.article.deck}</p>
          )}
        </Link>
      )}

      {/* Season ledger */}
      {seasonNumbers.map((season) => {
        const list = seasons.get(season)!
        const years = seasonYears(list)
        return (
          <section key={season}>
            <div className="mx-4 mt-14 flex items-center gap-5 sm:mx-6">
              <span className="font-display text-[3.5rem] leading-[0.8] text-ink">S{season}</span>
              <span className="h-px flex-1 bg-rule-strong" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                {list.length} {list.length === 1 ? 'essay' : 'essays'}
                {years && ` · ${years}`}
              </span>
            </div>

            <div className="mt-3">
              {list.map(({ article, episode }) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group relative grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1
                             border-b border-rule px-4 py-3.5 transition-colors hover:bg-surface sm:px-6
                             md:grid-cols-[3.25rem_7.5rem_minmax(0,1fr)_4.5rem]
                             before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-center
                             before:scale-y-0 before:bg-brand-purple before:transition-transform
                             before:duration-200 before:content-[''] hover:before:scale-y-100"
                >
                  <span className="font-mono text-xs font-bold tabular-nums text-brand-violet">
                    E{String(article.episode).padStart(2, '0')}
                  </span>
                  <span className="col-start-2 font-mono text-[11px] uppercase tabular-nums tracking-[0.06em] text-ink-faint md:col-auto">
                    {episode ? <FormattedDate date={new Date(episode.published)} short /> : '—'}
                  </span>
                  <span className="col-start-2 font-headline text-base font-semibold leading-[1.35] tracking-[-0.01em] text-ink transition group-hover:text-brand-violet md:col-auto">
                    {article.title}
                    {article.deck && (
                      <span className="mt-0.5 block font-sans text-sm font-normal leading-[1.5] text-ink-faint">
                        {article.deck}
                      </span>
                    )}
                  </span>
                  <span className="col-start-2 font-mono text-[11px] tabular-nums text-ink-faint md:col-auto md:text-right">
                    {article.minutes} min
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
