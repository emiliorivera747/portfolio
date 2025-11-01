import { useState } from "react";

// Hooks
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";

// Types
import { ContentBlock } from "@/features/blogs/types/post";

/**
 * The hook will handle the the composer state
 */
const usePostComposer = () => {
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

  const getId = () => {
    return currentBlock ? currentBlock.id : undefined;
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
