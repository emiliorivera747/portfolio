import { createContext, ReactNode, useContext } from "react";

const ComposerContext = createContext<any>(null);

/**
 *  Stores all of the state for the Composer Context Provider
 */
export const ComposeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ComposerContext.Provider value={}>{children}</ComposerContext.Provider>
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
