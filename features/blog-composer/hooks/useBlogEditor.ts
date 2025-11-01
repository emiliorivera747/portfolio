import { useState } from "react";

// External Libraries
import { useEditor } from "@tiptap/react";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";

// Config
import {
  editorConfig,
  extensions,
} from "@/features/blog-composer/config/editorConfig";

// Types
import { UseBlogEditorProps } from "@/types/editor";

/**
 *
 * Creates blog editor
 *
 */
const useBlogEditor = ({
  id,
  initialContent,
  onUpdate,
}: UseBlogEditorProps) => {
  const [blogContent, setBlogContent] = useState<string | null>(null);

  const editor = useEditor(
    {
      ...editorConfig,
      extensions: extensions,
      content: initialContent,
      autofocus: true,
      onUpdate: ({ editor }) => {
        const html = renderTipTapJSON(editor.getJSON());
        onUpdate(id, html);
      },
    },
    [id]
  );

  return { editor, blogContent };
};

export default useBlogEditor;
