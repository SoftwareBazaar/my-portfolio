-- Check what URLs are actually stored
SELECT 
  slug, 
  title, 
  thumbnail_url,
  CASE 
    WHEN thumbnail_url LIKE 'https://%' THEN 'Supabase URL ✓'
    WHEN thumbnail_url LIKE '/images/%' THEN 'Local path ✗'
    ELSE 'Other'
  END as url_type
FROM projects 
ORDER BY created_at DESC;
