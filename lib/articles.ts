import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleFrontmatter {
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  coverImage: string;
  substackUrl?: string;
}

export interface ArticleData {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

const articlesDir = path.join(process.cwd(), "content/articles");

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getArticle(slug: string): ArticleData {
  const fullPath = path.join(articlesDir, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { slug, frontmatter: data as ArticleFrontmatter, content };
}

export function getAllArticles(): ArticleData[] {
  return getArticleSlugs()
    .map((slug) => getArticle(slug))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
