import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

// Project types
export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  status: "Live" | "In Development" | "Completed";
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  content: string;
}

// Company types
export interface Company {
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

// Article types
export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  thumbnail?: string;
  content: string;
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(contentDirectory, "projects");
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);
  const projects = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
        featured: data.featured || false,
        status: data.status || "Completed",
        thumbnail: data.thumbnail,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        content,
      };
    });

  return projects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get featured projects
export async function getFeaturedProjects(limit: number = 4): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured).slice(0, limit);
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}

// Get all companies
export async function getAllCompanies(): Promise<Company[]> {
  const companiesDirectory = path.join(contentDirectory, "companies");
  if (!fs.existsSync(companiesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(companiesDirectory);
  const companies = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(companiesDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: file.replace(".mdx", ""),
        name: data.name || "",
        tagline: data.tagline || "",
        founded: data.founded || "",
        status: data.status || "Active",
        role: data.role || "",
        logo: data.logo,
        website: data.website,
        content,
      };
    });

  return companies.sort((a, b) => {
    return new Date(b.founded).getTime() - new Date(a.founded).getTime();
  });
}

// Get featured companies
export async function getFeaturedCompanies(limit: number = 3): Promise<Company[]> {
  const companies = await getAllCompanies();
  return companies.filter((c) => c.status === "Active").slice(0, limit);
}

// Get company by slug
export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const companies = await getAllCompanies();
  return companies.find((c) => c.slug === slug) || null;
}

// Get all articles
export async function getAllArticles(): Promise<Article[]> {
  const articlesDirectory = path.join(contentDirectory, "articles");
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(articlesDirectory);
  const articles = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(articlesDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        description: data.description || "",
        publishedAt: data.publishedAt || "",
        updatedAt: data.updatedAt,
        tags: data.tags || [],
        featured: data.featured || false,
        readingTime: data.readingTime || Math.ceil(content.split(/\s+/).length / 200),
        thumbnail: data.thumbnail,
        content,
      };
    });

  return articles.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

// Get latest articles
export async function getLatestArticles(limit: number = 4): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.slice(0, limit);
}

// Get featured articles
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.featured).slice(0, limit);
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}

