import type { Handle } from '@sveltejs/kit';
import { setSession } from '$houdini';
import { parseSession } from '$lib/utils';
import { NHOST_SESSION_KEY } from '$lib/const';

export const handle: Handle = async ({ event, resolve }) => {
  const session = parseSession(event.cookies.get(NHOST_SESSION_KEY));
  const token = session?.accessToken ?? null;
  setSession(event, { token });

  const response = await resolve(event);
  return response;
};
