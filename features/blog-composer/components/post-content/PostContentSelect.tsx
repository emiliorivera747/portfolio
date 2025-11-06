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
import SelectContentWithToolTipButton from "@/features/blog-composer/components/buttons/SelectContentWithToolTipButton";

// Hooks
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

// Data
import { contentTypes } from "@/features/blog-composer/data/contentTypes";

import { CONTENT_BLOCK_GENERATOR } from "@/features/blog-composer/config/blockGenerator";

/**
 * Allows you to select post content whether images, text, videos, and more.
 */
const PostContentSelect = () => {
  const { blocks, addBlock, currentBlock, setCurrentBlock } =
    useComposerContext();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle button clicks for adding content blocks
  const handleAddContent = (content_type: "doc" | "image") => {
    
    const newBlock = CONTENT_BLOCK_GENERATOR[content_type](
      blocks.length,
      currentBlock?.content_data
    );

    addBlock(newBlock);
    setCurrentBlock(newBlock);
    setOpen(false);

    if (content_type === "image" && fileInputRef.current)
      fileInputRef.current.click();
  };

  const handleFileChange = () => {};

  return (
    <div className="w-full h-full mb-8">
      <SecondaryHeader label={"Content"} />
      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
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
