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
const useSubmitPost = ({
  contentBlocks,
}: {
  contentBlocks: ContentBlock[] | [];
}) => {
  
  const { mutatePost, isPendingPost } = useCreatePost();

  const onSubmit = (data: FormSchema): void => {
    const post: PostWithRelations = {
      title: data.title,
      content_blocks: contentBlocks,
      description: data.description,
    };

    mutatePost(post);
  };

  return { onSubmit };
};
export default useSubmitPost;
