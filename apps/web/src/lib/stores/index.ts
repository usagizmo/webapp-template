/**
 * Unified entry point for the store layer
 */
import { CommentStore } from './CommentStore.svelte';
import { SupabaseStore } from './SupabaseStore.svelte';
import { UserStore } from './UserStore.svelte';

// Create store instances
export const supabaseStore = new SupabaseStore();
export const userStore = new UserStore(supabaseStore);
export const commentStore = new CommentStore(supabaseStore, userStore);
