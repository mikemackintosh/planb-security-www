import { type Episode } from '../episodes'
import { EpisodeEntry } from '../components/EpisodeEntry'
import { SpotifyIcon, ApplePodcastIcon, RSSIcon } from '../components/icons'
import { useMeta } from '../useMeta'

const subscribeLinks = [
  ['Spotify', SpotifyIcon, 'https://open.spotify.com/show/1I1lWiytUs20VRnLz1aUQb'],
  ['Apple Podcasts', ApplePodcastIcon, 'https://podcasts.apple.com/gb/podcast/plan-b-security/id1702358824'],
  ['RSS', RSSIcon, 'https://anchor.fm/s/e741494c/podcast/rss'],
] as const

interface HomePageProps {
  episodes: Episode[]
}

export function HomePage({ episodes }: HomePageProps) {
  useMeta({
    description:
      'PlanB Security is a podcast about all things InfoSec — new laws, threats, tooling and ways of thinking to help you build a strong security program and prepare for when things go wrong.',
    url: '/',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-24">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-orange">
              The InfoSec Podcast
            </span>
            <h1 className="mt-6 font-display text-4xl leading-tight text-white sm:text-6xl">
              All things{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">#InfoSec</span>,
              <br className="hidden sm:block" /> for when things go wrong.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Security isn&apos;t just a technical problem anymore. The industry changes every day —
              new laws, regulations, attacks, threats and tooling. Join us each week as we explore
              new topics and new ways of thinking, so you can grow by building a strong security program.
            </p>

            {/* Subscribe */}
            <div className="mt-8 flex flex-wrap gap-3">
              {subscribeLinks.map(([label, Icon, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-purple/50 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-5 w-5 fill-brand-purple transition group-hover:fill-brand-orange" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between border-b border-white/5 pb-4">
          <h2 className="font-display text-2xl text-white">Episodes</h2>
          <span className="text-sm text-slate-500">{episodes.length} episodes</span>
        </div>
        <div className="divide-y divide-white/5">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </section>
    </>
  )
}
