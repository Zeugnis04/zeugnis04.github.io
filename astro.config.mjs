import { defineConfig } from "astro/config";
import { remarkJekyllTags } from "./astro-jekyll-tags.mjs";

export default defineConfig({
  site: "https://zeugnis04.github.io",
  markdown: {
    remarkPlugins: [remarkJekyllTags],
    shikiConfig: {
      theme: "github-light",
    },
  },
});
