-- ============================================
-- SUPABASE SETUP SQL SCRIPT
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  tech_tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'Completed',
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  reading_time INTEGER DEFAULT 5,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies Table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  founded TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);

-- ============================================
-- 3. CREATE STORAGE BUCKETS
-- ============================================

-- Insert storage buckets (project-images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Insert storage buckets (article-images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'article-images',
  'article-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Insert storage buckets (company-logos)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'company-logos',
  'company-logos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4. SET UP STORAGE POLICIES (PUBLIC ACCESS)
-- ============================================

-- Project Images Policies
CREATE POLICY "Public Access for Project Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Article Images Policies
CREATE POLICY "Public Access for Article Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'article-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update article images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete article images"
ON storage.objects FOR DELETE
USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');

-- Company Logos Policies
CREATE POLICY "Public Access for Company Logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-logos');

CREATE POLICY "Authenticated users can upload company logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'company-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update company logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'company-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete company logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'company-logos' AND auth.role() = 'authenticated');

-- ============================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. CREATE RLS POLICIES FOR TABLES
-- ============================================

-- Projects Policies (Public read, Authenticated write)
CREATE POLICY "Public can view projects"
ON projects FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
USING (auth.role() = 'authenticated');

-- Articles Policies (Public read, Authenticated write)
CREATE POLICY "Public can view articles"
ON articles FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert articles"
ON articles FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update articles"
ON articles FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete articles"
ON articles FOR DELETE
USING (auth.role() = 'authenticated');

-- Companies Policies (Public read, Authenticated write)
CREATE POLICY "Public can view companies"
ON companies FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert companies"
ON companies FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update companies"
ON companies FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete companies"
ON companies FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================
-- 7. CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to articles table
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to companies table
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON companies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. INSERT SAMPLE DATA (OPTIONAL)
-- ============================================

-- Sample Project
INSERT INTO projects (slug, title, summary, description, published_at, tech_tags, featured, status)
VALUES (
  'sample-project',
  'Sample Project',
  'This is a sample project to get you started',
  'This is a detailed description of your sample project. You can edit or delete this from the admin panel.',
  NOW(),
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS'],
  true,
  'Live'
)
ON CONFLICT (slug) DO NOTHING;

-- Sample Article
INSERT INTO articles (slug, title, excerpt, content, published_at, tags, featured, reading_time)
VALUES (
  'getting-started',
  'Getting Started with Your Portfolio',
  'Learn how to use your new admin panel to manage content',
  'Welcome to your portfolio admin panel! This article will guide you through creating and managing your content. You can edit or delete this article from the admin panel at any time.',
  NOW(),
  ARRAY['Tutorial', 'Getting Started'],
  true,
  5
)
ON CONFLICT (slug) DO NOTHING;

-- Sample Company
INSERT INTO companies (slug, name, tagline, founded, status, role, content)
VALUES (
  'sample-company',
  'Sample Company',
  'Building the future of technology',
  '2024',
  'Active',
  'Founder & CEO',
  'This is a sample company profile. You can edit or delete this from the admin panel to add your real companies.'
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SETUP COMPLETE!
-- ============================================

-- Verify tables were created
SELECT 'Tables created:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'articles', 'companies');

-- Verify storage buckets were created
SELECT 'Storage buckets created:' as status;
SELECT name FROM storage.buckets 
WHERE name IN ('project-images', 'article-images', 'company-logos');
