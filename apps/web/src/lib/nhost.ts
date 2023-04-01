import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import { NhostClient } from '@nhost/nhost-js';
import { writable } from 'svelte/store';
import Cookies from 'js-cookie';
import { parseSession, tryErrorAlertOnNhostApi } from './utils';
import { NHOST_SESSION_KEY } from './const';
import type { UserInputs } from '../routes/admin/(isNotLoggedIn)/inputs';

export const nhost = new NhostClient({
  subdomain: PUBLIC_NHOST_SUBDOMAIN,
  region: PUBLIC_NHOST_REGION,
});

export type NhostSession = NonNullable<
  Parameters<Parameters<typeof nhost.auth.onAuthStateChanged>[0]>[1]
>;
export type User = NhostSession['user'];

const session = parseSession(Cookies.get(NHOST_SESSION_KEY));
export const user = writable<User | null>(session?.user ?? null);

// Reload the page to apply the session when the login state changes
let hasAlreadyAuthStateChanged = false;

const setNhostSessionInCookie = (session: NhostSession) => {
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

export const signUp = async ({ email, password, displayName }: UserInputs) => {
  const res = await nhost.auth.signUp({
    email,
    password,
    options: {
      displayName,
    },
  });
  tryErrorAlertOnNhostApi(res);
};

export const logIn = async (inputs: UserInputs): Promise<boolean> => {
  const res = await nhost.auth.signIn(inputs);
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
};

export const logOut = async (): Promise<boolean> => {
  const res = await nhost.auth.signOut();
  const hasError = tryErrorAlertOnNhostApi(res);
  return !hasError;
};
