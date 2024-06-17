import { supabase } from '$lib/supabase';

/**
 * Uploads a file to the comments storage bucket
 * @param uid user id
 * @param file file to upload
 * @returns file path and error
 */
export async function uploadCommentFile(uid: string, file: File) {
  const path = `${uid}/${Date.now()}_${file.name}`;
  return supabase.storage.from('comments').upload(path, file);
}

/**
 * Deletes a file from the comments storage bucket
 * @param filePath path to the file to delete
 * @returns file object and error
 */
export async function deleteCommentFile(filePath: string) {
  return supabase.storage.from('comments').remove([filePath]);
}

/**
 * Gets the public URL of a file in the comments storage bucket
 * @param path path to the file
 * @returns public URL of the file
 */
export function getCommentFileUrl(path: string): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from('comments').getPublicUrl(path);
  return publicUrl;
}
