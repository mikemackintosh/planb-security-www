import { Link } from 'react-router-dom'
import { type Episode } from '../episodes'
import { FormattedDate } from '../FormattedDate'
import { EpisodePlayButton } from '../EpisodePlayButton'
import { PauseIcon } from '../PauseIcon'
import { PlayIcon } from '../PlayIcon'

export function EpisodeEntry({ episode }: { episode: Episode }) {
  let date = new Date(episode.published)
  let description = episode.description.replace(/<\/?p>/g, '').trim()

  return (
    <article aria-labelledby={`episode-${episode.id}-title`} className="py-6">
      <div className="group rounded-2xl border border-white/5 bg-ink-800/60 p-5 transition hover:border-brand-purple/40 hover:bg-ink-800 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <FormattedDate
              date={date}
              className="font-mono text-xs uppercase tracking-wide text-slate-500"
            />
            <h2
              id={`episode-${episode.id}-title`}
              className="mt-1 text-lg font-bold leading-snug text-slate-100 transition group-hover:text-white sm:text-xl"
            >
              <Link to={`/episodes/${episode.slug}`} className="hover:text-brand-orange">
                {episode.title}
              </Link>
            </h2>
          </div>
          <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400">
            {episode.itunes_duration}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 leading-7 text-slate-400">{description}</p>

        <div className="mt-5 flex items-center gap-5">
          <EpisodePlayButton
            episode={episode}
            className="inline-flex items-center gap-x-2 rounded-full bg-brand-purple/15 px-4 py-1.5 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-white"
            playing={
              <>
                <PauseIcon className="h-3 w-3 fill-current" />
                <span>Pause</span>
              </>
            }
            paused={
              <>
                <PlayIcon className="h-3 w-3 fill-current" />
                <span>Listen</span>
              </>
            }
          />
          <Link
            to={`/episodes/${episode.slug}`}
            className="text-sm font-semibold text-slate-400 transition hover:text-brand-orange"
            aria-label={`Show notes for episode ${episode.title}`}
          >
            Show notes →
          </Link>
        </div>
      </div>
    </article>
  )
}
