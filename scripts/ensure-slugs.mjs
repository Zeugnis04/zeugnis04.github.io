// Ensures every blog post has a `slug` frontmatter field so Front Matter CMS's
// preview (previewPath: 'blog/{{fm.slug}}') resolves to the right URL.
//
// The site itself does not need this — src/pages/blog/[...slug].astro falls back
// to the filename with its YYYY-MM-DD- prefix stripped. This script just keeps
// the frontmatter field populated so you never have to type it by hand. It is
// idempotent: posts that already declare a slug are left untouched.
//
// Runs automatically before `npm run dev` and `npm run build` (predev/prebuild).
import fs from "node:fs";
import path from "node:path";

const blogDir = path.resolve("src/content/blog");

const deriveSlug = (fileName) =>
  fileName.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

const added = [];

for (const fileName of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
  const filePath = path.join(blogDir, fileName);
  const text = fs.readFileSync(filePath, "utf8");

  if (!text.startsWith("---")) continue; // no frontmatter block, skip
  const fmEnd = text.indexOf("\n---", 3);
  const frontmatter = fmEnd === -1 ? text : text.slice(0, fmEnd);
  if (/^slug:/m.test(frontmatter)) continue; // already has a slug

  const slug = deriveSlug(fileName);
  const firstNewline = text.indexOf("\n");
  const updated =
    text.slice(0, firstNewline + 1) + `slug: ${slug}\n` + text.slice(firstNewline + 1);
  fs.writeFileSync(filePath, updated);
  added.push(`${fileName} -> ${slug}`);
}

if (added.length > 0) {
  console.log(`[ensure-slugs] added slug to ${added.length} post(s):`);
  for (const line of added) console.log(`  ${line}`);
} else {
  console.log("[ensure-slugs] all posts already have a slug");
}
