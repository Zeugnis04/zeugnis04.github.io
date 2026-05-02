import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://zeugnis04.github.io",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
