import type { PostgrestError } from '@supabase/supabase-js';

import { supabase } from '../../supabaseClient';
import type { User } from './userStore.svelte';

export async function getUser(
  id: string,
): Promise<{ user: User | null; error: PostgrestError | null }> {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('email, display_name, bio, created_at')
    .eq('id', id);

  const user = profiles?.length
    ? ({
        id,
        email: profiles[0].email,
        displayName: profiles[0].display_name,
        bio: profiles[0].bio,
        createdAt: profiles[0].created_at,
      } satisfies User)
    : null;

  return { user, error };
}
