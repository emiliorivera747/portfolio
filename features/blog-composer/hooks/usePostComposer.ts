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
   * The current block content data
   */
  const [currentBlockData, setCurrentBlockData] = useState({
    type: "paragraph",
    attrs: { textAlign: null },
    content: [],
  });

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

  return {
    currentBlockId,
    currentBlockData,
    setCurrentBlockData,
    setCurrentBlockId,
    blocks,
    setBlocks,
    onSubmit,
    handleEnterEditMode,
    addBlock,
    handleBlockId,
    updateBlockContent,
  };
};

export default usePostComposer;
