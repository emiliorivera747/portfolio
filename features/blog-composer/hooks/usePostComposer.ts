import { useState } from "react";

// Hooks
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";
import useFile from "@/hooks/useFile";

// Types
import { ContentBlock } from "@/features/blogs/types/post";
import { UsePostComposerReturn } from "@/features/blog-composer/types/postForm";

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

  // /**
  //  * Submits the post
  //  */
  const { onSubmit } = useSubmitPost({ blocks });

  /**
   * Add a block
   */
  const addBlock = (block: ContentBlock) => {
    setBlocks((prevBlocks) => [...prevBlocks, block]);
  };

  const { handleFileChange, file } = useFile();

  /**
   *
   */
  const updateBlock = (
    id: string | number,
    updatedFields: Partial<ContentBlock>
  ) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((blk) => {
        if (blk.id !== id) return blk;
        return { ...blk, ...updatedFields } as ContentBlock;
      })
    );
  };

  /**
   * Update only `content_data` of a block by ID
   */
  const updateBlockContent = (
    id: string | number,
    contentData: Record<string, any>
  ) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content_data: contentData } : block
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
    addBlock,
    setCurrentBlock,
    updateBlockContent,
    getId,
    updateBlock,
    handleFileChange,
    onSubmit,
  };
};

export default usePostComposer;
