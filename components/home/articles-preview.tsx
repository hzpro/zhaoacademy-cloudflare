import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllArticles, formatDate } from "@/lib/articles";

export function ArticlesPreview() {
  const articles = getAllArticles().slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-bg">
      <Container>
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-2">
              最新文章
            </p>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              教育洞见
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden sm:inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-3 transition-all"
          >
            查看全部文章
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Article cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={article.frontmatter.coverImage}
                  alt={article.frontmatter.title}
                  width={480}
                  height={360}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs font-medium text-gold mb-2">
                  {formatDate(article.frontmatter.date)}
                </p>
                <h3 className="font-serif font-bold text-text leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {article.frontmatter.title}
                </h3>
                <p className="mt-2 text-sm text-text-light leading-relaxed line-clamp-2 flex-1">
                  {article.frontmatter.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                  阅读全文
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "view all" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-primary font-medium text-sm"
          >
            查看全部文章
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
