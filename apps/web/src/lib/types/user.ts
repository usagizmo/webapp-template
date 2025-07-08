import type { Tables } from '$api-generated/supabase-types';

/**
 * User profile
 * Based on the profiles table type from Supabase
 */
export type UserProfile = Tables<'profiles'>;
