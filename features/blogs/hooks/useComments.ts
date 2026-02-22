import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsServices } from "@/features/blogs/services/blogsServices";

export const useFetchComments = (postId: string) => {
  const {
    data: commentsResponse,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => blogsServices.fetchComments(postId),
    refetchOnWindowFocus: false,
    enabled: !!postId,
  });

  return { commentsResponse, isLoadingComments, isErrorComments };
};

export const useCreateComment = (postId: string) => {
  const mutation = useMutation({
    mutationFn: (data: { email: string; content: string; name?: string }) =>
      blogsServices.createComment(postId, data),
  });

  return mutation;
};

export const useVerifyComment = (postId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { pendingId: number; code: string }) =>
      blogsServices.verifyComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return mutation;
};
