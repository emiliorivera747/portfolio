type ContentType = "image" | "video" | "doc";
export interface Post {
  id?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  title?: string;
  imageUrl?: string;
}
export interface ContentBlock {
  id: string;
  contentOrder: number;
  contentType: ContentType;
  contentData: Record<string, any>;
  postId?: number;
  mediaId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  media?: Media;
}

export interface PostWithRelations extends Post {
  User?: {
    id: number;
    name?: string;
  };
  contentBlocks: ContentBlock[];
  comments?: {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  PostTag?: {
    id: number;
    tagName: string;
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

export interface Media {
  id?: string;
  url: string;
  alt?: string;
  mediaType: ContentType;
  description?: string;
  providerAssetId: string;
  storageProvider?: "CLOUDINARY" | "S3";
  fileHash?: string;
}

export interface CommentResponse {
  id: number;
  name: string | null;
  email: string;
  content: string;
  createdAt: string;
}

export interface PostResponse {
  data: {
    id?: string;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
    title?: string;
    imageUrl?: string;
    contentBlocks?: ContentBlock[];
    User?: {
      id: number;
      name?: string;
    };
  };
  status: "success" | "error";
}
