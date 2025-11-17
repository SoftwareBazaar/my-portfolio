import Link from "next/link";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { DeleteButton } from "./delete-button";

export default async function AdminProjectsPage() {
  const supabase = createSupabaseServerComponentClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Projects</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Manage your projects</h2>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          + New Project
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-12 text-center">
          <p className="text-slate-400">No projects yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-slate-700"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">Featured</span>
                  )}
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                    {project.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{project.summary}</p>
                <div className="mt-2 flex gap-2">
                  {project.tech_tags?.map((tag: string) => (
                    <span key={tag} className="text-xs text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Edit
                </Link>
                <DeleteButton id={project.id} title={project.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
