import React from "react";
import MenuBar from "@/components/tiptap/MenuBar";
import RichTextEditor from "@/components/tiptap/RichTextEditor";

// Hooks
import useBlogEditor from "@/features/blog-composer/hooks/useBlogEditor";

/**
 * Displays the editor with both menu bar and rich text editor
 *
 * @param param0
 * @returns
 */
const EditorWithMenu = ({ isActive = true }: { isActive?: boolean }) => {
  const { editor, blogContent } = useBlogEditor();
  if (!editor) return null;

  return (
    <div className="w-full mb-8">
      {isActive && (
        <>
          <MenuBar editor={editor} />
          <RichTextEditor editor={editor} />
        </>
      )}
      {!isActive && }
    </div>
  );
};

export default EditorWithMenu;
