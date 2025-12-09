import { useParams, Link, Navigate } from 'react-router-dom'
import { type Episode } from '../episodes'
import { FormattedDate } from '../FormattedDate'
import { EpisodePlayButton } from '../EpisodePlayButton'
import { PauseIcon } from '../PauseIcon'
import { PlayIcon } from '../PlayIcon'

interface EpisodePageProps {
  episodes: Episode[]
}

export function EpisodePage({ episodes }: EpisodePageProps) {
  const { slug } = useParams<{ slug: string }>()

  const episodeIndex = episodes.findIndex(ep => ep.slug === slug)
  const episode = episodes[episodeIndex]

  if (!episode) {
    return <Navigate to="/" replace />
  }

  // Episodes are sorted newest first, so "previous" is older (higher index)
  // and "next" is newer (lower index)
  const previousEpisode = episodeIndex < episodes.length - 1 ? episodes[episodeIndex + 1] : null
  const nextEpisode = episodeIndex > 0 ? episodes[episodeIndex - 1] : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-orange-400 mb-8"
      >
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Episodes
      </Link>

      {/* Episode header */}
      <article className="rounded-lg bg-slate-800 overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Title and duration */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {episode.title}
            </h1>
            <span className="text-white font-mono text-lg whitespace-nowrap">
              {episode.itunes_duration}
            </span>
          </div>

          {/* Publish date */}
          <FormattedDate
            date={new Date(episode.published)}
            className="block mt-2 font-mono text-sm text-slate-400"
          />

          {/* Play button */}
          <div className="mt-6">
            <EpisodePlayButton
              episode={episode}
              className="inline-flex items-center gap-x-3 px-6 py-3 rounded-full bg-purple-600 hover:bg-orange-500 text-white font-bold text-lg transition-colors"
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
          </div>

          {/* Episode content */}
          <div className="mt-8 border-t border-slate-700 pt-8">
            <h2 className="text-lg font-semibold text-white mb-4">About this episode</h2>
            <div
              className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: episode.content || episode.description }}
            />
          </div>
        </div>

        {/* Previous/Next navigation */}
        <div className="border-t border-slate-700 bg-slate-900">
          <div className="grid grid-cols-2 divide-x divide-slate-700">
            {/* Previous (older) episode */}
            <div className="p-4 sm:p-6">
              {previousEpisode ? (
                <Link
                  to={`/episodes/${previousEpisode.slug}`}
                  className="group block"
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Previous Episode
                  </span>
                  <p className="mt-1 text-sm font-medium text-slate-300 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {previousEpisode.title}
                  </p>
                </Link>
              ) : (
                <div className="text-slate-600">
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Previous Episode
                  </span>
                  <p className="mt-1 text-sm">No previous episode</p>
                </div>
              )}
            </div>

            {/* Next (newer) episode */}
            <div className="p-4 sm:p-6 text-right">
              {nextEpisode ? (
                <Link
                  to={`/episodes/${nextEpisode.slug}`}
                  className="group block"
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Next Episode
                  </span>
                  <p className="mt-1 text-sm font-medium text-slate-300 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {nextEpisode.title}
                  </p>
                </Link>
              ) : (
                <div className="text-slate-600">
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Next Episode
                  </span>
                  <p className="mt-1 text-sm">You're on the latest!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
