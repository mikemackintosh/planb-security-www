import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { type Episode } from '../episodes'
import { getArticleMeta, loadArticleBody, episodeForArticle, articleDate, articleMetas } from '../blog'
import { Markdown, headingSlug } from '../components/Markdown'
import { FormattedDate } from '../FormattedDate'
import { PlayIcon } from '../PlayIcon'
import { useMeta } from '../useMeta'
import { StructuredData, SITE_URL, PUBLISHER, AUTHOR } from '../components/StructuredData'

interface ArticlePageProps {
  episodes: Episode[]
}

interface Section {
  id: string
  label: string
}

export function ArticlePage({ episodes }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleMeta(slug) : undefined
  const episode = article ? episodeForArticle(article, episodes) : null

  const [body, setBody] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    if (slug) {
      setBody(null)
      setActiveId(null)
      loadArticleBody(slug).then((md) => {
        if (active) setBody(md)
      })
    }
    return () => {
      active = false
    }
  }, [slug])

  // Section rail, built from the article's own `##` headings.
  const sections = useMemo<Section[]>(() => {
    if (!body) return []
    return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => {
      const label = m[1].trim()
      return { id: headingSlug(label), label }
    })
  }, [body])

  // Highlight whichever section is currently nearest the top of the viewport.
  useEffect(() => {
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px' },
    )
    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections])

  useMeta({
    // The short variant keeps <title> under Google's ~60ch truncation; the H1
    // below still renders the full headline.
    title: article?.seoTitle,
    description: article?.deck || undefined,
    url: article ? `/blog/${article.slug}` : undefined,
    image: article?.ogImage || undefined,
  })

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  // The next-oldest essay, for the tail of the page.
  const ordered = [...articleMetas].sort(
    (a, b) => b.season - a.season || b.episode - a.episode,
  )
  const index = ordered.findIndex((a) => a.slug === article.slug)
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null

  const resolvedDate = articleDate(article, episodes)
  const published = resolvedDate ? resolvedDate.toISOString() : undefined

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.deck || undefined,
          url: `${SITE_URL}/blog/${article.slug}`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${article.slug}` },
          datePublished: published,
          dateModified: published,
          timeRequired: `PT${article.minutes}M`,
          articleSection: `Season ${article.season}`,
          image: `${SITE_URL}${article.ogImage ?? '/logo.png'}`,
          author: AUTHOR,
          publisher: PUBLISHER,
        }}
      />
      <Link
        to="/blog"
        className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint transition hover:text-ink"
      >
        ← All essays
      </Link>

      <article>
        <header className="mt-10 grid gap-7 border-b border-rule-strong pb-8 md:grid-cols-[5.5rem_minmax(0,1fr)]">
          <div className="font-display text-[2.75rem] leading-[0.8] tracking-[0.01em] text-brand-violet">
            S{article.season}
            <br className="hidden md:block" />
            <span className="md:hidden">·</span>E{String(article.episode).padStart(2, '0')}
            <span className="mt-2.5 block font-mono text-[9px] font-medium tracking-[0.16em] text-ink-faint">
              SEASON / EP
            </span>
          </div>

          <div>
            <h1 className="font-headline text-[clamp(1.9rem,4.4vw,3.15rem)] font-bold leading-[1.06] tracking-[-0.026em] text-ink [text-wrap:balance]">
              {article.title}
            </h1>
            {article.deck && (
              <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.6] text-ink-dim">
                {article.deck}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              {resolvedDate && <FormattedDate date={resolvedDate} short />}
              <span>{article.minutes} min read</span>
            </div>
            {episode && (
              <Link
                to={`/episodes/${episode.slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-control border border-rule-strong px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition hover:border-brand-purple hover:bg-brand-purple hover:text-white"
              >
                <PlayIcon className="h-2.5 w-2.5 fill-current" />
                Listen — {episode.itunes_duration}
              </Link>
            )}
          </div>
        </header>

        <div className="mt-10 grid gap-7 md:grid-cols-[5.5rem_minmax(0,1fr)]">
          {sections.length > 0 && (
            <nav aria-label="Sections" className="hidden md:block">
              <div className="sticky top-24 border-r border-rule pr-4 font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em]">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block transition ${
                      activeId === section.id
                        ? 'text-brand-violet'
                        : 'text-ink-faint hover:text-ink'
                    }`}
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </nav>
          )}

          <div className={sections.length > 0 ? '' : 'md:col-start-2'}>
            {body === null ? (
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                Loading article…
              </p>
            ) : (
              <Markdown className="max-w-[66ch]">{body}</Markdown>
            )}
          </div>
        </div>
      </article>

      {next && (
        <Link
          to={`/blog/${next.slug}`}
          className="group relative mt-14 grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1
                     -mx-4 border-t border-rule-strong px-4 py-4 transition-colors
                     hover:bg-surface sm:-mx-6 sm:px-6
                     md:grid-cols-[3.25rem_7.5rem_minmax(0,1fr)_4.5rem]
                     before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-center
                     before:scale-y-0 before:bg-brand-purple before:transition-transform
                     before:duration-200 before:content-[''] hover:before:scale-y-100"
        >
          <span className="font-mono text-xs font-bold text-brand-violet">NEXT</span>
          <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint md:col-auto">
            S{next.season}E{String(next.episode).padStart(2, '0')}
          </span>
          <span className="col-start-2 font-headline text-base font-semibold leading-[1.35] text-ink transition group-hover:text-brand-violet md:col-auto">
            {next.title}
            {next.deck && (
              <span className="mt-0.5 block font-sans text-sm font-normal text-ink-faint">
                {next.deck}
              </span>
            )}
          </span>
          <span className="col-start-2 font-mono text-[11px] tabular-nums text-ink-faint md:col-auto md:text-right">
            {next.minutes} min
          </span>
        </Link>
      )}
    </div>
  )
}
