import { NHOST_SESSION_KEY } from '$lib/const';
import { parseSession } from '$lib/utils';
import { setSession } from '$houdini';

/** @typedef {import('@sveltejs/kit').Handle} Handle */
export const handle = async ({ event, resolve }) => {
  const session = parseSession(event.cookies.get(NHOST_SESSION_KEY));
  const token = session?.accessToken ?? null;
  setSession(event, { token });
  return await resolve(event);
};
