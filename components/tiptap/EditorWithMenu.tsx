import React from "react";
import MenuBar from "@/components/tiptap/MenuBar";
import RichTextEditor from "@/components/tiptap/RichTextEditor";

// Types
import { Editor } from "@tiptap/react";

/**
 * Displays the editor with both menu bar and rich text editor
 * 
 * @param param0 
 * @returns 
 */
const EditorWithMenu = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="w-full mb-8">
      <MenuBar editor={editor} />
      <RichTextEditor editor={editor} />
    </div>
  );
};

export default EditorWithMenu;
