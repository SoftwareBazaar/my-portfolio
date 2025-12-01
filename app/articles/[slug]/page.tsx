import type { Metadata } from "next";
import Image from "next/image";
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

        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={article.thumbnail || "/images/placeholders/article-placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
          />
        </div>

        <div className="prose prose-lg mx-auto max-w-none">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ 
              __html: article.content
                .split('\n\n')
                .map(paragraph => {
                  // Handle headings
                  if (paragraph.startsWith('# ')) {
                    return `<h1>${paragraph.slice(2)}</h1>`;
                  }
                  if (paragraph.startsWith('## ')) {
                    return `<h2>${paragraph.slice(3)}</h2>`;
                  }
                  if (paragraph.startsWith('### ')) {
                    return `<h3>${paragraph.slice(4)}</h3>`;
                  }
                  if (paragraph.startsWith('#### ')) {
                    return `<h4>${paragraph.slice(5)}</h4>`;
                  }
                  if (paragraph.startsWith('##### ')) {
                    return `<h5>${paragraph.slice(6)}</h5>`;
                  }
                  if (paragraph.startsWith('###### ')) {
                    return `<h6>${paragraph.slice(7)}</h6>`;
                  }
                  
                  // Handle blockquotes
                  if (paragraph.startsWith('> ')) {
                    return `<blockquote>${paragraph.slice(2).replace(/\n> /g, '<br>')}</blockquote>`;
                  }
                  
                  // Handle lists
                  if (paragraph.match(/^[\*\-] /m)) {
                    const items = paragraph.split('\n').filter(line => line.trim());
                    const listItems = items.map(item => `<li>${item.replace(/^[\*\-] /, '')}</li>`).join('');
                    return `<ul>${listItems}</ul>`;
                  }
                  
                  if (paragraph.match(/^\d+\. /m)) {
                    const items = paragraph.split('\n').filter(line => line.trim());
                    const listItems = items.map(item => `<li>${item.replace(/^\d+\. /, '')}</li>`).join('');
                    return `<ol>${listItems}</ol>`;
                  }
                  
                  // Handle horizontal rules
                  if (paragraph.match(/^---+$/)) {
                    return '<hr>';
                  }
                  
                  // Handle code blocks
                  if (paragraph.startsWith('```')) {
                    const code = paragraph.replace(/```\w*\n?/, '').replace(/```$/, '');
                    return `<pre><code>${code}</code></pre>`;
                  }
                  
                  // Regular paragraphs with inline formatting
                  let formatted = paragraph
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/`(.+?)`/g, '<code>$1</code>')
                    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
                    .replace(/\n/g, '<br>');
                  
                  return `<p>${formatted}</p>`;
                })
                .join('')
            }}
          />
        </div>
      </article>
    </div>
  );
}

