import { createClient, type PostgrestError } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_ANON_KEY } from '$env/static/public';
import type { Database } from './$generated/supabase-types';
import type { User } from './store.svelte';

export interface UserInputs {
  email: string;
  password: string;
  displayName?: string;
}

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_ANON_KEY);

/**
 * Sign up and log in
 * @param userInputs - The user inputs
 * @returns Whether the sign up was successful
 */
export async function signUp(userInputs: UserInputs): Promise<void> {
  const { email, password, displayName } = userInputs;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
    },
  });
  error && alert(error.message);
}

/**
 * Log in a user
 * @param userInputs - The user inputs
 * @returns - Whether the login was successful
 */
export async function logIn(userInputs: UserInputs): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword(userInputs);
  error && alert(error.message);
}

/**
 * Log out a user
 * @returns - Whether the logout was successful
 */
export async function logOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  error && alert(error.message);
}

export async function getUser(
  id: string,
): Promise<{ user: User | null; error: PostgrestError | null }> {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('email, display_name, bio')
    .eq('user_id', id);

  const user = profiles
    ? ({
        id,
        email: profiles[0].email,
        displayName: profiles[0].display_name,
        bio: profiles[0].bio,
      } satisfies User)
    : null;

  return { user, error };
}

export async function deleteComment(id: string) {
  console.log('deleteComment:', id);
  return { errors: null };
}

export async function updateUserBio(id: string, bio: string) {
  const { error } = await supabase.from('profiles').update({ bio }).eq('user_id', id);

  if (error) {
    throw error;
  }
}

export async function uploadImage(file: File): Promise<string> {
  const { data, error } = await supabase.storage
    .from('comments')
    .upload(`${Date.now()}_${file.name}`, file);
  if (error) throw error;

  return data.path;
}

export async function getImageUrl(path: string): Promise<string> {
  const {
    data: { publicUrl },
  } = await supabase.storage.from('comments').getPublicUrl(path);
  return publicUrl;
}
