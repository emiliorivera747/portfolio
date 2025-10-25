import { ContentBlock } from "@/features/blogs/types/post";

export interface TextEditorBlockProps {
  block: ContentBlock;
  isEditing: boolean;
  onEnterEditMode: (id: string | number) => void;
  onUpdate: (id: string | number, newContent: string) => void;
}
