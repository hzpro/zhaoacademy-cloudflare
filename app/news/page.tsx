import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllArticles, formatDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "教育资讯",
  description:
    "硅谷赵老师教育文章——留学申请策略、AI 时代的教育判断与长期成长思考。",
};

export default function NewsPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="bg-primary-dark pt-32 pb-16">
        <Container>
          <h1 className="text-center font-serif text-3xl font-bold text-white sm:text-4xl">
            教育资讯
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-white/70">
            关于留学申请、AI 时代教育判断与长期成长的深度文章
          </p>
        </Container>
      </section>

      <section className="py-20 bg-bg">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 sm:gap-12">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="group grid sm:grid-cols-[280px_1fr] gap-6 sm:gap-8 items-start"
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="block overflow-hidden rounded-xl aspect-[4/3]"
                  >
                    <Image
                      src={article.frontmatter.coverImage}
                      alt={article.frontmatter.title}
                      width={560}
                      height={420}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gold">
                      {formatDate(article.frontmatter.date)}
                    </p>
                    <Link href={`/news/${article.slug}`}>
                      <h2 className="mt-2 font-serif text-2xl font-bold text-text leading-snug hover:text-primary transition-colors">
                        {article.frontmatter.title}
                      </h2>
                    </Link>
                    <p className="mt-1 text-text-light font-serif text-base">
                      {article.frontmatter.subtitle}
                    </p>
                    <p className="mt-3 text-text-light leading-relaxed text-sm line-clamp-3">
                      {article.frontmatter.excerpt}
                    </p>
                    <Link
                      href={`/news/${article.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-2.5 transition-all"
                    >
                      阅读全文
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
