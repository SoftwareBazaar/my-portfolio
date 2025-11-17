"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectedFrom") ?? "/admin";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = (form.get("email") as string)?.trim().toLowerCase();
    const password = form.get("password") as string;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if Supabase URL is configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes("your-project-ref")) {
        setError(
          "Supabase not configured. Please check your .env.local file has the correct NEXT_PUBLIC_SUPABASE_URL."
        );
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Provide more helpful error messages
        if (error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials.");
        } else if (error.message.includes("fetch")) {
          setError(
            `Cannot connect to Supabase. Check that your URL (${supabaseUrl}) is correct and your dev server was restarted after updating .env.local.`
          );
        } else {
          setError(error.message || "Failed to sign in. Please try again.");
        }
        setLoading(false);
        return;
      }

      if (data?.user) {
        router.replace(redirectTo);
        router.refresh();
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage = err?.message || "Unknown error occurred";
      if (errorMessage.includes("Failed to fetch") || errorMessage.includes("ERR_NAME_NOT_RESOLVED")) {
        setError(
          "Cannot connect to Supabase. Please verify your .env.local file has the correct NEXT_PUBLIC_SUPABASE_URL and restart your dev server."
        );
      } else {
        setError(`Connection error: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    const email = prompt("Enter your email address");
    if (!email) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setError("Magic link sent! Check your inbox.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-900/70 bg-slate-950/70 p-10 shadow-2xl shadow-slate-950/40">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Portfolio Admin</p>
          <h1 className="text-2xl font-semibold text-white">Sign in to continue</h1>
          <p className="text-sm text-slate-400">
            Use your Supabase admin credentials to access the content console.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-slate-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wide text-slate-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Prefer passwordless?{" "}
          <button
            type="button"
            onClick={handleMagicLink}
            className="font-medium text-primary transition hover:text-primary/80"
            disabled={loading}
          >
            Send magic link
          </button>
        </div>
      </div>
    </div>
  );
}

