import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { rehypeWrapLoosePhrasing, remarkGroupFigures, remarkJekyllTags } from "./astro-jekyll-tags.mjs";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import rehypeMathjax from "rehype-mathjax";

export default defineConfig({
  site: "https://zeugnis04.github.io",
  // MDX inherits the markdown config above, so the Jekyll tags, smartypants
  // and MathJax behave identically in both formats.
  integrations: [mdx()],
  markdown: {
    // Disable Astro's built-in SmartyPants so we can use kramdown-style dashes
    // (matching the old Jekyll site): `--` -> en dash, `---` -> em dash.
    // remark-smartypants still handles smart quotes and ellipses by default.
    smartypants: false,
    remarkPlugins: [
      [remarkSmartypants, { dashes: "oldschool" }],
      remarkMath,
      remarkJekyllTags,
      remarkGroupFigures,
    ],
    rehypePlugins: [rehypeWrapLoosePhrasing, rehypeMathjax],
    shikiConfig: {
      theme: "github-light",
    },
  },
});
