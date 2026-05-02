import { defineConfig } from "astro/config";
import { rehypeWrapLoosePhrasing, remarkJekyllTags } from "./astro-jekyll-tags.mjs";

export default defineConfig({
  site: "https://zeugnis04.github.io",
  markdown: {
    remarkPlugins: [remarkJekyllTags],
    rehypePlugins: [rehypeWrapLoosePhrasing],
    shikiConfig: {
      theme: "github-light",
    },
  },
});
