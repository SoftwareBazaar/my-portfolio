"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCompany } from "./actions";

export function DeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setLoading(true);
    try {
      await deleteCompany(id);
      router.refresh();
    } catch (error) {
      alert("Failed to delete company");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg border border-red-900/50 px-3 py-1.5 text-sm text-red-400 transition hover:border-red-700 hover:bg-red-950/30 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
