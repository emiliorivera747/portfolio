import { FormSchema } from "@/features/blog-composer/schemas/composerSchemas";

// Types
import { PostWithRelations } from "@/features/blogs/types/post";
import { Editor } from "@tiptap/react";

// Hooks
import useCreatePost from "@/features/blog-composer/hooks/useCreatePost";

/**
 *
 * The hook is responsible for submitting the post
 *
 */
const useSubmitPost = ({ editor }: { editor: Editor | null }) => {
  const { mutatePost, isPendingPost } = useCreatePost();

  const onSubmit = (data: FormSchema): void => {
    const jsonData = editor?.getJSON() as Record<string, any> | undefined;
    const content_blocks = [
      {
        content_order: 0,
        content_type: "paragraph",
        content_data: jsonData || {},
      },
    ];
    const post: PostWithRelations = {
      title: data.title,
      content_blocks: content_blocks,
      description: data.description,
    };
    mutatePost(post);
  };

  return { onSubmit };
};
export default useSubmitPost;
