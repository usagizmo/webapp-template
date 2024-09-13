import type { PostgrestError } from '@supabase/supabase-js';
import snakecaseKeys from 'snakecase-keys';

import { supabase } from '$lib/supabase';

export type User = {
  id: string;
  email: string;
  displayName: string;
  bio: string;
  createdAt: string;
};

class UserStore {
  #user = $state<User | null>(null);

  /**
   * Get the user
   * @returns The user
   */
  get user(): User | null {
    return this.#user;
  }

  /**
   * Set the user
   */
  set user(user: User | null) {
    this.#user = user;
  }

  async updateUser(
    id: string,
    props: Partial<Pick<User, 'bio'>>,
  ): Promise<{ error: PostgrestError | Error | null }> {
    if (!this.#user) return { error: new Error('You must be logged in to update your profile') };

    // NOTE: $state.snapshot is used to get the current value of the reactive variable
    const plainSnakeProps = snakecaseKeys($state.snapshot(props));
    const { error } = await supabase.from('profiles').update(plainSnakeProps).eq('id', id);
    if (error) return { error };

    this.#user = { ...this.#user, ...props };

    return { error: null };
  }
}

export const userStore = new UserStore();
