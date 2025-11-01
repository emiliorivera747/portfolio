import { ContentBlock } from "@/features/blogs/types/post";

export interface TextEditorBlockProps {
  block: ContentBlock;
}

export interface UseBlogEditorProps {
  id: string;
  initialContent: string;
}
