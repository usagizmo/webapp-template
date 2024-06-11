import type { PostgrestError } from '@supabase/supabase-js';
import type { CamelCasedProperties } from 'type-fest';
import camelcaseKeys from 'camelcase-keys';
import { supabase } from '$lib/supabaseClient';
import type { Tables } from '$lib/$generated/supabase-types';

type DBProfiles = Tables<'profiles'>;

export type User = CamelCasedProperties<DBProfiles>;

export interface UserInputs {
  email: string;
  password: string;
  displayName?: string;
}

const baseUserInputs = {
  displayName: 'Guest',
  email: 'email@add.com',
  password: 'password0',
} satisfies UserInputs;

class UserStore {
  #user = $state<User | null>(null);
  #userInputs = $state<UserInputs>(baseUserInputs);

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
    props: Partial<Omit<DBProfiles, 'id'>>,
  ): Promise<{ error: PostgrestError | Error | null }> {
    if (!this.#user) return { error: new Error('You must be logged in to update your profile') };

    const { error } = await supabase.from('profiles').update(props).eq('id', id);
    if (error) return { error };

    this.#user = { ...this.#user, ...camelcaseKeys(props) };

    return { error: null };
  }

  /**
   * Get the user inputs
   * @returns The user inputs
   */
  get userInputs(): UserInputs {
    return this.#userInputs;
  }

  /**
   * Update the user inputs
   * @param userInputs - The user inputs
   */
  updateUserInputs(userInputs: Partial<UserInputs>): void {
    this.#userInputs = { ...this.#userInputs, ...userInputs };
  }

  /**
   * Sign up and log in
   * @param userInputs - The user inputs
   */
  async signUp(): Promise<void> {
    const { email, password, displayName } = this.#userInputs;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });
    error && alert(error.message);
  }

  /**
   * Log in a user
   */
  async logIn(): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword(this.#userInputs);
    error && alert(error.message);
  }

  /**
   * Log out a user
   */
  async logOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    error && alert(error.message);
  }
}

export const userStore = new UserStore();
