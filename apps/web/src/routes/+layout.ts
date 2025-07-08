import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';

import type { Database } from '$api-generated/supabase-types';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { fetchUserProfile } from '$lib/helpers/supabaseHelpers';
import { supabaseStore, userStore } from '$lib/stores';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  /**
   * Declare a dependency so the layout can be invalidated, for example, on
   * session refresh.
   */
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies;
          },
        },
      });

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user exists, get the profile information
  let profile = null;
  if (user) {
    const { profile: fetchedProfile } = await fetchUserProfile(supabase, user.id);
    profile = fetchedProfile;
  }

  supabaseStore.setClient(supabase);
  userStore.setUser(user, profile);

  return { session };
};
