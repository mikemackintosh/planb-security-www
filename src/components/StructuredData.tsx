/**
 * Emits a JSON-LD block for the current route. Google reads structured data
 * after rendering, so an injected script tag is sufficient for an SPA.
 *
 * The payload is serialized with `<` escaped so a title containing markup can
 * never terminate the script element early.
 */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export const SITE_URL = 'https://planb.security'
export const PUBLISHER = {
  '@type': 'Organization',
  name: 'PlanB Security',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
} as const

export const AUTHOR = {
  '@type': 'Person',
  name: 'Mike Mackintosh',
  url: 'https://x.com/mikemackintosh',
} as const

/**
 * "00:19:23" -> "PT19M23S" (ISO 8601 duration, required by schema.org).
 * Accepts h:m:s, m:s, or a bare seconds count. Returns undefined rather than a
 * malformed value — a bad duration makes Google reject the whole schema block.
 */
export function isoDuration(hms: string): string | undefined {
  const parts = hms.trim().split(':').map(Number)
  if (!parts.length || parts.some((n) => Number.isNaN(n) || n < 0)) return undefined

  let total: number
  if (parts.length === 3) total = parts[0] * 3600 + parts[1] * 60 + parts[2]
  else if (parts.length === 2) total = parts[0] * 60 + parts[1]
  else if (parts.length === 1) total = parts[0]
  else return undefined

  if (total <= 0) return undefined
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}`
}
