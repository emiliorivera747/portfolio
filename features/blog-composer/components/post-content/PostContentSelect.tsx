"use client";

// --- React ---
import { useState, useCallback, useRef, useEffect } from "react";

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
import { ContentBlock } from "@/features/blogs/types/post";

// --- Services ---
import mediaService from "@/services/media-requests";

const PostContentSelect = () => {
  const { blocks, addBlock, setCurrentBlock, updateBlock } =
    useComposerContext();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Keep the lates block ID that we are uploading for
  const uploadingBlockIdRef = useRef<string | number | undefined>(undefined);

  // Optional: keep a fresh copy of blocks for debugging / fallback
  const blocksRef = useRef<ContentBlock[]>([]);
  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  const handleAddContent = (
    contentType: "doc" | "image",
    openWidget?: () => void
  ) => {
    const newBlock = CONTENT_BLOCK_GENERATOR[contentType](
      blocks.length,
      undefined
    );

    addBlock(newBlock); // <- push into context
    setCurrentBlock(newBlock); // <- make it the active block
    uploadingBlockIdRef.current = newBlock.id; // <-- remember it
    setOpenModal(false);
    if (contentType === "image" && openWidget) openWidget();
  };

  const handleUploadSuccess = useCallback(
    async (result: any) => {
      if (result.event !== "success") return;

      const { secure_url, original_filename, resource_type } = result.info;
      setLoading(true);

      try {
        const mediaResponse = await mediaService.saveMedia({
          remoteUrl: secure_url,
          alt: original_filename || "Image",
          media_type: resource_type,
        });

        // ------------------------------------------------------------------
        // 1. Use the **ref** we stored when the block was created
        // ------------------------------------------------------------------
        const blockId = uploadingBlockIdRef.current;
        if (blockId === undefined) return;

        // ------------------------------------------------------------------
        // 2. Update the block (still using the context hook – it’s fresh)
        // ------------------------------------------------------------------
        updateBlock(blockId, {
          media_id: mediaResponse.id,
          media: {
            provider_asset_id: mediaResponse.providerAssetId,
            id: mediaResponse.id,
            url: mediaResponse.url,
            alt: original_filename || "Image",
            media_type: resource_type,
          },
        });
      } catch (err) {
        // Log error in development only
        if (process.env.NODE_ENV === 'development') {
          console.error("Database save error:", err);
        }
        alert("Failed to save media to database.");
      } finally {
        setLoading(false);
        uploadingBlockIdRef.current = undefined;
      }
    },
    [updateBlock]
  );

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={handleUploadSuccess}
    >
      {({ open }) => (
        <div className="w-full h-full mb-8 mt-8">
          <Dialog open={openModal} onOpenChange={setOpenModal}>

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
            <DialogTrigger className="w-full">
              <SelectContentButton
                path="M12 4.5v15m7.5-7.5h-15"
                className="bg-white"
              />
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default PostContentSelect;
