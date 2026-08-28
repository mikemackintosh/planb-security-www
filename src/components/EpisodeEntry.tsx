import { Link } from 'react-router-dom'
import { type Episode } from '../episodes'
import { FormattedDate } from '../FormattedDate'
import { EpisodePlayButton } from '../EpisodePlayButton'
import { PauseIcon } from '../PauseIcon'
import { PlayIcon } from '../PlayIcon'
import { articleMetaForEpisode, seasonEpisode } from '../blog'

export function EpisodeEntry({ episode }: { episode: Episode }) {
  const date = new Date(episode.published)
  const description = episode.description.replace(/<\/?p>/g, '').trim()
  const article = articleMetaForEpisode(episode)
  const se = seasonEpisode(episode)

  return (
    // Full-bleed hover with a 2px accent bar sliding in from the left — the one
    // hover motion in the system, reused on every list row across the site.
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="group relative border-b border-rule px-4 py-6 transition-colors hover:bg-surface sm:px-6
                 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0
                 before:bg-brand-purple before:transition-transform before:duration-200 before:content-['']
                 hover:before:scale-y-100"
    >
      <div className="flex items-start justify-between gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
        <span>
          <FormattedDate date={date} short />
          {se && ` · S${se[0]}E${se[1]}`}
        </span>
        <span className="shrink-0 tabular-nums">{episode.itunes_duration}</span>
      </div>

      <h2
        id={`episode-${episode.id}-title`}
        className="mt-2.5 font-headline text-xl font-bold leading-[1.25] tracking-[-0.012em] text-ink sm:text-[21px]"
      >
        <Link to={`/episodes/${episode.slug}`} className="transition group-hover:text-brand-violet">
          {episode.title}
        </Link>
      </h2>

      <p className="mt-2 line-clamp-2 max-w-[78ch] text-[15px] leading-[1.65] text-ink-dim">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <EpisodePlayButton
          episode={episode}
          className="inline-flex items-center gap-2 rounded-control border border-rule-strong px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition hover:border-brand-purple hover:bg-brand-purple hover:text-white"
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
          className="px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint transition hover:text-ink"
          aria-label={`Show notes for episode ${episode.title}`}
        >
          Show notes →
        </Link>
        {article && (
          <Link
            to={`/blog/${article.slug}`}
            className="px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint transition hover:text-ink"
          >
            Read the article →
          </Link>
        )}
      </div>
    </article>
  )
}
