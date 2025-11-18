"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";

export async function createProject(formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const project = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    description: formData.get("description") as string,
    published_at: formData.get("published_at") as string,
    tech_tags: JSON.parse(formData.get("tech_tags") as string),
    featured: formData.get("featured") === "true",
    thumbnail_url: formData.get("thumbnail_url") as string || null,
    live_url: formData.get("live_url") as string || null,
    github_url: formData.get("github_url") as string || null,
  };

  const { error } = await supabase.from("projects").insert(project);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const project = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    description: formData.get("description") as string,
    published_at: formData.get("published_at") as string,
    tech_tags: JSON.parse(formData.get("tech_tags") as string),
    featured: formData.get("featured") === "true",
    thumbnail_url: formData.get("thumbnail_url") as string || null,
    live_url: formData.get("live_url") as string || null,
    github_url: formData.get("github_url") as string || null,
  };

  const { error } = await supabase.from("projects").update(project).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = createSupabaseServerComponentClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/projects");
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
