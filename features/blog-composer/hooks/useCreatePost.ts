"use client";

// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
import { toast } from "sonner";

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
    onMutate: () => {
      toast("Creating post...", {
        position: "top-right",
        style: {
          backgroundColor: "#228be6",
          color: "white",
          borderRadius: "12px",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      toast.success("Post created successfully!", {
        position: "top-right",
        style: {
          backgroundColor: "#37b24d",
          color: "white",
          borderRadius: "12px",
        },
      });
    },
    onError: () => {
      toast.error("Failed to create post. Please try again.", {
        position: "top-right",
        style: {
          backgroundColor: "#c92a2a",
          color: "white",
          borderRadius: "12px",
        },
      });
    },
  });

  return { mutatePost, isPendingPost };
};

export default useCreatePost;
