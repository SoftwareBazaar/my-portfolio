"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase-server";

export async function createCompany(formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const company = {
    slug: formData.get("slug") as string,
    name: formData.get("name") as string,
    tagline: formData.get("tagline") as string,
    founded: formData.get("founded") as string,
    status: formData.get("status") as string,
    role: formData.get("role") as string,
    content: formData.get("content") as string,
    logo_url: formData.get("logo_url") as string || null,
    website: formData.get("website") as string || null,
  };

  const { error } = await supabase.from("companies").insert(company);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/companies");
  redirect("/admin/companies");
}

export async function updateCompany(id: string, formData: FormData) {
  const supabase = createSupabaseServerComponentClient();

  const company = {
    slug: formData.get("slug") as string,
    name: formData.get("name") as string,
    tagline: formData.get("tagline") as string,
    founded: formData.get("founded") as string,
    status: formData.get("status") as string,
    role: formData.get("role") as string,
    content: formData.get("content") as string,
    logo_url: formData.get("logo_url") as string || null,
    website: formData.get("website") as string || null,
  };

  const { error } = await supabase.from("companies").update(company).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/companies");
  redirect("/admin/companies");
}

export async function deleteCompany(id: string) {
  const supabase = createSupabaseServerComponentClient();
  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/companies");
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
