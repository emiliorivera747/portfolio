
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
    queryKey: ["posts"],
    queryFn: () => blogsServices.fetchPostById(id),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { postResponse, isLoadingPost, isErrorPost };
};

export default useFetchPostById;
