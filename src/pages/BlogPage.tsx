import { Link } from 'react-router-dom'
import { type Episode } from '../episodes'
import { articleMetas, episodeForArticle } from '../blog'
import { FormattedDate } from '../FormattedDate'
import { useMeta } from '../useMeta'

interface BlogPageProps {
  episodes: Episode[]
}

export function BlogPage({ episodes }: BlogPageProps) {
  useMeta({
    title: 'Blog',
    description:
      'Companion articles to the PlanB Security podcast — deep dives on InfoSec leadership, AI risk, identity, and building a strong security program.',
    url: '/blog',
  })

  // Pair each article with its episode (for the real publish date), newest first.
  const entries = articleMetas
    .map((article) => ({ article, episode: episodeForArticle(article, episodes) }))
    .sort((a, b) => {
      const da = a.episode ? new Date(a.episode.published).getTime() : 0
      const db = b.episode ? new Date(b.episode.published).getTime() : 0
      return db - da
    })

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <div className="max-w-3xl animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-orange">
          The Blog
        </span>
        <h1 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
          Notes from the show
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-300">
          Companion articles to every episode — the ideas, frameworks, and stories from the podcast,
          written down so you can revisit them.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {entries.map(({ article, episode }) => (
          <Link
            key={article.slug}
            to={`/blog/${article.slug}`}
            className="group flex flex-col rounded-2xl border border-white/5 bg-ink-800/60 p-6 transition hover:border-brand-purple/40 hover:bg-ink-800"
          >
            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-500">
              <span className="rounded bg-white/5 px-2 py-0.5 text-brand-purple">
                S{article.season}E{article.episode}
              </span>
              {episode && <FormattedDate date={new Date(episode.published)} className="font-mono" />}
            </div>
            <h2 className="mt-3 text-xl font-bold leading-snug text-slate-100 transition group-hover:text-brand-orange">
              {article.title}
            </h2>
            {article.deck && <p className="mt-2 line-clamp-3 leading-7 text-slate-400">{article.deck}</p>}
            <span className="mt-4 text-sm font-semibold text-slate-400 transition group-hover:text-brand-orange">
              Read article →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
