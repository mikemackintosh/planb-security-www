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

function Navbar() {
  const latest = episodes[0]
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient font-display text-sm text-white shadow-glow">
            B
          </span>
          <span className="font-display text-lg tracking-tight text-white transition group-hover:text-brand-orange">
            PlanB<span className="text-brand-purple group-hover:text-brand-orange"> Security</span>
          </span>
        </Link>

        {latest && (
          <Link
            to={`/episodes/${latest.slug}`}
            className="hidden min-w-0 flex-1 items-center justify-center sm:flex"
          >
            <span className="group inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-2 pr-3 text-sm text-slate-300 transition hover:border-brand-purple/50 hover:bg-white/10">
              <span className="rounded-full bg-brand-gradient px-2 py-0.5 text-xs font-bold text-white">New</span>
              <span className="truncate font-medium transition group-hover:text-white">{latest.title}</span>
            </span>
          </Link>
        )}

        <div className="flex shrink-0 items-center gap-5">
          <Link
            to="/blog"
            className="text-sm font-medium text-slate-300 transition hover:text-brand-orange"
          >
            Blog
          </Link>
          <a
            href="https://x.com/mikemackintosh"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap text-sm text-slate-400 transition hover:text-white md:block"
          >
            Hosted by <span className="font-semibold text-slate-200">@mikemackintosh</span>
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center gap-8">
          <span className="font-display text-xl text-white">PlanB Security</span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition hover:text-brand-orange"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="text-center text-xs leading-5 text-slate-500">
            &copy; {year} Mike Mackintosh. All rights reserved.
          </p>
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
          <main className="isolate pb-32">
            <Suspense fallback={<div className="px-6 py-20 text-center text-slate-500">Loading…</div>}>
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
