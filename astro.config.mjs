import { defineConfig } from "astro/config";
import { rehypeWrapLoosePhrasing, remarkJekyllTags } from "./astro-jekyll-tags.mjs";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

export default defineConfig({
  site: "https://zeugnis04.github.io",
  markdown: {
    remarkPlugins: [remarkMath, remarkJekyllTags],
    rehypePlugins: [rehypeWrapLoosePhrasing, rehypeMathjax],
    shikiConfig: {
      theme: "github-light",
    },
  },
});
