import { createContext, ReactNode, useContext } from "react";

// Hook
import usePostComposer from "@/features/blog-composer/hooks/usePostComposer";
import { UsePostComposerReturn } from "../types/postForm";
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";

const initialContextValue: UsePostComposerReturn & { onSubmit: any } = {
  blocks: [],
  currentBlock: null,
  setBlocks: () => {},
  addBlock: () => {},
  setCurrentBlock: () => {},
  updateBlockContent: () => {},
  getId: () => undefined,
  updateBlock: () => {},
  handleFileChange: () => {},
  onSubmit: () => {
    console.warn("onSubmit called outside of a Provider!");
  },
};

const ComposerContext = createContext<UsePostComposerReturn>(
  initialContextValue as UsePostComposerReturn
);

/**
 *  Stores all of the state for the Composer Context Provider
 */
export const ComposerProvider = ({ children }: { children: ReactNode }) => {
  
  const {
    blocks,
    addBlock,
    updateBlock,
    updateBlockContent,
    currentBlock,
    setCurrentBlock,
    handleFileChange,
    setBlocks,
    getId,
    onSubmit,
  } = usePostComposer();

  return (
    <ComposerContext.Provider
      value={{
        blocks,
        addBlock,
        updateBlock,
        updateBlockContent,
        currentBlock,
        setCurrentBlock,
        setBlocks,
        getId,
        onSubmit,
        handleFileChange,
      }}
    >
      {children}
    </ComposerContext.Provider>
  );
};

/**
 * Allows you to access the context
 */
export const useComposerContext = () => {
  const context = useContext(ComposerContext);

  if (!context)
    throw new Error(
      "useComposer Context must be used within a composer provider"
    );

  return context;
};
