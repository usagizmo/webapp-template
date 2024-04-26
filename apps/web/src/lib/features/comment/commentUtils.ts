import { supabase } from '$lib/supabase';

export async function uploadCommentFile(uid: string, file: File) {
  const path = `${uid}/${Date.now()}_${file.name}`;
  return supabase.storage.from('comments').upload(path, file);
}

export async function deleteCommentFile(filePath: string) {
  return supabase.storage.from('comments').remove([filePath]);
}

export function getCommentFileUrl(path: string): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from('comments').getPublicUrl(path);
  return publicUrl;
}
