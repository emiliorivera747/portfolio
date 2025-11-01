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
   * The current block being highlighted
   */
  const [currentBlockId, setCurrentBlockId] = useState<number | string>(0);

  /**
   * The content blocks
   */
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  /**
   * Submits the post
   */
  const { onSubmit } = useSubmitPost({ contentBlocks: [] });

  const handleEnterEditMode = (id: string) => {
    setCurrentBlockId(id);
  };

  const addBlock = (block: ContentBlock) => {
    setBlocks((prevBlocks) => [...prevBlocks, block]);
  };

  const handleBlockId = (id: string) => {
    setCurrentBlockId(id);
  };

  return {
    currentBlockId,
    setCurrentBlockId,
    blocks,
    setBlocks,
    onSubmit,
    handleEnterEditMode,
    addBlock,
    handleBlockId,
  };
};

export default usePostComposer;
