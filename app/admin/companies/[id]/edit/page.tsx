import { notFound } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { CompanyForm } from "../../company-form";

export default async function EditCompanyPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerComponentClient();
  const { data: company } = await supabase.from("companies").select("*").eq("id", params.id).single();

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Companies</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Edit company</h2>
      </div>
      <CompanyForm company={company} />
    </div>
  );
}
