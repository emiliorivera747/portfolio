import React from "react";

import EditorWithMenu from "@/components/tiptap/EditorWithMenu";

// Types
import { TextEditorBlockProps } from "@/types/editor";

import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";

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
    <div className="border w-full py-6 blog-content rounded-[12px] px-4" onClick={() => onEnterEditMode(String(block.id || ""))}>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{
          __html:
            renderTipTapJSON(block.content_data) ||
            "<p>Click to add text...</p>",
        }}
      />
    </div>
  );
  return (
    <div className="w-full ">
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
