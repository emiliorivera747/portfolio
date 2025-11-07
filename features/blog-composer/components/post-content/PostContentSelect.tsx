"use client";

// --- React ---
import { useState } from "react";

// --- External lib ---
import { CldUploadWidget } from "next-cloudinary";

// --- Components ---
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectContentButton from "@/features/blog-composer/components/buttons/SelectContentButton";
import SecondaryHeader from "@/features/blog-composer/components/headings/SecondaryHeading";
import SelectContentWithToolTipButton from "@/features/blog-composer/components/buttons/SelectContentWithToolTipButton";

// --- Hooks ---
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

// --- Data ---
import { contentTypes } from "@/features/blog-composer/data/contentTypes";

// --- Config ---
import { CONTENT_BLOCK_GENERATOR } from "@/features/blog-composer/config/blockGenerator";

// --- Types ---
import { MediaSaveResponse } from "@/features/blog-composer/types/postForm";

// --- Services ---
import mediaService from "@/services/media-requests";

const PostContentSelect = () => {
  const {
    blocks,
    addBlock,
    currentBlock,
    setCurrentBlock,
    updateBlock,
    getId,
  } = useComposerContext();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddContent = (
    contentType: "doc" | "image",
    openWidget?: () => void
  ) => {
    
    /**
     * Get a new block based on content type
     */
    const newBlock = CONTENT_BLOCK_GENERATOR[contentType](
      blocks.length,
      currentBlock?.content_data
    );

    addBlock(newBlock);
    setCurrentBlock(newBlock);
    setOpenModal(false);

    if (contentType === "image" && openWidget) openWidget();
  };

  const handleUploadSuccess = async (result: any) => {
    if (result.event !== "success" && !getId()) return;

    const { secure_url, original_filename, resource_type } = result.info;
    setLoading(true);

    try {
      const mediaResponse: MediaSaveResponse = await mediaService.saveMedia({
        url: secure_url,
        alt: original_filename || "Image",
        media_type: resource_type,
      });

      const blockId = getId();
      if (blockId !== undefined) {
        updateBlock(blockId, {
          media_id: mediaResponse.id,
          media: {
            id: mediaResponse.id.toString(),
            url: mediaResponse.url,
            alt: original_filename || "Image",
            media_type: resource_type,
          },
        });
      } else {
        console.error("Block ID is undefined. Cannot update block.");
      }
    } catch (error) {
      console.error("Database save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={handleUploadSuccess}
    >
      {({ open }) => (
        <div className="w-full h-full mb-8">
          <SecondaryHeader label="Content" />
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
              {contentTypes.map(({ path, label, type }) => (
                <SelectContentWithToolTipButton
                  key={label}
                  label={label}
                  path={path}
                  type={type}
                  addContent={
                    type === "image"
                      ? () => handleAddContent(type, open)
                      : () => handleAddContent(type)
                  }
                />
              ))}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default PostContentSelect;
