import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  featured: boolean;
  status: "Live" | "In Development" | "Completed";
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  founded: string;
  status: "Active" | "Acquired" | "Closed";
  role: string;
  logo?: string;
  website?: string;
  content: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  thumbnail?: string;
}

function mapProject(row: any): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title ?? "",
    description: row.summary ?? "",
    content: row.description ?? "",
    date: row.published_at ? new Date(row.published_at).toISOString() : "",
    tags: row.tech_tags ?? [],
    featured: row.featured ?? false,
    status: row.status ?? "Completed",
    thumbnail: row.thumbnail_url ?? undefined,
    liveUrl: row.live_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
  };
}

function mapCompany(row: any): Company {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name ?? "",
    tagline: row.tagline ?? "",
    founded: row.founded ?? "",
    status: row.status ?? "Active",
    role: row.role ?? "",
    logo: row.logo_url ?? undefined,
    website: row.website ?? undefined,
    content: row.content ?? "",
  };
}

function mapArticle(row: any): Article {
  const publishedAt = row.published_at ? new Date(row.published_at as string) : undefined;
  const updatedAt = row.updated_at ? new Date(row.updated_at as string) : undefined;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title ?? "",
    description: row.excerpt ?? "",
    content: row.content ?? "",
    publishedAt: publishedAt ? publishedAt.toISOString() : "",
    updatedAt: updatedAt ? updatedAt.toISOString() : undefined,
    tags: row.tags ?? [],
    featured: row.featured ?? false,
    readingTime: row.reading_time ?? 0,
    thumbnail: row.thumbnail_url ?? undefined,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[getAllProjects]", error);
    return [];
  }

  return (data ?? []).map(mapProject);
}

export async function getFeaturedProjects(limit: number = 4): Promise<Project[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getFeaturedProjects]", error);
    return [];
  }

  return (data ?? []).map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();

  if (error) {
    console.error("[getProjectBySlug]", error);
    return null;
  }

  return data ? mapProject(data) : null;
}

export async function getAllCompanies(): Promise<Company[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("founded", { ascending: false });

  if (error) {
    console.error("[getAllCompanies]", error);
    return [];
  }

  return (data ?? []).map(mapCompany);
}

export async function getFeaturedCompanies(limit: number = 3): Promise<Company[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("status", "Active")
    .order("founded", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getFeaturedCompanies]", error);
    return [];
  }

  return (data ?? []).map(mapCompany);
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("companies").select("*").eq("slug", slug).maybeSingle();

  if (error) {
    console.error("[getCompanyBySlug]", error);
    return null;
  }

  return data ? mapCompany(data) : null;
}

export async function getAllArticles(): Promise<Article[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[getAllArticles]", error);
    return [];
  }

  return (data ?? []).map(mapArticle);
}

export async function getLatestArticles(limit: number = 4): Promise<Article[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getLatestArticles]", error);
    return [];
  }

  return (data ?? []).map(mapArticle);
}

export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getFeaturedArticles]", error);
    return [];
  }

  return (data ?? []).map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).maybeSingle();

  if (error) {
    console.error("[getArticleBySlug]", error);
    return null;
  }

  return data ? mapArticle(data) : null;
}

export interface HeroSettings {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  primary_button_text?: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  hero_image_url?: string;
  background_image_url?: string;
}

export async function getHeroSettings(): Promise<HeroSettings | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("hero_settings").select("*").single();

  if (error) {
    console.error("[getHeroSettings]", error);
    return null;
  }

  return data;
}

