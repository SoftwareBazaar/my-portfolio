-- Check what status values are allowed
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'projects'::regclass
AND conname LIKE '%status%';

-- Also check existing projects to see what status values they use
SELECT DISTINCT status FROM projects;
