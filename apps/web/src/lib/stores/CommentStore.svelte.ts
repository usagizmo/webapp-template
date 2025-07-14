import * as commentHelpers from '$lib/helpers/commentHelpers';
import type { CommentWithProfile } from '$lib/types/comment';

import type { SupabaseStore } from './SupabaseStore.svelte';
import type { UserStore } from './UserStore.svelte';

/**
 * Comment store
 * Manages comment data and operations
 */
export class CommentStore {
  #supabaseStore: SupabaseStore;
  #userStore: UserStore;
  #comments = $state<CommentWithProfile[]>([]);

  constructor(supabaseStore: SupabaseStore, userStore: UserStore) {
    this.#supabaseStore = supabaseStore;
    this.#userStore = userStore;
  }

  readonly comments = $derived<CommentWithProfile[]>(this.#comments);

  /**
   * Set comments
   * @param comments - Comments to set
   */
  setComments(comments: CommentWithProfile[]) {
    this.#comments = comments;
  }

  /**
   * Load comments
   */
  async loadComments() {
    const result = await commentHelpers.fetchComments(this.#supabaseStore.client);
    if (result.comments) {
      this.setComments(result.comments);
    }
    return result;
  }

  /**
   * Insert a comment (with store update)
   * @param text - Comment text
   * @param file - Optional file attachment
   */
  async insertComment(text: string, file?: File) {
    if (!this.#userStore.user) {
      return { error: new Error('User not logged in') };
    }

    const result = await commentHelpers.insertComment(
      this.#supabaseStore.client,
      this.#userStore.user.id,
      text,
      file,
    );

    // Refresh comments after successful insert
    if (!result.error) {
      await this.loadComments();
    }

    return result;
  }

  /**
   * Update a comment (with store update)
   * @param commentId - Comment ID
   * @param updates - Comment updates
   */
  async updateComment(
    commentId: number,
    updates: Partial<Pick<CommentWithProfile, 'text' | 'file_path'>>,
  ) {
    const result = await commentHelpers.updateComment(
      this.#supabaseStore.client,
      commentId,
      updates,
    );

    // Refresh comments after successful update
    if (!result.error) {
      await this.loadComments();
    }

    return result;
  }

  /**
   * Delete a comment (with store update)
   * @param commentId - Comment ID
   */
  async deleteComment(commentId: number) {
    const result = await commentHelpers.deleteComment(this.#supabaseStore.client, commentId);

    // Refresh comments after successful delete
    if (!result.error) {
      await this.loadComments();
    }

    return result;
  }

  /**
   * Delete a comment file from storage
   * @param filePath - File path in storage
   */
  async deleteCommentFile(filePath: string) {
    return await commentHelpers.deleteCommentFile(this.#supabaseStore.client, filePath);
  }

  /**
   * Get comment file URL
   * @param filePath - File path in storage
   * @returns Comment file URL
   */
  getCommentFileUrl(filePath: string): string {
    return commentHelpers.getCommentFileUrl(this.#supabaseStore.client, filePath);
  }
}
