import { FormSchema } from "@/features/blog-composer/schemas/composerSchemas";
import { ContentBlock } from "@/features/blogs/types/post";

export interface PostFormProps {
  onSubmit: (data: FormSchema) => void;
  contentBlocks: ContentBlock[];
  currentBlockId?: string;
  handleEnterEditMode: (blockId: string) => void;
  addBlock: (block: ContentBlock) => void; // Ensure this updates the contentBlocks state
  setBlockId: (id: string) => void;
}
