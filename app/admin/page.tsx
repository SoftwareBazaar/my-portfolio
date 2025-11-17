import { createSupabaseServerComponentClient } from "@/lib/supabase-server";

export default async function AdminDashboardPage() {
  const supabase = createSupabaseServerComponentClient();
  const [
    { count: projectCount },
    { count: articleCount },
    { count: companyCount },
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("companies").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Projects", count: projectCount ?? 0, description: "Published platform and tooling initiatives." },
    { label: "Articles", count: articleCount ?? 0, description: "Insights, research notes, and essays." },
    { label: "Companies", count: companyCount ?? 0, description: "Ventures, partnerships, and spin-offs." },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Operate your portfolio content in one place.</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Create, update, and launch new projects, research articles, and company profiles. This console ties directly
          into your Supabase tables and storage buckets.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-900/60 bg-slate-950/50 p-6 shadow-inner shadow-slate-900/20"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.count}</p>
            <p className="mt-3 text-sm text-slate-400">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

