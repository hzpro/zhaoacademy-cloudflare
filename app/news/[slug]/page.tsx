import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { getArticle, getArticleSlugs, formatDate } from "@/lib/articles";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = getArticle(slug);
    return {
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = getArticle(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = article;

  return (
    <>
      {/* Header */}
      <section className="bg-primary-dark pt-32 pb-16">
        <Container>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            返回文章列表
          </Link>
          <div className="max-w-3xl">
            <p className="text-gold-light text-sm font-medium mb-3">
              {formatDate(frontmatter.date)}
            </p>
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl leading-tight">
              {frontmatter.title}
            </h1>
            <p className="mt-3 text-xl text-white/70 font-serif">
              {frontmatter.subtitle}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-white/50 text-sm">硅谷赵老师</span>
              {frontmatter.substackUrl && (
                <a
                  href={frontmatter.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-light hover:text-gold text-sm transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  在 Substack 阅读
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="py-16 bg-bg">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="article-body">
              <MDXRemote source={content} />
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-text">硅谷赵老师</p>
                  <p className="text-sm text-text-light mt-1">
                    ZhaoAcademy.org
                  </p>
                </div>
                {frontmatter.substackUrl && (
                  <a
                    href={frontmatter.substackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    订阅 Substack 获取更多文章
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-text-light hover:text-primary transition-colors text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                返回文章列表
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
