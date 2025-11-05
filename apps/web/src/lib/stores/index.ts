/**
 * Store entry point (singleton instances)
 * For component-scoped state, use LocalStore from `./local/`
 */
import { CommentStore } from './CommentStore.svelte';
import { SupabaseStore } from './SupabaseStore.svelte';
import { UserStore } from './UserStore.svelte';

// Create store instances (singletons)
export const supabaseStore = new SupabaseStore();
export const userStore = new UserStore(supabaseStore);
export const commentStore = new CommentStore(supabaseStore, userStore);
