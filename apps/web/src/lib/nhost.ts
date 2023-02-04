import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import { NhostClient } from '@nhost/nhost-js';
import { writable } from 'svelte/store';
import Cookies from 'js-cookie';
import { parseSession, tryErrorAlertOnNhostApi } from './utils';
import { NHOST_SESSION_KEY } from './const';
import type { UserInputs } from 'src/routes/admin/(isNotLoggedIn)/inputs';

export const nhost = new NhostClient({
  subdomain: PUBLIC_NHOST_SUBDOMAIN,
  region: PUBLIC_NHOST_REGION,
});

export type NhostSession = NonNullable<
  Parameters<Parameters<typeof nhost.auth.onAuthStateChanged>[0]>[1]
>;
export type User = NhostSession['user'];

const session = parseSession(Cookies.get(NHOST_SESSION_KEY));

export const isLoggedIn = writable(!!session);
export const accessToken = writable<string | null>(session?.accessToken ?? null);
export const user = writable<User | null>(session?.user ?? null);

const setNhostSessionInCookie = (session: NhostSession) => {
  const expires = new Date();
  // Expire the cookie 60 seconds before the token expires
  expires.setSeconds(expires.getSeconds() + session.accessTokenExpiresIn - 60);
  Cookies.set(NHOST_SESSION_KEY, JSON.stringify(session), {
    sameSite: 'strict',
    expires,
  });
};

nhost.auth.onAuthStateChanged((event, session) => {
  switch (event) {
    case 'SIGNED_IN':
      if (!session) {
        Cookies.remove(NHOST_SESSION_KEY);
        throw new Error('session is not defined');
      }
      setNhostSessionInCookie(session);
      isLoggedIn.set(true);
      accessToken.set(session.accessToken);
      user.set(session.user);
      break;
    default:
      Cookies.remove(NHOST_SESSION_KEY);
      isLoggedIn.set(false);
      accessToken.set(null);
      user.set(null);
      break;
  }
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

export const logIn = async (inputs: UserInputs) => {
  const res = await nhost.auth.signIn(inputs);
  tryErrorAlertOnNhostApi(res);
};

export const logOut = async () => {
  const res = await nhost.auth.signOut();
  tryErrorAlertOnNhostApi(res);
};
