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
    <div
      className="w-full blog-content font-extralight hover:border hover:border-primary-1000 border-white border"
      onClick={() => onEnterEditMode(String(block.id || ""))}
    >
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
    <div className={`w-full rounded-[12px]  py-4`}>
      {isEditing ? (
        <EditorWithMenu
          id={block.id + ""}
          initialContent={renderTipTapJSON(block.content_data)}
          onUpdate={onUpdate}
        />
      ) : (
        <ReadMode />
      )}
    </div>
  );
};

export default TextEditorBlock;
