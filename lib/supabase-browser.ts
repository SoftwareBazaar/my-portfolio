import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

export function createSupabaseBrowserClient() {
  return createBrowserClient(validatedUrl, validatedKey);
}

