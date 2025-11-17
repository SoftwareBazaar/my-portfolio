import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { HeroForm } from "./hero-form";

export default async function AdminHeroPage() {
  const supabase = createSupabaseServerComponentClient();
  const { data: hero } = await supabase
    .from("hero_settings")
    .select("*")
    .single();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Hero Section</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Manage homepage hero</h2>
        <p className="mt-2 text-sm text-slate-400">
          Update the main hero section that appears on your homepage.
        </p>
      </div>
      <HeroForm hero={hero} />
    </div>
  );
}
