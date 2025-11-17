import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Projects</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Create new project</h2>
      </div>
      <ProjectForm />
    </div>
  );
}
