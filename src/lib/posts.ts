type Frontmatter = {
  title?: string;
  date?: string | Date;
  tags?: string[];
  hidden?: boolean;
  cover?: string;
  excerpt?: string;
  category?: string;
};

export type BlogPost = {
  slug: string;
  url: string;
  title: string;
  date: Date;
  dateLabel: string;
  monthDayLabel: string;
  year: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  category?: string;
  hidden: boolean;
};

const postModules = import.meta.glob("../pages/blog/*.md", { eager: true }) as Record<
  string,
  { frontmatter?: Frontmatter }
>;

const rawPostModules = import.meta.glob("../pages/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function getPosts() {
  return Object.entries(postModules)
    .map(([filePath, module]) => {
      const frontmatter = module.frontmatter ?? {};
      const slug = slugFromPath(filePath);
      const date = new Date(frontmatter.date ?? "1970-01-01");
      const raw = rawPostModules[filePath] ?? "";

      return {
        slug,
        url: `/blog/${slug}/`,
        title: frontmatter.title ?? slug,
        date,
        dateLabel: formatDate(date),
        monthDayLabel: formatMonthDay(date),
        year: String(date.getFullYear()),
        tags: frontmatter.tags ?? [],
        excerpt: frontmatter.excerpt ?? buildExcerpt(raw),
        cover: frontmatter.cover,
        category: frontmatter.category,
        hidden: frontmatter.hidden === true,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugFromPath(filePath: string) {
  return filePath.split("/").pop()?.replace(/\.md$/, "") ?? "";
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMonthDay(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function buildExcerpt(raw: string) {
  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const paragraph =
    body
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .find(
        (block) =>
          block &&
          !block.startsWith("<figure") &&
          !block.startsWith("<div") &&
          !block.startsWith("#") &&
          !/^\{%\s*(?:maincolumn|fullwidth|marginfigure|gloss|raw)\b/.test(block),
      ) ?? "";

  return truncateWords(cleanText(paragraph), 35);
}

function cleanText(input: string) {
  return input
    .replace(/\{%\s*newthought\b\s*([^%]*?)\s*%\}/g, (_match, args) => `${firstLiquidArg(args)} `)
    .replace(/\{%\s*(?:sidenote|marginnote|maincolumn|fullwidth|marginfigure)\b\s*[^%]*?\s*%\}/g, " ")
    .replace(/\{%\s*(?:m|em|math|endmath|raw|endraw)\s*%\}/g, " ")
    .replace(/<span class="(?:side|margin)note">[\s\S]*?<\/span>/g, " ")
    .replace(/<label[\s\S]*?<\/label>/g, " ")
    .replace(/<input[^>]*>/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstLiquidArg(input: string) {
  const match = input.trim().match(/^["'“‘]([^"'”’]*)["'”’]/);
  return match?.[1] ?? "";
}

function truncateWords(input: string, limit: number) {
  const words = input.split(/\s+/).filter(Boolean);
  if (words.length <= limit) return input;
  return `${words.slice(0, limit).join(" ")}...`;
}
