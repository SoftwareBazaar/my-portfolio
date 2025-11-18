"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCompany, updateCompany, uploadImage } from "./actions";

interface CompanyFormProps {
  company?: any;
}

export function CompanyForm({ company }: CompanyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(company?.logo_url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("logo_url", logoUrl);

    try {
      if (company) {
        await updateCompany(company.id, formData);
      } else {
        await createCompany(formData);
      }
    } catch (error: any) {
      alert(error.message || "Failed to save company");
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "company-logos");

    try {
      const url = await uploadImage(formData);
      setLogoUrl(url);
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Company Name *</label>
          <input
            name="name"
            type="text"
            required
            defaultValue={company?.name}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Slug *</label>
          <input
            name="slug"
            type="text"
            required
            defaultValue={company?.slug}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Tagline *</label>
        <input
          name="tagline"
          type="text"
          required
          defaultValue={company?.tagline}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Content *</label>
        <textarea
          name="content"
          required
          rows={8}
          defaultValue={company?.content}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Founded Year *</label>
          <input
            name="founded"
            type="text"
            required
            placeholder="2024"
            defaultValue={company?.founded}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Status *</label>
          <select
            name="status"
            required
            defaultValue={company?.status || "Active"}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          >
            <option value="Active">Active</option>
            <option value="Acquired">Acquired</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Your Role *</label>
          <input
            name="role"
            type="text"
            required
            placeholder="Founder & CEO"
            defaultValue={company?.role}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Website</label>
        <input
          name="website"
          type="url"
          defaultValue={company?.website}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Company Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
        {uploading && <p className="text-sm text-slate-400">Uploading...</p>}
        {logoUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="Logo preview" className="h-24 w-24 rounded-lg object-cover" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : company ? "Update Company" : "Create Company"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-700 px-6 py-2 text-sm text-slate-300 transition hover:border-slate-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
