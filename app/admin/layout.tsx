import Link from "next/link";
import type { ReactNode } from "react";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { signOut } from "./actions";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/hero", label: "Hero Section" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const email = session?.user.email ?? "Admin";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-900/60 bg-slate-950/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Portfolio Admin</p>
            <h1 className="text-lg font-semibold text-white">Content Operations Console</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400">Signed in as {email}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
        <aside className="w-48 shrink-0 space-y-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg border border-transparent px-3 py-2 text-slate-300 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </aside>
        <main className="flex-1 rounded-2xl border border-slate-900/70 bg-slate-950/60 p-8 shadow-lg shadow-slate-900/40">
          {children}
        </main>
      </div>
    </div>
  );
}

