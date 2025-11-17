-- ============================================
-- SUPABASE MIGRATION SCRIPT
-- This script works with existing tables
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CHECK AND CREATE/ALTER TABLES
-- ============================================

-- Create or alter projects table
DO $$ 
BEGIN
  -- Create table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'projects') THEN
    CREATE TABLE projects (
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
  ELSE
    -- Add missing columns if table exists
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'summary') THEN
      ALTER TABLE projects ADD COLUMN summary TEXT;
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'published_at') THEN
      ALTER TABLE projects ADD COLUMN published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'tech_tags') THEN
      ALTER TABLE projects ADD COLUMN tech_tags TEXT[] DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'thumbnail_url') THEN
      ALTER TABLE projects ADD COLUMN thumbnail_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'live_url') THEN
      ALTER TABLE projects ADD COLUMN live_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'github_url') THEN
      ALTER TABLE projects ADD COLUMN github_url TEXT;
    END IF;
  END IF;
END $$;

-- Create or alter articles table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'articles') THEN
    CREATE TABLE articles (
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
  ELSE
    -- Add missing columns if table exists
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'excerpt') THEN
      ALTER TABLE articles ADD COLUMN excerpt TEXT;
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'published_at') THEN
      ALTER TABLE articles ADD COLUMN published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'reading_time') THEN
      ALTER TABLE articles ADD COLUMN reading_time INTEGER DEFAULT 5;
    END IF;
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'thumbnail_url') THEN
      ALTER TABLE articles ADD COLUMN thumbnail_url TEXT;
    END IF;
  END IF;
END $$;

-- Create or alter companies table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'companies') THEN
    CREATE TABLE companies (
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
  ELSE
    -- Add missing columns if table exists
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'companies' AND column_name = 'logo_url') THEN
      ALTER TABLE companies ADD COLUMN logo_url TEXT;
    END IF;
  END IF;
END $$;

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
-- 4. DROP EXISTING STORAGE POLICIES (IF ANY)
-- ============================================

DROP POLICY IF EXISTS "Public Access for Project Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access for Article Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete article images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access for Company Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload company logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update company logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete company logos" ON storage.objects;

-- ============================================
-- 5. CREATE STORAGE POLICIES
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
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. DROP EXISTING TABLE POLICIES (IF ANY)
-- ============================================

DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

DROP POLICY IF EXISTS "Public can view articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;

DROP POLICY IF EXISTS "Public can view companies" ON companies;
DROP POLICY IF EXISTS "Authenticated users can insert companies" ON companies;
DROP POLICY IF EXISTS "Authenticated users can update companies" ON companies;
DROP POLICY IF EXISTS "Authenticated users can delete companies" ON companies;

-- ============================================
-- 8. CREATE RLS POLICIES FOR TABLES
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
-- 9. CREATE UPDATED_AT TRIGGER FUNCTION
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
-- SETUP COMPLETE!
-- ============================================

SELECT 'Migration completed successfully!' as status;
