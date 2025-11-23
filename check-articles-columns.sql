-- Check what columns exist in articles table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'articles' 
ORDER BY ordinal_position;
