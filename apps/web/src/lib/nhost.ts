import { NhostClient } from '@nhost/nhost-js';
import type { NhostSession } from '@nhost/nhost-js';
import Cookies from 'js-cookie';
import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import { NHOST_SESSION_KEY } from './const';
import { tryErrorAlertOnNhostApi } from './utils';
import type { UserInputs } from './userInputs';
import { store } from './store.svelte';

export const nhost = new NhostClient({
  subdomain: PUBLIC_NHOST_SUBDOMAIN,
  region: PUBLIC_NHOST_REGION,
});

let hasAlreadyAuthStateChanged = false;

/**
 * Set the Nhost session in a cookie
 * @param session - The session to set in the cookie
 */
function setNhostSessionInCookie(session: NhostSession): void {
  const expires = new Date();
  // Expire the cookie 60 seconds before the token expires
  expires.setSeconds(expires.getSeconds() + session.accessTokenExpiresIn - 60);
  Cookies.set(NHOST_SESSION_KEY, JSON.stringify(session), {
    sameSite: 'strict',
    expires,
  });
}

nhost.auth.onAuthStateChanged((_, session) => {
  if (session) {
    setNhostSessionInCookie(session);
  } else {
    Cookies.remove(NHOST_SESSION_KEY);
  }

  if (hasAlreadyAuthStateChanged) {
    window.location.reload();
    return;
  }

  store.setUser(session?.user ?? null);
  hasAlreadyAuthStateChanged = true;
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
