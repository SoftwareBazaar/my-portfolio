import Link from "next/link";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { DeleteButton } from "./delete-button";

export default async function AdminCompaniesPage() {
  const supabase = createSupabaseServerComponentClient();
  const { data: companies } = await supabase
    .from("companies")
    .select("*")
    .order("founded", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Companies</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Manage your companies</h2>
        </div>
        <Link
          href="/admin/companies/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          + New Company
        </Link>
      </div>

      {!companies || companies.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-12 text-center">
          <p className="text-slate-400">No companies yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-slate-700"
            >
              <div className="flex flex-1 items-center gap-4">
                {company.logo_url && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={company.logo_url} alt={company.name} className="h-12 w-12 rounded-lg object-cover" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white">{company.name}</h3>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                      {company.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{company.tagline}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {company.role} • Founded {company.founded}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/companies/${company.id}/edit`}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Edit
                </Link>
                <DeleteButton id={company.id} name={company.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
