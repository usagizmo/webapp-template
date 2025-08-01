-- Test CRUD operations for profiles and comments
BEGIN;
SELECT plan(9);

-- Create test user in auth.users first
INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    created_at, 
    updated_at,
    raw_user_meta_data
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'test@example.com',
    '$2a$10$test.hash.here',
    NOW(),
    NOW(), 
    NOW(),
    '{"display_name": "Test User"}'::jsonb
);

-- Test profile creation via trigger
SELECT ok(
    EXISTS(SELECT 1 FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440000'),
    'Profile created automatically via trigger'
);

-- Test profile data integrity
SELECT ok(
    (SELECT email FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440000') = 'test@example.com',
    'Profile email matches user email'
);

SELECT ok(
    (SELECT display_name FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440000') = 'Test User',
    'Profile display_name set from metadata'
);

-- Test profile update
UPDATE profiles 
SET display_name = 'Updated User', bio = 'Test bio'
WHERE id = '550e8400-e29b-41d4-a716-446655440000';

SELECT ok(
    (SELECT display_name FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440000') = 'Updated User',
    'Profile display_name updated successfully'
);

SELECT ok(
    (SELECT bio FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440000') = 'Test bio',
    'Profile bio updated successfully' 
);

-- Test comment creation
INSERT INTO comments (user_id, text, file_path)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Test comment', '/test/file.txt');

SELECT ok(
    EXISTS(SELECT 1 FROM comments WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'),
    'Comment created successfully'
);

SELECT ok(
    (SELECT text FROM comments WHERE user_id = '550e8400-e29b-41d4-a716-446655440000') = 'Test comment',
    'Comment text stored correctly'
);

-- Test comment update
UPDATE comments 
SET text = 'Updated comment text'
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

SELECT ok(
    (SELECT text FROM comments WHERE user_id = '550e8400-e29b-41d4-a716-446655440000') = 'Updated comment text',
    'Comment text updated successfully'
);

-- Test cascade delete (comment should be deleted when profile is deleted)
DELETE FROM auth.users WHERE id = '550e8400-e29b-41d4-a716-446655440000';

SELECT ok(
    NOT EXISTS(SELECT 1 FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440000'),
    'Profile deleted via cascade from auth.users'
);

SELECT * FROM finish();
ROLLBACK;