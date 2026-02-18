"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { blogsServices } from "@/features/blogs/services/blogsServices";

const useDeletePost = (postId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: () => blogsServices.deletePost(postId),
    onMutate: () => {
      toast("Deleting post...", {
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
      toast.success("Post deleted successfully!", {
        position: "top-right",
        style: {
          backgroundColor: "#37b24d",
          color: "white",
          borderRadius: "12px",
        },
      });
      router.push("/admin/blogs");
    },
    onError: () => {
      toast.error("Failed to delete post. Please try again.", {
        position: "top-right",
        style: {
          backgroundColor: "#c92a2a",
          color: "white",
          borderRadius: "12px",
        },
      });
    },
  });

  return { mutateDelete, isPendingDelete };
};

export default useDeletePost;
