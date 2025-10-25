export interface Post {
  id?: number;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
  description?: string;
  title?: string;
  image_url?: string;
}
export interface ContentBlock {
  id?: number;
  content_order: number;
  content_type: string; 
  content_data: Record<string, any>;
  post_id?: number;
  media_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface PostWithRelations extends Post {
  User?: {
    id: number;
    name?: string;
  };
  content_blocks: ContentBlock[];
  comments?: {
    id: number;
    text: string;
    created_at: Date;
    updated_at: Date;
  }[];
  PostTag?: {
    id: number;
    tag_name: string;
  }[];
}

export interface PostListProps {
  posts: Post[];
}


export interface BlogItemContentProps {
  title?: string;
  description?: string;
  id?: string | number;
  createdAt?: Date;
}


