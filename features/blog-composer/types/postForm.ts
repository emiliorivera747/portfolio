import { FormSchema } from "@/features/blog-composer/schemas/composerSchemas";
import { ContentBlock } from "@/features/blogs/types/post";

export interface PostFormProps {
  onSubmit: (data: FormSchema) => void;
  contentBlocks: ContentBlock[];
  currentBlockId?: string;
  handleEnterEditMode: (blockId: string) => void;
  addBlock: (block: ContentBlock) => void;
  setBlockId: (id: string) => void;
}

export interface UseBlogEditorProps {
  id: string;
  initialContent: string;
  onUpdate: (id: string, newContent: string) => void;
}
