import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({ gfm: true, breaks: false })

/**
 * ` -- ` is an em dash in prose. Fenced blocks, inline code, inline SVG and
 * HTML comments are masked out first so CLI flags and path data survive intact.
 */
function emDashes(md: string): string {
  const guarded: string[] = []
  const masked = md
    .replace(/```[\s\S]*?```|`[^`\n]*`|<svg[\s\S]*?<\/svg>|<!--[\s\S]*?-->/gi, (match) => {
      guarded.push(match)
      return `\u0000${guarded.length - 1}\u0000`
    })
    .replace(/ -- /g, ' \u2014 ')
  return masked.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => guarded[Number(i)])
}

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
    const rendered = marked.parse(emDashes(children), { async: false }) as string
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
