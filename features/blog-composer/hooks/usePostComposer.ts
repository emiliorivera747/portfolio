import { useState } from "react";

// Hooks
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";

// Types
import { ContentBlock } from "@/features/blogs/types/post";
import { FormSchema } from "@/features/blog-composer/schemas/composerSchemas";

interface UsePostComposerReturn {
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
}

/**
 * The hook will handle the composer state
 */
const usePostComposer = (): UsePostComposerReturn => {
  /**
   * The current block
   */
  const [currentBlock, setCurrentBlock] = useState<ContentBlock | null>(null);

  /**
   * The content blocks
   */
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  /**
   * Submits the post
   */
  const { onSubmit } = useSubmitPost({ contentBlocks: [] });
  /**
   * Add a block
   */
  const addBlock = (block: ContentBlock) => {
    setBlocks((prevBlocks) => [...prevBlocks, block]);
  };

  /**
   * Update the content of a specific block
   */
  const updateBlockContent = (
    id: string | number,
    newContent: Record<string, any>
  ) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  const getId = (): string | number | undefined => {
    return currentBlock?.id;
  };

  return {
    currentBlock,
    blocks,
    setBlocks,
    onSubmit,
    addBlock,
    setCurrentBlock,
    updateBlockContent,
    getId,
  };
};

export default usePostComposer;
