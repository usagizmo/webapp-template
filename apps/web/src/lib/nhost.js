import { NhostClient } from '@nhost/nhost-js';
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';
import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import { NHOST_SESSION_KEY } from './const';
import { parseSession, tryErrorAlertOnNhostApi } from './utils';

/**
 * @typedef {import('@nhost/nhost-js').NhostSession} NhostSession
 */

export const nhost = new NhostClient({
  subdomain: PUBLIC_NHOST_SUBDOMAIN,
  region: PUBLIC_NHOST_REGION,
});

const session = parseSession(Cookies.get(NHOST_SESSION_KEY));
export const user = writable(session?.user ?? null);

let hasAlreadyAuthStateChanged = false;

/**
 * Set the Nhost session in a cookie
 * @param {NhostSession} session - The session to set in the cookie
 */
function setNhostSessionInCookie(session) {
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

  user.set(session?.user ?? null);
  hasAlreadyAuthStateChanged = true;
});

/**
 * Sign up and log in
 * @param {import('./userInputs').UserInputs} userInputs - The user inputs
 * @returns {Promise<void>}
 */
export async function signUp({ email, password, displayName }) {
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
 * @param {import('./userInputs').UserInputs} userInputs - The user inputs
 * @returns {Promise<boolean>} - Whether the login was successful
 */
export async function logIn(userInputs) {
  const res = await nhost.auth.signIn(userInputs);
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
}

/**
 * Log out a user
 * @returns {Promise<boolean>} - Whether the logout was successful
 */
export async function logOut() {
  const res = await nhost.auth.signOut();
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
}
