export interface Post {
  id: number;
  user_id?: number;
  created_at: Date;
  updated_at: Date;
  description?: string;
  title?: string;
  image_url?: string;
}

export interface PostListProps{
    posts: Post[];
}