import React from "react";
import MenuBar from "@/components/tiptap/MenuBar";
import RichTextEditor from "@/components/tiptap/RichTextEditor";

// Hooks
import useBlogEditor from "@/features/blog-composer/hooks/useBlogEditor";

// Types
import { UseBlogEditorProps } from "@/types/editor";

/**
 * Displays the editor with both menu bar and rich text editor
 *
 */
const EditorWithMenu = ({
  id,
  initialContent,
  onUpdate,
}: UseBlogEditorProps) => {
  
  const { editor, blogContent } = useBlogEditor({
    id,
    initialContent,
    onUpdate,
  });
  
  if (!editor) return null;

  return (
    <div className="w-full mb-8">
      <MenuBar editor={editor} />
      <RichTextEditor editor={editor} />
    </div>
  );
};

export default EditorWithMenu;
