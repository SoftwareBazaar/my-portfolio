-- ============================================
-- HERO SECTION MIGRATION
-- Run this to add Hero Section management
-- ============================================

-- Create hero_settings table
CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  primary_button_text TEXT,
  primary_button_link TEXT,
  secondary_button_text TEXT,
  secondary_button_link TEXT,
  hero_image_url TEXT,
  background_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hero-images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hero-images',
  'hero-images',
  true,
  10485760, -- 10MB limit for hero images
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view hero settings" ON hero_settings;
DROP POLICY IF EXISTS "Authenticated users can update hero settings" ON hero_settings;
DROP POLICY IF EXISTS "Authenticated users can insert hero settings" ON hero_settings;

-- Create RLS policies
CREATE POLICY "Public can view hero settings"
ON hero_settings FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert hero settings"
ON hero_settings FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update hero settings"
ON hero_settings FOR UPDATE
USING (auth.role() = 'authenticated');

-- Drop existing storage policies if any
DROP POLICY IF EXISTS "Public Access for Hero Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload hero images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update hero images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete hero images" ON storage.objects;

-- Create storage policies
CREATE POLICY "Public Access for Hero Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero-images');

CREATE POLICY "Authenticated users can upload hero images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hero-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update hero images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'hero-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete hero images"
ON storage.objects FOR DELETE
USING (bucket_id = 'hero-images' AND auth.role() = 'authenticated');

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_hero_settings_updated_at ON hero_settings;
CREATE TRIGGER update_hero_settings_updated_at
BEFORE UPDATE ON hero_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert default hero settings
INSERT INTO hero_settings (
  title,
  subtitle,
  description,
  primary_button_text,
  primary_button_link,
  secondary_button_text,
  secondary_button_link
)
VALUES (
  'Welcome to My Portfolio',
  'Building innovative solutions',
  'I create modern web applications and digital experiences that make a difference.',
  'View Projects',
  '/projects',
  'Contact Me',
  '/contact'
)
ON CONFLICT DO NOTHING;

SELECT 'Hero section migration completed successfully!' as status;
