import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_ANON_KEY } from '$env/static/public';

export interface UserInputs {
  email: string;
  password: string;
  displayName?: string;
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_ANON_KEY);

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
