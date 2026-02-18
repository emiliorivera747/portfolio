"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { blogsServices } from "@/features/blogs/services/blogsServices";

const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: (data: Record<string, any>) =>
      blogsServices.updatePost(postId, data),
    onMutate: () => {
      toast("Updating post...", {
        position: "top-right",
        style: {
          backgroundColor: "#228be6",
          color: "white",
          borderRadius: "12px",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      toast.success("Post updated successfully!", {
        position: "top-right",
        style: {
          backgroundColor: "#37b24d",
          color: "white",
          borderRadius: "12px",
        },
      });
    },
    onError: () => {
      toast.error("Failed to update post. Please try again.", {
        position: "top-right",
        style: {
          backgroundColor: "#c92a2a",
          color: "white",
          borderRadius: "12px",
        },
      });
    },
  });

  return { mutateUpdate, isPendingUpdate };
};

export default useUpdatePost;
