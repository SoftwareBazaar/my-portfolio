import { createSupabaseServerComponentClient } from "@/lib/supabase-server";
import { SettingsForm } from "./settings-form";

export default async function AdminSettingsPage() {
  const supabase = createSupabaseServerComponentClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Settings</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Homepage & Site Settings</h2>
        <p className="mt-2 text-sm text-slate-400">
          Manage your homepage hero section, profile image, and site-wide settings.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
