// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
import { useToast } from "@/hooks/toast/use-toast";

// Services
import postComposerService from "@/features/blog-composer/services/postComposerService";
import { PostWithRelations } from "@/features/blogs/types/post";

/**
 *
 *  Hanldles creating
 *
 * @returns
 */
const useCreatePost = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  console.log("HERE")

  const { mutate: mutatePost, isPending: isPendingPost } = useMutation({
    mutationFn: postComposerService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectedAssetsAndNetworth"],
      });
      toast({
        title: "Post",
        description: "Successfully updated Post",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong when updating Post",
      });
    },
  });

  return { mutatePost, isPendingPost };
};

export default useCreatePost;
