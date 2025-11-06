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

export interface UsePostComposerReturn {
  currentBlock: ContentBlock | null;
  blocks: ContentBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>;
  onSubmit: (data: FormSchema) => void;
  addBlock: (block: ContentBlock) => void;
  setCurrentBlock: React.Dispatch<React.SetStateAction<ContentBlock | null>>;
  updateBlockContent: (
    id: string | number,
    newContent: Record<string, any>
  ) => void;
  getId: () => string | number | undefined;
  updateBlock: (
    id: string | number,
    updatedFields: Partial<ContentBlock>
  ) => void;
}
