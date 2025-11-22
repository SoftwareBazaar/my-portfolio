-- Update all project thumbnails to use placeholder
UPDATE projects 
SET thumbnail_url = '/images/placeholders/project-placeholder.svg'
WHERE thumbnail_url IS NOT NULL 
AND (thumbnail_url LIKE '%smartalgos%' OR thumbnail_url LIKE '%thrift-shop%');

-- Update company logos to use placeholder
UPDATE companies 
SET logo_url = '/images/placeholders/company-placeholder.svg'
WHERE logo_url IS NOT NULL 
AND logo_url LIKE '%smart-algos%';

-- Verify updates
SELECT 'Projects updated:' as status;
SELECT slug, title, thumbnail_url FROM projects;

SELECT 'Companies updated:' as status;
SELECT slug, name, logo_url FROM companies;
