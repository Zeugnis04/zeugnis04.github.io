# Writing posts

Two formats, both fully supported. Pick per post.

| | `.md` | `.mdx` |
|---|---|---|
| Syntax | `{% maincolumn %}` tags | Astro components |
| Images | served as-is from `public/` | optimized by Astro: WebP, srcset, capped lightbox copy |
| Best for | essays, language notes, anything with `{% gloss %}` or `{% epigraph %}` | photo-led posts |

Prefer `.mdx` for anything with photos. The optimization is not marginal — the
New York subway post went from 51.9 MB of images to 177 KB.

## Photo posts (`.mdx`)

Images live in `src/assets/img/<folder>/` (**not** `public/` — Astro can only
optimize what's under `src/`). Add `lightbox: true` to the frontmatter to get
the PhotoSwipe viewer.

```mdx
---
title: "A trip somewhere"
date: 2026-08-01
tags: [travel]
lightbox: true
---

import Gallery from "@/components/Gallery.astro";
import Figure from "@/components/Figure.astro";

Prose here.

<Gallery
  base="a-trip-somewhere"
  images={[
    { src: "one.jpg", caption: "First photo" },
    { src: "two.jpg", caption: "Second photo" },
    { src: "three.jpg", caption: "Third photo" },
  ]}
/>

<Figure base="a-trip-somewhere" src="alone.jpg" caption="A single photo" />
```

`<Gallery>` lays photos out in justified rows — every photo on a line shares one
height, widths follow aspect ratio, nothing is cropped. Line breaks are computed
at build time: a line fills until the aspect ratios sum to about 4, capped at 4
photos. Three landscape photos sit on one line; seven portraits break 4 + 3.
Tune per gallery with `targetLineRatio` and `maxPerLine`.

One gallery is one browsable lightbox. To split a run into two galleries, use two
`<Gallery>` blocks. A `<Gallery>` holding a single image renders as a plain Tufte
figure with the caption in the margin, same as `<Figure>`.

### Components

| Component | Replaces | Notes |
|---|---|---|
| `<Gallery images={[...]} base="" />` | consecutive `{% maincolumn %}` | justified rows |
| `<Figure src="" caption="" />` | `{% maincolumn %}` | add `fullWidth` for `{% fullwidth %}` |
| `<MarginFigure id="" src="" caption="" />` | `{% marginfigure %}` | |
| `<Sidenote id="">…</Sidenote>` | `{% sidenote %}` | `id` optional |
| `<MarginNote id="">…</MarginNote>` | `{% marginnote %}` | |
| `<NewThought>…</NewThought>` | `{% newthought %}` | |
| `<Epigraph>…</Epigraph>` | `{% epigraph %}` | needs blank lines around children |

Captions and children both accept markdown — `*emphasis*`, `[links](…)`,
`` `code` `` — plus the site's `--` en dash and smart quotes, same as prose.

No component equivalent yet: `{% gloss %}`, `{% raw %}`, `{% m %}`/`{% math %}`.
Posts using those stay `.md`.

## MDX gotchas

MDX is JSX, so it is stricter than markdown. These are **build errors**, not bad
renders — you will know immediately:

- `{` starts a JS expression. Any `{% tag %}` breaks. So does raw CSS in a
  `<style>` block — wrap it: `` <style>{`…`}</style> ``.
- `<!-- comment -->` is invalid. Use `{/* comment */}`.
- Void elements must self-close: `<br>` → `<br />`, likewise `<hr>`, `<img>`.
- Attributes must be quoted: `<span lang=ipa>` → `<span lang="ipa">`.
- Inline tags must balance. An unclosed `<span>` that markdown tolerated is an
  error here.
- Leave a blank line between the import block and the body.

Math is the one to watch: `$\mathrm{K/km}$` contains braces. Keep math posts in
`.md`.

## Gotcha: the content cache

Astro caches rendered markdown in `.astro/data-store.json`, and editing
`astro-jekyll-tags.mjs` does **not** invalidate it — your change will look like a
no-op. After touching that file:

```sh
rm -f .astro/data-store.json node_modules/.astro/data-store.json
```

Editing a post or a stylesheet is fine; only the plugin needs this.

## Gotcha: deleting `node_modules/.vite` while `astro dev` is running

Vite hands out pre-bundled dependency URLs stamped with a hash
(`/node_modules/.vite/deps/photoswipe_lightbox.js?v=0f131093`). Delete that
directory mid-session and every one of those URLs starts returning **504
Outdated Optimize Dep** — so any module importing a dependency silently fails to
evaluate. No console error, no build failure: the lightbox just stops opening.

If client-side behaviour disappears for no reason, check the network tab for
504s on `/node_modules/.vite/deps/…` and restart the dev server. Production
builds are unaffected.

## Converting an old post

Do not batch-convert. Converting is only worth it for posts with images, and
each one needs checking: markdown that lived in a tag argument, epigraphs inside
HTML comments, and links immediately after a block can all change meaning.
Convert one post, build, and compare the rendered text and element counts
against the previous output before moving on.
