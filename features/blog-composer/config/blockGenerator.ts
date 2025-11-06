// External Lib
import { nanoid } from "nanoid"; // For generating unique IDs
import { DEFAULT_BLOCK } from "@/features/blog-composer/data/blocks";
import { ContentBlock } from "@/features/blogs/types/post";

// === Types ===
type ImageBlock = ContentBlock & {
  media: { url: string; alt: string; media_type: "image" };
};

type DocBlock = ContentBlock & {
  content_data: Record<string, any>;
};

export const CONTENT_BLOCK_GENERATOR = {
  doc: (order: number, currentData?: Record<string, any>): DocBlock => {
    return {
      id: nanoid(),
      content_order: order,
      content_type: "doc",
      content_data: currentData || DEFAULT_BLOCK,
    };
  },
  image: (order: number): ImageBlock => {
    return {
      id: nanoid(),
      content_order: order,
      content_type: "image",
      content_data: {},
      media: { url: "", alt: "", media_type: "image" },
    };
  },
} as const;
