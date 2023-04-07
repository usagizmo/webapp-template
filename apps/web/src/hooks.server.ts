import { NHOST_SESSION_KEY } from '$lib/const';
import { parseSession } from '$lib/utils';
import { setSession } from '$houdini';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const session = parseSession(event.cookies.get(NHOST_SESSION_KEY));
  const token = session?.accessToken ?? null;
  setSession(event, { token });
  return await resolve(event);
};
