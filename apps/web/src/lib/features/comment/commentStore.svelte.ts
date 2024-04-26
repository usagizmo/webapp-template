import { supabase } from '$lib/supabase';
import { userStore } from '$lib/features/user/userStore.svelte';
import type { PostgrestError } from '@supabase/supabase-js';
import { deleteCommentFile, uploadCommentFile } from './commentUtils';

export interface Comment {
  id: number;
  profiles: {
    id: string;
    display_name: string;
  } | null;
  text: string;
  file_path: string | null;
  created_at: string;
}

export const commentQuery = `
  id,
  profiles (
    id,
    display_name
  ),
  text,
  file_path,
  created_at
`;

export class CommentStore {
  #isLoading = $state(false);
  #comments = $state<Comment[]>([]);

  get comments() {
    return this.#comments;
  }

  get isLoading() {
    return this.#isLoading;
  }

  async fetchComments() {
    this.#isLoading = true;

    const { data, error } = await supabase
      .from('comments')
      .select(commentQuery)
      .order('created_at', { ascending: false });

    if (error) throw error;

    this.#comments = data;
    this.#isLoading = false;
  }

  async insertComment({ text, file }: { text: string; file: File | null }): Promise<{
    error: PostgrestError | Error | null;
  }> {
    if (!userStore.user) {
      return { error: new Error('You must be logged in to comment') };
    }

    let file_path: string | null = null;

    if (file) {
      const { data, error } = await uploadCommentFile(userStore.user.id, file);
      if (error) return { error };
      file_path = data.path;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ text, file_path, user_id: userStore.user.id }])
      .select(commentQuery);
    if (error) return { error };

    this.#comments.unshift(data[0]);
    return { error: null };
  }

  async updateComment(
    id: number,
    props: { file_path?: string | null },
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.from('comments').update(props).eq('id', id);
    if (error) return { error };

    this.#comments = this.#comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, ...props };
      }
      return comment;
    });

    return { error: null };
  }

  async deleteComment(
    id: number,
    filePath: string | null,
  ): Promise<{ error: PostgrestError | Error | null }> {
    if (filePath) {
      const { error } = await deleteCommentFile(filePath);
      if (error) return { error };
    }

    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) return { error };

    this.#comments = this.#comments.filter((comment) => comment.id !== id);
    return { error: null };
  }
}

export const commentStore = new CommentStore();
