import { useCallback } from "react";
import { FormSchema } from "@/features/blog-composer/schemas/composerSchemas";

// Types
import { PostWithRelations } from "@/features/blogs/types/post";
import { ContentBlock } from "@/features/blogs/types/post";

// Hooks
import useCreatePost from "@/features/blog-composer/hooks/useCreatePost";

/**
 *
 * The hook is responsible for submitting the post
 *
 */
const useSubmitPost = ({ blocks }: { blocks: ContentBlock[] }) => {
  const { mutatePost, isPendingPost } = useCreatePost();

  // Log blocks on every render (for debugging)
  console.log("useSubmitPost render – blocks:", blocks);

  // useCallback ensures onSubmit is stable but updates when blocks change
  const onSubmit = useCallback(
    (data: FormSchema) => {
      if (blocks.length === 0) {
        console.warn("No blocks to submit");
        return;
      }

      console.log("data", data);

      const postData: PostWithRelations = {
        title: data.title,
        description: data.description,
        image_url: "",
        content_blocks: blocks.map(
          ({ content_order, content_data, content_type, media }, index) => ({
            id: `block-${index}`,
            content_order: content_order ?? index + 1,
            content_type,
            content_data,
            media: media ?? undefined,
          })
        ),
      };

      mutatePost(postData);
    },
    [blocks, mutatePost]
  );

  return { onSubmit, isPendingPost };
};

export default useSubmitPost;
