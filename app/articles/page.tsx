import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Clock } from "lucide-react";
import { getAllArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles, tutorials, and insights on development and entrepreneurship",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Articles</h1>
        <p className="mt-4 text-lg text-foreground-secondary">
          Thoughts, tutorials, and insights on development and entrepreneurship
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-foreground-secondary">
            No articles yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const imageSrc = article.thumbnail || "/images/placeholders/article-placeholder.svg";
            return (
            <Card key={article.slug} href={`/articles/${article.slug}`}>
              <div className="flex h-full flex-col">
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={imageSrc}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {article.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-foreground-secondary">
                    {article.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-foreground-secondary dark:bg-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-foreground-secondary">
                    <span>{formatDate(article.publishedAt)}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );})}
        </div>
      )}
    </div>
  );
}

