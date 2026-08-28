const longFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// Compact form for ruled metadata columns, e.g. "Aug 14 2026".
const shortFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
})

export function FormattedDate({
  date,
  short = false,
  ...props
}: React.ComponentPropsWithoutRef<'time'> & { date: Date; short?: boolean }) {
  const formatter = short ? shortFormatter : longFormatter
  return (
    <time dateTime={date.toISOString()} {...props}>
      {short ? formatter.format(date).replace(',', '') : formatter.format(date)}
    </time>
  )
}
