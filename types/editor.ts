import { ContentBlock } from "@/features/blogs/types/post";

export interface TextEditorBlockProps {
  block: ContentBlock;
  isEditing: boolean;
  onEnterEditMode: (id: string) => void;
  onUpdate: (id: string, newContent: string) => void;
}
