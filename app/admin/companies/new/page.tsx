import { CompanyForm } from "../company-form";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Companies</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Create new company</h2>
      </div>
      <CompanyForm />
    </div>
  );
}
