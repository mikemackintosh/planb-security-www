import { type Episode } from '../episodes'
import { EpisodeEntry } from '../components/EpisodeEntry'
import { SpotifyIcon, ApplePodcastIcon, RSSIcon, YouTubeIcon } from '../components/icons'
import { articleMetas, seasonEpisode } from '../blog'
import { useMeta } from '../useMeta'
import { StructuredData, SITE_URL, PUBLISHER, AUTHOR } from '../components/StructuredData'

const subscribeLinks = [
  ['Spotify', SpotifyIcon, 'https://open.spotify.com/show/1I1lWiytUs20VRnLz1aUQb'],
  ['Apple Podcasts', ApplePodcastIcon, 'https://podcasts.apple.com/gb/podcast/plan-b-security/id1702358824'],
  ['RSS', RSSIcon, 'https://anchor.fm/s/e741494c/podcast/rss'],
  ['YouTube', YouTubeIcon, 'https://www.youtube.com/channel/UCLG2Xu72da2a8xP6-1UxkwQ'],
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

  const seasons = new Set(
    episodes.map((ep) => seasonEpisode(ep)?.[0]).filter((n): n is number => typeof n === 'number'),
  ).size

  const meter = [
    [String(episodes.length), 'Episodes'],
    [String(seasons).padStart(2, '0'), 'Seasons'],
    [String(articleMetas.length), 'Written companions'],
    [episodes[0]?.itunes_duration ?? '—', 'Latest runtime'],
  ] as const

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'PodcastSeries',
          name: 'PlanB Security',
          alternateName: 'PlanB Security — The InfoSec Podcast',
          url: SITE_URL,
          description:
            'A podcast about all things InfoSec — new laws, threats, tooling and ways of thinking to help you build a strong security program.',
          image: `${SITE_URL}/img/home-studio-og.jpg`,
          webFeed: 'https://anchor.fm/s/e741494c/podcast/rss',
          numberOfEpisodes: episodes.length,
          author: AUTHOR,
          publisher: PUBLISHER,
          sameAs: [
            'https://open.spotify.com/show/1I1lWiytUs20VRnLz1aUQb',
            'https://podcasts.apple.com/gb/podcast/plan-b-security/id1702358824',
            'https://www.youtube.com/channel/UCLG2Xu72da2a8xP6-1UxkwQ',
          ],
        }}
      />

      {/* Hero — the thesis lands on two words, not a gradient. */}
      <section className="relative overflow-hidden">
        {/* Decorative: the art bleeds off the right edge and is masked away
            before it reaches the headline, so it reads as depth behind the
            type rather than a picture next to it. Desktop only — behind the
            type at narrow widths it would just cost legibility. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-center lg:flex"
        >
          {/* object-contain, not cover: the art is 4:3 inside a portrait
              container, so cover scales to fill the height and crops the
              right-hand panels off past the viewport edge. */}
          <img
            src="/img/home-studio.webp"
            width={1448}
            height={1086}
            alt=""
            decoding="async"
            className="h-auto max-h-full w-full object-contain opacity-80
                       [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_34%)]
                       [mask-image:linear-gradient(to_right,transparent_0%,#000_34%)]"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ground to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
          <div className="animate-fade-up">
          <div className="flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-faint">
            <span>The InfoSec Podcast</span>
            <span className="h-px flex-1 bg-rule" />
            <span>Season {Math.max(seasons, 1)}</span>
          </div>

          <h1 className="mt-7 font-display text-[clamp(3rem,11.5vw,9rem)] uppercase leading-[0.82] tracking-[0.006em] text-ink">
            All things <span className="text-ink-faint">#</span>InfoSec,
            <br />
            for when things
            <br />
            <span className="text-brand-violet">go wrong.</span>
          </h1>

          <p className="mt-9 max-w-[58ch] text-[17px] leading-[1.7] text-ink-dim">
            Security isn&apos;t just a technical problem anymore. New laws, regulations, attacks,
            threats and tooling — every week. Join us as we work through new topics and new ways of
            thinking, so you can build a security program that holds.
          </p>

          {/* One ruled instrument strip, not three floating pills. */}
          <div className="mt-11 flex w-fit max-w-full flex-wrap overflow-hidden rounded-control border border-rule">
            {subscribeLinks.map(([label, Icon, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-r border-rule px-[18px] py-[11px] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-dim transition last:border-r-0 hover:bg-brand-purple hover:text-white"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 fill-current" />
                {label}
              </a>
            ))}
          </div>

          {/* Hairline meter gives the fold a floor. */}
          <dl className="mt-16 flex border-t border-rule">
            {meter.map(([value, label], i) => (
              <div
                key={label}
                className={`flex-1 border-r border-rule pb-6 pr-6 pt-[18px] last:border-r-0 last:pr-0 ${
                  i === 0 ? '' : 'pl-6'
                }`}
              >
                <dd className="block font-display text-4xl leading-none text-ink">{value}</dd>
                <dt className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="flex items-end justify-between gap-4 border-b border-rule-strong px-4 pb-3.5 sm:px-6">
          <h2 className="font-display text-3xl leading-none text-ink">Episodes</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {episodes.length} total · newest first
          </span>
        </div>
        <div>
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </section>
    </>
  )
}
