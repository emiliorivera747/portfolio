import { ContentBlock } from "@/features/blogs/types/post";


export interface TextEditorBlock {
  block: ContentBlock;
  isEditing: boolean;
  onEnterEditMode: (id: string) => void;
  onUpdate: (id: string, newContent: string) => void;
}
