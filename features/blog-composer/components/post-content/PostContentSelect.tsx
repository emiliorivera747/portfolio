"use client";

import { useState, useRef } from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectContentButton from "@/features/blog-composer/components/buttons/SelectContentButton";
import SecondaryHeader from "@/features/blog-composer/components/headings/SecondaryHeading";
import { ContentBlock } from "@/features/blogs/types/post";
import SelectContentWithToolTipButton from "@/features/blog-composer/components/buttons/SelectContentWithToolTipButton";

// External Lib
import { nanoid } from "nanoid"; // For generating unique IDs

// Hooks
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

// Data
import { DEFAULT_BLOCK } from "@/features/blog-composer/data/blocks";
import { contentTypes } from "@/features/blog-composer/data/contentTypes";

/**
 * Allows you to select post content whether images, text, videos, and more.
 */
const PostContentSelect = () => {
  const { blocks, addBlock, currentBlock, setCurrentBlock } =
    useComposerContext();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  // Handle button clicks for adding content blocks
  const handleAddContent = (content_type: ContentBlock["content_type"]) => {
    const newBlock: ContentBlock = {
      id: nanoid(),
      content_order: blocks.length,
      content_type: content_type,
      content_data: currentBlock?.content_data || DEFAULT_BLOCK,
    };
    addBlock(newBlock);
    setCurrentBlock(newBlock);
    setOpen(false);
  };

  return (
    <div className="w-full h-full mb-8">
      <SecondaryHeader label={"Content"} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <SelectContentButton
            path="M12 4.5v15m7.5-7.5h-15"
            ref={buttonRef}
            className={"bg-white"}
          />
        </DialogTrigger>
        <DialogContent className="py-10 px-10">
          <DialogTitle className="text-center text-lg font-medium mb-4">
            Select Content Type
          </DialogTitle>

          {contentTypes.map(({ path, label, type }) => {
            return (
              <SelectContentWithToolTipButton
                key={label}
                label={label}
                path={path}
                type={type}
                addContent={handleAddContent}
              />
            );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostContentSelect;
