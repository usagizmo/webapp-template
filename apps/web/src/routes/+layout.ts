import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import type { Database } from 'api/types';

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
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

  supabaseStore.setClient(supabase);

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    userStore.setUser(user);

    const profileResult = await userStore.fetchUserProfile();

    if ('data' in profileResult && profileResult.data) {
      userStore.setProfile(profileResult.data);
    }
  } else {
    userStore.clear();
  }
};
