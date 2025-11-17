import { ArticleForm } from "../article-form";

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Articles</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Create new article</h2>
      </div>
      <ArticleForm />
    </div>
  );
}
