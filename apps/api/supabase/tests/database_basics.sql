-- Test basic database connectivity and schema
BEGIN;
SELECT plan(10);

-- Test database connection
SELECT ok(current_database() = 'postgres', 'Database connection established');

-- Test required extensions
SELECT ok(
    EXISTS(SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp'),
    'UUID extension is installed'
);

-- Test tables exist
SELECT ok(
    EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles'),
    'Profiles table exists'
);

SELECT ok(
    EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'comments'),
    'Comments table exists'  
);

-- Test table structure for profiles
SELECT ok(
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = 'profiles' AND column_name IN ('id', 'email', 'display_name', 'bio', 'created_at', 'updated_at')) = 6,
    'Profiles table has correct columns'
);

-- Test table structure for comments  
SELECT ok(
    (SELECT COUNT(*) FROM information_schema.columns
     WHERE table_name = 'comments' AND column_name IN ('id', 'user_id', 'text', 'file_path', 'created_at', 'updated_at')) = 6,
    'Comments table has correct columns'
);

-- Test RLS is enabled
SELECT ok(
    (SELECT relrowsecurity FROM pg_class WHERE relname = 'profiles'),
    'RLS is enabled on profiles table'
);

SELECT ok(
    (SELECT relrowsecurity FROM pg_class WHERE relname = 'comments'),
    'RLS is enabled on comments table'
);

-- Test foreign key constraints
SELECT ok(
    EXISTS(
        SELECT 1 FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = 'profiles' 
        AND tc.constraint_type = 'FOREIGN KEY'
        AND kcu.column_name = 'id'
    ),
    'Profiles table has foreign key constraint on id'
);

-- Test storage bucket exists
SELECT ok(
    EXISTS(SELECT 1 FROM storage.buckets WHERE name = 'comments'),
    'Comments storage bucket exists'
);

SELECT * FROM finish();
ROLLBACK;