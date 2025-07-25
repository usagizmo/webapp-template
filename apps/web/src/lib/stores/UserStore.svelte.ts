import type { RealtimeChannel, User } from '@supabase/supabase-js';

import type { TablesUpdate } from '$api-generated/supabase-types';
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
  setUser(user: User | null) {
    this.#user = user;
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
    return await this.#supabaseStore.client.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });
  }

  /**
   * Sign in
   */
  async signIn(email: string, password: string) {
    return await this.#supabaseStore.client.auth.signInWithPassword({
      email,
      password,
    });
  }

  /**
   * Sign out
   */
  async signOut() {
    return await this.#supabaseStore.client.auth.signOut();
  }

  /**
   * Fetch user profile information
   */
  async fetchUserProfile() {
    if (!this.#user?.id) {
      return { data: null, error: new Error('User not found') };
    }
    return await this.#supabaseStore.client
      .from('profiles')
      .select('*')
      .eq('id', this.#user.id)
      .single();
  }

  /**
   * Update user profile information (with store update)
   */
  async updateUserProfile(updates: TablesUpdate<'profiles'>) {
    if (!this.#user?.id) {
      return { error: new Error('User not found') };
    }

    this.setLoading('profile', true);
    try {
      const result = await this.#supabaseStore.client
        .from('profiles')
        .update(updates)
        .eq('id', this.#user.id);
      if (result.data) {
        this.setProfile(result.data);
      }
      return result;
    } finally {
      this.setLoading('profile', false);
    }
  }

  /**
   * Subscribe to updates (realtime)
   * @returns Cleanup function
   */
  subscribeToUpdates(): () => void {
    if (!this.#user?.id) return () => {};

    const channels: RealtimeChannel[] = [];

    // Profile updates
    channels.push(
      this.#supabaseStore.client
        .channel(`user-profile:${this.#user.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'profiles',
            filter: `id=eq.${this.#user.id}`,
          },
          (payload) => {
            console.debug('Profile updated:', payload);
            if (payload.eventType !== 'DELETE' && payload.new) {
              this.setProfile(payload.new as UserProfile);
            }
          },
        )
        .subscribe(),
    );

    return () => channels.forEach((channel) => channel.unsubscribe());
  }
}
