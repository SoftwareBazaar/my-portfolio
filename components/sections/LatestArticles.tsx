import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock } from "lucide-react";
import { Article } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-foreground">Latest Articles</h2>
        <p className="mt-4 text-lg text-foreground-secondary">
          Field notes on algorithmic trading, fintech systems, and cross-disciplinary research
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => {
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
                  priority={index === 0}
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
                  {article.tags.slice(0, 3).map((tag) => (
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

      <div className="mt-12 text-center">
        <Button href="/articles" variant="secondary" asLink>
          View All Articles
        </Button>
      </div>
    </section>
  );
}

