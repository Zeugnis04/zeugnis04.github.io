import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
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
    processor: unified({
      // Keep the customized Unified pipeline used by the migrated Jekyll posts.
      smartypants: false,
      remarkPlugins: [
        [remarkSmartypants, { dashes: "oldschool" }],
        remarkMath,
        remarkJekyllTags,
        remarkGroupFigures,
      ],
      rehypePlugins: [rehypeWrapLoosePhrasing, rehypeMathjax],
    }),
    shikiConfig: {
      theme: "github-light",
    },
  },
});
