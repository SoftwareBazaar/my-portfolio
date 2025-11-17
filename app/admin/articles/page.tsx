import Link from "next/link";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { DeleteButton } from "./delete-button";

export default async function AdminArticlesPage() {
  const supabase = createSupabaseServerComponentClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Articles</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Manage your articles</h2>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          + New Article
        </Link>
      </div>

      {!articles || articles.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-12 text-center">
          <p className="text-slate-400">No articles yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-slate-700"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white">{article.title}</h3>
                  {article.featured && (
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">Featured</span>
                  )}
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                    {article.reading_time} min read
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{article.excerpt}</p>
                <div className="mt-2 flex gap-2">
                  {article.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Edit
                </Link>
                <DeleteButton id={article.id} title={article.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
