/**
 * Comment helper functions
 */
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '$api-generated/supabase-types';

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
