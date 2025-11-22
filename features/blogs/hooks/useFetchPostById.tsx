
import { useQuery } from "@tanstack/react-query";
import { blogsServices } from "@/features/blogs/services/blogsServices";

/**
 * Fetches the blogs
 *
 * @returns
 */
const useFetchPostById = ({ id }: { id: string }) => {
  const {
    data: postResponse,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => blogsServices.fetchPostById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,                    // ← Also safer than `true`
    retry: 1,
  });
  return { postResponse, isLoadingPost, isErrorPost };
};

export default useFetchPostById;
