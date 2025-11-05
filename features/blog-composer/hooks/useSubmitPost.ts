import { FormSchema } from "@/features/blog-composer/schemas/composerSchemas";

// Types
import { PostWithRelations } from "@/features/blogs/types/post";
import { ContentBlock } from "@/features/blogs/types/post";

// Hooks
import useCreatePost from "@/features/blog-composer/hooks/useCreatePost";

// Context
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

/**
 *
 * The hook is responsible for submitting the post
 *
 */
const useSubmitPost = ({
  contentBlocks,
}: {
  contentBlocks: ContentBlock[] | [];
}) => {
  const { blocks } = useComposerContext();

  const { mutatePost, isPendingPost } = useCreatePost();

  const onSubmit = (data: FormSchema): void => {
    const postData: PostWithRelations = {
      title: data.title,
      description: data.description,
      content_blocks: blocks.map(
        ({ content_order, content_data, content_type, media }, index) => ({
          id: `block-${index}`, // Generate a unique id for each block
          content_order,
          content_type, 
          content_data, 
          media: media ?? undefined,
        })
      ),
    };

    mutatePost(postData);
  };

  return { onSubmit };
};
export default useSubmitPost;
