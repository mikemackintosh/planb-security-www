import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({ gfm: true, breaks: false })

/** Stable, URL-safe id for a heading — shared with the article TOC rail. */
export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

/** Renders trusted-but-sanitized markdown as styled prose. */
export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  const html = useMemo(() => {
    const rendered = marked.parse(children, { async: false }) as string
    const clean = DOMPurify.sanitize(rendered, { ADD_ATTR: ['target', 'rel'] })

    // Anchor ids are injected after sanitizing, from a slug we derive ourselves,
    // so the TOC rail can link into sections without trusting authored HTML.
    return clean.replace(
      /<h([23])>([\s\S]*?)<\/h\1>/g,
      (_m, level: string, inner: string) =>
        `<h${level} id="${headingSlug(inner.replace(/<[^>]*>/g, ''))}">${inner}</h${level}>`,
    )
  }, [children])

  return (
    <div
      className={`prose prose-invert prose-bulletin [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
