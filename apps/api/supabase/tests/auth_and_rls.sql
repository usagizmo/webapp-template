-- Test authentication and Row Level Security (RLS) policies
BEGIN;
SELECT plan(15);

-- Create test users
INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    created_at, 
    updated_at,
    raw_user_meta_data
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001',
    'user1@example.com',
    '$2a$10$test.hash.here',
    NOW(),
    NOW(), 
    NOW(),
    '{"display_name": "User One"}'::jsonb
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'user2@example.com',
    '$2a$10$test.hash.here',
    NOW(),
    NOW(), 
    NOW(),
    '{"display_name": "User Two"}'::jsonb
);

-- Test RLS policies exist
SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can view all profiles'
    ),
    'RLS policy "Users can view all profiles" exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can update their own profile'
    ),
    'RLS policy "Users can update their own profile" exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can insert their own profile'
    ),
    'RLS policy "Users can insert their own profile" exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'comments' 
        AND policyname = 'Users can view all comments'
    ),
    'RLS policy "Users can view all comments" exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'comments' 
        AND policyname = 'Users can insert their own comments'
    ),
    'RLS policy "Users can insert their own comments" exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'comments' 
        AND policyname = 'Users can update their own comments'
    ),
    'RLS policy "Users can update their own comments" exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'comments' 
        AND policyname = 'Users can delete their own comments'
    ),
    'RLS policy "Users can delete their own comments" exists'
);

-- Test storage policies exist
SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage'
        AND policyname = 'Users can upload files to comments bucket'
    ),
    'Storage policy "Users can upload files to comments bucket" exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage'
        AND policyname = 'Users can view files in comments bucket'
    ),
    'Storage policy "Users can view files in comments bucket" exists'
);

-- Test handle_new_user function exists
SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_proc 
        WHERE proname = 'handle_new_user'
    ),
    'Function handle_new_user exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_proc 
        WHERE proname = 'update_updated_at_column'
    ),
    'Function update_updated_at_column exists'
);

-- Test triggers exist
SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ),
    'Trigger on_auth_user_created exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_profiles_updated_at'
    ),
    'Trigger update_profiles_updated_at exists'
);

SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_comments_updated_at'  
    ),
    'Trigger update_comments_updated_at exists'
);

-- Test realtime publication
SELECT ok(
    EXISTS(
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'profiles'
    ),
    'Profiles table added to realtime publication'
);

SELECT * FROM finish();
ROLLBACK;