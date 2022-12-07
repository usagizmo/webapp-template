import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import { NhostClient } from '@nhost/nhost-js';
import type { UserInputs } from 'src/routes/admin/(isNotLoggedIn)/inputs';
import { writable } from 'svelte/store';
import { tryErrorAlertOnNhostApi } from './utils';

export const nhost = new NhostClient({
  subdomain: PUBLIC_NHOST_SUBDOMAIN,
  region: PUBLIC_NHOST_REGION,
});

// FIXME: I don't know how to simply get User type
export type User = NonNullable<
  Parameters<Parameters<typeof nhost.auth.onAuthStateChanged>[0]>[1]
>['user'];

export const isLoggedIn = writable(false);
export const accessToken = writable<string | null>(null);
export const user = writable<User | null>(null);

nhost.auth.onAuthStateChanged((event, session) => {
  let _accessToken, _user;

  switch (event) {
    case 'SIGNED_IN':
      isLoggedIn.set(true);
      _accessToken = session?.accessToken;
      _user = session?.user;
      if (!_accessToken) throw new Error('accessToken is not defined');
      if (!_user) throw new Error('user is not defined');
      accessToken.set(_accessToken);
      user.set(_user);
      break;
    default:
      isLoggedIn.set(false);
      accessToken.set(null);
      user.set(null);
      break;
  }
});

export const signUp = async (inputs: UserInputs) => {
  const res = await nhost.auth.signUp(inputs);
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
