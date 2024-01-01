import { NhostClient } from '@nhost/nhost-js';
import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import type { UserInputs } from './userInputs';
import { store } from './store.svelte';

export const nhost = new NhostClient({
  subdomain: PUBLIC_NHOST_SUBDOMAIN,
  region: PUBLIC_NHOST_REGION,
});

nhost.auth.onAuthStateChanged((_, session) => {
  store.setUser(session?.user ?? null);
});

/**
 * Sign up and log in
 * @param userInputs - The user inputs
 * @returns Whether the sign up was successful
 */
export async function signUp(userInputs: UserInputs): Promise<void> {
  const { email, password, displayName } = userInputs;
  const { error } = await nhost.auth.signUp({
    email,
    password,
    options: {
      displayName,
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
  const { error } = await nhost.auth.signIn(userInputs);
  error && alert(error.message);
}

/**
 * Log out a user
 * @returns - Whether the logout was successful
 */
export async function logOut(): Promise<void> {
  const { error } = await nhost.auth.signOut();
  error && alert(error.message);
}
