import { getCollection } from 'astro:content';

export type MediaItem = {
  title: string;
  creator: string;
  photo: string;
  date: string;
  kind: 'album' | 'book' | 'event' | 'movie' | 'show';
  year?: number;
  featured: boolean;
  url?: string;
  review?: string;
};

export async function getMediaItems(): Promise<MediaItem[]> {
  const entries = await getCollection('media');
  return entries
    .flatMap(entry => entry.data.items)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function groupMediaByMonth(items: MediaItem[]) {
  const groupedMedia = new Map<string, MediaItem[]>();

  for (const item of items) {
    const month = item.date.slice(0, 7);
    groupedMedia.set(month, [...(groupedMedia.get(month) ?? []), item]);
  }

  return groupedMedia;
}

export function formatMediaTitle(item: MediaItem) {
  if (item.kind !== 'movie') return item.title;
  return `${item.title} (${item.year ?? item.date.slice(0, 4)})`;
}
