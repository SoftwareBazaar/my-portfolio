-- Check current project images
SELECT slug, title, thumbnail_url FROM projects ORDER BY created_at DESC;

-- Check current company images  
SELECT slug, name, logo_url FROM companies ORDER BY created_at DESC;
