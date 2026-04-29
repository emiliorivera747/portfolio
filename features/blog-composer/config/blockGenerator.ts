// External Lib
import { nanoid } from "nanoid"; // For generating unique IDs
import { DEFAULT_BLOCK } from "@/features/blog-composer/data/blocks";
import { ContentBlock } from "@/features/blogs/types/post";

// === Types ===
type ImageBlock = ContentBlock & {
  media: { url: string; alt: string; mediaType: "image" };
};

type DocBlock = ContentBlock & {
  contentData: Record<string, any>;
};

type IframeBlock = ContentBlock & {
  contentData: { src: string };
};

export const CONTENT_BLOCK_GENERATOR = {
  doc: (order: number, currentData?: Record<string, any>): DocBlock => {
    return {
      id: nanoid(),
      contentOrder: order,
      contentType: "doc",
      contentData: currentData || DEFAULT_BLOCK,
    };
  },
  image: (order: number): ImageBlock => {
    return {
      id: nanoid(),
      contentOrder: order,
      contentType: "image",
      contentData: {},
      media: { providerAssetId: "", url: "", alt: "", mediaType: "image" },
    };
  },
  iframe: (order: number): IframeBlock => {
    return {
      id: nanoid(),
      contentOrder: order,
      contentType: "iframe",
      contentData: { src: "" },
    };
  },
} as const;
