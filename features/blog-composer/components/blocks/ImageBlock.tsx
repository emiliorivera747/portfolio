import React from "react";

// --- Types ---
import { ContentBlock } from "@/features/blogs/types/post";

// --- Images ---
import Image from "next/image";

/**
 *
 * Displays the Image block
 *
 */
const ImageBlock = ({ block }: { block: ContentBlock }) => {
  return (
    block.media?.url && (
      <Image
        src={block.media.url}
        alt={block.media?.alt || "Image"}
        height={500}
        width={500}
        className="w-full rounded-[12px]"
      />
    )
  );
};

export default ImageBlock;
