-- Force update ALL project images to placeholder
UPDATE projects 
SET thumbnail_url = '/images/placeholders/project-placeholder.svg';

-- Force update ALL company logos to placeholder
UPDATE companies 
SET logo_url = '/images/placeholders/company-placeholder.svg';

-- Verify
SELECT 'Updated!' as status;
SELECT slug, title, thumbnail_url FROM projects;
SELECT slug, name, logo_url FROM companies;
