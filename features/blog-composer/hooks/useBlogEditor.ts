import { useState } from "react";

// External Libraries
import { useEditor } from "@tiptap/react";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";
import DOMPurify from "dompurify";

//Config
import {
  editorConfig,
  extensions,
} from "@/features/blog-composer/config/editorConfig";

interface UseBlogEditorProps {
  id: string;
  initialContent: string;
  onUpdate: (id: string, newContent: string) => void;
}

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

  const editor = useEditor({
    ...editorConfig,
    extensions: extensions,
    content: initialContent,
    autofocus: true,
    onUpdate: ({ editor }) => {
      const html = renderTipTapJSON(editor.getJSON());
      onUpdate(id, html);
    },
  }, [id]);

  return { editor, blogContent };
};

export default useBlogEditor;
