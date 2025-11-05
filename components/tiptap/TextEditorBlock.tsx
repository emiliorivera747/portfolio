import React from "react";

import EditorWithMenu from "@/components/tiptap/EditorWithMenu";

// Types
import { TextEditorBlockProps } from "@/types/editor";

import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";

// Context
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

/**
 *
 * Will either display editor or text
 *
 */
const TextEditorBlock: React.FC<TextEditorBlockProps> = ({
  block,
}: TextEditorBlockProps) => {
  const { getId, blocks, setCurrentBlock } = useComposerContext();

  const updateCurrentBlock = () => {
    const currentBlock = blocks.find((blk) => blk.id === block.id);
    setCurrentBlock(currentBlock || null);
  };

  const isEditing = getId() === block.id;

  const initialContent = block.content_data ?? {
    type: "doc",
    content: [{ type: "paragraph" }],
  };

  return (
    <div className={`w-full rounded-[12px]  py-4`}>
      {isEditing ? (
        <div className="border border-primary-300 pt-10 pb-6 rounded-[12px] px-10">
          <EditorWithMenu id={block.id + ""} initialContent={initialContent} />
        </div>
      ) : (
        <div
          onClick={updateCurrentBlock}
          className="w-full blog-content font-extralight hover:border hover:border-primary-500 border-white border rounded-[12px] py-4 px-2 cursor-text min-h-[3rem] prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: block.content_data
              ? renderTipTapJSON(block.content_data)
              : '<p class="text-gray-400">Click to add text...</p>',
          }}
        />
      )}
    </div>
  );
};

export default TextEditorBlock;
