/**
 * Supabase helper functions
 */
import type { AuthError, SupabaseClient } from '@supabase/supabase-js';

import type { Database, TablesUpdate } from '$api-generated/supabase-types';
import type { UserProfile } from '$lib/types/user';

/**
 * Sign up
 * @param supabase - Supabase client
 * @param email - Email
 * @param password - Password
 * @param displayName - Display name
 * @returns Promise with error if there is an error
 */
export async function signUp(
  supabase: SupabaseClient<Database>,
  email: string,
  password: string,
  displayName: string,
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
    },
  });

  if (error) {
    console.error('Sign up error:', error);
  }
  return { error };
}

/**
 * Sign in
 * @param supabase - Supabase client
 * @param email - Email
 * @param password - Password
 * @returns Promise with error if there is an error
 */
export async function signIn(
  supabase: SupabaseClient<Database>,
  email: string,
  password: string,
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
  }
  return { error };
}

/**
 * Sign out
 * @param supabase - Supabase client
 * @returns Promise with error if there is an error
 */
export async function signOut(
  supabase: SupabaseClient<Database>,
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
  }
  return { error };
}

/**
 * Fetch user profile
 * @param supabase - Supabase client
 * @param userId - User ID
 * @returns Promise with profile and error if there is an error
 */
export async function fetchUserProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<{ profile: UserProfile | null; error: unknown | null }> {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

    if (error) {
      return { profile: null, error };
    }

    const profile: UserProfile = data;
    return { profile, error: null };
  } catch (error) {
    return { profile: null, error };
  }
}

/**
 * Update user profile
 * @param supabase - Supabase client
 * @param userId - User ID
 * @param updates - Updates to the profile
 * @returns Promise with updated profile and error if there is an error
 */
export async function updateUserProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
  updates: TablesUpdate<'profiles'>,
): Promise<{ profile: UserProfile | null; error: unknown | null }> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select('*')
      .single();

    if (error) {
      return { profile: null, error };
    }

    const profile: UserProfile = data;
    return { profile, error: null };
  } catch (error) {
    return { profile: null, error };
  }
}
