import React from "react";

import EditorWithMenu from "@/components/tiptap/EditorWithMenu";

interface TextEditorBlock {
  contentBlock: { id: string; content: string };
  isEditing: boolean;
  onEnterEditMode: (id: string) => void;
  onUpdate: (id: string, newContent: string) => void;
}

/**
 *
 * Will either display editor or text
 *
 *
 */
const TextEditorBlock: React.FC<TextEditorBlock> = ({
  contentBlock,
  isEditing,
  onEnterEditMode,
  onUpdate,
}: TextEditorBlock) => {
  const ReadMode = () => (
    <div className="" onClick={() => onEnterEditMode(contentBlock.id)}>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: contentBlock.content || "<p>Click to add text...</p>",
        }}
      />
    </div>
  );
  return (
    <div>
      {isEditing ? (
        <EditorWithMenu
          id={contentBlock.id}
          initialContent={contentBlock.content}
          onUpdate={onUpdate}
        />
      ) : (
        <ReadMode />
      )}
    </div>
  );
};

export default TextEditorBlock;
