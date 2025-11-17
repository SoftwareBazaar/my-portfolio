import { notFound } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { ArticleForm } from "../../article-form";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerComponentClient();
  const { data: article } = await supabase.from("articles").select("*").eq("id", params.id).single();

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Articles</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Edit article</h2>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
