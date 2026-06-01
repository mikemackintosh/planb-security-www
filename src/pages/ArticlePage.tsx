import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { type Episode } from '../episodes'
import { getArticleMeta, loadArticleBody, episodeForArticle } from '../blog'
import { Markdown } from '../components/Markdown'
import { FormattedDate } from '../FormattedDate'
import { PlayIcon } from '../PlayIcon'
import { useMeta } from '../useMeta'

interface ArticlePageProps {
  episodes: Episode[]
}

export function ArticlePage({ episodes }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleMeta(slug) : undefined
  const episode = article ? episodeForArticle(article, episodes) : null

  const [body, setBody] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    if (slug) {
      setBody(null)
      loadArticleBody(slug).then((md) => {
        if (active) setBody(md)
      })
    }
    return () => {
      active = false
    }
  }, [slug])

  useMeta({
    title: article?.title,
    description: article?.deck || undefined,
    url: article ? `/blog/${article.slug}` : undefined,
  })

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/blog"
        className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-brand-orange"
      >
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Articles
      </Link>

      <article className="mt-8">
        <header className="border-b border-white/5 pb-8">
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            <span className="rounded bg-white/5 px-2 py-0.5 text-brand-purple">
              S{article.season}E{article.episode}
            </span>
            {episode && <FormattedDate date={new Date(episode.published)} className="font-mono" />}
          </div>
          <h1 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
            {article.title}
          </h1>
          {article.deck && <p className="mt-4 text-lg leading-relaxed text-slate-400">{article.deck}</p>}

          {episode && (
            <Link
              to={`/episodes/${episode.slug}`}
              className="mt-6 inline-flex items-center gap-x-3 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:opacity-90"
            >
              <PlayIcon className="h-4 w-4 fill-current" />
              Listen to the episode
            </Link>
          )}
        </header>

        {body === null ? (
          <p className="mt-8 text-slate-500">Loading article…</p>
        ) : (
          <Markdown className="mt-8">{body}</Markdown>
        )}
      </article>
    </div>
  )
}
