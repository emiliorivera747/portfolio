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

// --- Data ---
import { contentTypes } from "@/features/blog-composer/data/contentTypes";

// --- Config ---
import { CONTENT_BLOCK_GENERATOR } from "@/features/blog-composer/config/blockGenerator";

// --- Type ---
import { MediaSaveResponse } from "@/features/blog-composer/types/postForm";

/**
 * Allows you to select post content whether images, text, videos, and more.
 */
const PostContentSelect = () => {
  const { blocks, addBlock, currentBlock, setCurrentBlock, updateBlock } =
    useComposerContext();

  const [openModal, setOpenModal] = useState(false);
  const [currentImageBlockId, setCurrentImageBlockId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

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
    setOpenModal(false);

    if (content_type === "image" && openWidget) {
      setCurrentImageBlockId(newBlock.id);
      openWidget();
    }
  };

  const handleUploadSuccess = async (result: any) => {
    if (result.event !== "success" || !currentImageBlockId) return;

    const cloudinaryData = result.info;
    setLoading(true);

    try {
      const dbResponse = await fetch("/api/save-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: cloudinaryData.secure_url,
          alt: cloudinaryData.original_filename || "Image",
          media_type: cloudinaryData.resource_type,
        }),
      });

      if (!dbResponse.ok) throw new Error("Failed to save media.");

      const mediaResult: MediaSaveResponse = await dbResponse.json();

      updateBlock(currentImageBlockId, {
        media_id: mediaResult.id,
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
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="next_cloudinary_app"
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={handleUploadSuccess}
    >
      {({ open }) => (
        <div className="w-full h-full mb-8">
          <SecondaryHeader label={"Content"} />
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger className="w-full">
              <SelectContentButton
                path="M12 4.5v15m7.5-7.5h-15"
                className="bg-white"
              />
            </DialogTrigger>
            <DialogContent className="py-10 px-10">
              <DialogTitle className="text-center text-lg font-medium mb-4">
                Select Content Type {loading && "(Uploading/Saving...)"}
              </DialogTitle>
              {contentTypes.map(({ path, label, type }) => {
                const isImage = type === "image";
                const action = isImage
                  ? () => handleAddContent(type, open)
                  : () => handleAddContent(type);
                return (
                  <SelectContentWithToolTipButton
                    key={label}
                    label={label}
                    path={path}
                    type={type}
                    addContent={action}
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
