"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";

export async function signOut() {
  const supabase = createSupabaseServerComponentClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

