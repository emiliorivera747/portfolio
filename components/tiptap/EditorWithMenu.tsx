import React from "react";
import MenuBar from "@/components/tiptap/MenuBar";
import RichTextEditor from "@/components/tiptap/RichTextEditor";

// Hooks
import useBlogEditor from "@/features/blog-composer/hooks/useBlogEditor";


interface UseBlogEditorProps {
    id: string;
    initialContent: string;
    onUpdate: (id: string, newContent: string) => void;
  }
/**
 * Displays the editor with both menu bar and rich text editor
 *
 * @param param0
 * @returns
 */
const EditorWithMenu = ({
    id,
    initialContent,
    onUpdate,
  }: UseBlogEditorProps) => {
  const { editor, blogContent } = useBlogEditor({ id: id, initialContent: initialContent, onUpdate: onUpdate });
  if (!editor) return null;

  return (
    <div className="w-full mb-8">
      <MenuBar editor={editor} />
      <RichTextEditor editor={editor} />
    </div>
  );
};

export default EditorWithMenu;
