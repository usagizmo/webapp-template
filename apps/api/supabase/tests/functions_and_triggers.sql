-- Test database functions and triggers behavior
BEGIN;
SELECT plan(5);

-- Test handle_new_user function behavior
-- Create a user without profile first (simulating auth signup)
INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    created_at, 
    updated_at,
    raw_user_meta_data
) VALUES (
    '550e8400-e29b-41d4-a716-446655440003',
    'trigger-test@example.com',
    '$2a$10$test.hash.here',
    NOW(),
    NOW(), 
    NOW(),
    '{"display_name": "Trigger Test User"}'::jsonb
);

-- Test that profile was created automatically
SELECT ok(
    EXISTS(SELECT 1 FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440003'),
    'Profile created automatically when user is inserted'
);

SELECT ok(
    (SELECT email FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440003') = 'trigger-test@example.com',
    'Profile email matches auth user email'
);

SELECT ok(
    (SELECT display_name FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440003') = 'Trigger Test User',
    'Profile display_name extracted from user metadata'
);

-- Test default display_name for user without metadata
INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    created_at, 
    updated_at
) VALUES (
    '550e8400-e29b-41d4-a716-446655440004',
    'no-metadata@example.com',
    '$2a$10$test.hash.here',
    NOW(),
    NOW(), 
    NOW()
);

SELECT ok(
    (SELECT display_name FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440004') = 'Anonymous User',
    'Default display_name used when metadata is missing'
);

-- Test function with edge case - user with malformed metadata
INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    created_at, 
    updated_at,
    raw_user_meta_data
) VALUES (
    '550e8400-e29b-41d4-a716-446655440005',
    'malformed@example.com',
    '$2a$10$test.hash.here',
    NOW(),
    NOW(), 
    NOW(),
    '{"other_field": "value"}'::jsonb  -- no display_name field
);

SELECT ok(
    (SELECT display_name FROM profiles WHERE id = '550e8400-e29b-41d4-a716-446655440005') = 'Anonymous User',
    'Default display_name used when display_name field is missing from metadata'
);

SELECT * FROM finish();
ROLLBACK;