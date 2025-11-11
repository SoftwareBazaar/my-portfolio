import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/articles"
        className="mb-8 inline-flex items-center gap-2 text-foreground-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Articles
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
            {article.title}
          </h1>
          <p className="mb-4 text-xl text-foreground-secondary">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
            <span>{formatDate(article.publishedAt)}</span>
            {article.updatedAt && (
              <>
                <span>•</span>
                <span>Updated {formatDate(article.updatedAt)}</span>
              </>
            )}
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime} min read</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {article.thumbnail && (
          <div className="mb-8 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg mx-auto max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>
      </article>
    </div>
  );
}

