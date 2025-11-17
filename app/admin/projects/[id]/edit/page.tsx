import { notFound } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerComponentClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", params.id).single();

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Projects</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Edit project</h2>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
