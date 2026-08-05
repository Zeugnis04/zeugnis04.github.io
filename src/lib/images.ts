import { getImage } from 'astro:assets';
import { plainTypography, renderInlineMarkdown } from '@/lib/typography';

export type PhotoInput = {
  /** Path under `src/assets/img/`, relative to `base` when that is set. */
  src: string;
  caption?: string;
  /** Overrides the caption as alt text when the caption is decorative. */
  alt?: string;
};

export type ResolvedPhoto = {
  metadata: ImageMetadata;
  caption?: string;
  alt: string;
  /** Displayed width / height, EXIF orientation already applied by Astro. */
  ratio: number;
  /** Capped-size WebP the lightbox opens, instead of the multi-megabyte original. */
  fullSrc: string;
  fullWidth: number;
  fullHeight: number;
};

/** Largest edge the lightbox ever needs — beyond this the file grows much
 * faster than the visible detail. */
const MAX_LIGHTBOX_WIDTH = 2400;

// Astro needs to see a static glob, so every candidate image is listed here
// and picked by path at build time.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/**/*.{jpeg,jpg,png,gif,webp,avif}',
);

/**
 * Turn author-friendly `{ src, caption }` entries into everything a figure
 * needs: image metadata for `<Image>`, the aspect ratio the row layout sizes
 * by, and a capped WebP for the lightbox.
 */
export async function resolvePhotos(
  images: PhotoInput[],
  base = '',
): Promise<ResolvedPhoto[]> {
  const prefix = base ? `${base.replace(/^\/|\/$/g, '')}/` : '';

  return Promise.all(
    images.map(async (image) => {
      const path = `/src/assets/img/${prefix}${image.src.replace(/^\//, '')}`;
      const loader = files[path];
      if (!loader) {
        throw new Error(
          `No image at ${path}. Check the \`base\` prop and that the file lives under src/assets/img/.`,
        );
      }

      const metadata = (await loader()).default;
      const ratio = metadata.width / metadata.height;
      const fullWidth = Math.min(metadata.width, MAX_LIGHTBOX_WIDTH);
      const fullHeight = Math.round(fullWidth / ratio);
      const full = await getImage({
        src: metadata,
        width: fullWidth,
        format: 'webp',
        quality: 82,
      });

      // Captions are written in markdown, exactly like the prose around them.
      const caption = image.caption ? renderInlineMarkdown(image.caption) : undefined;

      return {
        metadata,
        caption,
        // Alt text is an attribute, so it takes the caption's words without
        // its markup.
        alt: image.alt
          ? plainTypography(image.alt)
          : image.caption
            ? plainTypography(image.caption)
            : '',
        ratio,
        fullSrc: full.src,
        fullWidth,
        fullHeight,
      };
    }),
  );
}

/**
 * Greedily fill lines until the photos' aspect ratios sum to about
 * `targetRatio`, so a line holds fewer wide photos than tall ones and every
 * line comes out a sensible height. `maxPerLine` keeps a long run from
 * cramming one line with thumbnails too small to read.
 */
export function splitIntoLines<T extends { ratio: number }>(
  items: T[],
  targetRatio: number,
  maxPerLine: number,
): T[][] {
  const lines: T[][] = [];
  let line: T[] = [];
  let total = 0;

  for (const item of items) {
    const overshoots =
      Math.abs(total + item.ratio - targetRatio) > Math.abs(total - targetRatio);
    if (line.length && (overshoots || line.length >= maxPerLine)) {
      lines.push(line);
      line = [];
      total = 0;
    }
    line.push(item);
    total += item.ratio;
  }

  if (line.length) lines.push(line);
  return lines;
}
