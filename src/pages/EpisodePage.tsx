import { useParams, Link, Navigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { type Episode } from '../episodes'
import { FormattedDate } from '../FormattedDate'
import { EpisodePlayButton } from '../EpisodePlayButton'
import { PauseIcon } from '../PauseIcon'
import { PlayIcon } from '../PlayIcon'
import { useMeta } from '../useMeta'
import { articleMetaForEpisode, seasonEpisode } from '../blog'

interface EpisodePageProps {
  episodes: Episode[]
}

function plainText(html: string, max = 200) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

export function EpisodePage({ episodes }: EpisodePageProps) {
  const { slug } = useParams<{ slug: string }>()

  const episodeIndex = episodes.findIndex((ep) => ep.slug === slug)
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
  const se = seasonEpisode(episode)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint transition hover:text-ink"
      >
        ← All episodes
      </Link>

      <article className="mt-10">
        <header className="grid gap-7 border-b border-rule-strong pb-8 md:grid-cols-[5.5rem_minmax(0,1fr)]">
          {se && (
            <div className="font-display text-[2.75rem] leading-[0.8] tracking-[0.01em] text-brand-violet">
              S{se[0]}
              <br className="hidden md:block" />
              <span className="md:hidden">·</span>E{String(se[1]).padStart(2, '0')}
              <span className="mt-2.5 block font-mono text-[9px] font-medium tracking-[0.16em] text-ink-faint">
                SEASON / EP
              </span>
            </div>
          )}

          <div className={se ? '' : 'md:col-span-2'}>
            <h1 className="font-headline text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.024em] text-ink [text-wrap:balance]">
              {episode.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              <FormattedDate date={new Date(episode.published)} short />
              <span className="tabular-nums">{episode.itunes_duration}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <EpisodePlayButton
                episode={episode}
                className="inline-flex items-center gap-2 rounded-control border border-rule-strong px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition hover:border-brand-purple hover:bg-brand-purple hover:text-white"
                playing={
                  <>
                    <PauseIcon className="h-3 w-3 fill-current" />
                    <span>Pause episode</span>
                  </>
                }
                paused={
                  <>
                    <PlayIcon className="h-3 w-3 fill-current" />
                    <span>Play episode</span>
                  </>
                }
              />
              {article && (
                <Link
                  to={`/blog/${article.slug}`}
                  className="px-3 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint transition hover:text-ink"
                >
                  Read the essay →
                </Link>
              )}
            </div>
          </div>
        </header>

        <section className="mt-10">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
            Show notes
          </h2>
          <div
            className="prose prose-invert prose-bulletin mt-5 max-w-[70ch]"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </section>
      </article>

      <nav className="mt-14 grid gap-px border-t border-rule-strong bg-rule sm:grid-cols-2">
        <div className="bg-ground p-5 sm:p-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            Previous episode
          </span>
          {previousEpisode ? (
            <Link to={`/episodes/${previousEpisode.slug}`} className="group mt-2 block">
              <p className="line-clamp-2 font-headline font-semibold leading-snug text-ink transition group-hover:text-brand-violet">
                {previousEpisode.title}
              </p>
            </Link>
          ) : (
            <p className="mt-2 text-sm text-ink-faint">Nothing older — this is the first.</p>
          )}
        </div>

        <div className="bg-ground p-5 sm:p-6 sm:text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            Next episode
          </span>
          {nextEpisode ? (
            <Link to={`/episodes/${nextEpisode.slug}`} className="group mt-2 block">
              <p className="line-clamp-2 font-headline font-semibold leading-snug text-ink transition group-hover:text-brand-violet">
                {nextEpisode.title}
              </p>
            </Link>
          ) : (
            <p className="mt-2 text-sm text-ink-faint">You&apos;re on the latest.</p>
          )}
        </div>
      </nav>
    </div>
  )
}
