import { useState, useEffect } from "react";

// External Libraries
import { useEditor } from "@tiptap/react";

// Config
import {
  editorConfig,
  extensions,
} from "@/features/blog-composer/config/editorConfig";

// Types
import { UseBlogEditorProps } from "@/types/editor";

// Context
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

/**
 *
 * Creates blog editor
 *
 */
const useBlogEditor = ({ id, initialContent }: UseBlogEditorProps) => {
  const { updateBlockContent } = useComposerContext();

  const editor = useEditor(
    {
      ...editorConfig,
      extensions: extensions,
      content: initialContent,
      autofocus: true,
      onUpdate: ({ editor }) => {
        updateBlockContent(id, editor.getJSON());
      },
    },
    [id]
  );

  useEffect(() => {
    if (initialContent && editor) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  return { editor};
};

export default useBlogEditor;
