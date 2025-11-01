import { useState } from "react";

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
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const { updateBlockContent, setCurrentBlockData } = useComposerContext();

  const editor = useEditor(
    {
      ...editorConfig,
      extensions: extensions,
      content: initialContent,
      autofocus: true,
      onUpdate: ({ editor }) => {
        setCurrentBlockData(editor.getJSON());
      },
    },
    [id]
  );

  return { editor, blogContent };
};

export default useBlogEditor;
