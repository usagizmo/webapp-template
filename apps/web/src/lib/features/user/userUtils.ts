import type { PostgrestError } from '@supabase/supabase-js';
import type { User } from './userStore.svelte';
import { supabase } from '../../supabaseClient';

export async function getUser(
  id: string,
): Promise<{ user: User | null; error: PostgrestError | null }> {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('email, display_name, bio')
    .eq('id', id);

  const user = profiles?.length
    ? ({
        id,
        email: profiles[0].email,
        displayName: profiles[0].display_name,
        bio: profiles[0].bio,
      } satisfies User)
    : null;

  return { user, error };
}
