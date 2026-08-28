import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams, Link } from 'react-router-dom'
import './App.css'
import { AudioProvider } from './AudioProvider'
import { AudioPlayer } from './components/player/AudioPlayer'
import { type Episode, getAllEpisodes } from './episodes'
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'
import { HomePage } from './pages/HomePage'
import { EpisodePage } from './pages/EpisodePage'

// Blog content (37 markdown articles + the markdown renderer) is split into its
// own chunk so it only loads when a visitor opens the blog.
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })))
import {
  InstagramIcon,
  XIcon,
  GitHubIcon,
  YouTubeIcon,
  SpotifyIcon,
  ApplePodcastIcon,
} from './components/icons'

const social = [
  { name: 'Instagram', href: 'https://www.instagram.com/_planbsecurity/?hl=en', icon: InstagramIcon },
  { name: 'X', href: 'https://twitter.com/_planbsecurity/?hl=en', icon: XIcon },
  { name: 'GitHub', href: 'https://github.com/planbsecurity', icon: GitHubIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCLG2Xu72da2a8xP6-1UxkwQ', icon: YouTubeIcon },
  { name: 'Spotify', href: 'https://open.spotify.com/show/1I1lWiytUs20VRnLz1aUQb', icon: SpotifyIcon },
  { name: 'Apple Podcasts', href: 'https://podcasts.apple.com/gb/podcast/plan-b-security/id1702358824', icon: ApplePodcastIcon },
]

let episodes = await getAllEpisodes("https://anchor.fm/s/e741494c/podcast/rss")

// Legacy redirect component for old numeric URLs
function LegacyRedirect({ episodes }: { episodes: Episode[] }) {
  const { id } = useParams<{ id: string }>()

  // Check if it's a numeric ID
  if (id && /^\d+$/.test(id)) {
    const episode = episodes.find(ep => ep.id.toString() === id)
    if (episode) {
      return <Navigate to={`/episodes/${episode.slug}`} replace />
    }
  }

  // Not found, redirect to home
  return <Navigate to="/" replace />
}

/** Lockup B — cut block + stacked wordmark. Square: a rounded mark was the
 *  app-icon cliché we removed. Bebas is caps-only, so "PlanB" sets as PLANB. */
function Wordmark() {
  return (
    <span className="flex items-stretch gap-2.5">
      <span className="grid w-[34px] shrink-0 place-items-center bg-brand-purple pt-0.5 font-display text-2xl leading-none text-white">
        B
      </span>
      <span className="flex flex-col justify-center">
        <span className="font-display text-2xl leading-[0.9] tracking-wide text-ink transition group-hover:text-brand-violet">
          PlanB
        </span>
        <span className="mt-[2px] font-mono text-[9px] font-medium tracking-[0.34em] text-ink-dim">
          SECURITY
        </span>
      </span>
    </span>
  )
}

function Navbar() {
  const latest = episodes[0]
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-ground/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link to="/" className="group shrink-0">
          <Wordmark />
        </Link>

        {/* Station-ID strip: a hard amber flag butted against the title. This is
            the one place amber reads as "live" rather than as diagram data. */}
        {latest && (
          <Link
            to={`/episodes/${latest.slug}`}
            className="group hidden min-w-0 flex-1 justify-center lg:flex"
          >
            <span className="inline-flex max-w-full items-stretch overflow-hidden rounded-control border border-rule transition group-hover:border-rule-strong">
              <span className="grid shrink-0 place-items-center bg-brand-amber px-2 font-mono text-[9px] font-bold tracking-[0.16em] text-[#17120A]">
                NEW
              </span>
              <span className="grid items-center truncate px-3 py-1.5 text-[13px] font-medium text-ink-dim transition group-hover:text-ink">
                {latest.title}
              </span>
            </span>
          </Link>
        )}

        <nav className="flex shrink-0 items-center gap-6 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-dim">
          <Link to="/" className="transition hover:text-ink">
            Episodes
          </Link>
          <Link to="/blog" className="transition hover:text-ink">
            Writing
          </Link>
          <a
            href="https://x.com/mikemackintosh"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap transition hover:text-ink md:block"
          >
            @mikemackintosh
          </a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-faint">
              All things #InfoSec, for when things go wrong. A weekly podcast and a written
              companion for every episode.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-4">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-faint transition hover:text-brand-violet"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-rule pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint sm:flex-row sm:justify-between">
          <span>&copy; {year} Mike Mackintosh</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const gtmParams = { id: 'G-W86BT3ZBT6' }

  return (
    <BrowserRouter>
      <GTMProvider state={gtmParams}>
        <AudioProvider>
          <Navbar />

          {/* Main content */}
          <main className="isolate pb-24">
            <Suspense fallback={<div className="px-6 py-20 text-center font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">Loading…</div>}>
              <Routes>
                <Route path="/" element={<HomePage episodes={episodes} />} />
                <Route path="/episodes/:slug" element={<EpisodePage episodes={episodes} />} />
                <Route path="/blog" element={<BlogPage episodes={episodes} />} />
                <Route path="/blog/:slug" element={<ArticlePage episodes={episodes} />} />
                {/* Legacy redirect for old numeric URLs */}
                <Route path="/:id" element={<LegacyRedirect episodes={episodes} />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />

          <div className="fixed inset-x-0 bottom-0 z-40">
            <AudioPlayer />
          </div>
        </AudioProvider>
      </GTMProvider>
    </BrowserRouter>
  )
}

export default App
