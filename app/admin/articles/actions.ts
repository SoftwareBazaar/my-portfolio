"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";

export async function createArticle(formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const article = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    published_at: formData.get("published_at") as string,
    tags: JSON.parse(formData.get("tags") as string),
    featured: formData.get("featured") === "true",
    reading_time: parseInt(formData.get("reading_time") as string),
    thumbnail_url: formData.get("thumbnail_url") as string || null,
  };

  const { error } = await supabase.from("articles").insert(article);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const article = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    published_at: formData.get("published_at") as string,
    tags: JSON.parse(formData.get("tags") as string),
    featured: formData.get("featured") === "true",
    reading_time: parseInt(formData.get("reading_time") as string),
    thumbnail_url: formData.get("thumbnail_url") as string || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("articles").update(article).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  const supabase = createSupabaseServerComponentClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/articles");
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
