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

const useBlogEditor = () => {
  const [blogContent, setBlogContent] = useState<string | null>(null);

  const editor = useEditor({
    ...editorConfig,
    extensions: extensions,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = renderTipTapJSON(json);
      setBlogContent(
        DOMPurify.sanitize(html, {
          ADD_TAGS: ["h1", "h2", "h3", "h4", "h5", "h6"],
          ADD_ATTR: ["class", "style"],
        })
      );
    },
  });
  return { editor, blogContent };
};

export default useBlogEditor;
