import { Link } from 'react-router-dom'
import { type Episode } from '../episodes'
import { FormattedDate } from '../FormattedDate'
import { EpisodePlayButton } from '../EpisodePlayButton'
import { PauseIcon } from '../PauseIcon'
import { PlayIcon } from '../PlayIcon'

export function EpisodeEntry({ episode }: { episode: Episode }) {
  let date = new Date(episode.published)

  return (
    <>
      <a id={episode.id.toString()} />
      <article
        aria-labelledby={`episode-${episode.id}-title`}
        className="py-10 sm:py-12"
      >
        <div className="flex flex-col items-start">
          <div className="rounded-t-lg bg-slate-800 p-4">
            <div className="flex">
              <h2
                id={`episode-${episode.id}-title`}
                className="flex-grow mt-2 pr-4 text-xl font-bold text-slate-100"
              >
                <Link to={`/episodes/${episode.slug}`}>{episode.title}</Link>
              </h2>
              <div className="flex-none font-bold text-sm w-14 items-center mr-4 mt-4 text-right">
                <span className="text-white font-mono justify-end">
                  {episode.itunes_duration}
                </span>
              </div>
            </div>
            <FormattedDate
              date={date}
              className="order-first font-mono leading-7 text-sm text-slate-500"
            />
            <p className="mt-1 pb-2 leading-7 text-slate-300">
              {episode.description.replace("<p>", "").replace("</p>", "")}
            </p>
          </div>
          <div className="w-full px-5 pb-3 pt-3 flex items-center gap-4 rounded-b-lg bg-slate-700 border-t border-t-slate-600 border-b border-b-slate-900">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm font-bold leading-6 text-purple-400 hover:text-orange-400"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true" className="text-md">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true" className="text-md">Listen</span>
                </>
              }
            />
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              to={`/episodes/${episode.slug}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
