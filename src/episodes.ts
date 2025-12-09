import { parse as parseFeed } from 'rss-to-json';
import { array, number, object, parse, string } from 'valibot';

export interface Episode {
  id: number
  title: string
  slug: string
  published: Date
  description: string
  content: string
  itunes_duration: string
  audio: {
    src: string
    type: string
  }
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '')           // Remove apostrophes
    .replace(/[^a-z0-9\s-]/g, '')   // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens with single
    .replace(/^-|-$/g, '')          // Remove leading/trailing hyphens
    .slice(0, 80)                   // Limit length
}

export async function getAllEpisodes(feedUrl: string) {
  let FeedSchema = object({
    items: array(
      object({
        id: number(),
        title: string(),
        published: number(),
        description: string(),
        content: string(),
        itunes_duration: string(),
        enclosures: array(
          object({
            url: string(),
            type: string(),
          }),
        ),
      }),
    ),
  })

  let feed = (await parseFeed(
    feedUrl,
  )) as any;
  
  let episodes: Array<Episode> = feed.items.map(
    ({ id, title, description, content, itunes_duration, enclosures, published }) => ({
      id,
      title: `${title}`,
      slug: slugify(title),
      published: new Date(published),
      description,
      content,
      itunes_duration,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }),
  )

  return episodes
}
