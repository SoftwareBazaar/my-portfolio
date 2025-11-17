"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";

export async function updateSettings(formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const settings = {
    status_badge: formData.get("status_badge") as string,
    greeting: formData.get("greeting") as string,
    hero_title_1: formData.get("hero_title_1") as string,
    hero_title_2: formData.get("hero_title_2") as string,
    hero_title_3: formData.get("hero_title_3") as string,
    hero_description: formData.get("hero_description") as string,
    hero_badges: JSON.parse(formData.get("hero_badges") as string),
    profile_image_url: formData.get("profile_image_url") as string || null,
    cta_primary_text: formData.get("cta_primary_text") as string,
    cta_primary_link: formData.get("cta_primary_link") as string,
    cta_secondary_text: formData.get("cta_secondary_text") as string,
    cta_secondary_link: formData.get("cta_secondary_link") as string,
  };

  // Check if settings exist
  const { data: existing } = await supabase.from("site_settings").select("id").single();

  if (existing) {
    // Update existing settings
    const { error } = await supabase.from("site_settings").update(settings).eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    // Insert new settings
    const { error } = await supabase.from("site_settings").insert(settings);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function uploadImage(formData: FormData) {
  const supabase = createSupabaseServerComponentClient();
  const file = formData.get("file") as File;
  const bucket = formData.get("bucket") as string;

  if (!file) {
    throw new Error("No file provided");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
}
