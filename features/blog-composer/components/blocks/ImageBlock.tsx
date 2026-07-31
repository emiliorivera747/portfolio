"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { ContentBlock } from "@/features/blogs/types/post";
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";
import mediaService from "@/services/media-requests";

const ImageBlock = ({ block }: { block: ContentBlock }) => {
  const { updateBlock } = useComposerContext();
  const [loading, setLoading] = useState(false);

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
        updateBlock(block.id, {
          mediaId: mediaResponse.id,
          media: {
            providerAssetId: mediaResponse.providerAssetId,
            id: mediaResponse.id,
            url: mediaResponse.url,
            alt: original_filename || "Image",
            mediaType: resource_type,
          },
        });
      } catch {
        alert("Failed to save media to database.");
      } finally {
        setLoading(false);
      }
    },
    [block.id, updateBlock]
  );

  return (
    <CldUploadWidget
      signatureEndpoint="/api/utils/sign-cloudinary-params"
      onSuccess={handleUploadSuccess}
    >
      {({ open }) => (
        <div className="w-full relative group/img">
          {block.media?.url ? (
            <>
              <Image
                src={block.media.url}
                alt={block.media?.alt || "Image"}
                height={500}
                width={500}
                className="w-full rounded-[12px]"
              />
              <button
                type="button"
                onClick={() => open()}
                disabled={loading}
                className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity text-white text-sm font-medium"
              >
                {loading ? "Saving..." : "Replace Image"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => open()}
              disabled={loading}
              className="w-full h-40 rounded-[12px] border-2 border-dashed border-primary-300 flex flex-col items-center justify-center gap-2 text-primary-400 hover:border-primary-500 hover:text-primary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="text-sm">{loading ? "Saving..." : "Click to upload image"}</span>
            </button>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageBlock;
