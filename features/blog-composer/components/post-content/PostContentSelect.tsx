"use client";

import { useState, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SelectContentButton from "@/features/blog-composer/components/buttons/SelectContentButton";

import SecondaryHeader from "@/features/blog-composer/components/headings/SecondaryHeading";

import { ContentBlock } from "@/features/blogs/types/post";

/**
 * Allows you to select post content whether images, text, videos, and more.
 */
const PostContentSelect = ({
  addBlock,
  setBlockId,
}: {
  addBlock: (block: ContentBlock) => void;
  setBlockId: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

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
          <DialogTrigger>
            <SelectContentButton
              path={
                "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              }
            />
          </DialogTrigger>
          <DialogTrigger>
            <SelectContentButton path="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostContentSelect;
