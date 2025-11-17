"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";

export async function updateHero(formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const heroData = {
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string || null,
    description: formData.get("description") as string || null,
    primary_button_text: formData.get("primary_button_text") as string || null,
    primary_button_link: formData.get("primary_button_link") as string || null,
    secondary_button_text: formData.get("secondary_button_text") as string || null,
    secondary_button_link: formData.get("secondary_button_link") as string || null,
    hero_image_url: formData.get("hero_image_url") as string || null,
    background_image_url: formData.get("background_image_url") as string || null,
  };

  // Check if hero settings exist
  const { data: existing } = await supabase
    .from("hero_settings")
    .select("id")
    .single();

  if (existing) {
    // Update existing
    const { error } = await supabase
      .from("hero_settings")
      .update(heroData)
      .eq("id", existing.id);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    // Insert new
    const { error } = await supabase
      .from("hero_settings")
      .insert(heroData);

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
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
