import type { Handle } from '@sveltejs/kit';
import { NHOST_SESSION_KEY } from '$lib/const';
import { parseSession } from '$lib/utils';
import { nhost } from '$lib/nhost';
import { store } from '$lib/store.svelte';

export const handle: Handle = async ({ event, resolve }) => {
  const session = parseSession(event.cookies.get(NHOST_SESSION_KEY));

  if (session) {
    store.setUser(session.user);
    nhost.graphql.setAccessToken(session.accessToken);
  }

  return await resolve(event);
};
