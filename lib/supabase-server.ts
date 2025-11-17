import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set."
  );
}

if (supabaseUrl.includes("your-project-ref") || supabaseUrl.includes("placeholder")) {
  throw new Error(
    "Supabase URL contains placeholder. Please replace 'your-project-ref' with your actual Supabase project reference in .env.local"
  );
}

// Type assertions after validation
const validatedUrl: string = supabaseUrl;
const validatedKey: string = supabaseAnonKey;

export function createSupabaseServerClient() {
  return createClient(validatedUrl, validatedKey, {
    auth: {
      persistSession: false,
    },
  });
}

export function createSupabaseServerComponentClient() {
  const cookieStore = cookies();

  return createServerClient(validatedUrl, validatedKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        cookieStore.delete({ name, ...options });
      },
    },
  });
}

export function createSupabaseMiddlewareClient(req: NextRequest, res: NextResponse) {
  return createServerClient(validatedUrl, validatedKey, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        res.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        res.cookies.set({ name, value: "", ...options, maxAge: 0 });
      },
    },
  });
}

export function createSupabaseAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createClient(validatedUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

