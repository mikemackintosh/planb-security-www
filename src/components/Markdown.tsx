import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({ gfm: true, breaks: false })

/** Renders trusted-but-sanitized markdown as styled prose. */
export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  const html = useMemo(() => {
    const rendered = marked.parse(children, { async: false }) as string
    return DOMPurify.sanitize(rendered, { ADD_ATTR: ['target', 'rel'] })
  }, [children])

  return (
    <div
      className={`prose prose-invert prose-slate max-w-none prose-headings:font-display prose-a:text-brand-orange prose-strong:text-white ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
