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
 * @param {NhostSession} session
 * @returns {void}
 */
const setNhostSessionInCookie = (session) => {
  const expires = new Date();
  // Expire the cookie 60 seconds before the token expires
  expires.setSeconds(expires.getSeconds() + session.accessTokenExpiresIn - 60);
  Cookies.set(NHOST_SESSION_KEY, JSON.stringify(session), {
    sameSite: 'strict',
    expires,
  });
};

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
 * @param {import('./userInputs').UserInputs} userInputs
 * @returns {Promise<void>}
 */
export const signUp = async ({ email, password, displayName }) => {
  const res = await nhost.auth.signUp({
    email,
    password,
    options: {
      displayName,
    },
  });
  tryErrorAlertOnNhostApi(res);
};

/**
 * @param {import('./userInputs').UserInputs} userInputs
 * @returns {Promise<boolean>}
 */
export const logIn = async (userInputs) => {
  const res = await nhost.auth.signIn(userInputs);
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
};

/**
 * @returns {Promise<boolean>}
 */
export const logOut = async () => {
  const res = await nhost.auth.signOut();
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
};
