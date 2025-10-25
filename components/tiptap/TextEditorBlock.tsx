import React from "react";

import EditorWithMenu from "@/components/tiptap/EditorWithMenu";

import { ContentBlock } from "@/features/blogs/types/post";

interface TextEditorBlock {
  block: ContentBlock;
  isEditing: boolean;
  onEnterEditMode: (id: string) => void;
  onUpdate: (id: string, newContent: string) => void;
}

/**
 *
 * Will either display editor or text
 *
 */
const TextEditorBlock: React.FC<TextEditorBlock> = ({
  block,
  isEditing,
  onEnterEditMode,
  onUpdate,
}: TextEditorBlock) => {
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
