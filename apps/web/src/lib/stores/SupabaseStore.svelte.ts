import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '$api-generated/supabase-types';

/**
 * Global Supabase client store
 * Sets the client received from the server in +layout.svelte,
 * and components access the client through this store
 */
export class SupabaseStore {
  #client = $state<SupabaseClient<Database> | null>(null);

  get client(): SupabaseClient<Database> {
    if (!this.#client) {
      throw new Error('Supabase client not initialized. Make sure layout load has completed.');
    }
    return this.#client;
  }

  setClient(client: SupabaseClient<Database>) {
    this.#client = client;
  }
}
