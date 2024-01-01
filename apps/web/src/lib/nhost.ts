import { NhostClient } from '@nhost/nhost-js';
import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import { tryErrorAlertOnNhostApi } from './utils';
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
  const res = await nhost.auth.signUp({
    email,
    password,
    options: {
      displayName,
    },
  });
  tryErrorAlertOnNhostApi(res);
}

/**
 * Log in a user
 * @param userInputs - The user inputs
 * @returns - Whether the login was successful
 */
export async function logIn(userInputs: UserInputs): Promise<boolean> {
  const res = await nhost.auth.signIn(userInputs);
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
}

/**
 * Log out a user
 * @returns - Whether the logout was successful
 */
export async function logOut(): Promise<boolean> {
  const res = await nhost.auth.signOut();
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
}
