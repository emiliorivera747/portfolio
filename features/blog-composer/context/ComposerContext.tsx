import { createContext, ReactNode, useContext } from "react";

// Hook
import usePostComposer from "@/features/blog-composer/hooks/usePostComposer";
import { UsePostComposerReturn } from "../types/postForm";

const ComposerContext = createContext<UsePostComposerReturn>(
  {} as UsePostComposerReturn
);

/**
 *  Stores all of the state for the Composer Context Provider
 */
export const ComposerProvider = ({ children }: { children: ReactNode }) => {
  const composerState = usePostComposer();
  return (
    <ComposerContext.Provider value={composerState}>
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
