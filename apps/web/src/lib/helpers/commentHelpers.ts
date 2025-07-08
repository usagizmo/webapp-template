/**
 * Comment helper functions
 */
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '$api-generated/supabase-types';
import type { Comment, CommentWithProfile } from '$lib/types/comment';

/**
 * Insert a new comment
 * @param supabase - Supabase client
 * @param userId - User ID
 * @param text - Comment text
 * @param file - Optional file attachment
 * @returns Promise with error if there is an error
 */
export async function insertComment(
  supabase: SupabaseClient<Database>,
  userId: string,
  text: string,
  file?: File,
): Promise<{ error: unknown | null }> {
  let filePath: string | null = null;

  // If file is provided, upload it to storage
  if (file) {
    const fileName = `${userId}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('comments')
      .upload(fileName, file);

    if (uploadError) {
      return { error: uploadError };
    }

    filePath = uploadData.path;
  }

  // Insert comment
  const { error } = await supabase.from('comments').insert({
    user_id: userId,
    text,
    file_path: filePath,
  });

  return { error };
}

/**
 * Fetch comments
 * @param supabase - Supabase client
 * @returns Promise with comments and error if there is an error
 */
export async function fetchComments(
  supabase: SupabaseClient<Database>,
): Promise<{ comments: CommentWithProfile[] | null; error: unknown | null }> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(
        `
        *,
        profiles:user_id (
          display_name,
          email
        )
      `,
      )
      .order('created_at', { ascending: false });

    if (error) {
      return { comments: null, error };
    }

    return { comments: data, error: null };
  } catch (error) {
    return { comments: null, error };
  }
}

/**
 * Update a comment
 * @param supabase - Supabase client
 * @param commentId - Comment ID
 * @param updates - Comment updates
 * @returns Promise with error if there is an error
 */
export async function updateComment(
  supabase: SupabaseClient<Database>,
  commentId: number,
  updates: Partial<Pick<Comment, 'text' | 'file_path'>>,
): Promise<{ error: unknown | null }> {
  const { error } = await supabase.from('comments').update(updates).eq('id', commentId);
  return { error };
}

/**
 * Delete a comment
 * @param supabase - Supabase client
 * @param commentId - Comment ID
 * @returns Promise with error if there is an error
 */
export async function deleteComment(
  supabase: SupabaseClient<Database>,
  commentId: number,
): Promise<{ error: unknown | null }> {
  const { error } = await supabase.from('comments').delete().eq('id', commentId);
  return { error };
}

/**
 * Delete a comment file from storage
 * @param supabase - Supabase client
 * @param filePath - File path in storage
 * @returns Promise with error if there is an error
 */
export async function deleteCommentFile(
  supabase: SupabaseClient<Database>,
  filePath: string,
): Promise<{ error: unknown | null }> {
  const { error } = await supabase.storage.from('comments').remove([filePath]);
  return { error };
}

/**
 * Get comment file URL
 * @param supabase - Supabase client
 * @param filePath - File path in storage
 * @returns Public URL for the file
 */
export function getCommentFileUrl(supabase: SupabaseClient<Database>, filePath: string): string {
  const { data } = supabase.storage.from('comments').getPublicUrl(filePath);
  return data.publicUrl;
}
