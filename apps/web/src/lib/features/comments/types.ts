export interface Comment {
  id: string;
  user_id: string;
  profiles: {
    id: string;
    display_name: string;
  };
  text: string;
  file_path: string | null;
  created_at: string;
}
