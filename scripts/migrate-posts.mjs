import fs from "node:fs";
import path from "node:path";

const sourceRoot = "/home/ybkwon04/repos/zeugnis04.github.io";
const sourcePostsDir = path.join(sourceRoot, "_posts");
const targetPostsDir = path.resolve("src/pages/blog");
const targetAssetsRoot = path.resolve("public/assets/img");

const assetFolderOverrides = new Map([
  ["saravanaa-bhavan-translation", "saravanaa-bhavan"],
]);

const posts = fs
  .readdirSync(sourcePostsDir)
  .filter((file) => /\.(md|markdown)$/.test(file))
  .sort();

fs.mkdirSync(targetPostsDir, { recursive: true });
fs.mkdirSync(targetAssetsRoot, { recursive: true });

const report = [];

for (const fileName of posts) {
  const sourcePath = path.join(sourcePostsDir, fileName);
  const source = fs.readFileSync(sourcePath, "utf8");
  const slug = slugFromFileName(fileName);
  const assetFolder = assetFolderOverrides.get(slug) ?? slug;
  const targetPath = path.join(targetPostsDir, `${slug}.md`);
  const targetAssetDir = path.join(targetAssetsRoot, assetFolder);
  const copiedAssets = new Map();

  const migrated = migratePost(source, {
    slug,
    assetFolder,
    targetAssetDir,
    copiedAssets,
  });

  fs.writeFileSync(targetPath, migrated);
  report.push({
    slug,
    file: path.relative(process.cwd(), targetPath),
    assets: [...copiedAssets.values()].map((asset) => path.relative(process.cwd(), asset)),
  });
}

for (const item of report) {
  console.log(`${item.slug}: ${item.file}`);
  for (const asset of item.assets) {
    console.log(`  asset: ${asset}`);
  }
}

function migratePost(source, context) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    throw new Error(`Missing front matter for ${context.slug}`);
  }

  const frontmatter = migrateFrontmatter(match[1], context);
  const body = source.slice(match[0].length);
  const migratedBody = normalizePostMarkdown(rewriteAssetReferences(body, context));

  return `---\n${frontmatter}\n---\n\n${migratedBody.trim()}\n`;
}

function normalizeMarkdown(input) {
  return normalizeKramdownTables(input)
    .replace(/^<h2>(.*?)<\/h2>$/gm, "## $1")
    .replace(/^<h3>(.*?)<\/h3>$/gm, "### $1");
}

function normalizePostMarkdown(input) {
  return normalizeMarkdown(input);
}

function normalizeKramdownTables(input) {
  const lines = input.split("\n");
  const output = [];
  let index = 0;
  let inFence = false;

  while (index < lines.length) {
    const line = lines[index];
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      output.push(line);
      index += 1;
      continue;
    }

    if (!inFence && isTableRow(line)) {
      const block = [];
      while (index < lines.length && isTableRow(lines[index])) {
        block.push(lines[index]);
        index += 1;
      }
      output.push(...normalizeTableBlock(block));
      continue;
    }

    output.push(line);
    index += 1;
  }

  return output.join("\n");
}

function normalizeTableBlock(block) {
  if (block.length < 2) return block;

  if (isAlignmentRow(block[0])) {
    return [emptyTableHeader(block[0]), normalizedAlignmentRow(block[0]), ...block.slice(1)];
  }

  if (!isAlignmentRow(block[1])) {
    return [block[0], defaultAlignmentRow(block[0]), ...block.slice(1)];
  }

  return block;
}

function isTableRow(line) {
  return /^\s*\|.*\|\s*$/.test(line);
}

function isAlignmentRow(line) {
  return splitTableCells(line).every((cell) => /^:?-+:?$/.test(cell.trim()));
}

function emptyTableHeader(line) {
  const cellCount = splitTableCells(line).length;
  return `|${Array.from({ length: cellCount }, () => " ").join("|")}|`;
}

function defaultAlignmentRow(line) {
  const cellCount = splitTableCells(line).length;
  return `|${Array.from({ length: cellCount }, () => "---").join("|")}|`;
}

function normalizedAlignmentRow(line) {
  const cells = splitTableCells(line).map((cell) => {
    const trimmed = cell.trim();
    const left = trimmed.startsWith(":") ? ":" : "";
    const right = trimmed.endsWith(":") ? ":" : "";
    return `${left}---${right}`;
  });
  return `|${cells.join("|")}|`;
}

function splitTableCells(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|");
}

function migrateFrontmatter(frontmatter, context) {
  const lines = frontmatter.split("\n");
  const output = ["layout: ../../layouts/PostLayout.astro"];

  for (const line of lines) {
    if (/^\s*layout\s*:/.test(line)) continue;
    if (/^\s*$/.test(line)) continue;
    output.push(rewriteAssetReferences(line, context));
  }

  return output.join("\n");
}

function rewriteAssetReferences(input, context) {
  return input.replace(/((?:\.\.\/)?\/?assets\/img\/)([^'"<>)]+?\.(?:png|jpe?g|webp|gif))/gi, (_match, _prefix, relativeAsset) => {
    const cleanRelativeAsset = relativeAsset.trim();
    const sourceAssetPath = path.join(sourceRoot, "assets/img", cleanRelativeAsset);
    if (!fs.existsSync(sourceAssetPath)) {
      console.warn(`Missing asset for ${context.slug}: assets/img/${cleanRelativeAsset}`);
      return `/assets/img/${cleanRelativeAsset}`;
    }

    fs.mkdirSync(context.targetAssetDir, { recursive: true });
    const targetName = path.basename(cleanRelativeAsset);
    const targetAssetPath = path.join(context.targetAssetDir, targetName);
    fs.copyFileSync(sourceAssetPath, targetAssetPath);
    context.copiedAssets.set(sourceAssetPath, targetAssetPath);

    return `/assets/img/${context.assetFolder}/${targetName}`;
  });
}

function slugFromFileName(fileName) {
  return fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(md|markdown)$/, "");
}
