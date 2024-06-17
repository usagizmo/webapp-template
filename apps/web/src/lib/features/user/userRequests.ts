import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import camelcaseKeys from 'camelcase-keys';

import { supabase } from '$lib/supabase';

import type { User } from './userStore.svelte';

/**
 * Sign up a user
 * @param inputs User inputs
 * @param inputs.email User email
 * @param inputs.password User password
 * @param inputs.displayName User display name
 * @returns Error
 */
export async function signUp(inputs: {
  email: string;
  password: string;
  displayName: string;
}): Promise<{ error: AuthError | null }> {
  const { email, password, displayName } = inputs;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
    },
  });
  return { error };
}

/**
 * Sign in a user
 * @param inputs User inputs
 * @param inputs.email User email
 * @param inputs.password User password
 * @returns Error
 */
export async function signIn(inputs: {
  email: string;
  password: string;
}): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signInWithPassword(inputs);
  return { error };
}

/**
 * Sign out a user
 * @returns Error
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get a user (profile) by id
 * @param id user id
 * @returns user (profile) and error
 */
export async function getUser(
  id: string,
): Promise<{ user: User | null; error: PostgrestError | null }> {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email, display_name, bio, created_at')
    .eq('id', id);

  const user = profiles?.length ? (camelcaseKeys(profiles[0]) satisfies User) : null;

  return { user, error };
}
