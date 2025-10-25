import React from "react";

import EditorWithMenu from "@/components/tiptap/EditorWithMenu";

// Types
import { TextEditorBlockProps } from "@/types/editor";

/**
 *
 * Will either display editor or text
 *
 */
const TextEditorBlock: React.FC<TextEditorBlockProps> = ({
  block,
  isEditing,
  onEnterEditMode,
  onUpdate,
}: TextEditorBlockProps) => {
  const ReadMode = () => (
    <div className="" onClick={() => onEnterEditMode(String(block.id || ""))}>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: block.content_data.html || "<p>Click to add text...</p>",
        }}
      />
    </div>
  );
  return (
    <div>
      {isEditing ? (
        <EditorWithMenu
          id={block.id + ""}
          initialContent={block.content_data.html}
          onUpdate={onUpdate}
        />
      ) : (
        <ReadMode />
      )}
    </div>
  );
};

export default TextEditorBlock;
