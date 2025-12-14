import { useQuery } from "@tanstack/react-query";
import { blogsServices } from "@/features/blogs/services/blogsServices";

/**
 * Fetches the blogs
 *
 * @returns
 */
const useFetchPostById = ({ id, initialData }: { id: string; initialData?: any }) => {
  const {
    data: postResponse,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: postError,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => blogsServices.fetchPostById(id),
    refetchOnWindowFocus: false,
    enabled: !!id && id.trim() !== "" && !initialData,
    retry: 1,
    initialData: initialData,
  });
  return { postResponse, isLoadingPost, isErrorPost, postError };
};

export default useFetchPostById;
