import { PUBLIC_NHOST_SUBDOMAIN, PUBLIC_NHOST_REGION } from '$env/static/public';
import { NhostClient } from '@nhost/nhost-js';
import type { UserInputs } from 'src/routes/admin/(isNotLoggedIn)/inputs';
import { writable } from 'svelte/store';

export const nhost = new NhostClient({
  subdomain: PUBLIC_NHOST_SUBDOMAIN,
  region: PUBLIC_NHOST_REGION,
});

// FIXME: I don't know how to simply get User type
export type User = NonNullable<
  Parameters<Parameters<typeof nhost.auth.onAuthStateChanged>[0]>[1]
>['user'];

export const isLoggedIn = writable(false);
export const user = writable<User | null>(null);

nhost.auth.onAuthStateChanged((event, session) => {
  let _user;

  switch (event) {
    case 'SIGNED_IN':
      isLoggedIn.set(true);
      _user = session?.user;
      if (!_user) throw new Error('User is not defined');
      user.set(_user);
      break;
    default:
      isLoggedIn.set(false);
      user.set(null);
      break;
  }
});

export const signUp = async (inputs: UserInputs) => {
  await nhost.auth.signUp(inputs);
};

export const logIn = async (inputs: UserInputs) => {
  await nhost.auth.signIn(inputs);
};

export const logOut = async () => {
  await nhost.auth.signOut();
};
