"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";

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

type MediaSaveResponse = {
  id: number; // The new media_id from Prisma
  url: string;
};


/**
 * Allows you to select post content whether images, text, videos, and more.
 */
const PostContentSelect = () => {
  const { blocks, addBlock, currentBlock, setCurrentBlock, updateBlock } =
    useComposerContext();
  const [open, setOpen] = useState(false);
  const [currentImageBlockId, setCurrentImageBlockId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  // Handle button clicks for adding content blocks
  const handleAddContent = (
    content_type: "doc" | "image",
    openWidget?: () => void
  ) => {
    const newBlock = CONTENT_BLOCK_GENERATOR[content_type](
      blocks.length,
      currentBlock?.content_data
    );

    addBlock(newBlock);
    setCurrentBlock(newBlock);
    setOpen(false);

    if (content_type === "image" && openWidget) {
      // Store ID and open the widget
      setCurrentImageBlockId(newBlock.id);
      openWidget();
    }
  };

  // === 2. Widget Success Handler: Save to DB ===
  const handleUploadSuccess = async (result: any, widget: any) => {
    if (result.event !== "success" || !currentImageBlockId) return;

    const cloudinaryData = result.info;
    const blockId = currentImageBlockId;
    setLoading(true);

    try {
      // 3. Post the Cloudinary URL and details to your own API to save to Prisma
      const dbResponse = await fetch("/api/save-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: cloudinaryData.secure_url,
          alt: cloudinaryData.original_filename || "Image",
          media_type: cloudinaryData.resource_type,
        }),
      });

      if (!dbResponse.ok) {
        throw new Error("Failed to save media to database.");
      }

      const mediaResult: MediaSaveResponse = await dbResponse.json();

      // 4. Update the ContentBlock in your state with the Media ID and URL
      updateBlock(blockId, {
        media_id: mediaResult.id,
        // Update the 'media' prop for immediate client-side rendering
        media: {
          id: mediaResult.id.toString(),
          url: mediaResult.url,
          alt: cloudinaryData.original_filename || "Image",
          media_type: cloudinaryData.resource_type,
        },
      });
    } catch (error) {
      console.error("Database save error:", error);
    } finally {
      setLoading(false);
      setCurrentImageBlockId(null);
      widget.close();
    }
  };

  return (
    <CldUploadWidget
      signatureEndpoint={`/api/sign-cloudinary-params`}
      onSuccess={handleUploadSuccess}
    >
      {({ cloudinary, widget, open: widgetOpen, results, error }) => (
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
      )}
    </CldUploadWidget>
  );
};

export default PostContentSelect;
