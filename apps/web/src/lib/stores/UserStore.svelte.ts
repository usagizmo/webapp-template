import type { User } from '@supabase/supabase-js';

import type { TablesUpdate } from '$api-generated/supabase-types';
import * as supabaseHelpers from '$lib/helpers/supabaseHelpers';
import type { UserProfile } from '$lib/types/user';

import type { SupabaseStore } from './SupabaseStore.svelte';

/**
 * Integrated user store
 * Manages authentication, profile, and Stripe information in one place
 */
export class UserStore {
  #supabaseStore: SupabaseStore;
  #user = $state<User | null>(null);
  #profile = $state<UserProfile | null>(null);
  #loading = $state({
    profile: false,
  });

  constructor(supabaseStore: SupabaseStore) {
    this.#supabaseStore = supabaseStore;
  }

  readonly user = $derived<User | null>(this.#user);
  readonly profile = $derived<UserProfile | null>(this.#profile);
  readonly loading = $derived<{ profile: boolean }>(this.#loading);
  readonly isAuthenticated = $derived<boolean>(this.#user !== null);

  /**
   * Update user information
   * @param user - User information to update
   */
  setUser(user: User | null, profile: UserProfile | null) {
    this.#user = user;
    this.#profile = profile;
  }

  /**
   * Update profile information
   * @param profile - Profile information to update
   */
  setProfile(profile: UserProfile | null) {
    this.#profile = profile;
  }

  /**
   * Set loading state
   * @param type - Type of loading target
   * @param loading - Loading state
   */
  setLoading(type: 'profile', loading: boolean) {
    this.#loading[type] = loading;
  }

  /**
   * Clear all data (when logging out, etc.)
   */
  clear() {
    this.#user = null;
    this.#profile = null;
    this.#loading = { profile: false };
  }

  /**
   * User registration
   */
  async signUp(email: string, password: string, displayName: string) {
    return await supabaseHelpers.signUp(this.#supabaseStore.client, email, password, displayName);
  }

  /**
   * Sign in
   */
  async signIn(email: string, password: string) {
    return await supabaseHelpers.signIn(this.#supabaseStore.client, email, password);
  }

  /**
   * Sign out
   */
  async signOut() {
    return await supabaseHelpers.signOut(this.#supabaseStore.client);
  }

  /**
   * Fetch user profile information
   */
  async fetchUserProfile(userId: string) {
    return await supabaseHelpers.fetchUserProfile(this.#supabaseStore.client, userId);
  }

  /**
   * Update user profile information (with store update)
   */
  async updateUserProfile(updates: TablesUpdate<'profiles'>): Promise<{ error: Error | null }> {
    if (!this.#user?.id) {
      return { error: new Error('User not found') };
    }

    this.setLoading('profile', true);
    try {
      const result = await supabaseHelpers.updateUserProfile(
        this.#supabaseStore.client,
        this.#user.id,
        updates,
      );
      if (result.profile) {
        this.setProfile(result.profile);
      }
      return { error: null };
    } finally {
      this.setLoading('profile', false);
    }
  }
}
