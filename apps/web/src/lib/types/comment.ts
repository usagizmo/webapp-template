import type { Tables } from '$api-generated/supabase-types';

/**
 * Comment type based on the comments table from Supabase
 */
export type Comment = Tables<'comments'>;

/**
 * Comment with profile information
 */
export type CommentWithProfile = Comment & {
  profiles: {
    display_name: string;
    email: string;
  } | null;
};
