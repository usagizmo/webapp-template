import { NHOST_SESSION_KEY } from '$lib/const';
import { parseSession } from '$lib/utils';
import { setSession } from '$houdini';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const session = parseSession(event.cookies.get(NHOST_SESSION_KEY));
  const token = session?.accessToken ?? null;
  setSession(event, { token });
  return await resolve(event);
}
