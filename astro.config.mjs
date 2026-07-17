import { defineConfig } from "astro/config";
import { rehypeWrapLoosePhrasing, remarkJekyllTags } from "./astro-jekyll-tags.mjs";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import rehypeMathjax from "rehype-mathjax";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://zeugnis04.github.io",

  markdown: {
    // Disable Astro's built-in SmartyPants so we can use kramdown-style dashes
    // (matching the old Jekyll site): `--` -> en dash, `---` -> em dash.
    // remark-smartypants still handles smart quotes and ellipses by default.
    smartypants: false,
    remarkPlugins: [
      [remarkSmartypants, { dashes: "oldschool" }],
      remarkMath,
      remarkJekyllTags,
    ],
    rehypePlugins: [rehypeWrapLoosePhrasing, rehypeMathjax],
    shikiConfig: {
      theme: "github-light",
    },
  },

  adapter: cloudflare()
});