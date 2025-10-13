'use client'
// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
// import { useToast } from "@/hooks/toast/use-toast";
import { toast } from "sonner"


// Services
import postComposerService from "@/features/blog-composer/services/postComposerService";

/**
 *
 *  Hanldles creating
 *
 * @returns
 */
const useCreatePost = () => {
  const queryClient = useQueryClient();

  const { mutate: mutatePost, isPending: isPendingPost } = useMutation({
    mutationFn: postComposerService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectedAssetsAndNetworth"],
      });
      toast.success("Post created successfully!");
    },
    onError: () => {
      toast.error("Failed to create post. Please try again.");
    },
  });

  return { mutatePost, isPendingPost };
};

export default useCreatePost;
