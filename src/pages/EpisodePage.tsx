import { useParams, Link, Navigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { type Episode } from '../episodes'
import { FormattedDate } from '../FormattedDate'
import { EpisodePlayButton } from '../EpisodePlayButton'
import { PauseIcon } from '../PauseIcon'
import { PlayIcon } from '../PlayIcon'
import { useMeta } from '../useMeta'
import { articleMetaForEpisode } from '../blog'

interface EpisodePageProps {
  episodes: Episode[]
}

function plainText(html: string, max = 200) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

export function EpisodePage({ episodes }: EpisodePageProps) {
  const { slug } = useParams<{ slug: string }>()

  const episodeIndex = episodes.findIndex(ep => ep.slug === slug)
  const episode = episodes[episodeIndex]

  // Hooks must run before any early return; guard with optional values.
  const html = episode ? episode.content || episode.description : ''
  useMeta({
    title: episode?.title,
    description: episode ? plainText(html) : undefined,
    url: episode ? `/episodes/${episode.slug}` : undefined,
  })

  if (!episode) {
    return <Navigate to="/" replace />
  }

  // Episodes are sorted newest first, so "previous" is older (higher index)
  // and "next" is newer (lower index)
  const previousEpisode = episodeIndex < episodes.length - 1 ? episodes[episodeIndex + 1] : null
  const nextEpisode = episodeIndex > 0 ? episodes[episodeIndex - 1] : null

  const safeHtml = DOMPurify.sanitize(html, { ADD_ATTR: ['target', 'rel'] })
  const article = articleMetaForEpisode(episode)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-brand-orange"
      >
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Episodes
      </Link>

      {/* Episode header */}
      <article className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-ink-800/60">
        <div className="border-b border-white/5 bg-brand-purple/5 p-6 sm:p-8">
          <FormattedDate
            date={new Date(episode.published)}
            className="font-mono text-sm text-brand-orange"
          />
          <h1 className="mt-2 font-display text-2xl leading-tight text-white sm:text-4xl">
            {episode.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <EpisodePlayButton
              episode={episode}
              className="inline-flex items-center gap-x-3 rounded-full bg-brand-gradient px-6 py-3 text-base font-bold text-white shadow-glow transition hover:opacity-90"
              playing={
                <>
                  <PauseIcon className="h-5 w-5 fill-current" />
                  <span>Pause Episode</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-5 w-5 fill-current" />
                  <span>Play Episode</span>
                </>
              }
            />
            <span className="font-mono text-sm text-slate-400">{episode.itunes_duration}</span>
          </div>
          {article && (
            <Link
              to={`/blog/${article.slug}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-brand-orange"
            >
              📖 Read the companion article
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {/* Episode content */}
        <div className="p-6 sm:p-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            About this episode
          </h2>
          <div
            className="prose prose-invert prose-slate max-w-none prose-a:text-brand-orange prose-headings:font-display"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </div>

        {/* Previous/Next navigation */}
        <div className="grid grid-cols-2 divide-x divide-white/5 border-t border-white/5 bg-ink-900/50">
          <div className="p-4 sm:p-6">
            {previousEpisode ? (
              <Link to={`/episodes/${previousEpisode.slug}`} className="group block">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Previous Episode
                </span>
                <p className="mt-1 line-clamp-2 text-sm font-medium text-slate-300 transition group-hover:text-brand-orange">
                  {previousEpisode.title}
                </p>
              </Link>
            ) : (
              <div className="text-slate-600">
                <span className="text-xs font-medium uppercase tracking-wide">Previous Episode</span>
                <p className="mt-1 text-sm">No previous episode</p>
              </div>
            )}
          </div>

          <div className="p-4 text-right sm:p-6">
            {nextEpisode ? (
              <Link to={`/episodes/${nextEpisode.slug}`} className="group block">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Next Episode
                </span>
                <p className="mt-1 line-clamp-2 text-sm font-medium text-slate-300 transition group-hover:text-brand-orange">
                  {nextEpisode.title}
                </p>
              </Link>
            ) : (
              <div className="text-slate-600">
                <span className="text-xs font-medium uppercase tracking-wide">Next Episode</span>
                <p className="mt-1 text-sm">You&apos;re on the latest!</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
